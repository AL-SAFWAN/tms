from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Check if RDS environment variables are available
if "RDS_HOSTNAME" in os.environ:
    DATABASE_URL = (
        f"mysql+pymysql://{os.environ['RDS_USERNAME']}:"
        f"{os.environ['RDS_PASSWORD']}@{os.environ['RDS_HOSTNAME']}:"
        f"{os.environ['RDS_PORT']}/{os.environ['RDS_DB_NAME']}"
    )
else:
    # Fallback to a default or local database URL if RDS variables aren't set
    DATABASE_URL = "mysql+pymysql://root:password@db/tms_db"

# DATABASE_URL = "mysql+pymysql://b25129890655d2:bba68759@eu-cluster-west-01.k8s.cleardb.net/heroku_a88a7d64e4eb6c0"  # noqa: E501

engine = create_engine(DATABASE_URL, connect_args={})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
