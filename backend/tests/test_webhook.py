import pytest
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.services.webhook_service import register_webhook, get_webhooks, delete_webhook
from backend.app.schema.webhook_schema import WebhookCreate

client = TestClient(app)

@pytest.fixture
def mock_db_session():
    return MagicMock()

def test_register_webhook(mock_db_session):
    webhook_data = WebhookCreate(url="https://example.com/webhook", event_type="ApplicationProcessed")
    
    with patch("backend.app.api.v1.webhook.register_webhook") as mock_register:
        mock_register.return_value = {"id": "123", "url": webhook_data.url, "event_type": webhook_data.event_type}
        
        response = client.post("/api/v1/webhooks", json=webhook_data.dict())
        
        assert response.status_code == 200
        assert response.json() == {"id": "123", "url": webhook_data.url, "event_type": webhook_data.event_type}
        mock_register.assert_called_once_with(mock_db_session, webhook_data)

def test_get_webhooks(mock_db_session):
    mock_webhooks = [
        {"id": "123", "url": "https://example.com/webhook1", "event_type": "ApplicationProcessed"},
        {"id": "456", "url": "https://example.com/webhook2", "event_type": "ApplicationFailed"}
    ]
    
    with patch("backend.app.api.v1.webhook.get_webhooks") as mock_get:
        mock_get.return_value = mock_webhooks
        
        response = client.get("/api/v1/webhooks")
        
        assert response.status_code == 200
        assert response.json() == mock_webhooks
        mock_get.assert_called_once_with(mock_db_session)

def test_delete_webhook(mock_db_session):
    webhook_id = "123"
    
    with patch("backend.app.api.v1.webhook.delete_webhook") as mock_delete:
        mock_delete.return_value = True
        
        response = client.delete(f"/api/v1/webhooks/{webhook_id}")
        
        assert response.status_code == 200
        assert response.json() == {"message": "Webhook deleted successfully"}
        mock_delete.assert_called_once_with(mock_db_session, webhook_id)

def test_delete_webhook_not_found(mock_db_session):
    webhook_id = "999"
    
    with patch("backend.app.api.v1.webhook.delete_webhook") as mock_delete:
        mock_delete.return_value = False
        
        response = client.delete(f"/api/v1/webhooks/{webhook_id}")
        
        assert response.status_code == 404
        assert response.json() == {"detail": "Webhook not found"}
        mock_delete.assert_called_once_with(mock_db_session, webhook_id)

def test_register_webhook_invalid_data():
    invalid_webhook_data = {"url": "not_a_valid_url", "event_type": "InvalidEvent"}
    
    response = client.post("/api/v1/webhooks", json=invalid_webhook_data)
    
    assert response.status_code == 422
    assert "detail" in response.json()

@patch("backend.app.api.v1.webhook.register_webhook")
def test_register_webhook_service_error(mock_register, mock_db_session):
    webhook_data = WebhookCreate(url="https://example.com/webhook", event_type="ApplicationProcessed")
    mock_register.side_effect = Exception("Database error")
    
    response = client.post("/api/v1/webhooks", json=webhook_data.dict())
    
    assert response.status_code == 500
    assert response.json() == {"detail": "An error occurred while registering the webhook"}

@patch("backend.app.api.v1.webhook.get_webhooks")
def test_get_webhooks_service_error(mock_get, mock_db_session):
    mock_get.side_effect = Exception("Database error")
    
    response = client.get("/api/v1/webhooks")
    
    assert response.status_code == 500
    assert response.json() == {"detail": "An error occurred while retrieving webhooks"}

@patch("backend.app.api.v1.webhook.delete_webhook")
def test_delete_webhook_service_error(mock_delete, mock_db_session):
    webhook_id = "123"
    mock_delete.side_effect = Exception("Database error")
    
    response = client.delete(f"/api/v1/webhooks/{webhook_id}")
    
    assert response.status_code == 500
    assert response.json() == {"detail": "An error occurred while deleting the webhook"}