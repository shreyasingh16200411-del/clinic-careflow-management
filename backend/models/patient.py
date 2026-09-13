from sqlalchemy import Column, Integer, String, Date
from database.connection import Base


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)

    patient_id = Column(String, unique=True, index=True, nullable=False)

    full_name = Column(String, nullable=False)
    date_of_birth = Column(Date, nullable=True)
    gender = Column(String, nullable=True)

    phone = Column(String, nullable=True)
    email = Column(String, nullable=True)

    address = Column(String, nullable=True)

    medical_history = Column(String, nullable=True)
    allergies = Column(String, nullable=True)

    status = Column(String, default="Active", nullable=False)