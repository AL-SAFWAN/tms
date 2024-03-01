from sqlalchemy import Column, Integer, String, Enum
from sqlalchemy.orm import relationship
from sqlalchemy_utils import EmailType
from ..database import Base


class User(Base):
    __tablename__ = "Users"  # Define the table name
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(255), nullable=False)
    email = Column(EmailType, unique=True, nullable=False)
    role = Column(Enum("Requester", "Helpdesk Agent", "SysAdmin"), nullable=False)
    password_hash = Column(String(255), nullable=False)
    # Relationship for tickets
    initiated_tickets = relationship(
        "Ticket",
        back_populates="requester",
        foreign_keys="[Ticket.requester_id]",
        cascade="all, delete",
    )
    assigned_tickets = relationship(
        "Ticket",
        back_populates="assigned_agent",
        foreign_keys="[Ticket.assigned_agent_id]",
        cascade="all, delete",
    )

    ticket_comments = relationship(
        "Comments",
        back_populates="user",
        foreign_keys="[Comments.commented_by_id]",
        cascade="all, delete",
    )

    user_logs = relationship(
        "ActivityLog",
        back_populates="user",
        foreign_keys="[ActivityLog.user_id]",
        cascade="all, delete",
    )
