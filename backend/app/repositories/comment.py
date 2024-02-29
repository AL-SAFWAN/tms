from sqlalchemy.orm import Session
from db.models.comments import Comments


class CommentRepository:
    def __init__(self, db_session: Session):
        self.db = db_session

    def read_comment_by_id(self, comment_id):
        return self.db.query(Comments).filter(Comments.id == comment_id).first()

    def create_comment(self, comment_data: dict):
        comment = Comments(**comment_data)
        self.db.add(comment)
        self.db.commit()
        return comment

    def update_comment(self, comment_id: int, comment_data: dict):
        comment = self.read_comment_by_id(comment_id)
        if comment:
            for key, value in comment_data.items():
                setattr(comment, key, value)
            self.db.commit()
            return comment
        return None

    def delete_comment(self, comment_id: int):
        comment = self.read_comment_by_id(comment_id)
        if comment:
            self.db.delete(comment)
            self.db.commit()
            return comment
        return None
