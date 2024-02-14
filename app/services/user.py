from typing import Optional
from sqlalchemy.orm import Session
from ..repository.user import UserRepository


class UserService:
    def __init__(self, db_session: Session):
        self.user_repository = UserRepository(db_session)

    def get_user_by_id(self, user_id: int) -> Optional[dict]:
        user = self.user_repository.get_user_by_id(user_id)
        return user.to_dict() if user else None

    def create_user(self, user_data: dict) -> dict:
        return self.user_repository.create_user(user_data).to_dict()

    def update_user(self, user_id: int, update_data: dict) -> Optional[dict]:
        user = self.user_repository.update_user(user_id, update_data)
        return user.to_dict() if user else None

    def delete_user_by_id(self, user_id: int) -> bool:
        return self.user_repository.delete_user_by_id(user_id)
