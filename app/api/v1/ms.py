from fastapi import APIRouter, Depends, Request, HTTPException, Query
from fastapi.responses import HTMLResponse, RedirectResponse
from sqlalchemy.orm import Session
from sqlalchemy import func, select
from app.utils.markdown_handler import MarkdownHandler
from app.utils.templates import get_template_response
from app.db.sql import get_db
from typing import Optional

from app.models import Ms, Page
import logging

logging = logging.getLogger(__name__)

router = APIRouter()
markdown_handler = MarkdownHandler()


def update_manuscript_status(manuscript_id: str, db: Session) -> None:
    """
    Calculate and update status percentages for a manuscript based on the (string) status values of its pages.

    Args:
        manuscript_id (str): The ID of the manuscript to update
        db (Session): SQLAlchemy database session
    """
    try:
        # Get all status counts, including 'notstarted'
        status_counts = (
            db.query(Page.status, func.count(Page.filename).label("count"))
            .filter(Page.ms_id == manuscript_id)
            .group_by(Page.status)
            .all()
        )

        # Get the manuscript
        manuscript = db.query(Ms).filter(Ms.ms_id == manuscript_id).first()
        if not manuscript:
            raise HTTPException(
                status_code=404, detail=f"Manuscript {manuscript_id} not found"
            )

        # Get total page count directly from the database
        total_count = (
            db.query(func.count(Page.filename))
            .filter(Page.ms_id == manuscript_id)
            .scalar()
        )

        # Validate total count against manuscript's num_pages
        if total_count != manuscript.num_pages:
            logging.warning(
                f"Mismatch in page counts for manuscript {manuscript_id}: "
                f"Found {total_count} pages, expected {manuscript.num_pages}"
            )

        # Initialize counts dictionary
        counts = {"inprogress": 0, "transcribed": 0, "reviewed": 0}

        # Update counts from query results
        for status, count in status_counts:
            if status in counts:
                counts[status] = count

        # Calculate percentages using total_count (not sum of status counts)
        manuscript.inprogress = (
            round((counts["inprogress"] / total_count) * 100)
            if counts["inprogress"] > 0
            else 0
        )
        manuscript.transcribed = (
            round((counts["transcribed"] / total_count) * 100)
            if counts["transcribed"] > 0
            else 0
        )
        manuscript.reviewed = (
            round((counts["reviewed"] / total_count) * 100)
            if counts["reviewed"] > 0
            else 0
        )

        db.commit()

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500, detail=f"Error updating manuscript status: {str(e)}"
        )


# def update_manuscript_status(manuscript_id: str, db: Session) -> None:
#     """
#     Calculate and update status percentages for a manuscript based on the (string) status values of its pages.
#
#     Args:
#         manuscript_id (str): The ID of the manuscript to update
#         db (Session): SQLAlchemy database session
#     """
#     try:
#         status_counts = (
#             db.query(
#                 Page.status,
#                 func.count(Page.filename).label('count')
#             )
#             .filter(Page.ms_id == manuscript_id)
#             .group_by(Page.status)
#             .all()
#         )
#
#         counts = {
#             'inprogress': 0,
#             'transcribed': 0,
#             'reviewed': 0
#         }
#
#         for status, count in status_counts:
#             if status in counts:
#                 counts[status] = count
#
#         manuscript = db.query(Ms).filter(Ms.ms_id == manuscript_id).first()
#
#         total_count = sum(counts.values())
#
#         inprogress = 0 if counts["inprogress"] == 0 else round((counts["inprogress"] / total_count) * 100)
#         transcribed = 0 if counts["transcribed"] == 0 else round((counts["transcribed"] / total_count) * 100)
#         reviewed = 0 if counts["reviewed"] == 0 else round((counts["reviewed"] / total_count) * 100)
#
#             # notstarted_count = sum(counts.values()) - sum([counts['inprogress'], counts['transcribed'], counts['reviewed']])
#         if manuscript:
#
#              manuscript.inprogress = inprogress
#              manuscript.transcribed = transcribed
#              manuscript.reviewed = reviewed
#
#              db.commit()
#
#     except Exception as e:
#         db.rollback()
#         raise HTTPException(
#             status_code=500,
#             detail=f"Error updating manuscript status: {str(e)}"
#         )


def get_first_reviewable(query_results):
    for item in query_results:
        if item.status != "notstarted":
            return item


@router.get("/{id}", response_class=HTMLResponse)
async def get_manuscript(
    id: str,
    request: Request,
    review: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    manuscript = db.scalars(select(Ms).where(Ms.ms_id == id)).first()
    if not manuscript:
        raise HTTPException(status_code=404, detail="Manuscript not found")
    update_manuscript_status(id, db)

    pages = db.scalars(
        select(Page).where(Page.ms_id == id).order_by(Page.filename)
    ).all()

    review = "?review" if review is not None else ""
    # jump to first page that isn't "notstarted"
    first_reviewable_page_num = None
    if review is not "":
        # print(request.url.path)
        for page in pages:
            if page.status != "notstarted":
                first_reviewable_page_num = page.page_number
                break
    print(f"first_reviewable_page_num: {first_reviewable_page_num}")
    # don't jump to first page if first page is in the first row
    if first_reviewable_page_num is not None and first_reviewable_page_num < 3:
        first_reviewable_page_num = None

    user = request.cookies.get("sb-auth-token")
    header_menu, footer_menu = markdown_handler.get_menus()

    return get_template_response(
        "ms/ms.html",
        {
            "request": request,
            "ms": manuscript,
            "pages": pages,
            "review": review,
            "first_reviewable_page_num": first_reviewable_page_num,
            "user": user,
            "header_menu": header_menu,
            "footer_menu": footer_menu,
        },
    )
