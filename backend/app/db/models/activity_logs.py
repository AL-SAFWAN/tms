from sqlalchemy import Column, Integer, DateTime, ForeignKey, Text, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database import Base


class ActivityLog(Base):
    __tablename__ = "ActivityLogs"  # Table name for activity logs
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("Users.id"), nullable=False)
    activity_type = Column(Enum("Create", "Read", "Update", "Delete"), nullable=False)
    activity_date = Column(DateTime, default=datetime.utcnow)
    details = Column(Text, nullable=False)

    user = relationship("User", foreign_keys=[user_id], back_populates="user_logs")
