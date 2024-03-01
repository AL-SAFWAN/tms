from typing import Optional
from fastapi import Depends
from sqlalchemy.orm import Session
from repositories.ticket import TicketRepository
from services.activity_log import ActivityLogService
from schemas.ticket import TicketCreate, Status
from db.database import get_db
from datetime import datetime
from fastapi_pagination.ext.sqlalchemy import paginate


class TicketService:
    def __init__(
        self,
        db: Session = Depends(get_db),
        activity_log_service=Depends(ActivityLogService),
    ):
        self.db = db
        self.ticket_repository = TicketRepository(db)
        self.activity_log_service = activity_log_service

    def get_tickets_by_requester_id(self, requester_id: int, status, priority):
        self.activity_log_service.create_log(
            details="viewing all tickets", logType="Read"
        )
        return paginate(
            self.db,
            self.ticket_repository.read_tickets_by_requester_id(
                requester_id, status, priority
            ),
        )

    def get_tickets_by_agent_id(self, agent_id: int, status, priority):
        self.activity_log_service.create_log(
            details="viewing assigned tickets", logType="Read"
        )
        return paginate(
            self.db,
            self.ticket_repository.read_tickets_by_agent_id(agent_id, status, priority),
        )

    def get_tickets(self, status, priority):
        self.activity_log_service.create_log(
            details="viewing all tickets", logType="Read"
        )
        return paginate(self.db, self.ticket_repository.read_tickets(status, priority))

    def get_ticket_by_id(self, ticket_id: int) -> Optional[dict]:
        self.activity_log_service.create_log(
            details=f"viewing ticket {ticket_id}", logType="Read"
        )
        return self.ticket_repository.read_ticket_by_id(ticket_id)

    def create_ticket(self, ticketc: TicketCreate, user_id) -> dict:
        ticket = self.ticket_repository.create_ticket(dict(ticketc), user_id)
        self.activity_log_service.create_log(
            details=f"created ticket {ticket.id}", logType="Create"
        )
        return ticket

    def update_ticket(self, ticket, ticket_data):

        if ticket_data.status == Status.resolved:
            if ticket_data.resolution_date is None:
                ticket_data.resolution_date = datetime.now()
                self.activity_log_service.create_log(
                    details=f"ticket {ticket.id} has been resolved", logType="Update"
                )
        else:
            ticket_data.resolution_date = None
            self.activity_log_service.create_log(
                details=f"updated ticket {ticket.id}", logType="Update"
            )
        return self.ticket_repository.update_ticket(
            ticket=ticket, ticket_data=dict(ticket_data)
        )

    def delete_ticket(self, ticket_id):
        self.activity_log_service.create_log(
            details=f"deleted ticket {ticket_id}", logType="Delete"
        )
        return self.ticket_repository.delete_ticket(ticket_id)
