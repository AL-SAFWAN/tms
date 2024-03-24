def test_create_log(activity_log_repository, test_user):
    log_data = {
        "user_id": test_user.id,
        "details": "Test activity",
        "activity_type": "Create",
    }
    log = activity_log_repository.create_log(log_data)
    assert log.user_id == test_user.id
    assert log.details == "Test activity"
    assert log.activity_type == "Create"


def test_get_logs_by_user_id(activity_log_repository, test_user):
    activity_log_repository.create_log(
        {
            "user_id": test_user.id,
            "details": "Test activity",
            "activity_type": "Create",
        }
    )

    logs = activity_log_repository.get_logs_by_user_id(test_user.id)
    assert len(logs) > 0
    assert all(log.user_id == test_user.id for log in logs)


def test_get_logs(activity_log_repository, test_user):

    activity_log_repository.create_log(
        {
            "user_id": test_user.id,
            "details": "Test activity",
            "activity_type": "Create",
        }
    )

    logs = activity_log_repository.get_logs()
    assert len(logs) > 0


def test_delete_user_logs(activity_log_repository, test_user):
    activity_log_repository.create_log(
        {
            "user_id": test_user.id,
            "details": "Test activity",
            "activity_type": "Create",
        }
    )
    activity_log_repository.delete_user_logs(test_user.id)
    logs_after_deletion = activity_log_repository.get_logs_by_user_id(test_user.id)
    assert len(logs_after_deletion) == 0


def test_delete_logs(activity_log_repository):
    activity_log_repository.delete_logs()
    all_logs_after_deletion = activity_log_repository.get_logs()
    assert len(all_logs_after_deletion) == 0
