from fastapi import FastAPI, Response, Request, HTTPException, Depends, APIRouter, Security
from fastapi.responses import FileResponse, JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi.exception_handlers import http_exception_handler  
from sqlalchemy.orm import Session
from typing import Annotated
from app.db.sql import get_db
from app.db.supabase import supabase
from app.models import Ms, Page, Filter, Creator
from fastapi.security import APIKeyHeader
from app.core.config import get_settings
from typing import Optional

settings = get_settings()

api_key_header = APIKeyHeader(name="TRANSCRIBE-API-KEY")
router = APIRouter()

API_KEY = settings.SECRET_KEY
async def get_api_key(api_key_header: Optional[str] = Security(api_key_header)):
    if api_key_header is None:
        raise HTTPException(status_code=401, detail="API Key header is missing")
    if api_key_header != API_KEY:
        raise HTTPException(status_code=403, detail="Invalid API Key")
    return api_key_header

# def get_pages():

# def get_filters():

@router.post("/sb/add_creator")
async def get_cortex_creators(request: Request, db: Annotated[Session, Depends(get_db)], dependencies=[Depends(get_api_key)]):
    # on insert to creator virtual folder

    try:
        item = await request.body()
        return item
    except Exception as e:
        return {"status": "error", "message": str(e)}

    rep_image = item.get("CoreField.Representative_Image_RecordID")
    notNewb = item.get("Transcribe.NotNewb-URL")
    rep_image_url = notNewb if notNewb else f"https://collections.newberry.org/asset-management/{rep_image}"
    # do something about page in obj???

    new_creator = Creator(
        slug = item.get("Transcribe.Slug"),
        bioblurb = item.get("Transcribe.Bio-Blurb"),
        biographicalnote = item.get("Transcribe.Biographical-Note"),
        caption = item.get("Transcribe.Caption"),
        collectionguide = item.get("Transcribe.Collection-Guide"),
        collectionscopenote = item.get("Transcribe.Collection-Scope-Note"),
        dates = item.get("Transcribe.Dates"),
        displayname = item.get("Transcribe.Display-Name"),
        featured = item.get("Transcribe.Featured", 1),
        indexname = item.get("Transcribe.Index-Name"),
        mei = item.get("MediaEncryptedIdentifier"),
        repimage= item.get("CoreField.Representative_Image_RecordID"),
        rr1url = item.get("Transcribe.RR1-URL"),
        rr1text = item.get("Transcribe.RR1-Text"),
        rr2url = item.get("Transcribe.RR2-URL"),
        rr2text = item.get("Transcribe.RR2-Text"),
        rr3url = item.get("Transcribe.RR3-URL"),
        rr3text = item.get("Transcribe.RR3-Text"),
        sysid = item.get("SystemIdentifier"),
        repimageurl = rep_image_url
    )
    # add to db
    db.add(new_creator)

@router.post("/sb/add_ms")
async def get_cortex_ms(request:Request, db: Annotated[Session, Depends(get_db)]):
    item = await request.body()
    return item
    # on insert to ms virtual folder
    # new_record
    # process 
    new_ms = Ms(
        ms_id = item.get("Transcribe.Transcribe-Set-Stem"),
        sysid = item.get("SystemIdentifier"),
        mei = item.get("MediaEncryptedIdentifier"),
        title = item.get("CoreField.Title"),
        short_title = item.get("Transcribe.Short-Title"),
        creator = item.get("Transcribe.Creator", "false"),
        moreinformation = item.get("Transcribe.More-Information"),
        projectnote = item.get("new.Project-Note"),
        repimage = item.get("CoreField.Representative_Image_RecordID"),
        featured = item.get("Transcribe.Featured", "1"),
        archivalcollectiontitle = item.get("new.Archival Collection Title"),
        viewatndc = item.get("Transcribe.View-at-NDC"),
        dates = item.get("Transcribe.Dates"),
        # function for these columns and filters
        # date_start = ,
        # date_end = ,
        # status on sets is stored as 3 percentages based on the string value of "status" on the set's pages
        inprogress = 0,
        transcribed = 0,
        reviewed = 0,
        type = "set",
        # num_pages = ,
        language = item.get("Transcribe.Transcribe-Language", "English"),
        slug = item.get("Transcribe.Slug"),
        create_date = item.get("CreateDate")
    )
    # add to db
    db.add(new_Ms)

    for page in pages:
        new_page = Page(

        )
        # add to db
        db.add(new_page)

    # separate function to process filters and return as array to loop through add to db
    # process_filters(request,db)
    start_date_filter = Filter()
    end_date_filter = Filter()
    subject_filter = Filter(
        ms_id = item.get("Transcribe.Transcribe-Set-Stem"),
        # slug_value = , slugify it idk
        human_value = item.get("Transcribe.Transcribe-Subject"),
        filter_group = "subject",
    )
    language_filter = Filter(
        ms_id = item.get("Transcribe.Transcribe-Set-Stem"),
        # slug_value = ,
        human_value = item.get("Transcribe.Transcribe-Language"),
        filter_group = "language",
    )
    format_filter = Filter(
        ms_id = item.get("Transcribe.Transcribe-Set-Stem"),
        # slug_value = ,
        human_value = item.get("Transcribe.Transcribe-Format"),
        filter_group = "format",
    )
    db.commit()

@router.post("/sb/update_creator")
async def update_creator(request:Request, db: Annotated[Session, Depends(get_db)]):
    item = await request.body()
    return item
    # field_name = request.data.FieldName
    # new_value = request.data.NewValue
    # map cortex field name to column
    # get row from db
    # update column

@router.post("/sb/update_ms")
async def update_ms(request:Request, db: Annotated[Session, Depends(get_db)]):
    item = await request.body()
    return item
