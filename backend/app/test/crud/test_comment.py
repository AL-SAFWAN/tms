def create_comment(comment_repository, test_user):
    comment_data = {
        "description": "This is a test comment.",
        "commented_by_id": test_user.id,
        "ticket_id": 0,
    }
    return comment_repository.create_comment(comment_data)


def test_create_comment(comment_repository, test_user):
    comment = create_comment(comment_repository, test_user)

    assert comment.description == "This is a test comment."
    assert comment.commented_by_id == test_user.id


def test_read_comment_by_id(comment_repository, test_user):
    new_comment = create_comment(comment_repository, test_user)

    comment = comment_repository.read_comment_by_id(new_comment.id)
    assert comment is not None
    assert comment.id == new_comment.id


def test_update_comment(comment_repository, test_user):
    comment = create_comment(comment_repository, test_user)

    updated_data = {"description": "Updated text."}
    updated_comment = comment_repository.update_comment(comment.id, updated_data)
    assert updated_comment.description == "Updated text."


def test_delete_comment(comment_repository, test_user):
    comment = create_comment(comment_repository, test_user)

    deleted_comment = comment_repository.delete_comment(comment.id)
    assert deleted_comment is not None
    assert comment_repository.read_comment_by_id(comment.id) is None
