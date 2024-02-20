from typing import Optional, List
from fastapi import Depends
from pydantic import TypeAdapter
from sqlalchemy.orm import Session

from repositories.user import UserRepository
from db.database import get_db
from schemas.user import User, UserCreate


class UserService:
    def __init__(self, db_session: Session = Depends(get_db)):
        self.user_repository = UserRepository(db_session)

    def read_user_by_id(self, user_id: int):
        user = self.user_repository.read_user_by_id(user_id)
        return User.model_validate(user) if user else None

    def read_user_by_username(self, username: str):
        return self.user_repository.read_user_by_username(username)

    def read_user_by_email(self, email: str):
        return self.user_repository.read_user_by_email(email)

    def read_users(self):
        return TypeAdapter(List[User]).validate_python(
            self.user_repository.read_users()
        )

    def create_user(self, user_data: dict) -> dict:
        return self.user_repository.create_user(user_data)

    def update_user(
        self, user_id: int, update_data: UserCreate
    ) -> Optional[dict]:
        user = self.user_repository.update_user(user_id, dict(update_data))
        return user

    def delete_user_by_id(self, user_id: int) -> bool:
        return self.user_repository.delete_user(user_id)
