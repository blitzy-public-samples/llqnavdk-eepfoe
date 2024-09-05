from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from backend.app.db.base import Base

class Application(Base):
    __tablename__ = "applications"

    id = Column(String, primary_key=True, index=True)
    status = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=False)

    # Relationships
    documents = relationship("Document", back_populates="application")
    merchant = relationship("Merchant", back_populates="applications")
    owner = relationship("Owner", back_populates="applications")

    def __init__(self, id: str, status: str, created_at: DateTime, updated_at: DateTime):
        self.id = id
        self.status = status
        self.created_at = created_at
        self.updated_at = updated_at