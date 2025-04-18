from fastapi import APIRouter, Depends, Request
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from app.utils.markdown_handler import MarkdownHandler
from app.utils.templates import get_template_response
from app.utils.filters import get_filters
from app.db.sql import get_db
from typing import Optional

router = APIRouter()
markdown_handler = MarkdownHandler()


@router.get("", response_class=HTMLResponse)
@router.get("/", response_class=HTMLResponse)
async def get_transcribe_page(
    request: Request,
    fgroup: Optional[str] = None,
    fvalue: Optional[str] = None,
    db: Session = Depends(get_db),
):
    user = request.cookies.get("sb-auth-token")
    header_menu, footer_menu = markdown_handler.get_menus()
    filters, date_range = get_filters(db, "transcribe")

    return get_template_response(
        "mss/mss.html",
        {
            "request": request,
            "filters": filters,
            "fgroup": fgroup,
            "fvalue": fvalue,
            "date_range": date_range,
            "user": user,
            "header_menu": header_menu,
            "footer_menu": footer_menu,
            "page_type": "transcribe",
        },
    )
