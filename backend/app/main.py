from fastapi import FastAPI
from db.database import engine
from db.models import users, activity_logs, ticket_updates, tickets
from api.v1 import auth, admin, tickets as apiTickets
from fastapi.middleware.cors import CORSMiddleware
from fastapi_pagination import add_pagination

# Create database tables based on the defined
# SQLAlchemy models if they don't exist
users.Base.metadata.create_all(bind=engine)
tickets.Base.metadata.create_all(bind=engine)
activity_logs.Base.metadata.create_all(bind=engine)
ticket_updates.Base.metadata.create_all(bind=engine)


app = FastAPI(title="Ticket Management System (TMS)")
add_pagination(app)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return "Health Check"


app.include_router(auth.router, tags=["Authentication"])
app.include_router(admin.router, tags=["Admin"])
app.include_router(apiTickets.router, tags=["Ticket"])
