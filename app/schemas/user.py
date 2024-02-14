from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    username: str
    email: EmailStr


class UserCreate(UserBase):
    password: str


class UserUpdate(BaseModel):
    username: str = None
    email: EmailStr = None


class User(UserBase):
    id: int

    class Config:
        orm_mode = True
