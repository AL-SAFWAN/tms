from fastapi import APIRouter, Depends, HTTPException, status

from app.schemas.user import UserUpdate
from app.services.auth import (
    admin_auth_required,
)
from app.services.user import UserService

router = APIRouter(prefix="/api/v1/admin")


# GET /admin/users: List all users. This is crucial for admin oversight.
@router.get("/users/")
async def read_users(
    user_service: UserService = Depends(UserService),
    token=Depends(admin_auth_required),
):
    users = user_service.read_users()
    return users


# POST /admin/users: Create a new user.
# Essential for expanding the user base, especially in role-based systems.


# GET /admin/users/{user_id}: Get details of a specific user.
@router.get("/users/{user_id}", dependencies=[Depends(admin_auth_required)])
async def read_user(
    user_id: int,
    user_service: UserService = Depends(UserService),
):
    users = user_service.read_user_by_id(user_id=user_id)
    return users


# PUT /admin/users/{user_id}: Update user details.
@router.put("/users/{user_id}", dependencies=[Depends(admin_auth_required)])
async def update_user(
    user_id: int,
    user_data: UserUpdate,
    user_service: UserService = Depends(UserService),
):
    user = user_service.update_user(user_id=user_id, update_data=user_data)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"{user_data.email} dons't exists",
        )

    return user


# DELETE /admin/users/{user_id}: Delete a user.
# Important for managing the lifecycle of user access.
@router.delete("/users/{user_id}", dependencies=[Depends(admin_auth_required)])
async def delete_user(
    user_id: int,
    user_service: UserService = Depends(UserService),
):
    user = user_service.delete_user_by_id(user_id=user_id)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"{user_id} dons't exists",
        )
