# from operator import invert
from fastapi import APIRouter, Depends, Request, HTTPException, Form, Query
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from sqlalchemy import select, and_

# from sqlalchemy.sql.functions import concat
from app.utils.markdown_handler import MarkdownHandler
from app.utils.templates import get_template_response
from app.db.sql import get_db
from typing import Optional
from enum import Enum

# from pydantic import BaseModel
from app.models import Page, Ms, Contribution

# from app.db.supabase import supabase
from app.api.v1.auth import get_current_user

router = APIRouter()
markdown_handler = MarkdownHandler()


class TextType(str, Enum):
    transcription = "transcription"
    translation = "translation"


class SubmitAction(str, Enum):
    save = "save"
    submit = "submit"
    review = "review"

def get_next_and_prev(num_pages, page_num):
    if page_num < 1 or page_num > num_pages:
        return None, None

    prev = page_num - 1 if page_num > 1 else None
    next = page_num + 1 if page_num < num_pages else None

    return prev, next


@router.get("/{ms_id}/{page_number}", response_class=HTMLResponse)
async def get_page(
    request: Request,
    ms_id: str,
    page_number: int,
    review: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    nzo = False
    # nzo = True
    page = db.scalars(
        select(Page).where(and_(Page.ms_id == ms_id, Page.page_number == page_number))
    ).first()
    # page_filename, image = db.scalars(select(Page.filename, Page.image).where(and_(Page.ms_id == ms_id, Page.page_number == page_number))).first()
    user = request.cookies.get("sb-auth-token")
    header_menu, footer_menu = markdown_handler.get_menus()
    quick_tips = markdown_handler.get_quick_tips()

    review = "?review" if review is not None else ""
    print(f"review: {review}")

    return get_template_response(
        "page/page.html",
        {
            "request": request,
            "ms_id": ms_id,
            "nzo": nzo,
            "quick_tips": quick_tips,
            "page": page,
            "image": page.image,
            "review": review,
            "user": user,
            "header_menu": header_menu,
            "footer_menu": footer_menu,
        },
    )


@router.get("/{ms_id}/{page_number}/image/{image_mei}", response_class=HTMLResponse)
async def get_page_image(
    request: Request,
    ms_id: str,
    page_number: int,
    image_mei: str,
):
    return get_template_response(
        "page/image.html",
        {
            "request": request,
            "ms_id": ms_id,
            "image": image_mei,
            "page_number": page_number,
        },
    )


@router.get("/{ms_id}/{page_number}/input/{text_type}", response_class=HTMLResponse)
async def get_page_input(
    request: Request,
    ms_id: str,
    page_number: int,
    text_type: str,
    review: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    page = db.scalars(
        select(Page).where(and_(Page.ms_id == ms_id, Page.page_number == page_number))
    ).first()
    if text_type in ["transcription", "translation"]:
        text = getattr(page, text_type)
    elif text_type == "help":
        text = markdown_handler.get_content("help.md")
    else:
        text = "You can't do that here."
    language = db.scalars(select(Ms.language).where(Ms.ms_id == ms_id)).first()
    prev, next = get_next_and_prev(page.num_pages, page_number)

    review = "?review" if review is not None else ""
    return get_template_response(
        "page/input.html",
        {
            "request": request,
            "text_type": text_type,
            "text": text,
            "prev": prev,
            "next": next,
            "ms_id": ms_id,
            "review": review,
            "page_number": page_number,
            "language": language,
            "filename": page.filename,
            "status": page.status
        },
    )


@router.post("/submit", response_class=HTMLResponse)
async def submit_page(
    request: Request,
    filename: str = Form(...),
    text_type: TextType = Form(...),
    content: str = Form(...),
    action: SubmitAction = Form(...),
    db: Session = Depends(get_db),
):
    try:
        page = db.scalars(select(Page).where(Page.filename == filename)).first()

        if not page:
            raise HTTPException(status_code=404, detail="Page not found")

        setattr(page, text_type, content)

        # get user
        user = await get_current_user(request, db, request.cookies.get("sb-auth-token"))

        if action == SubmitAction.save:
            page.status = "inprogress"
            message =f"The {text_type.value} has been saved."
        elif action == SubmitAction.review and user:
            page.status = "reviewed"
            message =f"Saved!"
            # if contribution does not already exist 
            review = db.scalars(select(Contribution).where(
                and_(and_(Contribution.username == user.username, Contribution.status == 'reviewed'), Contribution.image == page.image)
                )).first()
            if review is None:
                contribution = Contribution(
                    filename=filename,
                    username=user.username,
                    status="reviewed",
                    ms_id=page.ms_id,
                    page_number=page.page_number,
                    title=page.title,
                    image=page.image,
                )
                db.add(contribution)  
        elif action == SubmitAction.submit:
            page.status = "transcribed"
            message =f"The {text_type.value} has been saved and submitted for review!"
            if user:
                transc = db.scalars(select(Contribution).where(
                    and_(and_(Contribution.username == user.username, Contribution.status == 'transcribed'), Contribution.image == page.image )
                    )).first()
                transl = db.scalars(select(Contribution).where(
                    and_(and_(Contribution.username == user.username, Contribution.status == 'translated'), Contribution.image == page.image)
                    )).first()
                # will not create a new contribution record if they were the last editor
                if (
                    text_type == "transcription"
                    and transc is None
                ):
                    page.transcription_user = user.username
                    contribution = Contribution(
                        filename=filename,
                        username=user.username,
                        status="transcribed",
                        ms_id=page.ms_id,
                        page_number=page.page_number,
                        title=page.title,
                        image=page.image,
                    )
                    db.add(contribution)
                elif (
                    text_type == "translation"
                    and transl is None
                ):
                    page.translation_user = user.username
                    contribution = Contribution(
                        filename=filename,
                        username=user.username,
                        status="translated",
                        ms_id=page.ms_id,
                        page_number=page.page_number,
                        title=page.title,
                        image=page.image,
                    )
                    db.add(contribution)
        else:
            message = None
            
        if message != None:
        # Return success modal
            db.commit()
            return get_template_response(
                "page/toast.html",
                {
                    "request": request,
                    "result_type": "success",
                    "alert": "Success!",
                    "message": message,
                },
            )
        elif action == SubmitAction.review and not user:
            return get_template_response(
                "page/toast.html",
                {
                    "request": request,
                    "result_type": "fail",
                    "alert": "You aren't logged in!",
                    "message": "Only logged in users can review transcriptions.",
                },
            )
               

    except Exception as e:
        # Rollback on error
        db.rollback()

        # Return error modal
        return get_template_response(
            "page/toast.html",
            {
                "request": request,
                "result_type": "fail",
                "alert": "Oh no!  Something's gone wrong.",
                "message": f"Error updating page: {str(e)}",
            },
        )
