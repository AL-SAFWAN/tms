from datetime import datetime
from pydantic import BaseModel
import enum
from .user import UserBase


class ActivityType(str, enum.Enum):
    create = "Create"
    read = "Read"
    update = "Update"
    delete = "Delete"


class ActivityLogBase(BaseModel):
    user_id: int
    activity_type: ActivityType
    details: str


class ActivityLogCreate(ActivityLogBase):
    pass


class ActivityLog(ActivityLogBase):
    id: int
    activity_date: datetime

    class Config:
        from_attributes = True


class ActivityLogWithUser(ActivityLog):
    user: UserBase
