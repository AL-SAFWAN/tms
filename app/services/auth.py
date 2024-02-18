from fastapi import Depends, HTTPException, status
from jose import jwt, JWTError
from datetime import datetime, timedelta, timezone

from app.db.database import get_db
from app.schemas.user import TokenData
from app.core.security import (
    pwd_context,
    ACCESS_TOKEN_EXPIRE_MINUTES,
    ALGORITHM,
    SECRET_KEY,
    oauth2_scheme,
)
from .user import UserService


class AuthService:
    def __init__(
        self,
        db=Depends(get_db),
    ):
        self.db = db
        self.user_service = UserService(db)

    def get_password_hash(self, password: str) -> str:
        return pwd_context.hash(password)

    def verify_password(
        self, plain_password: str, hashed_password: str
    ) -> bool:
        return pwd_context.verify(plain_password, hashed_password)

    def create_access_token(
        self,
        data: dict,
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    ):
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.now(timezone.utc) + expires_delta
        else:
            expire = datetime.now(timezone.utc) + timedelta(minutes=15)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt

    def authenticate_user(self, user_data):
        user = self.user_service.get_user_by_username(user_data.username)
        if not user or not self.verify_password(
            user_data.password, user.password_hash
        ):
            return False
        return user

    def sign_up_new_user(self, user_data):

        if self.user_service.get_user_by_email(user_data.email):
            return False

        password_hash = self.get_password_hash(user_data.password)
        return self.user_service.create_user(
            {
                "username": user_data.username,
                "role": user_data.role,
                "email": user_data.email,
                "password_hash": password_hash,
            }
        )


async def get_current_user(
    user_service=Depends(UserService), token=Depends(oauth2_scheme)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)

    except JWTError:
        raise credentials_exception
    user = user_service.get_user_by_username(token_data.username)

    if user is None:
        raise credentials_exception
    return user
