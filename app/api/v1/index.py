from fastapi import APIRouter, Depends, Query, Request, Response
from fastapi.responses import HTMLResponse, RedirectResponse
from typing import Union
from sqlalchemy.orm import Session
from sqlalchemy import select, case, desc
from app.utils.markdown_handler import MarkdownHandler
from app.utils.templates import get_template_response, themes
from app.db.sql import get_db
from app.models import Page, Ms
import json, random

router = APIRouter()
markdown_handler = MarkdownHandler()

@router.get("/", response_class=HTMLResponse)
async def get_index(
    request: Request, 
    response: Response, 
    t: Union[str, None] = Query(default=None),
    db: Session = Depends(get_db)
):
    with open('static/data/idx.json', "r") as json_file:
        data = json.load(json_file)
    if t:
        matching_items = [item for item in data if item["image"] == t]
        # If we found matches, choose from them, otherwise fall back to all data
        transc = random.choice(matching_items) if matching_items else random.choice(data)
    else:
        transc = random.choice(data)
    # transc = data[-1]
    random_page_number = random.randint(1, 50)
    random_offset = random.randint(1, 50)

    random_ms = db.scalars(select(Page.ms_id).where(Page.page_number == random_page_number, Page.status == 'notstarted').offset(random_offset).limit(1)).first()
    random_link = f"/page/{random_ms}/{random_page_number}"
    # random_link = "page/821787-27601b/17"

    gallery_mss = db.scalars(select(Ms).order_by(case((Ms.language == 'English', 0),else_=1), Ms.featured, Ms.reviewed, Ms.transcribed, Ms.inprogress, desc(Ms.create_date), Ms.title).limit(4)).all()

    # gallery_mss = markdown_handler.get_content("home_page_gallery_mss.md")
    gallery_creators = markdown_handler.get_content("home_page_gallery_creators.md")
    user = request.cookies.get("sb-auth-token")
    header_menu, footer_menu = markdown_handler.get_menus( )
    return get_template_response("index.html", {
        "request": request,
        "t": transc,
        # "data": data,
        "gallery_mss": gallery_mss,
        "gallery_creators": gallery_creators,
        "random_link": random_link,
        "header_menu": header_menu,
        "footer_menu": footer_menu
    })
