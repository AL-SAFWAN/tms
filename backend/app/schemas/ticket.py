from datetime import datetime
from pydantic import BaseModel
from typing import Optional, List
from .user import UserBase
from .comment import CommentWithUser
import enum


class Status(str, enum.Enum):
    open = "Open"
    in_progress = "In Progress"
    resolved = "Resolved"


class Priority(str, enum.Enum):
    low = "Low"
    medium = "Medium"
    high = "High"


class TicketBase(BaseModel):
    title: str
    description: str
    status: Status
    priority: Priority


class TicketCreate(TicketBase):
    pass


class TicketUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[Status] = None
    priority: Optional[Priority] = None
    resolution_date: Optional[datetime] = None
    assigned_agent_id: Optional[int] = None


class Ticket(TicketBase):
    id: int
    creation_date: datetime
    resolution_date: Optional[datetime] = None
    requester_id: Optional[int] = None
    assigned_agent_id: Optional[int] = None

    class Config:
        from_attributes = True


class TicketWithRequester(Ticket):
    requester: UserBase


class TicketWithRequesterAndAgent(Ticket):
    requester: UserBase
    assigned_agent: Optional[UserBase]


class TicketWithDetails(Ticket):
    requester: UserBase
    assigned_agent: Optional[UserBase]
    comments: List[CommentWithUser] = []
