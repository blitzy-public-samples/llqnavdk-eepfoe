from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ApplicationBase(BaseModel):
    status: str
    created_at: datetime
    updated_at: datetime

class ApplicationCreate(ApplicationBase):
    merchant_id: Optional[str] = None
    owner_id: Optional[str] = None

class ApplicationUpdate(ApplicationBase):
    status: Optional[str] = None
    updated_at: Optional[datetime] = None