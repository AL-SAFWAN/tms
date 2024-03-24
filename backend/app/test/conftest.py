from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from db.models import users, activity_logs, tickets, comments
from db.database import get_db


from repositories.user import UserRepository
from repositories.activity_log import ActivityLogRepository
from repositories.ticket import TicketRepository
from repositories.comment import CommentRepository

from main import app

import warnings
import pytest


warnings.filterwarnings("ignore")


@pytest.fixture(scope="module")
def engine():
    return create_engine(
        "sqlite:///:memory:", connect_args={"check_same_thread": False}
    )


@pytest.fixture(scope="module")
def tables(engine):
    users.Base.metadata.create_all(bind=engine)
    tickets.Base.metadata.create_all(bind=engine)
    activity_logs.Base.metadata.create_all(bind=engine)
    comments.Base.metadata.create_all(bind=engine)

    yield
    users.Base.metadata.drop_all(bind=engine)
    tickets.Base.metadata.drop_all(bind=engine)
    activity_logs.Base.metadata.drop_all(bind=engine)
    comments.Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="function")
def test_db_session(engine, tables):
    connection = engine.connect()
    TestingSessionLocal = sessionmaker(
        autocommit=False, autoflush=False, bind=connection
    )

    db_session = TestingSessionLocal()
    try:
        yield db_session
    finally:
        db_session.close()


@pytest.fixture(scope="function")
def user_repository(test_db_session):
    return UserRepository(db_session=test_db_session)


@pytest.fixture(scope="function")
def activity_log_repository(test_db_session):
    return ActivityLogRepository(db_session=test_db_session)


@pytest.fixture(scope="function")
def test_user(test_db_session):
    user_data = {
        "username": "testuser",
        "email": "testuser@example.com",
        "role": "SysAdmin",
        "password_hash": "$2b$12$ikbdf2E.LYMqhTDUB6QU6euNAcVVtRs9gJBdYOg8bUDVgklwUTe9W",
    }
    user = users.User(**user_data)
    test_db_session.add(user)
    test_db_session.commit()

    yield user

    test_db_session.delete(user)
    test_db_session.commit()


@pytest.fixture(scope="function")
def ticket_repository(test_db_session):
    return TicketRepository(db_session=test_db_session)


@pytest.fixture(scope="function")
def comment_repository(test_db_session):
    return CommentRepository(db_session=test_db_session)


@pytest.fixture(scope="function")
def client(test_db_session):
    app.dependency_overrides[get_db] = lambda: test_db_session
    with TestClient(app) as client:
        yield client


@pytest.fixture(scope="function")
def admin_user(client, test_user):
    response = client.post(
        "/login",
        data={"username": "testuser@example.com", "password": "Hello123."},
    )
    return response.json()


@pytest.fixture(scope="function")
def test_ticket(client, admin_user):
    response = client.post(
        "/api/v1/tickets/",
        headers={"Authorization": f"Bearer {admin_user['access_token']}"},
        json={
            "title": "New Ticket",
            "description": "Test ticket description",
            "priority": "High",
            "status": "Open",
        },
    )

    return response.json()


@pytest.fixture(scope="function")
def test_comment(client, admin_user, test_ticket):
    response = client.post(
        "/api/v1/comments/",
        headers={"Authorization": f"Bearer {admin_user['access_token']}"},
        json={
            "ticket_id": test_ticket["id"],
            "commented_by_id": admin_user["user"]["id"],
            "description": "This is a test comment",
        },
    )

    return response.json()
