from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.connection import get_db
from models.patient import Patient
from schemas.patient import PatientCreate, PatientResponse


router = APIRouter(
    prefix="/patients",
    tags=["Patients"],
)


@router.post("/", response_model=PatientResponse)
def create_patient(
    patient_data: PatientCreate,
    db: Session = Depends(get_db),
):
    # Check whether this email is already registered
    existing_patient = (
        db.query(Patient)
        .filter(Patient.email == patient_data.email)
        .first()
    )

    if existing_patient:
        raise HTTPException(
            status_code=400,
            detail="A patient with this email already exists.",
        )

    # Generate the next available CareFlow patient ID
    next_number = 1001

    while (
        db.query(Patient)
        .filter(Patient.patient_id == f"CF-{next_number}")
        .first()
    ):
        next_number += 1

    # Create the patient
    new_patient = Patient(
        patient_id=f"CF-{next_number}",
        full_name=patient_data.full_name,
        date_of_birth=patient_data.date_of_birth,
        gender=patient_data.gender,
        phone=patient_data.phone,
        email=patient_data.email,
        address=patient_data.address,
        medical_history=patient_data.medical_history,
        allergies=patient_data.allergies,
    )

    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)

    return new_patient


@router.get("/", response_model=list[PatientResponse])
def get_patients(
    db: Session = Depends(get_db),
):
    patients = (
        db.query(Patient)
        .order_by(Patient.id.desc())
        .all()
    )

    return patients


@router.get("/{patient_id}", response_model=PatientResponse)
def get_patient(
    patient_id: str,
    db: Session = Depends(get_db),
):
    patient = (
        db.query(Patient)
        .filter(Patient.patient_id == patient_id)
        .first()
    )

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient not found.",
        )

    return patient


@router.put("/{patient_id}", response_model=PatientResponse)
def update_patient(
    patient_id: str,
    patient_data: PatientCreate,
    db: Session = Depends(get_db),
):
    patient = (
        db.query(Patient)
        .filter(Patient.patient_id == patient_id)
        .first()
    )

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient not found.",
        )

    patient.full_name = patient_data.full_name
    patient.date_of_birth = patient_data.date_of_birth
    patient.gender = patient_data.gender
    patient.phone = patient_data.phone
    patient.email = patient_data.email
    patient.address = patient_data.address
    patient.medical_history = patient_data.medical_history
    patient.allergies = patient_data.allergies

    db.commit()
    db.refresh(patient)

    return patient


@router.delete("/{patient_id}")
def delete_patient(
    patient_id: str,
    db: Session = Depends(get_db),
):
    patient = (
        db.query(Patient)
        .filter(Patient.patient_id == patient_id)
        .first()
    )

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient not found.",
        )

    db.delete(patient)
    db.commit()

    return {
        "message": "Patient deleted successfully."
    }