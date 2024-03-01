from fastapi import Depends
from sqlalchemy.orm import Session
from repositories.comment import CommentRepository
from schemas.comment import CommentCreate
from db.database import get_db
from services.activity_log import ActivityLogService


class CommentService:
    def __init__(
        self,
        db: Session = Depends(get_db),
        activity_log_service: ActivityLogService = Depends(ActivityLogService),
    ):
        self.comment_repository = CommentRepository(db)
        self.activity_log_service = activity_log_service

    def create_comment(self, comment_data: CommentCreate) -> dict:
        self.activity_log_service.create_log(
            details=f"created a comment on ticket {comment_data.ticket_id}",
            logType="Create",
        )
        return self.comment_repository.create_comment(dict(comment_data))

    def update_comment(self, comment_id, comment_data):
        self.activity_log_service.create_log(
            details=f"updated comment {comment_id} on ticket {comment_data.ticket_id}",
            logType="Update",
        )
        return self.comment_repository.update_comment(
            comment_id=comment_id, comment_data=dict(comment_data)
        )

    def delete_comment(self, comment_id):
        self.activity_log_service.create_log(
            details=f"deleted comment {comment_id}", logType="Delete"
        )
        return self.comment_repository.delete_comment(comment_id)
