from sqlalchemy.orm import Session
from ..db.models.tickets import Ticket


class TicketRepository:
    def __init__(self, db_session: Session):
        self.db = db_session

    def get_ticket_by_id(self, ticket_id: int):
        return self.db.query(Ticket).filter(Ticket.id == ticket_id).first()

    def get_tickets(self):
        return self.db.query(Ticket).all()

    def create_ticket(self, ticket_data: dict):
        ticket = Ticket(**ticket_data)
        self.db.add(ticket)
        self.db.commit()
        return ticket
