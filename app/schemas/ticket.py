from datetime import datetime
from pydantic import BaseModel
from typing import Optional


class TicketBase(BaseModel):
    title: str
    description: str
    priority: str


class TicketCreate(TicketBase):
    pass


class TicketUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None


class Ticket(TicketBase):
    id: int
    status: str
    creation_date: datetime
    resolution_date: Optional[datetime] = None

    class Config:
        orm_mode = True
