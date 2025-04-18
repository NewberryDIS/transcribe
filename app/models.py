from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel
from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()


class Filter(Base):
    __tablename__ = "filter"
    filter_id = Column(Integer, primary_key=True, nullable=False)
    ms_id = Column(String(50), ForeignKey("ms.ms_id", ondelete="CASCADE"))
    slug_value = Column(String, nullable=False)
    human_value = Column(String, nullable=False)
    filter_group = Column(String, nullable=False)
    ms = relationship("Ms")


class FilterResponse(BaseModel):
    filter_id: int
    ms_id: str
    slug_value: str
    human_value: str
    filter_group: str

    class Config:
        from_attributes = True


class Ms(Base):
    __tablename__ = "ms"
    ms_id = Column(String, primary_key=True, nullable=False)
    sysid = Column(String)
    mei = Column(String)
    title = Column(String)
    short_title = Column(String)
    creator = Column(String)
    moreinformation = Column(String)
    projectnote = Column(String)
    repimage = Column(String)
    featured = Column(String)
    archivalcollectiontitle = Column(String)
    viewatndc = Column(String)
    dates = Column(String)
    date_start = Column(Integer)
    date_end = Column(Integer)
    inprogress = Column(Integer)
    transcribed = Column(Integer)
    reviewed = Column(Integer)
    type = Column(String)
    num_pages = Column(Integer)
    language = Column(String, nullable=False)
    slug = Column(String)
    create_date = Column(DateTime)


class MsResponse(BaseModel):
    ms_id: str
    sysid: Optional[str]
    mei: Optional[str]
    title: Optional[str]
    short_title: Optional[str]
    creator: Optional[str]
    moreinformation: Optional[str]
    projectnote: Optional[str]
    repimage: Optional[str]
    featured: Optional[str]
    archivalcollectiontitle: Optional[str]
    viewatndc: Optional[str]
    dates: Optional[str]
    date_start: Optional[int]
    date_end: Optional[int]
    inprogress: Optional[int]
    transcribed: Optional[int]
    reviewed: Optional[int]
    type: Optional[str]
    num_pages: Optional[int]
    language: str
    slug: Optional[str]
    create_date: Optional[datetime]

    class Config:
        from_attributes = True


class Users(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, nullable=False)
    username = Column(String, nullable=False)
    email = Column(String)
    has_verified_email = Column(Boolean)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    contribution_count = Column(Integer)
    newsletter = Column(Boolean)
    avatar = Column(String)


class UsersResponse(BaseModel):
    id: str
    username: str
    email: Optional[str]
    has_verified_email: Optional[bool]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]
    contribution_count: Optional[int]
    newsletter: Optional[bool]
    avatar: Optional[str]

    class Config:
        from_attributes = True


class Contribution(Base):
    __tablename__ = "contribution"
    contribution_id = Column(Integer, primary_key=True, nullable=False)
    filename = Column(String)
    username = Column(String)
    status = Column(String)
    contribution_timestamp = Column(DateTime)
    ms_id = Column(String)
    page_number = Column(Integer)
    title = Column(String)
    image = Column(String)


class ContributionResponse(BaseModel):
    contribution_id: int
    filename: Optional[str]
    username: Optional[str]
    status: Optional[str]
    contribution_timestamp: Optional[datetime]
    ms_id: Optional[str]
    page_number: Optional[int]
    title: Optional[str]
    image: Optional[str]

    class Config:
        from_attributes = True


class Creator(Base):
    __tablename__ = "creator"
    slug = Column(String, primary_key=True, nullable=False)
    bioblurb = Column(String)
    biographicalnote = Column(String)
    caption = Column(String)
    collectionguide = Column(String)
    collectionscopenote = Column(String)
    dates = Column(String)
    displayname = Column(String)
    featured = Column(String)
    indexname = Column(String)
    mei = Column(String)
    repimage = Column(String)
    rr1text = Column(String)
    rr1url = Column(String)
    rr2text = Column(String)
    rr2url = Column(String)
    rr3text = Column(String)
    rr3url = Column(String)
    sysid = Column(String)
    repimageurl = Column(String)


class CreatorResponse(BaseModel):
    slug: str
    bioblurb: Optional[str]
    biographicalnote: Optional[str]
    caption: Optional[str]
    collectionguide: Optional[str]
    collectionscopenote: Optional[str]
    dates: Optional[str]
    displayname: Optional[str]
    featured: Optional[str]
    indexname: Optional[str]
    mei: Optional[str]
    repimage: Optional[str]
    rr1text: Optional[str]
    rr1url: Optional[str]
    rr2text: Optional[str]
    rr2url: Optional[str]
    rr3text: Optional[str]
    rr3url: Optional[str]
    sysid: Optional[str]
    repimageurl: Optional[str]

    class Config:
        from_attributes = True


class Page(Base):
    __tablename__ = "page"
    filename = Column(String, primary_key=True, nullable=False)
    image = Column(String)
    ms_id = Column(String)
    sysid = Column(String)
    title = Column(String)
    num_pages = Column(Integer)
    page_number = Column(Integer)
    status = Column(String)
    transcription = Column(String)
    transcription_user = Column(String)
    transcription_timestamp = Column(DateTime)
    translation = Column(String)
    translation_user = Column(String)
    translation_timestamp = Column(DateTime)


class PageResponse(BaseModel):
    filename: str
    image: Optional[str]
    ms_id: Optional[str]
    sysid: Optional[str]
    title: Optional[str]
    num_pages: Optional[int]
    page_number: Optional[int]
    status: Optional[str]
    transcription: Optional[str]
    transcription_user: Optional[str]
    transcription_timestamp: Optional[datetime]
    translation: Optional[str]
    translation_user: Optional[str]
    translation_timestamp: Optional[datetime]

    class Config:
        from_attributes = True
