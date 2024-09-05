import pytest
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.services.document_service import upload_document, get_document, classify_document
from backend.app.schema.document_schema import DocumentCreate, DocumentUpdate

client = TestClient(app)

@pytest.fixture
def mock_file():
    return MagicMock(filename="test_document.pdf", content_type="application/pdf")

@patch("backend.app.services.document_service.upload_document")
def test_upload_document(mock_upload_document, mock_file):
    mock_upload_document.return_value = {"id": "123", "file_path": "/documents/test_document.pdf", "classification": "unclassified"}
    
    response = client.post("/documents/", files={"file": ("test_document.pdf", mock_file, "application/pdf")})
    
    assert response.status_code == 200
    assert response.json() == {"id": "123", "file_path": "/documents/test_document.pdf", "classification": "unclassified"}
    mock_upload_document.assert_called_once()

@patch("backend.app.services.document_service.get_document")
def test_get_document(mock_get_document):
    mock_get_document.return_value = {"id": "123", "file_path": "/documents/test_document.pdf", "classification": "bank_statement"}
    
    response = client.get("/documents/123")
    
    assert response.status_code == 200
    assert response.json() == {"id": "123", "file_path": "/documents/test_document.pdf", "classification": "bank_statement"}
    mock_get_document.assert_called_once_with("123")

@patch("backend.app.services.document_service.classify_document")
def test_classify_document(mock_classify_document):
    mock_classify_document.return_value = {"id": "123", "classification": "bank_statement"}
    
    response = client.post("/documents/123/classify")
    
    assert response.status_code == 200
    assert response.json() == {"id": "123", "classification": "bank_statement"}
    mock_classify_document.assert_called_once_with("123")

@patch("backend.app.services.document_service.upload_document")
def test_upload_document_invalid_file_type(mock_upload_document, mock_file):
    mock_file.content_type = "text/plain"
    
    response = client.post("/documents/", files={"file": ("test_document.txt", mock_file, "text/plain")})
    
    assert response.status_code == 400
    assert "Invalid file type" in response.json()["detail"]
    mock_upload_document.assert_not_called()

@patch("backend.app.services.document_service.get_document")
def test_get_nonexistent_document(mock_get_document):
    mock_get_document.side_effect = ValueError("Document not found")
    
    response = client.get("/documents/999")
    
    assert response.status_code == 404
    assert "Document not found" in response.json()["detail"]

@patch("backend.app.services.document_service.classify_document")
def test_classify_document_error(mock_classify_document):
    mock_classify_document.side_effect = Exception("Classification failed")
    
    response = client.post("/documents/123/classify")
    
    assert response.status_code == 500
    assert "Classification failed" in response.json()["detail"]

def test_upload_document_no_file():
    response = client.post("/documents/")
    
    assert response.status_code == 400
    assert "No file provided" in response.json()["detail"]

@patch("backend.app.services.document_service.upload_document")
def test_upload_document_service_error(mock_upload_document, mock_file):
    mock_upload_document.side_effect = Exception("Upload failed")
    
    response = client.post("/documents/", files={"file": ("test_document.pdf", mock_file, "application/pdf")})
    
    assert response.status_code == 500
    assert "Upload failed" in response.json()["detail"]