from typing import List
from sqlalchemy.orm import Session
from ..repositories.activity_log import ActivityLogRepository


class ActivityLogService:
    def __init__(self, db_session: Session):
        self.activity_log_repository = ActivityLogRepository(db_session)

    def create_log(self, log_data: dict) -> dict:
        return self.activity_log_repository.create_log(log_data).to_dict()

    def get_logs_by_user_id(self, user_id: int) -> List[dict]:
        logs = self.activity_log_repository.get_logs_by_user_id(user_id)
        return [log.to_dict() for log in logs]
