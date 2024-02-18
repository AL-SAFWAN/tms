from typing import Optional
from fastapi import Depends
from app.db.database import get_db
from sqlalchemy.orm import Session
from ..repositories.user import UserRepository


class UserService:
    def __init__(self, db_session: Session = Depends(get_db)):
        self.user_repository = UserRepository(db_session)

    def get_user_by_email(self, email: str):
        return self.user_repository.get_user_by_email(email)

    def get_user_by_username(self, username: str):
        return self.user_repository.get_user_by_username(username)

    def get_user_by_id(self, user_id: int):
        user = self.user_repository.get_user_by_id(user_id)
        return user if user else None

    def create_user(self, user_data: dict) -> dict:
        return self.user_repository.create_user(user_data)

    def update_user(self, user_id: int, update_data: dict) -> Optional[dict]:
        user = self.user_repository.update_user(user_id, update_data)
        return user if user else None

    def delete_user_by_id(self, user_id: int) -> bool:
        return self.user_repository.delete_user_by_id(user_id)
