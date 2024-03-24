def test_create_comment(client, admin_user, test_ticket):
    response = client.post(
        "/api/v1/comments/",
        headers={"Authorization": f"Bearer {admin_user['access_token']}"},
        json={
            "ticket_id": test_ticket["id"],
            "commented_by_id": admin_user["user"]["id"],
            "description": "This is a test comment",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["description"] == "This is a test comment"
    assert data["ticket_id"] == 1


def test_delete_comment(client, test_comment, admin_user):
    response = client.delete(
        f"/api/v1/comments/{test_comment['id']}",
        headers={"Authorization": f"Bearer {admin_user['access_token']}"},
    )
    assert response.status_code == 200


def test_update_comment(client, admin_user, test_comment):
    comment_id = test_comment["id"]
    new_text = "Updated comment text"
    response = client.put(
        f"/api/v1/comments/{comment_id}",
        headers={"Authorization": f"Bearer {admin_user['access_token']}"},
        json={
            "description": new_text,
            "ticket_id": 1,
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["description"] == new_text
