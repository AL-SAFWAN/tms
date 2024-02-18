from sqlalchemy.orm import Session
from ..db.models.tickets import Ticket


class TicketRepository:
    def __init__(self, db_session: Session):
        self.db = db_session

    def read_tickets_by_requester_id(self, requester_id):
        return (
            self.db.query(Ticket)
            .filter(Ticket.requester_id == requester_id)
            .all()
        )

    def read_ticket_by_id(self, ticket_id: int):
        return self.db.query(Ticket).filter(Ticket.id == ticket_id).first()

    def read_tickets(self):
        return self.db.query(Ticket).all()

    def create_ticket(self, ticket_data: dict):
        ticket = Ticket(**ticket_data)
        self.db.add(ticket)
        self.db.commit()
        return ticket_data

    def update_ticket(self, ticket_id, ticket_data: dict):
        ticket = self.read_ticket_by_id(ticket_id)
        if ticket:
            for key, value in ticket_data.items():
                setattr(ticket, key, value)
            self.db.commit()
            return ticket
        return None

    def delete_ticket(self, ticket_id):
        ticket = self.read_ticket_by_id(ticket_id)
        print(ticket, "thicket her")
        if ticket:
            self.db.delete(ticket)
            self.db.commit()
            return ticket
        return None
