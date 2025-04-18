from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from app.utils.markdown_handler import MarkdownHandler
from app.utils.templates import get_template_response
from typing import Dict, Any

router = APIRouter()
markdown_handler = MarkdownHandler()

# Define page configurations
# Right now, all "titles" are just the key in title case, 
# which can just be done with css, but the 'title' property
# gives us the opportunity to change that
PAGES = {
    "about": {"file": "about.md", "title": "About"},
    "tutorial": {"file": "tutorial.md", "title": "Tutorial"},
    "read": {"file": "read.md", "title": "Read"},
    "teach": {"file": "teach.md", "title": "Teach"},
    "contact":{"file": "contact.md", "title": "Contact"}
}


async def get_page_content(request: Request, page_config: Dict[str, str]) -> Dict[str, Any]:
    """Generate the content dictionary for a page."""
    user = request.cookies.get("sb-auth-token")
    header_menu, footer_menu = markdown_handler.get_menus()
    return {
        "request": request,
        "user": user,
        "header_menu": header_menu,
        "footer_menu": footer_menu,
        "page_text": markdown_handler.get_content(page_config["file"]),
        "page_title": page_config["title"]
    }


# Generate routes dynamically
for route, config in PAGES.items():
    @router.get(f"/{route}", response_class=HTMLResponse)
    async def get_page(
        request: Request,
        page_config: Dict[str, str] = config
    ):
        content = await get_page_content(request, page_config)
        return get_template_response("text_base.html", content)
