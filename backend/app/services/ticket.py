from typing import Optional
from fastapi import Depends
from sqlalchemy.orm import Session
from repositories.ticket import TicketRepository
from schemas.ticket import TicketCreate
from db.database import get_db


class TicketService:
    def __init__(self, db: Session = Depends(get_db)):
        self.ticket_repository = TicketRepository(db)

    def get_tickets_by_requester_id(
        self, user_id: int, requester_id=None
    ) -> Optional[dict]:
        return self.ticket_repository.read_tickets_by_requester_id(
            (requester_id, user_id)[requester_id is None]
        )

    def get_tickets(self, requester_id=None) -> Optional[dict]:
        if requester_id is not None:
            return self.get_tickets_by_requester_id(requester_id)
        return self.ticket_repository.read_tickets()

    def get_ticket_by_id(self, ticket_id: int) -> Optional[dict]:
        return self.ticket_repository.read_ticket_by_id(ticket_id)

    def create_ticket(self, ticket: TicketCreate, requester_id) -> dict:
        if ticket.requester_id is None:
            ticket.requester_id = requester_id
        return self.ticket_repository.create_ticket(dict(ticket))

    def update_ticket(self, ticket_id, ticket):
        return self.ticket_repository.update_ticket(ticket_id, dict(ticket))

    def delete_ticket(self, ticket_id):
        return self.ticket_repository.delete_ticket(ticket_id)
