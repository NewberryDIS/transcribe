from fastapi import APIRouter, Depends, Request, Response
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.utils.markdown_handler import MarkdownHandler
from app.utils.templates import get_template_response, themes
from app.db.sql import get_db
from app.models import Page
import json, random

router = APIRouter()
markdown_handler = MarkdownHandler()


@router.get("/color-finder", response_class=HTMLResponse)
async def get_colortest(request: Request, response: Response):
    # response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    # response.headers["Pragma"] = "no-cache"
    # response.headers["Expires"] = "0"
    with open('static/data/idx.json', "r") as json_file:
        data = json.load(json_file)
    transc = random.choice(data)

    random_link = "page/821787-27601b/17"

    print(len(data))

    gallery_mss = markdown_handler.get_content("home_page_gallery_mss.md")
    gallery_creators = markdown_handler.get_content("home_page_gallery_creators.md")
    user = request.cookies.get("sb-auth-token")
    header_menu, footer_menu = markdown_handler.get_menus()
    return get_template_response("tests/colors.html", {
        "request": request,
        "t": transc,
        "user": user,
        # "data": data,
        "gallery_mss": gallery_mss,
        "gallery_creators": gallery_creators,
        "random_link": random_link,
        "header_menu": header_menu,
        "footer_menu": footer_menu
    })




@router.get("/horiz", response_class=HTMLResponse)
async def get_horiz_index(request: Request, response: Response, db: Session = Depends(get_db)):
    # response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    # response.headers["Pragma"] = "no-cache"
    # response.headers["Expires"] = "0"
    with open('static/data/idx.json', "r") as json_file:
        data = json.load(json_file)
    transc = random.choice(data)

    initial_theme = themes[random.randint(1, len( themes ) - 1)]
    random_link = "page/821787-27601b/17"

    print(len(data))

    gallery_mss = markdown_handler.get_content("home_page_gallery_mss.md")
    gallery_creators = markdown_handler.get_content("home_page_gallery_creators.md")
    user = request.cookies.get("sb-auth-token")
    header_menu, footer_menu = markdown_handler.get_menus()
    return get_template_response("tests/horiz.html", {
        "request": request,
        "t": transc,
        # "data": data,
        "user": user,
        "initial_theme": initial_theme,
        "gallery_mss": gallery_mss,
        "gallery_creators": gallery_creators,
        "random_link": random_link,
        "header_menu": header_menu,
        "footer_menu": footer_menu
    })


# {path:path} is the catch all in FastAPI
@router.get("/{path:path}", response_class=HTMLResponse)
async def get_index(request: Request, response: Response, db: Session = Depends(get_db)):
    with open('static/data/idx.json', "r") as json_file:
        data = json.load(json_file)
    transc = random.choice(data)

    random_page_number = random.randint(1, 50)
    random_offset = random.randint(1, 50)

    random_ms = db.scalars(select(Page.ms_id).where(Page.page_number == random_page_number, Page.status == 'notstarted').offset(random_offset).limit(1)).first()
    random_link = f"/page/{random_ms}/{random_page_number}"
    # random_link = "page/821787-27601b/17"

    print(len(data))

    gallery_mss = markdown_handler.get_content("home_page_gallery_mss.md")
    gallery_creators = markdown_handler.get_content("home_page_gallery_creators.md")
    header_menu, footer_menu = markdown_handler.get_menus()
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



