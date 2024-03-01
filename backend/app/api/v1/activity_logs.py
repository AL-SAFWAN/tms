from fastapi import APIRouter, Depends
from typing import List
from services.auth import admin_auth_required
from services.activity_log import ActivityLogService
from schemas.activity_log import ActivityLogWithUser, ActivityLog

router = APIRouter(prefix="/api/v1")


@router.get(
    "/logs/",
    dependencies=[Depends(admin_auth_required)],
    response_model=List[ActivityLogWithUser],
)
async def read_activity(
    comment_service: ActivityLogService = Depends(ActivityLogService),
):
    """Read all the log data."""

    return comment_service.get_logs()


@router.get(
    "/logs/{user_id}",
    dependencies=[Depends(admin_auth_required)],
    response_model=List[ActivityLog],
)
async def read_user_activity(
    user_id: int,
    comment_service: ActivityLogService = Depends(ActivityLogService),
):
    """Read all the log data for a user."""

    return comment_service.get_logs_by_user_id(user_id)
