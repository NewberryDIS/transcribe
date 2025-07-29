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
    "contact": {"file": "contact.md", "title": "Contact"},
}


async def get_page_content(
    request: Request, page_config: Dict[str, str]
) -> Dict[str, Any]:
    """Generate the content dictionary for a page."""
    user = request.cookies.get("sb-auth-token")
    frontmatter, markdown_content, toc = markdown_handler.get_content(page_config["file"])
    
    # print(f"frontmatter: {frontmatter}")
    # print(f"toc: {toc}")
    
    return {
        "request": request,
        "user": user,
        "frontmatter": frontmatter,
        "page_text": markdown_content,
        "page_title": page_config["title"],
        "toc": toc, 
        "page_body_class": "text-page"
    }


# Generate routes dynamically
for route, config in PAGES.items():

    @router.get(f"/{route}", response_class=HTMLResponse)
    async def get_page(request: Request, page_config: Dict[str, str] = config):
        content = await get_page_content(request, page_config)
        return get_template_response("text_base.html", content)
