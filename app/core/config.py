from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import Optional
import os

# BaseSettings = pydantic_settings.BaseSettings

class Settings(BaseSettings):
    # API Configuration
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Newberry Transcribe"
    DEBUG: bool = True
    
    SUPABASE_URL: str = os.environ.get("SUPABASE_URL")
    SUPABASE_KEY: str = os.environ.get("SUPABASE_KEY")
    SUPABASE_SERVICE_KEY: str =  os.environ.get("SUPABASE_SERVICE_KEY")
    DB_PW: str =  os.environ.get("DB_PW")
    PSQL_URL: str = ""
    
    # Security
    SECRET_KEY: str = "secret-key-here"  # In production, load from environment
    # ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    ALGORITHM: str = "HS256"
    
    # Database
    # DATABASE_URL: str = "postgresql://truser:truser-d8191c15@localhost:5432/transcribe"
    DB_POOL_SIZE: int = 5
    DB_MAX_OVERFLOW: int = 10
    
    # CORS Configuration
    BACKEND_CORS_ORIGINS: list = [
        "http://localhost:7777"
    ]
    
    # External Services
    REDIS_URL: Optional[str] = None
    SMTP_SERVER: Optional[str] = None
    SMTP_PORT: Optional[int] = None
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    
    # Logging
    LOG_LEVEL: str = "INFO"
    LOG_FORMAT: str = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    
    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 60
    
    class Config:
        case_sensitive = True
        env_file = ".env"  # Load configuration from .env file

@lru_cache
def get_settings() -> Settings:
    """
    Create cached instance of settings.
    Using lru_cache to prevent multiple reads from env/file system
    """
    return Settings()
