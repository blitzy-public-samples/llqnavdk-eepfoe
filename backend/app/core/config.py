import os
from pydantic import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./test.db")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    SMTP_SERVER: str = os.getenv("SMTP_SERVER", "smtp.example.com")
    SMTP_PORT: str = os.getenv("SMTP_PORT", "587")
    SMTP_USERNAME: str = os.getenv("SMTP_USERNAME", "your-username")
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "your-password")
    EMAIL_FROM: str = os.getenv("EMAIL_FROM", "noreply@example.com")
    EMAIL_TO: str = os.getenv("EMAIL_TO", "admin@example.com")
    WEBHOOK_URL: str = os.getenv("WEBHOOK_URL", "https://webhook.example.com")

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"