from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from fastapi_pagination import Page

from schemas.ticket import (
    TicketCreate,
    TicketUpdate,
    TicketWithRequesterAndAgent,
    TicketWithDetails,
    Status,
    Priority,
)
from schemas.user import Role

from services.auth import user_auth_required, admin_auth_required
from services.ticket import TicketService

router = APIRouter(prefix="/api/v1")


@router.post("/tickets/")
async def create_ticket(
    ticket: TicketCreate,
    ticket_service: TicketService = Depends(TicketService),
    user=Depends(user_auth_required),
):
    """Endpoint to create a new ticket for an authenticated user."""

    ticket = ticket_service.create_ticket(ticket, user.id)
    return ticket


@router.get("/tickets/", response_model=Page[TicketWithRequesterAndAgent])
async def read_tickets(
    status: Optional[Status] = Query(None),
    priority: Optional[Priority] = Query(None),
    ticket_service: TicketService = Depends(TicketService),
    user=Depends(user_auth_required),
):
    """Fetches tickets based on user role;
    specific to a Requester, all for SysAdmin or Agent"""

    if user.role is Role.Requester:
        return ticket_service.get_tickets_by_requester_id(user.id, status, priority)
    else:
        return ticket_service.get_tickets(status, priority)


@router.get(
    "/tickets/agent/{assigned_agent_id}/",
    response_model=Page[TicketWithRequesterAndAgent],
)
async def read_tickets_by_agent_id(
    assigned_agent_id: int,
    status: Optional[Status] = Query(None),
    priority: Optional[Priority] = Query(None),
    ticket_service: TicketService = Depends(TicketService),
    user=Depends(user_auth_required),
):
    """Fetches tickets based on user role;
    specific to a Requester, all for SysAdmin or Agent"""

    if user.role is Role.Requester:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Requester cannot access these tickets",
        )
    else:
        return ticket_service.get_tickets_by_agent_id(
            assigned_agent_id, status, priority
        )


@router.get("/tickets/{ticket_id}", response_model=TicketWithDetails)
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
    ticket_data: TicketUpdate,
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
    if user.role == Role.Requester:
        if user.id != ticket.requester_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="You do not have permission to access this ticket.",
            )
        if ticket_data.status != ticket.status:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="As a requester, you cannot change the ticket's status",
            )
        if ticket_data.assigned_agent_id != ticket.assigned_agent_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="As a requester, you cannot change the assigned agent.",
            )
    if ticket_data.status == Status.open or ticket_data.status == Status.in_progress:
        if ticket_data.resolution_date != ticket.resolution_date:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    "You cannot change or add a resolution date "
                    "for an in-progress or open ticket."
                ),
            )
    return ticket_service.update_ticket(ticket, ticket_data)


@router.delete("/tickets/{ticket_id}", dependencies=[Depends(admin_auth_required)])
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
