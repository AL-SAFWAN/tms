from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from app.schemas.user import Token, UserCreate
from app.services.auth import (
    AuthService,
    user_auth_required,
    admin_auth_required,
)

router = APIRouter()


@router.post("/token")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    auth_service: AuthService = Depends(AuthService),
):
    user = auth_service.authenticate_user(form_data)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = auth_service.create_access_token(
        data={"sub": user.username, "role": user.role}
    )
    return Token(access_token=access_token, token_type="bearer")


@router.post("/signup")
async def signup(
    user: UserCreate,
    auth_service: AuthService = Depends(AuthService),
):
    user = auth_service.sign_up_new_user(user)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Account already exists",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = auth_service.create_access_token(
        data={"sub": user.email, "role": user.role},
    )

    return Token(access_token=access_token, token_type="bearer")


@router.get("/items/")
async def read_items(token=Depends(admin_auth_required)):
    return {"token": token}


@router.get(
    "/users/me/",
)
async def read_users_me(current_user=Depends(user_auth_required)):
    return current_user


# @router.get("/users/me/items/")
# async def read_own_items(current_user=Depends(get_current_user)):
#     return [{"item_id": "Foo", "owner": current_user.username}]
