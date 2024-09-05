import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock

from backend.app.main import app
from backend.app.schema.application_schema import ApplicationCreate, ApplicationUpdate
from backend.app.services.application_service import create_application, get_application, update_application

client = TestClient(app)

@pytest.fixture
def mock_db():
    return MagicMock()

def test_create_application(mock_db):
    test_application = ApplicationCreate(
        merchant_id="test_merchant",
        owner_id="test_owner",
        status="Pending"
    )
    
    with patch('backend.app.api.v1.application.create_application') as mock_create:
        mock_create.return_value = {"id": "test_id", **test_application.dict()}
        response = client.post("/applications", json=test_application.dict())
    
    assert response.status_code == 200
    assert response.json()["merchant_id"] == "test_merchant"
    assert response.json()["owner_id"] == "test_owner"
    assert response.json()["status"] == "Pending"

def test_get_application(mock_db):
    test_application_id = "test_id"
    test_application = {
        "id": test_application_id,
        "merchant_id": "test_merchant",
        "owner_id": "test_owner",
        "status": "Approved"
    }
    
    with patch('backend.app.api.v1.application.get_application') as mock_get:
        mock_get.return_value = test_application
        response = client.get(f"/applications/{test_application_id}")
    
    assert response.status_code == 200
    assert response.json() == test_application

def test_update_application(mock_db):
    test_application_id = "test_id"
    update_data = ApplicationUpdate(status="Approved")
    
    with patch('backend.app.api.v1.application.update_application') as mock_update:
        mock_update.return_value = {"id": test_application_id, **update_data.dict()}
        response = client.put(f"/applications/{test_application_id}", json=update_data.dict())
    
    assert response.status_code == 200
    assert response.json()["id"] == test_application_id
    assert response.json()["status"] == "Approved"

def test_create_application_invalid_data(mock_db):
    invalid_application = {
        "merchant_id": "test_merchant",
        "owner_id": "test_owner",
        "status": "InvalidStatus"
    }
    
    response = client.post("/applications", json=invalid_application)
    
    assert response.status_code == 422

def test_get_application_not_found(mock_db):
    non_existent_id = "non_existent_id"
    
    with patch('backend.app.api.v1.application.get_application') as mock_get:
        mock_get.return_value = None
        response = client.get(f"/applications/{non_existent_id}")
    
    assert response.status_code == 404

def test_update_application_not_found(mock_db):
    non_existent_id = "non_existent_id"
    update_data = ApplicationUpdate(status="Approved")
    
    with patch('backend.app.api.v1.application.update_application') as mock_update:
        mock_update.return_value = None
        response = client.put(f"/applications/{non_existent_id}", json=update_data.dict())
    
    assert response.status_code == 404