from fastapi import APIRouter, Depends, HTTPException, Request, Response
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from sqlalchemy import select, case
from app.utils.markdown_handler import MarkdownHandler
from app.utils.templates import get_template_response
from app.db.sql import get_db
from app.models import Creator, Ms 
import logging
import random

logging = logging.getLogger(__name__)

router = APIRouter()
markdown_handler = MarkdownHandler()

@router.get("", response_class=HTMLResponse)
@router.get("/", response_class=HTMLResponse)
async def get_all_creators(request: Request, response: Response, db: Session = Depends(get_db)):
    creator_query = select(Creator).order_by(Creator.featured.desc(), Creator.indexname, Creator.displayname)
    creators = db.scalars(creator_query).all()

    user = request.cookies.get("sb-auth-token")
    header_menu, footer_menu = markdown_handler.get_menus()
    return get_template_response("creators/creators.html", {
        "request": request,
        "creators": creators,
        "user": user,
        "header_menu": header_menu,
        "footer_menu": footer_menu
    })

@router.get('/images', response_class=HTMLResponse)
async def images_only(request: Request, db: Session = Depends(get_db)):
    creator_query = select(Creator).order_by(Creator.featured.desc(), Creator.indexname, Creator.displayname)
    creators = db.scalars(creator_query).all()

    header_menu, footer_menu = markdown_handler.get_menus()
    return get_template_response("creators/images.html", {
        "request": request,
        "creators": creators,
        "header_menu": header_menu,
        "footer_menu": footer_menu
    })
@router.get("/{creator_slug}", response_class=HTMLResponse)
async def get_creator(creator_slug: str, request: Request, response: Response, db: Session = Depends(get_db)):
    creator_query = select(Creator).where(Creator.slug == creator_slug)
    creator = db.scalars(creator_query).one()
    if not creator:
        raise HTTPException(status_code=404, detail="Creator not found")
    
    query = get_creator_mss_query(creator_slug)
    creator_mss = db.scalars(query).all()

    page_background = random.choice(creator_mss).repimage
    creator.biographicalnote = markdown_handler.interpret_content(creator.biographicalnote)
    creator.collectionscopenote = markdown_handler.interpret_content(creator.collectionscopenote)
    user = request.cookies.get("sb-auth-token")
    header_menu, footer_menu = markdown_handler.get_menus()
    
    return get_template_response("creators/creator.html", {
        "request": request,
        "creator": creator,
        "mss": creator_mss,
        "page_background": page_background,
        "user": user,
        "header_menu": header_menu,
        "footer_menu": footer_menu
    })

def get_creator_mss_query(slug):
    query = select(Ms).where(Ms.slug == slug)
    query = query.order_by(
        case(
            (Ms.language == 'English', 0),
            else_=1
        ),
        Ms.featured,
        Ms.reviewed,
        Ms.transcribed,
        Ms.inprogress,
        Ms.title
    )
    return query
