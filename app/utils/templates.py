from fastapi.templating import Jinja2Templates
from nltk.stem.porter import PorterStemmer
from typing import Dict, Any, List, Union
from app.utils.markdown_handler import MarkdownHandler
import re, yaml

templates = Jinja2Templates(directory="templates")

themes = [
    "nt-2KXJ8Z1ZLV0H",
    "nt-2KXJ8ZE0DCKJ",
    "nt-2KXJ8ZELYODH",
    "nt-2KXJ8ZSA8ZZBB",
    "nt-2KXJ8ZSCY4XHT",
    "nt-2KXJ8ZSF6FBKA",
    "nt-2KXJ8ZSFQB9OQ",
    "nt-2KXJ8ZSKYV4OE",
    "nt-2KXJ8ZW261H8",
    "nt-2KXJ8ZW2MKF1",
    # new additions
    "nt-2KXJ8ZSC09H2L",
    "nt-2KXJ8ZS8UB8KB",
    "nt-2KXJ8ZSLOJ965",
    "nt-2KXJ8ZJ78RKI",
    "nt-2KXJ8ZS2V831N",
    "nt-2KXJ8ZQ50KYQ",
]

stemmer = PorterStemmer()


# Define your highlighting functions
def highlight_text(text: str, keywords: Union[str, List[str]]) -> str:
    """
    Highlights all occurrences of keywords in text by wrapping them in a span with class 'highlight'.

    Args:
        text: The original text to search in
        keywords: A single keyword or list of keywords to highlight

    Returns:
        Text with highlighted keywords
    """
    if not keywords or not text:
        return text

    # Convert single keyword to list for consistent processing
    if isinstance(keywords, str):
        if "," in keywords:
            keywords = keywords.split(",")
        else:
            keywords = [keywords]

    # Sort keywords by length (descending) to prevent nested highlights
    keywords = sorted(keywords, key=len, reverse=True)

    # Create a single regex pattern with all keywords
    escaped_keywords = [
        re.escape(stemmer.stem(keyword.strip().replace('"', "").lower()))
        for keyword in keywords
        if keyword.strip()
    ]
    if not escaped_keywords:
        return text

    # Join with | for OR operation in regex
    pattern_str = f"({'|'.join(escaped_keywords)})"
    pattern = re.compile(pattern_str, re.IGNORECASE)

    # Replace all matches with highlighted version
    highlighted_text = pattern.sub(r'<span class="highlight">\1</span>', text)
    # print(f"hightlighted text = {highlighted_text}")
    return highlighted_text


def split_and_highlight(
    text: str,
    keywords: Union[str, List[str]],
    context_chars: int = 60,
    max_snippets: int = 2,
) -> List[str]:
    if not text:
        return []

    if isinstance(keywords, str):
        if "," in keywords:
            keywords = keywords.split(",")
        else:
            keywords = [keywords]

    valid_keywords = [
        stemmer.stem(kw.strip().replace('"', ""))
        for kw in keywords
        if kw and kw.strip()
    ]
    if not valid_keywords:
        return [text[:300]]  # Return beginning of text if no valid keywords

    escaped_keywords = [re.escape(keyword) for keyword in valid_keywords]
    pattern_str = f"({'|'.join(escaped_keywords)})"
    pattern = re.compile(pattern_str, re.IGNORECASE)

    matches = list(re.finditer(pattern, text))

    if not matches:
        return [text[:300]]

    snippets = []
    used_ranges = []

    for match in matches:
        if len(snippets) >= max_snippets:
            break

        start_pos = match.start()
        end_pos = match.end()

        snippet_start = max(0, start_pos - context_chars)
        snippet_end = min(len(text), end_pos + context_chars)

        overlap = False
        for used_start, used_end in used_ranges:
            if snippet_start <= used_end and snippet_end >= used_start:
                overlap = True
                break

        if overlap:
            continue

        if snippet_start > 0:
            while snippet_start > 0 and text[snippet_start].isalnum():
                snippet_start -= 1
            if snippet_start > 0:
                snippet_start += 1

        if snippet_end < len(text):
            while snippet_end < len(text) and text[snippet_end].isalnum():
                snippet_end += 1

        snippet = text[snippet_start:snippet_end]

        prefix = "..." if snippet_start > 0 else ""
        suffix = "..." if snippet_end < len(text) else ""

        snippet = f"{prefix}{snippet}{suffix}"

        # Highlight all keywords in the snippet
        highlighted_snippet = highlight_text(snippet, keywords)

        snippets.append(highlighted_snippet)
        used_ranges.append((snippet_start, snippet_end))

    return snippets


# Register the custom filters with your Jinja2 environment
templates.env.filters["highlight"] = highlight_text
templates.env.filters["snippets"] = split_and_highlight

markdown_handler = MarkdownHandler()
header_menu, footer_menu = markdown_handler.get_menus()


# Your enhanced template response function
def get_template_response(
    template_name: str, context: Dict[str, Any], status_code: int = 200
):
    with open("jenfiles/header_menu.yaml", "r") as yaml_file:
        header_menu = yaml.safe_load(yaml_file)
    with open("jenfiles/footer_menu.yaml", "r") as yaml_file:
        footer_menu = yaml.safe_load(yaml_file)
    globals = {
        "themes": themes,
        "header_lists": header_menu,
        "footer_menu": footer_menu,
        "highlight_text": highlight_text,
        "split_and_highlight": split_and_highlight,
    }

    merged_context = {**globals, **context}

    request = merged_context["request"]
    return templates.TemplateResponse(
        request=request,
        name=template_name,
        context=merged_context,
        status_code=status_code,
    )


# def highlight_text(text: str, keywords: Union[str, List[str]]) -> str:
#     """
#     Highlights all occurrences of keywords in text by wrapping them in a span with class 'highlight'.
#
#     Args:
#         text: The original text to search in
#         keywords: A single keyword or list of keywords to highlight
#
#     Returns:
#         Text with highlighted keywords
#     """
#     if not keywords or not text:
#         return text
#
#     # Convert single keyword to list for consistent processing
#     if isinstance(keywords, str):
#         keywords = [keywords]
#
#     # Sort keywords by length (descending) to prevent nested highlights
#     keywords = sorted(keywords, key=len, reverse=True)
#
#     # Create a single regex pattern with all keywords
#     escaped_keywords = [
#         re.escape(keyword.strip()) for keyword in keywords if keyword.strip()
#     ]
#     if not escaped_keywords:
#         return text
#
#     # Join with | for OR operation in regex
#     pattern_str = f"({'|'.join(escaped_keywords)})"
#     pattern = re.compile(pattern_str, re.IGNORECASE)
#
#     # Replace all matches with highlighted version
#     highlighted_text = pattern.sub(r'<span class="highlight">\1</span>', text)
#
#     return highlighted_text
#
#
# def split_and_highlight(
#     text: str,
#     keywords: Union[str, List[str]],
#     context_chars: int = 60,
#     max_snippets: int = 3,
# ) -> list[str]:
#     """
#     Extracts snippets from text that contain any of the keywords, with context before and after.
#     Highlights the keywords within each snippet.
#
#     Args:
#         text: The text content
#         keywords: A single keyword or list of keywords to highlight
#         context_chars: Number of characters before and after the keyword to include in snippet
#         max_snippets: Maximum number of snippets to return
#
#     Returns:
#         List of highlighted text snippets
#     """
#     # Handle empty cases
#     if not text:
#         return []
#
#     print(f" keywords : {keywords}")
#
#     # Convert single keyword to list for consistent processing
#     if isinstance(keywords, str):
#         if "," in keywords:
#             keywords = keywords.split(",")
#         else:
#             keywords = [keywords]
#
#     # Filter empty keywords and create a pattern for all keywords
#     valid_keywords = [kw.strip() for kw in keywords if kw and kw.strip()]
#     if not valid_keywords:
#         return [text[:300]]  # Return beginning of text if no valid keywords
#     print(f"fvalid keywrds: {valid_keywords}")
#     # Create a regex pattern with all keywords for matching
#     escaped_keywords = [re.escape(keyword) for keyword in valid_keywords]
#     pattern_str = f"({'|'.join(escaped_keywords)})"
#     pattern = re.compile(pattern_str, re.IGNORECASE)
#
#     # Find all matches
#     matches = list(re.finditer(pattern, text))
#
#     # No matches found
#     if not matches:
#         return [text[:300]]
#
#     # Store snippets and their positions to avoid duplicates or overlaps
#     snippets = []
#     used_ranges = []
#
#     for match in matches:
#         if len(snippets) >= max_snippets:
#             break
#
#         # Get the start and end positions of the matched keyword
#         start_pos = match.start()
#         end_pos = match.end()
#
#         # Calculate the snippet boundaries
#         snippet_start = max(0, start_pos - context_chars)
#         snippet_end = min(len(text), end_pos + context_chars)
#
#         # Check if this snippet overlaps with existing ones
#         overlap = False
#         for used_start, used_end in used_ranges:
#             # If there's significant overlap, skip this match
#             if snippet_start <= used_end and snippet_end >= used_start:
#                 overlap = True
#                 break
#
#         if overlap:
#             continue
#
#         # Adjust to avoid cutting words
#         # Move snippet_start to the beginning of the word
#         if snippet_start > 0:
#             while snippet_start > 0 and text[snippet_start].isalnum():
#                 snippet_start -= 1
#             # Move past the space or punctuation
#             if snippet_start > 0:
#                 snippet_start += 1
#
#         # Move snippet_end to the end of the word
#         if snippet_end < len(text):
#             while snippet_end < len(text) and text[snippet_end].isalnum():
#                 snippet_end += 1
#
#         # Extract the snippet
#         snippet = text[snippet_start:snippet_end]
#
#         # Add ellipsis if needed
#         prefix = "..." if snippet_start > 0 else ""
#         suffix = "..." if snippet_end < len(text) else ""
#
#         snippet = f"{prefix}{snippet}{suffix}"
#
#         # Highlight all keywords in the snippet
#         highlighted_snippet = highlight_text(snippet, keywords)
#
#         snippets.append(highlighted_snippet)
#         used_ranges.append((snippet_start, snippet_end))
#
#     return snippets
#
#
# # Add filter to Jinja environment
# def register_filters(templates):
#     templates.env.filters["highlight"] = highlight_text
#
#
# def get_template_response(
#     template_name: str, context: Dict[str, Any], status_code: int = 200
# ):
#     globals = {
#         "themes": themes,
#         "highlight_text": highlight_text,
#         "split_and_highlight": split_and_highlight,
#     }
#
#     merged_context = {**globals, **context}
#
#     request = merged_context["request"]
#     return templates.TemplateResponse(
#         request=request,
#         name=template_name,
#         context=merged_context,
#         status_code=status_code,
#     )
