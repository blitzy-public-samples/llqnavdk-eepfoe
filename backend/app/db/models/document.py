from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from backend.app.db.base import Base

class Document(Base):
    __tablename__ = "documents"

    id = Column(String, primary_key=True, index=True)
    file_path = Column(String, nullable=False)
    classification = Column(String, nullable=False)
    uploaded_at = Column(DateTime, nullable=False)

    # Relationship with Application
    application_id = Column(String, ForeignKey("applications.id"))
    application = relationship("Application", back_populates="documents")

    def __init__(self, id, file_path, classification, uploaded_at):
        self.id = id
        self.file_path = file_path
        self.classification = classification
        self.uploaded_at = uploaded_at