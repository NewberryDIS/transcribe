from fastapi import APIRouter, Depends, Request, HTTPException
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from sqlalchemy import func, select
from app.utils.markdown_handler import MarkdownHandler
from app.utils.templates import get_template_response
from app.db.sql import get_db

from app.models import Ms, Page 
import logging

router = APIRouter()
markdown_handler = MarkdownHandler()


@router.get("/tester", response_class=HTMLResponse)
@router.get("/{id}", response_class=HTMLResponse)
async def get_manuscript(id: str, request: Request, db: Session = Depends(get_db)):

    manuscript = db.scalars(select(Ms).where(Ms.ms_id == id)).first()
    if not manuscript:
        raise HTTPException(status_code=404, detail="Manuscript not found")
    
    pages = db.scalars(select(Page).where(Page.ms_id == id).order_by(Page.filename)).all()
    user = request.cookies.get("sb-auth-token")
    header_menu, footer_menu = markdown_handler.get_menus()

    return get_template_response("ms/ms.html", {
        "request": request,
        "ms": manuscript,
        "pages": pages,
        "user": user,
        "header_menu": header_menu,
        "footer_menu": footer_menu
    })

