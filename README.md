# tms

Folder Structure

/tms
│ └──/app
│    │
│    ├── /api                # API route handlers (controllers)
│    │   └── /v1             # Versioning of the API
│    │
│    ├── /db                 # Database related files
│    │
│    ├── /models             # SQLAlchemy models
│    │
│    ├── /repositories       # Database access layer
│    │
│    ├── /schemas            # Pydantic models for request and response data validation
│    │
│    ├── /services           # Business logic layer
│    │
│    ├── /tests              # Test suites
│    │
│    └── main.py             # Entry point of the FastAPI application
│
├── .gitignore          # Specifies intentionally untracked files to ignore
├── docker-compose.yml  # Docker compose configuration
├── Dockerfile          # Docker configuration for building images
├── poetry.lock         # Poetry lock file for managing dependencies
└── pyproject.toml      # Poetry configuration file
