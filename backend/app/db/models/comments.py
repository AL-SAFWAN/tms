from sqlalchemy import Column, Integer, DateTime, ForeignKey, Text

from sqlalchemy.orm import relationship
from datetime import datetime
from ..database import Base


class Comments(Base):
    __tablename__ = "Comments"
    id = Column(Integer, primary_key=True, autoincrement=True)
    ticket_id = Column(Integer, ForeignKey("Tickets.id"), nullable=False)
    commented_by_id = Column(
        Integer,
        ForeignKey("Users.id", ondelete="CASCADE"),
        nullable=False,
    )
    creation_date = Column(DateTime, default=datetime.utcnow)
    description = Column(Text, nullable=False)

    ticket = relationship("Ticket", back_populates="comments")
    user = relationship("User", back_populates="ticket_comments")
