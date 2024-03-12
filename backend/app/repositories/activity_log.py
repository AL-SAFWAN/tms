from sqlalchemy.orm import Session
from db.models.activity_logs import ActivityLog


class ActivityLogRepository:
    def __init__(self, db_session: Session):
        self.db = db_session

    def create_log(self, log_data: dict):
        log = ActivityLog(**log_data)
        self.db.add(log)
        self.db.commit()
        return log

    def get_logs_by_user_id(self, user_id: int):
        return (
            self.db.query(ActivityLog)
            .order_by(ActivityLog.activity_date.desc())
            .filter(ActivityLog.user_id == user_id)
            .all()
        )

    def get_logs(self):
        return (
            self.db.query(ActivityLog).order_by(ActivityLog.activity_date.desc()).all()
        )

    def delete_user_logs(self, user_id):
        self.db.query(ActivityLog).filter(ActivityLog.user_id == user_id).delete()
        self.db.commit()
        return None

    def delete_logs(self):
        self.db.query(ActivityLog).delete()
        self.db.commit()
        return None
