from fastapi import APIRouter, FastAPI, Depends, Request, Query
from fastapi.responses import HTMLResponse, JSONResponse
from app.utils.templates import get_template_response
from sqlalchemy.orm import Session
from sqlalchemy import select, distinct
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional

from app.db.sql import get_db
from app.models import Page, Ms, Creator, Users

router = APIRouter()


@router.get("/dl", response_class=HTMLResponse)
async def get_download_page(request: Request, db: Session = Depends(get_db)):
    ms_query = select(Ms.ms_id, Ms.title).order_by(Ms.title)
    creator_query = select(Creator.slug, Creator.displayname).order_by(
        Creator.indexname
    )

    creators = db.execute(creator_query).all()
    mss = db.execute(ms_query).all()

    return get_template_response(
        "dl/download.html",
        {"request": request, "mss": mss, "creators": creators},
    )


@router.get("/ms_dd")
async def get_download_form(
    request: Request,
    creator: Optional[str] = None,
    db: Session = Depends(get_db),
):
    ms_query = select(Ms.ms_id, Ms.slug, Ms.title)
    if creator:
        ms_query = ms_query.where(Ms.slug == creator)

    mss = db.execute(ms_query.order_by(Ms.title)).all()
    return get_template_response(
        "dl/ms_dd.html",
        {
            "request": request,
            "mss": mss,
        },
    )


@router.get("")
@router.get("/")
async def get_filtered_data(
    ms_id: Optional[str] = Query(None),
    creator: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
):
    query = select(Page)

    if ms_id:
        query = query.where(Page.ms_id == ms_id)
    if creator and not ms_id:
        creator_ms_id_q = select(Ms.ms_id).where(Ms.slug == creator)
        creator_ms_id_r = db.execute(creator_ms_id_q)
        creator_ms_ids = [row[0] for row in creator_ms_id_r.all()]
        query = query.where(Page.ms_id.in_(creator_ms_ids))

    query = query.order_by(Page.ms_id, Page.page_number)
    result = db.execute(query)
    pages = result.scalars().all()

    # Convert to list of dictionaries for JSON response
    data = [
        {
            "filename": page.filename,
            "page_number": page.page_number,
            "ms_id": page.ms_id,
            "transcription": page.transcription,
            "translation": page.translation,
            "link": f"https://collections.newberry.org/asset-management/{page.image}",
        }
        for page in pages
    ]

    return data
