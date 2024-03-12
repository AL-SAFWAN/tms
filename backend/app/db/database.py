from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


#  "mysql+pymysql://root:password@db/tms_db"

DATABASE_URL = "mysql+pymysql://b25129890655d2:bba68759@eu-cluster-west-01.k8s.cleardb.net/heroku_a88a7d64e4eb6c0"  # noqa: E501

engine = create_engine(DATABASE_URL, connect_args={})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
