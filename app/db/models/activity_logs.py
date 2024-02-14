from sqlalchemy import Column, Integer, DateTime, ForeignKey, String, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database import Base


class ActivityLog(Base):
    __tablename__ = "ActivityLogs"  # Table name for activity logs
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("Users.id"), nullable=False)
    activity_type = Column(String(255), nullable=False)
    activity_date = Column(DateTime, default=datetime.utcnow)
    details = Column(Text, nullable=False)

    # Relationship to the User model,
    # indicating the user who performed the activity
    user = relationship("User", backref="activity_logs")
