from typing import Optional
from fastapi import Depends
from sqlalchemy.orm import Session
from repositories.ticket import TicketRepository
from schemas.ticket import TicketCreate, Status
from db.database import get_db
from datetime import datetime
from fastapi_pagination.ext.sqlalchemy import paginate


class TicketService:
    def __init__(self, db: Session = Depends(get_db)):
        self.db = db
        self.ticket_repository = TicketRepository(db)

    def get_tickets_by_requester_id(self, requester_id: int, status, priority):
        return paginate(
            self.db,
            self.ticket_repository.read_tickets_by_requester_id(
                requester_id, status, priority
            ),
        )

    def get_tickets(self, status, priority):
        return paginate(self.db, self.ticket_repository.read_tickets(status, priority))

    def get_ticket_by_id(self, ticket_id: int) -> Optional[dict]:
        return self.ticket_repository.read_ticket_by_id(ticket_id)

    def create_ticket(self, ticket: TicketCreate, user_id) -> dict:
        return self.ticket_repository.create_ticket(dict(ticket), user_id)

    def update_ticket(self, ticket, ticket_data):
        if ticket_data.status == Status.resolved:
            if ticket_data.resolution_date is None:
                ticket_data.resolution_date = datetime.now()
        else:
            ticket_data.resolution_date = None
        return self.ticket_repository.update_ticket(
            ticket=ticket, ticket_data=dict(ticket_data)
        )

    def delete_ticket(self, ticket_id):
        return self.ticket_repository.delete_ticket(ticket_id)
