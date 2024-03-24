from fastapi import APIRouter, Depends, HTTPException, status

from schemas.comment import CommentCreate, CommentUpdate
from services.auth import user_auth_required
from services.comment import CommentService

router = APIRouter(prefix="/api/v1")


@router.post("/comments/")
async def create_comment(
    comment_data: CommentCreate,
    comment_service: CommentService = Depends(CommentService),
    user=Depends(user_auth_required),
):
    """Create A Comment For a Ticket."""
    comment = comment_service.create_comment(comment_data)
    return comment


@router.delete("/comments/{comment_id}", dependencies=[Depends(user_auth_required)])
async def delete_comment(
    comment_id: int,
    comment_service: CommentService = Depends(CommentService),
):
    """Delete a comment."""
    comment = comment_service.delete_comment(comment_id=comment_id)
    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Comment with the id {comment_id} dons't exists",
        )
    return comment


@router.put("/comments/{comment_id}", dependencies=[Depends(user_auth_required)])
async def update_comment(
    comment_id: int,
    comment_data: CommentUpdate,
    comment_service: CommentService = Depends(CommentService),
):
    """Update Comment details."""
    comment = comment_service.update_comment(
        comment_id=comment_id, comment_data=comment_data
    )
    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Comment with the id {comment_id} dons't exists",
        )
    return comment
