# tms

Folder Structure

```
/tms
│ └──/app
│    │
│    ├── /api                # API route handlers (controllers)
│    │   └── /v1             # Versioning of the API
│    │
│    ├── /db                 # Database related files    
│    │   ├── /models         # SQLAlchemy models
│    │   │   ├── users.py
│    │   │   ├── tickets.py
│    │   │   ├── ticket_updates.py
│    │   │   └── activity_logs.py
│    │   └── database.py
│    │
│    ├── /repositories       # Database access layer
│    │   ├── user.py
│    │   ├── ticket.py
│    │   └── activity_log.py
│    │
│    ├── /schemas            # Pydantic models for request and response data validation
│    │
│    ├── /services           # Business logic layer
│    │   ├── user.py
│    │   ├── ticket.py
│    │   └── activity_log.py  
│    │
│    ├── /tests              # Test suites
│    │
│    └── main.py             # Entry point of the FastAPI application
│
├── /mysql-init         # SQL Scripts 
│    └── init.sql       # Create database 
├── docker-compose.yml  # Docker compose configuration
├── Dockerfile          # Docker configuration for building images
├── poetry.lock         # Poetry lock file for managing dependencies
├── pyproject.toml      # Poetry configuration file
└──.gitignore           # Specifies intentionally untracked files to ignore
```

