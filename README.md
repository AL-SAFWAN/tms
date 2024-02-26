# tms


```mermaid
graph TD
    subgraph Docker Compose
        db[("DB: MySQL 5.7")]
        backend[("Backend\nFastAPI")]
        frontend[("Frontend\nNode.js")]

        db -->|MySQL DB on 3306| backend
        backend -->|FastAPI on 80| frontend
    end

    subgraph Backend Build
        poetry[("Install Poetry\nand Dependencies")]
        fastapi[("Uvicorn-Gunicorn\nFastAPI Server")]
        backend_code[("/app\nBackend Code")]
        poetry --> fastapi
        fastapi --> backend_code
    end

    subgraph Frontend Build
        node[("Node:20\nDevelopment")]
        npm_install[("npm install")]
        frontend_code[("/app\nFrontend Code")]
        node --> npm_install
        npm_install --> frontend_code
    end

    subgraph Volumes
        mysql_data[("mysql_data\nMySQL Data")]
        backend_volume[("Backend Volume\n./backend/app:/app")]
        frontend_volume[("Frontend Volume\n./frontend:/app")]

        db -.-> mysql_data
        backend -.-> backend_volume
        frontend -.-> frontend_volume
    end

    subgraph Ports
        db_port[("3036:3306\nMySQL")]
        backend_port[("8000:80\nBackend")]
        frontend_port[("3000:5173\nFrontend")]

        db -.-> db_port
        backend -.-> backend_port
        frontend -.-> frontend_port
    end
```

Folder Structure

```
/tms
│ └──/backend
│     └──/app
│         ├── /api                # API route handlers (controllers)
│         │   └─ /v1              # Versioning of the API
│         ├── /core               # Contains configurations
│         ├── /db                 # Database related files
│         │    └─ /models         # SQLAlchemy models
│         ├── /repositories       # Database access layer
│         ├── /schemas            # Pydantic models for request and response data validation
│         ├── /services           # Business logic layer
│         ├── /tests              # Test suites
│         └── main.py             # Entry point of the FastAPI application
│
├── /frontend
│    ├── /public                  # Public assets and static files like index.html
│    ├── /src                     # Source files for the React application
│    │    ├── /assets             # Static assets like images, styles, etc.
│    │    ├── /components         # React components
│    │    ├── /hooks              # React custom hooks
│    │    ├── /pages              # React components representing pages
│    │    └── /utils              # Utility functions and helpers
│    └── vite.config.js           # Vite configuration
│
│
├── /mysql-init         # SQL Scripts
│    └── init.sql       # Create Initial database
├── Dockerfile          # Docker configuration for building images
├──.gitignore           # Specifies intentionally untracked files to ignore
└──.pre-commit-config   # Configuration for Black (formatting) and Flake8 (linting)
```
