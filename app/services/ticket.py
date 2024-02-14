from typing import Optional
from sqlalchemy.orm import Session
from ..repositories.ticket import TicketRepository


class TicketService:
    def __init__(self, db_session: Session):
        self.ticket_repository = TicketRepository(db_session)

    def get_ticket_by_id(self, ticket_id: int) -> Optional[dict]:
        ticket = self.ticket_repository.get_ticket_by_id(ticket_id)
        return ticket.to_dict() if ticket else None

    def create_ticket(self, ticket_data: dict) -> dict:
        return self.ticket_repository.create_ticket(ticket_data).to_dict()
