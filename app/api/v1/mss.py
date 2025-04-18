from fastapi import APIRouter, Depends, Request, HTTPException
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from sqlalchemy import func, select, case, and_, desc
from app.utils.markdown_handler import MarkdownHandler
from app.utils.templates import get_template_response
from app.utils.filters import get_filters
from app.db.sql import get_db
from typing import Optional
from app.models import Ms, Filter, Page

router = APIRouter()
markdown_handler = MarkdownHandler()


def get_base_query(page_type: Optional[str] = None):
    """Get base query filtered by page type"""
    # print(f"page_type in get_base_query: {page_type}")
    if page_type == "transcribe":
        return select(Ms).where(Ms.transcribed < 100)
    elif page_type == "review":
        return select(Ms).where(and_(Ms.transcribed > 0 , Ms.reviewed < 100)).order_by(desc(Ms.reviewed), desc(Ms.transcribed))
    # elif page_type == "review_bottomset":
    #     return select(Ms).where(
    #         and_(Ms.transcribed > 1, Ms.transcribed < 100, Ms.reviewed < 100)
    #     )
    return select(Ms)


def get_filtered_query(base_query, fgroup: str, fvalue: str):
    """Apply filters to a base query"""
    if fgroup == "date":
        try:
            start, end = [int(val) for val in fvalue.split("-")]
            return base_query.where(Ms.date_start <= end, Ms.date_end >= start)
        except ValueError:
            raise ValueError("Invalid date range format. Expected format: 'start-end'")
    return base_query.join(Filter, Filter.ms_id == Ms.ms_id).where(
        Filter.filter_group == fgroup, Filter.slug_value == fvalue
    )


@router.get("/filters", response_class=HTMLResponse)
async def get_filter_htmx(
    request: Request,
    page_type: str = "transcribe",
    fgroup: Optional[str] = None,
    fvalue: Optional[str] = None,
    db: Session = Depends(get_db),
):
    print(f"fgroup: {fgroup}, fvalue: {fvalue}, page_type: {page_type}")
    filters, date_range = get_filters(db, page_type)
    # print(f"filters in filter route after get_fitlres: {filters}")
    return get_template_response(
        "mss/filters.html",
        {
            "request": request,
            "filters": filters,
            "fgroup": fgroup,
            "fvalue": fvalue,
            "query_params": f"{fgroup}={fvalue}",
            "date_range": date_range,
            "page_type": page_type,
        },
    )


@router.get("/mss", response_class=HTMLResponse)
async def get_manuscripts_htmx(
    request: Request,
    page_type: str = "transcribe",
    fgroup: Optional[str] = None,
    fvalue: Optional[str] = None,
    db: Session = Depends(get_db),
):
    # print(f"/mss/mss fgroup: {fgroup}, fvalue: {fvalue}, page_type: {page_type}")
    base_query = get_base_query(page_type)

    if fgroup and fvalue and fgroup != "None" and fvalue != "None":
        print(
            f"/mss/mss fgroup: '{fgroup}', fvalue: '{fvalue}', page_type: {page_type}"
        )
        query = get_filtered_query(base_query, fgroup, fvalue)
    else:
        query = base_query
    print(f"page_type: {page_type}")
    if page_type == "review":
        review = "?review"
        query = query.order_by(
            case((Ms.language == "English", 0), else_=1),
            Ms.featured,
            Ms.reviewed,
            Ms.transcribed,
            Ms.inprogress,
            Ms.title,
        )
        print(f"review query: {query}")

    elif page_type == "review_bottomset":
        review = "?review"
        query = query.order_by(
            case((Ms.language == "English", 0), else_=1),
            Ms.featured.desc(),
            Ms.reviewed.desc(),
            Ms.transcribed.desc(),
            Ms.inprogress.desc(),
            Ms.title.desc(),
        )

    else:
        review = ""
        query = query.order_by(
            case((Ms.language == "English", 0), else_=1),
            Ms.featured,
            Ms.reviewed,
            Ms.transcribed,
            Ms.inprogress,
            Ms.title,
        )

    manuscripts = db.scalars(query).all()

    return get_template_response(
        "mss/mss_list.html",
        {
            "request": request,
            "mss": manuscripts,
            "fgroup": fgroup,
            "fvalue": fvalue,
            "result_count": len(manuscripts),
            "page_type": page_type,
            "review": review,
        },
    )


@router.get("/total-transcribed", response_class=HTMLResponse)
async def get_total_transcribed(request: Request, db: Session = Depends(get_db)):
    total_pages = db.execute(select(func.count(Page.image.distinct()))).scalar()
    total_transcribed = db.execute(
        select(func.count(Page.image.distinct())).where(
            and_(Page.status != "notstarted")
        )
    ).scalar()
    return get_template_response(
        "mss/total_transcribed.html",
        {
            "request": request,
            "total_transcribed": total_transcribed,
            "total_pages": total_pages,
        },
    )
