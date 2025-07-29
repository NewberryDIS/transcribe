from fastapi import APIRouter, Request, Depends, HTTPException
from pydantic import BaseModel
import time
from app.utils.templates import (
    get_template_response,
    highlight_text,
    split_and_highlight,
)
from fastapi.responses import HTMLResponse, JSONResponse
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.sql import get_db
from app.utils.markdown_handler import MarkdownHandler
import httpx
import urllib.parse
import re

router = APIRouter()

markdown_handler = MarkdownHandler()


class SearchResult(BaseModel):
    sysid: str
    title: Optional[str] = None
    image: Optional[str] = None
    transcription: Optional[str] = None
    transcriber: Optional[str] = None
    translation: Optional[str] = None
    translator: Optional[str] = None

    class Config:
        schema_extra = {
            "example": {
                "sysid": "NL11XF85",
                "image": "2KXJ8ZSM9MDV4",
                "title": "Letter from John Smith",
                "link_to_object": "https://collections.newberry.org/id/2KXJ8ZSM9MDV4",
                "transcription": "To whom it may concern...",
                "transcrippets": "To <span class='highlight'>whom</span> it may concern...",
                "transcriber": "733ThaXXor",
                "translation": "To whom it may concern...",
                "translippets": "To <span class='highlight'>whom</span> it may concern...but in French",
                "translator": "733TfrenchHAxxOR",
            }
        }


def extract_data(api_json, keywords):
    search_results = []
    # print(f"\n\nkeywrds in data extract: {keywords}")
    for item in api_json["APIResponse"]["Items"]:
        transcrippets = split_and_highlight(
            item["New.User-Contributed-Transcription"], keywords
        )
        translippets = split_and_highlight(
            item["New.User-Contributed-Translation"], keywords
        )
        # print(f"transcrippets: {transcrippets}")
        result = {
            "sysid": item["SystemIdentifier"],
            "title": item["Corefield.Title"],
            "image": item["RecordID"],
            "link_to_object": item["RelatedValue.Link-to-Compound-Object"],
            "transcription": item["New.User-Contributed-Transcription"],
            "transcrippets": transcrippets,
            "transcriber": item["New.Transcriber"],
            "translation": item["New.User-Contributed-Translation"],
            "translippets": translippets,
            "translator": item["New.Translator"],
            "_links": {
                "self": {
                    "href": f"/search/api/transcription/{item['SystemIdentifier']}"
                },
                "html": {"href": f"/search/transcription/{item['RecordID']}"},
            },
        }
        # if result["transcrippets"] is not None and len(result["transcrippets"]) > 0:
        #     print("transcrippets is not none and has lenght > 0")
        # if result["transcrippets"]:
        #     print("transcrippets exist")
        search_results.append(result)
    return search_results


@router.get("", response_class=HTMLResponse)
@router.get("/", response_class=HTMLResponse)
async def get_search_page(
    request: Request, keyword: Optional[str] = None, page: Optional[int] = 1
):
    sample_url = "https://collections.newberry.org/API/Search/v3.0/Search?query=New.User-Contributed-Transcription:vote+AND+SystemIdentifier:NL12NYPT&format=json&fields=SystemIdentifier%2CRecordID%2CCorefield.Title%2CNew.User-Contributed-Transcription%2CNew.User-Contributed-Translation%2CNew.Transcriber%2CNew.Translator%2CRelatedValue.Link-to-Compound-Object&pagenumber=1"

    async with httpx.AsyncClient() as client:
        response = await client.get(sample_url)
        response.raise_for_status()

        api_json = response.json()

        sample_result = extract_data(api_json, ["vote"])[0]

        instr = markdown_handler.get_quick_tips("search.md")
        return get_template_response(
            "search/search.html",
            {
                "request": request,
                "keyword": keyword,
                "page": page,
                "instr": instr,
                "sample_result": sample_result,
                "sample_keywords": ["vote"],
            },
        )


def parse_search_query(query: str) -> list:
    """
    Parse a search query string that uses spaces as delimiters
    while respecting quoted phrases.

    Example:
        Input: 'apple "fruit basket" orange'
        Output: ['apple', '"fruit basket"', 'orange']
    """
    if not query:
        print("No query passed to parsing function.")
        return []

    terms = []
    pattern = r'"([^"]*)"|(\S+)'
    matches = re.findall(pattern, query)

    for quoted, word in matches:
        if quoted:
            # It's a quoted phrase - keep quotes for API
            terms.append('"' + quoted.strip() + '"')
        else:
            # It's a single word
            terms.append(word)

    return [term.strip() for term in terms if term.strip()]


def get_page_number(url_or_dict):
    if isinstance(url_or_dict, dict) and "href" in url_or_dict:
        url = url_or_dict["href"]
    else:
        url = url_or_dict

    if not isinstance(url, str):
        return 1

    parsed_url = urllib.parse.urlparse(url)
    query_params = urllib.parse.parse_qs(parsed_url.query)
    page = query_params.get("pagenumber", ["1"])
    try:
        return int(page[0])
    except (ValueError, IndexError):
        return 1


@router.get("/results", response_class=HTMLResponse)
async def get_search_results(
    request: Request, keyword: Optional[str] = None, page: Optional[int] = 1
):
    # If keyword is provided, search the DAMS via API
    try:
        # Parse keywords with space as delimiter, respecting quoted phrases
        if keyword is not None:
            formatted_keywords = parse_search_query(keyword)

            # Build keyword query for API
            kw_queries = []
            for kw in formatted_keywords:
                kw_queries.append(f"New.User-Contributed-Transcription:{kw}")

            kw_query = " AND ".join(kw_queries)

            # Build the API URL with the search query
            base_url = "https://collections.newberry.org/API/Search/v3.0/Search"
            query_params = {
                "query": kw_query,
                "format": "json",
                "fields": "SystemIdentifier,RecordID,Corefield.Title,New.User-Contributed-Transcription,New.User-Contributed-Translation,New.Transcriber,New.Translator,RelatedValue.Link-to-Compound-Object",
                "pagenumber": page,  # Add page number to API request
            }

            url = f"{base_url}?{urllib.parse.urlencode(query_params)}"
            # print(f"api url: {url}")

            start_time = time.time()

            async with httpx.AsyncClient() as client:
                response = await client.get(url)
                response.raise_for_status()

                elapsed_time = time.time() - start_time
                api_response_time = f"{elapsed_time:.3f}"

                api_json = response.json()

                search_results = extract_data(api_json, formatted_keywords)

                # Extract pagination information
                global_info = api_json["APIResponse"]["GlobalInfo"]
                total_count = global_info["TotalCount"]

                # Initialize pagination variables
                has_prev = "PrevPage" in global_info
                has_next = "NextPage" in global_info
                prev_page = page - 1 if has_prev and page is not None else None
                next_page = page + 1 if has_next and page is not None else None

                # Calculate total pages (approximately)
                # Assuming default limit is 100 items per page
                items_per_page = 100
                total_pages = (total_count + items_per_page - 1) // items_per_page

                response = get_template_response(
                    "search/search_results.html",
                    {
                        "request": request,
                        "keywords": formatted_keywords,
                        "results": search_results,
                        "api_response_time": api_response_time,
                        "total_count": total_count,
                        "shown_count": len(search_results)
                        if isinstance(search_results, list)
                        else 0,
                        # Add pagination data for the template
                        "current_page": page,
                        "prev_page": prev_page,
                        "next_page": next_page,
                        "has_prev": has_prev,
                        "has_next": has_next,
                        "total_pages": total_pages,
                    },
                )

                # Include page number in the pushed URL
                push_url = f"/search?keyword={' '.join(formatted_keywords)}"
                if page is not None and page > 1:
                    push_url += f"&page={page}"
                response.headers["HX-Push-Url"] = push_url

                return response

    except httpx.RequestError as exc:
        # Handle any errors in making the request
        raise HTTPException(
            status_code=500, detail=f"Error making request to DAMS API: {str(exc)}"
        )

    except httpx.HTTPStatusError as exc:
        # Handle HTTP errors from the API
        raise HTTPException(
            status_code=exc.response.status_code,
            detail=f"DAMS API returned error: {exc.response.text}",
        )

    except Exception as e:
        # Handle any other exceptions
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}"
        )
