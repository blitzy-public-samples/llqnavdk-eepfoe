from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class WebhookBase(BaseModel):
    url: str
    event_type: str
    active: bool

class WebhookCreate(WebhookBase):
    pass

class WebhookUpdate(WebhookBase):
    url: Optional[str] = None
    event_type: Optional[str] = None
    active: Optional[bool] = None