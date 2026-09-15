from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.connection import get_db
from models.doctor import Doctor
from schemas.doctor import DoctorCreate, DoctorResponse


router = APIRouter(
    prefix="/doctors",
    tags=["Doctors"],
)


@router.post("/", response_model=DoctorResponse)
def create_doctor(
    doctor_data: DoctorCreate,
    db: Session = Depends(get_db),
):
    # Check whether this email is already registered
    existing_doctor = (
        db.query(Doctor)
        .filter(Doctor.email == doctor_data.email)
        .first()
    )

    if existing_doctor:
        raise HTTPException(
            status_code=400,
            detail="A doctor with this email already exists.",
        )

    # Generate the next available CareFlow doctor ID
    next_number = 1001

    while (
        db.query(Doctor)
        .filter(Doctor.doctor_id == f"DR-{next_number}")
        .first()
    ):
        next_number += 1

    # Create the doctor
    new_doctor = Doctor(
        doctor_id=f"DR-{next_number}",
        full_name=doctor_data.full_name,
        specialization=doctor_data.specialization,
        phone=doctor_data.phone,
        email=doctor_data.email,
        status=doctor_data.status,
    )

    db.add(new_doctor)
    db.commit()
    db.refresh(new_doctor)

    return new_doctor


@router.get("/", response_model=list[DoctorResponse])
def get_doctors(
    db: Session = Depends(get_db),
):
    doctors = (
        db.query(Doctor)
        .order_by(Doctor.id.desc())
        .all()
    )

    return doctors