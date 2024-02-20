from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from schemas.ticket import TicketCreate, TicketUpdate, TicketWithRequester
from schemas.user import Role

from services.auth import user_auth_required, admin_auth_required
from services.ticket import TicketService

router = APIRouter(prefix="/api/v1")

# ticket management


@router.post("/tickets/")
async def create_ticket(
    ticket: TicketCreate,
    ticket_service: TicketService = Depends(TicketService),
    user=Depends(user_auth_required),
):
    """Endpoint to create a new ticket for an authenticated user."""

    ticket_service.create_ticket(ticket, user.id)
    return ticket


@router.get("/tickets/", response_model=List[TicketWithRequester])
async def read_tickets(
    requester_id: int = None,
    ticket_service: TicketService = Depends(TicketService),
    user=Depends(user_auth_required),
):
    """Fetches tickets based on user role;
    specific to a Requester, all for SysAdmin or Agent"""

    if user.role is Role.Requester:
        return ticket_service.get_tickets_by_requester_id(
            user.id, requester_id=None
        )
    else:
        return ticket_service.get_tickets(requester_id=requester_id)


@router.get("/tickets/{ticket_id}")
async def read_ticket(
    ticket_id: int = None,
    ticket_service: TicketService = Depends(TicketService),
    user=Depends(user_auth_required),
):
    """Retrieves a specific ticket by ID,
    ensuring the requester has access rights."""

    ticket = ticket_service.get_ticket_by_id(ticket_id=ticket_id)
    if ticket is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"ticket id {ticket_id} doesn't exist",
        )
    if user.role is Role.Requester and user.id is not ticket.requester_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Cannot access this ticket",
        )

    return ticket


@router.put("/tickets/{ticket_id}")
async def update_ticket(
    ticket_id: int,
    ticket: TicketUpdate,
    ticket_service: TicketService = Depends(TicketService),
    user=Depends(user_auth_required),
):
    """Updates ticket details if the ticket exists
    and the user is authorized."""

    ticket = ticket_service.get_ticket_by_id(ticket_id=ticket_id)
    if ticket is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"ticket id {ticket_id} doesn't exist",
        )

    if user.role is Role.Requester and user.id is not ticket.requester_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Cannot access this ticket",
        )

    return ticket_service.update_ticket(ticket_id, ticket)


@router.delete(
    "/tickets/{ticket_id}", dependencies=[Depends(admin_auth_required)]
)
async def delete_ticket(
    ticket_id: int,
    ticket_service: TicketService = Depends(TicketService),
):
    """Deletes a ticket by ID, restricted to admin users."""

    ticket = ticket_service.delete_ticket(ticket_id=ticket_id)
    if ticket is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"ticket id {ticket_id} doesn't exist",
        )

    return ticket
