# app/sql.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import get_settings

settings = get_settings()

pw: str = settings.DB_PW
connection_string = f"postgresql://postgres.awntuwhgnlwgckwgfurh:{pw}@aws-0-us-east-1.pooler.supabase.com:6543/postgres"

engine = create_engine(connection_string)  
# engine = create_engine(connection_string, echo=True)
# engine = create_engine(connection_string, echo="debug")

connection = engine.connect()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

