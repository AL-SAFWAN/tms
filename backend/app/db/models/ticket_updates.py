from sqlalchemy import Column, Integer, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database import Base


class TicketUpdate(Base):
    __tablename__ = "TicketUpdates"  # Table name for ticket updates
    id = Column(Integer, primary_key=True, autoincrement=True)
    ticket_id = Column(Integer, ForeignKey("Tickets.id"), nullable=False)
    update_date = Column(DateTime, default=datetime.utcnow)
    updated_by_id = Column(Integer, ForeignKey("Users.id"), nullable=False)
    description = Column(Text, nullable=False)

    # Relationship to the Ticket model,
    # indicating the ticket this update belongs to
    ticket = relationship("Ticket", back_populates="updates")
    # Relationship to the User model, indicating the user who made the update
    updated_by = relationship("User", back_populates="updates")
