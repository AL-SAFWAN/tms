from fastapi import APIRouter, Depends, HTTPException, status

from schemas.user import UserUpdate, User
from services.auth import (
    admin_auth_required,
)
from services.user import UserService

router = APIRouter(prefix="/api/v1/admin")


@router.get("/users/", dependencies=[Depends(admin_auth_required)])
async def read_users(
    user_service: UserService = Depends(UserService),
):
    """List all users"""
    users = user_service.read_users()
    return users


@router.get("/users/{user_id}/", dependencies=[Depends(admin_auth_required)])
async def read_user(
    user_id: int,
    user_service: UserService = Depends(UserService),
):
    """Get details of a specific user."""
    user = user_service.read_user_by_id(user_id=user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"user {user_id} dons't exists",
        )
    return user


@router.put("/users/{user_id}/", dependencies=[Depends(admin_auth_required)])
async def update_user(
    user_id: int,
    user_data: UserUpdate,
    user_service: UserService = Depends(UserService),
):
    """Update user details."""
    user = user_service.update_user(user_id=user_id, update_data=user_data)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"{user_data.email} dons't exists",
        )

    return User.model_validate(user)


@router.delete("/users/{user_id}/", dependencies=[Depends(admin_auth_required)])
async def delete_user(
    user_id: int,
    user_service: UserService = Depends(UserService),
):
    """Delete a user."""
    user = user_service.delete_user_by_id(user_id=user_id)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"user {user_id} dons't exists",
        )
