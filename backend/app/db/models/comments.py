from sqlalchemy import Column, Integer, DateTime, ForeignKey, Text

from sqlalchemy.orm import relationship
from datetime import datetime
from ..database import Base


class Comments(Base):
    __tablename__ = "Comments"  # Table name for ticket updates
    id = Column(Integer, primary_key=True, autoincrement=True)
    ticket_id = Column(Integer, ForeignKey("Tickets.id"), nullable=False)
    commented_by_id = Column(
        Integer,
        ForeignKey("Users.id", ondelete="CASCADE"),
        nullable=False,
    )
    creation_date = Column(DateTime, default=datetime.utcnow)
    description = Column(Text, nullable=False)

    # Relationship to the Ticket model,
    # indicating the ticket this update belongs to
    ticket = relationship("Ticket", back_populates="comments")
    # Relationship to the User model, indicating the user who made the update
    user = relationship("User", back_populates="updates")
