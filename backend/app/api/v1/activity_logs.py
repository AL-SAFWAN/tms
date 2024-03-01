# [TODO]
# Activity Log Endpoints (for Admins)
# GET /admin/activities: List all system activities.
# This can help in auditing and tracking user actions across the system.
# GET /admin/activities/{activityId}: Get details of a specific activity.


from fastapi import APIRouter, Depends
from typing import List
from services.auth import admin_auth_required
from services.activity_log import ActivityLogService
from schemas.activity_log import ActivityLogWithUser, ActivityLog

router = APIRouter(prefix="/api/v1")

# admin user management


@router.get(
    "/activity/",
    dependencies=[Depends(admin_auth_required)],
    response_model=List[ActivityLogWithUser],
)
async def read_activity(
    comment_service: ActivityLogService = Depends(ActivityLogService),
):
    """Read all the log data."""

    return comment_service.get_logs()


@router.get(
    "/activity/{user_id}",
    dependencies=[Depends(admin_auth_required)],
    response_model=List[ActivityLog],
)
async def read_user_activity(
    user_id: int,
    comment_service: ActivityLogService = Depends(ActivityLogService),
):
    """Read all the log data."""

    return comment_service.get_logs_by_user_id(user_id)


# @router.delete("/activity/{comment_id}", dependencies=[Depends(user_auth_required)])
# async def delete_comment(
#     comment_id: int,
#     comment_service: CommentService = Depends(CommentService),
# ):
#     """Delete a comment."""
#     comment = comment_service.delete_comment(comment_id=comment_id)
#     if not comment:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail=f"Comment with the id {comment_id} dons't exists",
#         )
