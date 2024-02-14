from datetime import datetime
from pydantic import BaseModel
from typing import Optional


class ActivityLogBase(BaseModel):
    activity_type: str
    details: str


class ActivityLogCreate(ActivityLogBase):
    pass


class ActivityLogUpdate(BaseModel):
    details: Optional[str] = None


class ActivityLog(ActivityLogBase):
    id: int
    activity_date: datetime
    user_id: int

    class Config:
        orm_mode = True
