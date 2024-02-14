from sqlalchemy import Column, Integer, String, Enum
from sqlalchemy.orm import relationship
from ..database import Base


class User(Base):
    __tablename__ = "Users"  # Define the table name
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    role = Column(
        Enum("Requester", "Helpdesk Agent", "SysAdmin"), nullable=False
    )
    password_hash = Column(String(255), nullable=False)

    # Relationship for user-initiated tickets
    tickets = relationship(
        "Ticket",
        back_populates="requester",
        foreign_keys="[Ticket.requester_id]",
    )
    # Relationship for ticket updates made by the user
    updates = relationship(
        "TicketUpdate",
        back_populates="updated_by",
        foreign_keys="[TicketUpdate.updated_by_id]",
    )
