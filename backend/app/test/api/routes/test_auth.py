def test_signup(client):
    response = client.post(
        "/signup",
        json={
            "username": "testuser",
            "email": "testcreateduser@example.com",
            "password": "testpasswordHello123.",
            "role": "SysAdmin",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["access_token"]
    assert data["token_type"] == "bearer"


def test_login(client):
    response = client.post(
        "/login",
        data={
            "username": "testcreateduser@example.com",
            "password": "testpasswordHello123.",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["access_token"]
    assert data["token_type"] == "bearer"
