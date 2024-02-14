from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime,
    ForeignKey,
    Enum,
)
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database import Base


class Ticket(Base):
    __tablename__ = "Tickets"  # Define the table name
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    status = Column(Enum("Open", "In Progress", "Resolved"), nullable=False)
    priority = Column(Enum("Low", "Medium", "High"), nullable=False)
    creation_date = Column(DateTime, default=datetime.utcnow)
    resolution_date = Column(DateTime, nullable=True)
    requester_id = Column(Integer, ForeignKey("Users.id"), nullable=False)
    assigned_agent_id = Column(Integer, ForeignKey("Users.id"), nullable=True)

    # Relationship to the User model for the requester
    requester = relationship(
        "User", foreign_keys=[requester_id], back_populates="tickets"
    )
    # Relationship to the User model for the assigned helpdesk agent
    assigned_agent = relationship(
        "User", foreign_keys=[assigned_agent_id], backref="assigned_tickets"
    )
    # Relationship to TicketUpdate model for updates to the ticket
    updates = relationship("TicketUpdate", back_populates="ticket")
