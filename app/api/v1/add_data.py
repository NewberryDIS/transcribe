from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select
import json
from app.models import Creator, Ms, Page, Filter 
from app.models import CreatorResponse, MsResponse, PageResponse, FilterResponse, BatchResponse 
from app.db.sql import get_db

router = APIRouter()


file = 'core_data'
file = 'filter'

@router.post("/app-data")
async def add_data(db: Session = Depends(get_db)):
    filename = f"static/data/nt_{file}.json"
    try:
        with open(filename, "r") as json_file:
            data = json.load(json_file)
        successful_items = []
        updated_items = []
        failed_items = []

        for item in data:
            try:
                if item.get('type') == 'page':
                    id = item.get('filename')
                    existing_item = db.query(Page).filter(Page.filename == id).first()
                    
                    page_data = {
                        "image": item.get('image'),
                        "ms_id": item.get('set_id'),
                        "sysid": item.get('sysid'),
                        "title": item.get('title'),
                        "num_pages": int(item.get('num_pages', 1)),
                        "page_number": int(item.get('page_number', 0)),
                        "status": item.get('status', 'notstarted'),
                        "transcription": item.get('transcription'),
                        "translation": item.get('translation')
                    }

                    if existing_item:
                        for key, value in page_data.items():
                            setattr(existing_item, key, value)
                        updated_items.append(existing_item)
                    else:
                        page = Page(filename=id, **page_data)
                        db.add(page)
                        successful_items.append(page)

                elif item.get('type') == 'set':
                    id = item.get('set_id')
                    existing_item = db.query(Ms).filter(Ms.ms_id == id).first()
                    
                    ms_data = {
                        "sysid": item.get('sysid'),
                        "mei": item.get('mei'),
                        "title": item.get('title'),
                        "short_title": item.get('short_title'),
                        "creator": item.get('creator'),
                        "moreinformation": item.get('moreinformation'),
                        "projectnote": item.get('projectnote'),
                        "repimage": item.get('repImage'),
                        "featured": item.get('featured'),
                        "archivalcollectiontitle": item.get('archivalcollectiontitle'),
                        "viewatndc": item.get('viewatndc'),
                        "date_start": item.get('date_start'),
                        "date_end": item.get('date_end')
                    }

                    if existing_item:
                        for key, value in ms_data.items():
                            setattr(existing_item, key, value)
                        updated_items.append(existing_item)
                    else:
                        ms = Ms(ms_id=id, **ms_data)
                        db.add(ms)
                        successful_items.append(ms)
                         
                elif item.get('type') == 'creator':
                    id = item.get('slug')
                    existing_item = db.query(Creator).filter(Creator.slug == id).first()
                    
                    creator_data = {
                        "bioblurb": item.get('bioblurb'),
                        "biographicalnote": item.get('biographicalnote'),
                        "caption": item.get('caption'),
                        "collectionguide": item.get('collectionguide'),
                        "collectionscopenote": item.get('collectionscopenote'),
                        "dates": item.get('dates'),
                        "displayname": item.get('displayname'),
                        "indexname": item.get('indexname'),
                        "featured": 1,
                        "mei": item.get('mei'),
                        "repimage": item.get('repImage'),
                        "rr1text": item.get('rr1text'),
                        "rr1url": item.get('rr1url'),
                        "rr2text": item.get('rr2text'),
                        "rr2url": item.get('rr2url'),
                        "rr3text": item.get('rr3text'),
                        "rr3url": item.get('rr3url'),
                        "sysid": item.get('sysid')
                    }

                    if existing_item:
                        for key, value in creator_data.items():
                            setattr(existing_item, key, value)
                        updated_items.append(existing_item)
                    else:
                        creator = Creator(slug=id, **creator_data)
                        db.add(creator)
                        successful_items.append(creator)

                elif item.get('type') in ['subject', 'language', 'format', 'date_start', 'date_end']:
                    existing_item = db.execute(
                        select(Filter).where(
                            Filter.filter_group == item.get('type'),
                            Filter.slug_value == str( item.get('slug_value') ),
                            Filter.human_value == str( item.get('hvalue') ),
                            Filter.ms_id == item.get('set_id')
                        )
                    ).scalar_one_or_none()

                    filter_data = {
                        "ms_id": item.get('set_id'),
                        "slug_value": str( item.get('slug_value') ),
                        "human_value": str( item.get('hvalue') ),
                        "filter_group": item.get('type')
                    }

                    if existing_item:
                        for key, value in filter_data.items():
                            setattr(existing_item, key, value)
                        updated_items.append(existing_item)
                    else:
                        filter = Filter(**filter_data)
                        db.add(filter)
                        successful_items.append(filter)

            except IntegrityError:
                db.rollback()
                failed_items.append({
                    "item": item,
                    "error": "Database integrity error for item"
                })
            except Exception as e:
                db.rollback()
                failed_items.append({
                    "item": item,
                    "error": str(e)
                })

        if successful_items or updated_items:
            try:
                db.commit()
                return BatchResponse(
                    success_count=len(successful_items),
                    update_count=len(updated_items),
                    fail_count=len(failed_items),
                    successful_items=[],
                    updated_items=[],
                    failed_items=failed_items
                )
            except Exception as e:
                db.rollback()
                raise HTTPException(
                    status_code=500,
                    detail=f"Error committing items: {str(e)}"
                )
        
        return BatchResponse(
            success_count=len(successful_items),
            update_count=len(updated_items),
            fail_count=len(failed_items),
            successful_items=[],
            updated_items=[],
            failed_items=failed_items
        )

    except json.JSONDecodeError as e:
        raise HTTPException(status_code=400, detail=f"Invalid JSON file: {str(e)}")
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail=f"JSON file: {filename} not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
