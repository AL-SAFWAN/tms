from sqlalchemy.orm import Session
from ..db.models.users import User


class UserRepository:
    def __init__(self, db_session: Session):
        self.db = db_session

    def read_user_by_username(self, username: str):
        return self.db.query(User).filter(User.username == username).first()

    def read_user_by_email(self, email: str):
        return self.db.query(User).filter(User.email == email).first()

    def read_user_by_id(self, user_id: int):
        return self.db.query(User).filter(User.id == user_id).first()

    def read_users(self):
        return self.db.query(User).all()

    def create_user(self, user_data: dict):
        user = User(**user_data)
        self.db.add(user)
        self.db.commit()
        return user

    def update_user(self, user_id: int, update_data: dict):
        user = self.read_user_by_id(user_id)
        if user:
            for key, value in update_data.items():
                setattr(user, key, value)
            self.db.commit()
            return user
        return None

    def delete_user(self, user_id: int):
        user = self.read_user_by_id(user_id)
        if user:
            self.db.delete(user)
            self.db.commit()
            return user
        return None
