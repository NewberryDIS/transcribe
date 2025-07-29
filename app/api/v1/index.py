from fastapi import APIRouter, Depends, Query, Request, Response
from fastapi.responses import HTMLResponse, RedirectResponse
from typing import Optional, Union
from sqlalchemy.orm import Session
from sqlalchemy import select, case, desc, and_
from app.utils.markdown_handler import MarkdownHandler
from app.utils.templates import get_template_response, themes
from app.db.sql import get_db
from app.models import Page, Ms
import json, random, yaml
from datetime import datetime, timedelta, date

router = APIRouter()
markdown_handler = MarkdownHandler()


def getDates(m, d):
    current_date = datetime.now()
    current_day = current_date.strftime("%d")
    current_month = current_date.strftime("%m")

    if m:
        try:
            month_num = int(m)
            if 1 <= month_num <= 12:
                month_to_use = f"{month_num:02d}"  # Format as two digits
            else:
                month_to_use = current_month
        except ValueError:
            month_to_use = current_month
    else:
        month_to_use = current_month

    # Input validation for day
    if d:
        try:
            day_num = int(d)
            # Simple validation (doesn't account for different days in months)
            if 1 <= day_num <= 31:
                day_to_use = f"{day_num:02d}"  # Format as two digits
            else:
                day_to_use = current_day
        except ValueError:
            day_to_use = current_day
    else:
        day_to_use = current_day

    date_to_display = datetime(current_date.year, int(month_to_use), int(day_to_use))
    prev_date = date_to_display - timedelta(days=1)
    next_date = date_to_display + timedelta(days=1)

    prev_month = prev_date.strftime("%m")
    prev_day = prev_date.strftime("%d")
    next_month = next_date.strftime("%m")
    next_day = next_date.strftime("%d")
    return month_to_use, day_to_use, prev_month, prev_day, next_month, next_day


@router.get("/", response_class=HTMLResponse)
async def get_index(
    request: Request,
    response: Response,
    t: Union[str, None] = Query(default=None),
    db: Session = Depends(get_db),
):
    with open("public/data/idx.json", "r") as json_file:
        data = json.load(json_file)
    if t:
        matching_items = [item for item in data if item["image"] == t]
        # If we found matches, choose from them, otherwise fall back to all data
        transc = (
            random.choice(matching_items) if matching_items else random.choice(data)
        )
    else:
        transc = random.choice(data)
    # transc = data[-1]
    random_page_number = random.randint(1, 50)
    random_offset = random.randint(1, 50)

    random_ms = db.scalars(
        select(Page.ms_id)
        .where(Page.page_number == random_page_number, Page.status == "notstarted")
        .offset(random_offset)
        .limit(1)
    ).first()
    random_link = f"/page/{random_ms}/{random_page_number}"
    # random_link = "page/821787-27601b/17"

    gallery_mss = db.scalars(
        select(Ms)
        .order_by(
            case((Ms.language == "English", 0), else_=1),
            Ms.featured,
            Ms.reviewed,
            Ms.transcribed,
            Ms.inprogress,
            desc(Ms.create_date),
            Ms.title,
        )
        .limit(4)
    ).all()

    # with open("jenfiles/home_page_gallery_mss.yaml", "r") as yaml_file:
    #     gallery_mss = yaml.safe_load(yaml_file)
    with open("jenfiles/home_page_gallery_creators.yaml", "r") as yaml_file:
        gallery_creators = yaml.safe_load(yaml_file)

    # gallery_mss = markdown_handler.get_content("home_page_gallery_mss.md")
    # creators_frontmatter, gallery_creators = markdown_handler.get_content("home_page_gallery_creators.md")
    user = request.cookies.get("sb-auth-token")

    most_recent = db.scalars(
        select(Page)
        .where(
            and_(
                Page.transcription_timestamp != None,
                Page.transcription != None,
                Page.transcription_user != None,
            )
        )
        .order_by(Page.transcription_timestamp.desc())
    ).first()

    if most_recent:
        # Add a new attribute to the model instance
        most_recent.formatted_date = most_recent.transcription_timestamp.strftime(
            "%m / %d / %Y"
        )

    return get_template_response(
        "index.html",
        {
            "request": request,
            "t": transc,
            "gallery_mss": gallery_mss,
            "gallery_creators": gallery_creators,
            "random_link": random_link,
            "most_recent": most_recent,
        },
    )


def get_random_day():
    """Generates a random date within a given year."""
    year = date.today().year
    first_day = date(year, 1, 1)
    last_day = date(year, 12, 31)
    days_in_year = (last_day - first_day).days + 1
    random_day_offset = random.randint(0, days_in_year - 1)
    random_day = first_day + timedelta(days=random_day_offset)
    d = random_day.day
    m = random_day.month
    return m, d


@router.get("/otd", response_class=HTMLResponse)
async def get_otd(
    request: Request,
    rand: Optional[bool] = False,
    m: Optional[int] = 0,
    d: Optional[int] = 0,
):
    if rand:
        m, d = get_random_day()
    # Get current date or use parameter if provided
    month_to_use, day_to_use, prev_month, prev_day, next_month, next_day = getDates(
        m, d
    )

    # Load YAML data
    with open("jenfiles/on_this_day.yaml", "r") as yaml_file:
        data = yaml.safe_load(yaml_file)

    # Find today's entry
    todays_feature = None
    for entry in data:
        if entry["Month"] == month_to_use and entry["Day"] == day_to_use:
            todays_feature = entry
            break

    # Random for testing:
    test = False
    if todays_feature is None or todays_feature["quote"] is None or test:
        todays_feature = random.choice(data)
        while todays_feature["quote"] is None:
            todays_feature = random.choice(data)
        todays_feature["nothing_for_today"] = (
            "No quote for today; using a random one instead."
        )
        m = todays_feature["Month"]
        d = todays_feature["Day"]
        month_to_use, day_to_use, prev_month, prev_day, next_month, next_day = getDates(
            m, d
        )

    if todays_feature.get("mei") is None:
        todays_feature["mei"] = "2KXJ8ZSFQB9OQ"
    # Format the date for display
    formatted_date = f"{month_to_use}/{day_to_use}"
    if todays_feature["Year"]:
        formatted_date += f"/{todays_feature['Year']}"

    print(todays_feature)
    return get_template_response(
        "chunks/on-this-day.html",
        {
            "request": request,
            "todays_feature": todays_feature,
            "formatted_date": formatted_date,
            "current_month": month_to_use,
            "current_day": day_to_use,
            "prev_month": prev_month,
            "prev_day": prev_day,
            "next_month": next_month,
            "next_day": next_day,
        },
    )


@router.get("/otd-fav", response_class=HTMLResponse)
async def get_otd_fav(request: Request, idx: Optional[int] = None):
    # idx=0 is read as falsey, and also jinja loop index starts at 1
    # so, we accept index as 1 through n, then subtract 1
    if not idx:
        idx = random.randint(0, 2)
    else:
        idx = idx - 1
    print(f"idx = {idx}")
    with open("jenfiles/browse_our_favorites.yaml", "r") as yaml_file:
        bof_data = yaml.safe_load(yaml_file)
    fav = bof_data[idx]
    # not used; can be added for prev/next buttons
    # prev_index = (idx - 1) % len(bof_data)  # idx=0 gives 4, idx=1 gives 0, etc.
    # next_index = (idx + 1) % len(bof_data)  # idx=4 gives 0, idx=0 gives 1, etc.
    return get_template_response(
        "chunks/favs.html",
        {
            "request": request,
            "fav": fav,
            "bof_data": bof_data,
            # "prev_index": prev_index,
            # "next_index": next_index,
            "idx": idx,
        },
    )


@router.get("/otd-test", response_class=HTMLResponse)
async def get_otd_test(
    request: Request,
    db: Session = Depends(get_db),
):
    t = {"image": "2KXJ8ZSFQB9OQ"}

    most_recent = db.scalars(
        select(Page)
        .where(
            and_(
                Page.transcription_timestamp != None,
                Page.transcription != None,
                Page.transcription_user != None,
            )
        )
        .order_by(Page.transcription_timestamp.desc())
    ).first()

    if most_recent:
        # Add a new attribute to the model instance
        most_recent.formatted_date = most_recent.transcription_timestamp.strftime(
            "%m / %d / %Y"
        )
    return get_template_response(
        "tests/test.html",
        {"request": request, "t": t, "most_recent": most_recent},
    )
