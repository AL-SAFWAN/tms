from datetime import datetime
from pydantic import BaseModel
from typing import Optional
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
    requester_id: Optional[int] = None


class TicketCreate(TicketBase):
    pass


class TicketUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[Status] = None
    priority: Optional[Priority] = None


class Ticket(TicketBase):
    id: int
    creation_date: datetime
    resolution_date: Optional[datetime] = None

    class Config:
        from_attributes = True
