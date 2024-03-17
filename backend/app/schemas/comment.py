from datetime import datetime
from pydantic import BaseModel
from typing import Optional
from .user import User


class CommentBase(BaseModel):
    description: str


class CommentCreate(CommentBase):
    commented_by_id: int
    ticket_id: int
    pass


class CommentUpdate(BaseModel):
    ticket_id: Optional[int] = None
    description: Optional[str] = None


class Comment(CommentBase):
    id: int
    creation_date: datetime
    commented_by_id: int
    ticket_id: int

    class Config:
        from_attributes = True


class CommentWithUser(CommentBase):
    id: int
    creation_date: datetime
    user: User
