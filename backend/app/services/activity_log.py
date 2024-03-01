from typing import List
from fastapi import Depends
from db.database import get_db
from services.auth import user_auth_required
from sqlalchemy.orm import Session
from repositories.activity_log import ActivityLogRepository
from schemas.activity_log import ActivityType


class ActivityLogService:
    def __init__(self, db: Session = Depends(get_db), user=Depends(user_auth_required)):
        self.activity_log_repository = ActivityLogRepository(db)
        self.user = user

    def create_log(self, details: str, logType: ActivityType) -> dict:
        log = {"details": details, "activity_type": logType, "user_id": self.user.id}
        print(log)
        return self.activity_log_repository.create_log(log)

    def get_logs_by_user_id(self, user_id: int) -> List[dict]:
        return self.activity_log_repository.get_logs_by_user_id(user_id)

    def get_logs(self) -> List[dict]:
        return self.activity_log_repository.get_logs()
