from sqlalchemy import Column, Integer, String
from database.connection import Base


class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)

    doctor_id = Column(String, unique=True, index=True, nullable=False)

    full_name = Column(String, nullable=False)
    specialization = Column(String, nullable=False)

    phone = Column(String, nullable=True)
    email = Column(String, nullable=True)

    status = Column(String, default="Active", nullable=False)