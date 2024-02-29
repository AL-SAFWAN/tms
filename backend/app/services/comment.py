from fastapi import Depends
from sqlalchemy.orm import Session
from repositories.comment import CommentRepository
from schemas.comment import CommentCreate
from db.database import get_db


class CommentService:
    def __init__(self, db: Session = Depends(get_db)):
        self.comment_repository = CommentRepository(db)

    def create_comment(self, comment_data: CommentCreate) -> dict:
        return self.comment_repository.create_comment(dict(comment_data))

    def update_comment(self, comment_id, comment_data):
        return self.comment_repository.update_comment(
            comment_id=comment_id, comment_data=dict(comment_data)
        )

    def delete_comment(self, comment_id):
        return self.comment_repository.delete_comment(comment_id)
