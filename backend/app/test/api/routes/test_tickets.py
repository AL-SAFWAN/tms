def test_create_ticket(client, admin_user):
    response = client.post(
        "/api/v1/tickets/",
        headers={"Authorization": f"Bearer {admin_user['access_token']}"},
        json={
            "title": "New Ticket",
            "description": "Test ticket description",
            "priority": "High",
            "status": "Open",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "New Ticket"
    assert data["description"] == "Test ticket description"


def test_read_tickets(client, admin_user):
    response = client.get(
        "/api/v1/tickets/",
        headers={"Authorization": f"Bearer {admin_user['access_token']}"},
    )
    assert response.status_code == 200
    tickets = response.json()
    assert len(tickets) > 0


def test_update_ticket(client, admin_user, test_ticket):
    client.put(
        f"/api/v1/tickets/{test_ticket['id']}",
        headers={"Authorization": f"Bearer {admin_user['access_token']}"},
        json={
            "title": "Updated Ticket Title",
            "description": "Test ticket description",
            "priority": "High",
            "status": "Open",
        },
    )
    response = client.get(
        f"/api/v1/tickets/{test_ticket['id']}",
        headers={"Authorization": f"Bearer {admin_user['access_token']}"},
    )
    assert response.status_code == 200

    ticket = response.json()

    assert ticket["id"] == 1
    assert ticket["title"] == "Updated Ticket Title"


def test_delete_ticket(client, admin_user, test_ticket):
    response = client.delete(
        f"/api/v1/tickets/{test_ticket['id']}",
        headers={"Authorization": f"Bearer {admin_user['access_token']}"},
    )

    assert response.status_code == 200
    ticket = response.json()
    assert ticket["id"] == 1
