from pydantic import BaseModel, EmailStr, field_validator
import enum


class Role(str, enum.Enum):
    Requester = "Requester"
    Helpdesk_Agent = "Helpdesk Agent"
    SysAdmin = "SysAdmin"


class UserBase(BaseModel):
    username: str
    email: EmailStr
    role: Role


class UserCreate(UserBase):
    password: str

    @field_validator("password")
    def check_password(cls, value):
        value = str(value)
        if len(value) < 8:
            raise ValueError("Password must have at least 8 characters")
        if not any(c.isupper() for c in value):
            raise ValueError(
                "Password must have at least one uppercase letter"
            )
        if not any(c.islower() for c in value):
            raise ValueError(
                "Password must have at least one lowercase letter"
            )
        if not any(c.isdigit() for c in value):
            raise ValueError("Password must have at least one digit")
        return value


class UserUpdate(BaseModel):
    username: str = None
    email: EmailStr = None


class User(UserBase):
    id: int
    password_hash: str

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None
