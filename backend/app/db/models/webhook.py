from sqlalchemy import Column, String, Boolean
from backend.app.db.base import Base

class Webhook(Base):
    __tablename__ = "webhooks"

    id = Column(String, primary_key=True, index=True)
    url = Column(String, nullable=False)
    event_type = Column(String, nullable=False)
    active = Column(Boolean, default=True)

    def __init__(self, id: str, url: str, event_type: str, active: bool = True):
        self.id = id
        self.url = url
        self.event_type = event_type
        self.active = active