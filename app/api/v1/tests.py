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
from datetime import datetime, timedelta

router = APIRouter()


@router.get("/headers", response_class=HTMLResponse)
async def get_header_test(
    request: Request,
    db: Session = Depends(get_db),
):
    t = {"image": "2KXJ8ZSFQB9OQ"}
    with open("jenfiles/header-menu.yaml", "r") as yaml_file:
        header_lists = yaml.safe_load(yaml_file)
    print(header_lists)
    return get_template_response(
        "tests/headers.html",
        {"request": request, "t": t, "header_lists": header_lists},
    )
