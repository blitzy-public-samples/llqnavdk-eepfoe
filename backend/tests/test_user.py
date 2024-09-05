import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from backend.app.main import app
from backend.app.core.security import get_password_hash, create_access_token
from backend.app.db.models.user import User
from backend.app.schema.user_schema import UserCreate, UserUpdate

client = TestClient(app)

@pytest.fixture
def mock_db_session():
    with patch("backend.app.db.session.SessionLocal") as mock_session:
        yield mock_session()

@pytest.fixture
def mock_user():
    return User(
        id="1",
        username="testuser",
        email="testuser@example.com",
        hashed_password=get_password_hash("testpassword")
    )

def test_create_user(mock_db_session):
    user_data = {
        "username": "newuser",
        "email": "newuser@example.com",
        "password": "newpassword"
    }
    
    mock_db_session.add.return_value = None
    mock_db_session.commit.return_value = None
    mock_db_session.refresh.return_value = None
    
    with patch("backend.app.services.user_service.get_password_hash") as mock_hash:
        mock_hash.return_value = "hashed_password"
        response = client.post("/users/", json=user_data)
    
    assert response.status_code == 201
    assert response.json()["username"] == user_data["username"]
    assert response.json()["email"] == user_data["email"]
    assert "id" in response.json()

def test_get_user(mock_db_session, mock_user):
    mock_db_session.query.return_value.filter.return_value.first.return_value = mock_user
    
    response = client.get(f"/users/{mock_user.id}")
    
    assert response.status_code == 200
    assert response.json()["username"] == mock_user.username
    assert response.json()["email"] == mock_user.email

def test_update_user(mock_db_session, mock_user):
    update_data = {
        "email": "updated@example.com"
    }
    
    mock_db_session.query.return_value.filter.return_value.first.return_value = mock_user
    mock_db_session.commit.return_value = None
    mock_db_session.refresh.return_value = None
    
    response = client.put(f"/users/{mock_user.id}", json=update_data)
    
    assert response.status_code == 200
    assert response.json()["email"] == update_data["email"]

def test_create_user_duplicate_email(mock_db_session):
    user_data = {
        "username": "newuser",
        "email": "existing@example.com",
        "password": "newpassword"
    }
    
    mock_db_session.query.return_value.filter.return_value.first.return_value = MagicMock()
    
    response = client.post("/users/", json=user_data)
    
    assert response.status_code == 400
    assert "Email already registered" in response.json()["detail"]

def test_get_non_existent_user(mock_db_session):
    mock_db_session.query.return_value.filter.return_value.first.return_value = None
    
    response = client.get("/users/999")
    
    assert response.status_code == 404
    assert "User not found" in response.json()["detail"]

def test_update_user_not_found(mock_db_session):
    update_data = {
        "email": "updated@example.com"
    }
    
    mock_db_session.query.return_value.filter.return_value.first.return_value = None
    
    response = client.put("/users/999", json=update_data)
    
    assert response.status_code == 404
    assert "User not found" in response.json()["detail"]

@patch("backend.app.api.v1.user.create_access_token")
def test_login_user(mock_create_token, mock_db_session, mock_user):
    login_data = {
        "username": "testuser",
        "password": "testpassword"
    }
    
    mock_db_session.query.return_value.filter.return_value.first.return_value = mock_user
    mock_create_token.return_value = "mocked_access_token"
    
    with patch("backend.app.core.security.verify_password") as mock_verify:
        mock_verify.return_value = True
        response = client.post("/users/login", data=login_data)
    
    assert response.status_code == 200
    assert response.json()["access_token"] == "mocked_access_token"
    assert response.json()["token_type"] == "bearer"

def test_login_user_invalid_credentials(mock_db_session, mock_user):
    login_data = {
        "username": "testuser",
        "password": "wrongpassword"
    }
    
    mock_db_session.query.return_value.filter.return_value.first.return_value = mock_user
    
    with patch("backend.app.core.security.verify_password") as mock_verify:
        mock_verify.return_value = False
        response = client.post("/users/login", data=login_data)
    
    assert response.status_code == 401
    assert "Incorrect username or password" in response.json()["detail"]