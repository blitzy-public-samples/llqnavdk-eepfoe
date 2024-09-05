from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class DocumentBase(BaseModel):
    file_path: str
    classification: str
    uploaded_at: datetime

class DocumentCreate(DocumentBase):
    application_id: Optional[str] = None

class DocumentUpdate(BaseModel):
    classification: Optional[str] = None
    uploaded_at: Optional[datetime] = None