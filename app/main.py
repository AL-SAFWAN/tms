from fastapi import FastAPI

from app.db.database import engine
from app.db.models import users, activity_logs, ticket_updates, tickets
from app.api.v1 import auth

# Create database tables based on the defined
# SQLAlchemy models if they don't exist
users.Base.metadata.create_all(bind=engine)
tickets.Base.metadata.create_all(bind=engine)
activity_logs.Base.metadata.create_all(bind=engine)
ticket_updates.Base.metadata.create_all(bind=engine)


app = FastAPI(title="Ticket Management System (TMS)")

app.include_router(auth.router)


@app.get("/")
async def root():
    return "Health Check"
