import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.app.db.base import Base
from backend.app.core.config import Settings
from backend.app.db.session import get_db
from backend.app.db.models.user import User
from backend.app.db.models.application import Application
from backend.app.db.models.document import Document
from unittest.mock import Mock

settings = Settings()

@pytest.fixture(scope="session")
def db_engine():
    engine = create_engine(settings.TEST_DATABASE_URL, pool_pre_ping=True)
    Base.metadata.create_all(bind=engine)
    yield engine
    Base.metadata.drop_all(bind=engine)

@pytest.fixture(scope="function")
def db_session(db_engine):
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=db_engine)
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()

@pytest.fixture(scope="function")
def override_get_db(db_session):
    def _override_get_db():
        try:
            yield db_session
        finally:
            db_session.close()
    return _override_get_db

@pytest.fixture(scope="function")
def test_user(db_session):
    user = User(username="testuser", email="test@example.com", hashed_password="hashed_password")
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user

@pytest.fixture(scope="function")
def test_application(db_session, test_user):
    application = Application(status="Pending", merchant_id="M123", owner_id=test_user.id)
    db_session.add(application)
    db_session.commit()
    db_session.refresh(application)
    return application

@pytest.fixture(scope="function")
def test_document(db_session, test_application):
    document = Document(file_path="/path/to/document.pdf", classification="Bank Statement", application_id=test_application.id)
    db_session.add(document)
    db_session.commit()
    db_session.refresh(document)
    return document

@pytest.fixture(scope="function")
def mock_ocr_service():
    return Mock()

@pytest.fixture(scope="function")
def mock_classification_service():
    return Mock()

@pytest.fixture(scope="function")
def mock_notification_service():
    return Mock()