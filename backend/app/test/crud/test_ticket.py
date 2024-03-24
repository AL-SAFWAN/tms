def create_ticket(ticket_repository, test_user):
    ticket_data = {
        "title": "Test Ticket",
        "description": "This is a test ticket.",
        "status": "Open",
        "priority": "High",
    }
    ticket = ticket_repository.create_ticket(ticket_data, user_id=test_user.id)
    return ticket


def test_create_ticket(ticket_repository, test_user):
    ticket = create_ticket(ticket_repository, test_user)
    assert ticket.title == "Test Ticket"
    assert ticket.requester_id == test_user.id


def test_read_tickets_by_requester_id(ticket_repository, test_user):
    create_ticket(ticket_repository, test_user)

    tickets = ticket_repository.read_tickets_by_requester_id(
        test_user.id, None, None
    ).all()
    assert len(tickets) > 0
    assert all(ticket.requester_id == test_user.id for ticket in tickets)


def test_read_ticket_by_id(ticket_repository, test_user):
    new_ticket = create_ticket(ticket_repository, test_user)

    ticket = ticket_repository.read_ticket_by_id(new_ticket.id)
    assert ticket is not None
    assert ticket.id == new_ticket.id


def test_update_ticket(ticket_repository, test_user):
    ticket = create_ticket(ticket_repository, test_user)

    updated_data = {
        "status": "Resolved",
    }

    updated_ticket = ticket_repository.update_ticket(ticket, updated_data)
    assert updated_ticket.status == "Resolved"


def test_delete_ticket(ticket_repository, test_user):
    ticket = create_ticket(ticket_repository, test_user)

    deleted_ticket = ticket_repository.delete_ticket(ticket.id)
    assert deleted_ticket is not None
    assert ticket_repository.read_ticket_by_id(ticket.id) is None
