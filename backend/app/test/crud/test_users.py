def test_create_user(user_repository):
    user_data = {
        "username": "testuser",
        "email": "test@example.com",
        "role": "SysAdmin",
        "password_hash": "Hello123.",
    }
    user = user_repository.create_user(user_data)
    assert user.username == "testuser"
    assert user.email == "test@example.com"
    assert user.role == "SysAdmin"


def test_read_user_by_username(user_repository):
    user_data = {
        "username": "test_username",
        "email": "testusername@example.com",
        "role": "SysAdmin",
        "password_hash": "Hello123.",
    }
    user_repository.create_user(user_data)

    found_user = user_repository.read_user_by_username("test_username")
    assert found_user is not None
    assert found_user.username == "test_username"


def test_read_user_by_email(user_repository):
    # Given a user in the database
    user_data = {
        "username": "emailuser",
        "email": "emailtest@example.com",
        "role": "SysAdmin",
        "password_hash": "Hello123.",
    }
    user_repository.create_user(user_data)

    found_user = user_repository.read_user_by_email("emailtest@example.com")

    assert found_user is not None
    assert found_user.email == "emailtest@example.com"


def test_read_user_by_id(user_repository):
    user_data = {
        "username": "iduser",
        "email": "idtest@example.com",
        "role": "SysAdmin",
        "password_hash": "Hello123.",
    }
    created_user = user_repository.create_user(user_data)

    found_user = user_repository.read_user_by_id(created_user.id)

    assert found_user is not None
    assert found_user.id == created_user.id


def test_update_user(user_repository):
    # Given a user in the database
    user_data = {
        "username": "updateuser",
        "email": "updatetest@example.com",
        "role": "SysAdmin",
        "password_hash": "Hello123.",
    }
    user = user_repository.create_user(user_data)

    # When updating the user's details
    updated_data = {"email": "newemail@example.com"}
    updated_user = user_repository.update_user(user.id, updated_data)

    # Then the user's details should be updated
    assert updated_user is not None
    assert updated_user.email == "newemail@example.com"


def test_delete_user(user_repository):
    # Given a user in the database
    user_data = {
        "username": "deleteuser",
        "email": "deletetest@example.com",
        "role": "SysAdmin",
        "password_hash": "Hello123.",
    }
    user = user_repository.create_user(user_data)

    # When deleting the user
    deleted_user = user_repository.delete_user(user.id)

    # Then the user should no longer exist in the database
    assert deleted_user is not None
    found_user = user_repository.read_user_by_id(user.id)
    assert found_user is None
