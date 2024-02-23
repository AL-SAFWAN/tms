from sqlalchemy.orm import Session
from db.models.tickets import Ticket


class TicketRepository:
    def __init__(self, db_session: Session):
        self.db = db_session

    def read_tickets_by_requester_id(self, requester_id, status, priority):
        query = self.db.query(Ticket).filter(
            Ticket.requester_id == requester_id
        )
        if status:
            query = query.filter(Ticket.status == status)
        if priority:
            query = query.filter(Ticket.priority == priority)
        return query.order_by(Ticket.creation_date.desc())

    def read_ticket_by_id(self, ticket_id: int):
        return self.db.query(Ticket).filter(Ticket.id == ticket_id).first()

    def read_tickets(self):
        return self.db.query(Ticket).order_by(Ticket.creation_date.desc())

    def create_ticket(
        self,
        ticket_data: dict,
        user_id,
    ):
        ticket = Ticket(**ticket_data, requester_id=user_id)
        self.db.add(ticket)
        self.db.commit()
        return ticket_data

    def update_ticket(self, ticket, ticket_data: dict):
        for key, value in ticket_data.items():
            setattr(ticket, key, value)
        self.db.commit()
        return ticket

    def delete_ticket(self, ticket_id):
        ticket = self.read_ticket_by_id(ticket_id)
        print(ticket, "thicket her")
        if ticket:
            self.db.delete(ticket)
            self.db.commit()
            return ticket
        return None
