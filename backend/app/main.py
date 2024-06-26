from fastapi import FastAPI
from db.database import engine
from db.models import users, activity_logs, tickets, comments
from api.v1 import (
    auth,
    admin,
    activity_logs as activity_logs_api,
    tickets as tickets_api,
    comments as comments_api,
)
from fastapi.middleware.cors import CORSMiddleware
from fastapi_pagination import add_pagination
from uvicorn.middleware.proxy_headers import ProxyHeadersMiddleware


# Create database tables based on the defined
# SQLAlchemy models if they don't exist
users.Base.metadata.create_all(bind=engine)
tickets.Base.metadata.create_all(bind=engine)
activity_logs.Base.metadata.create_all(bind=engine)
comments.Base.metadata.create_all(bind=engine)


app = FastAPI(title="Ticket Management System (TMS)")
add_pagination(app)
app.add_middleware(ProxyHeadersMiddleware)


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return "Health Check v2"


app.include_router(auth.router, tags=["Authentication"])
app.include_router(admin.router, tags=["Admin"])
app.include_router(tickets_api.router, tags=["Ticket"])
app.include_router(comments_api.router, tags=["Comments"])
app.include_router(activity_logs_api.router, tags=["Activity Logs"])
