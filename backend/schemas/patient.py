from datetime import date

from pydantic import BaseModel, ConfigDict


class PatientCreate(BaseModel):
    full_name: str
    date_of_birth: date | None = None
    gender: str | None = None
    phone: str | None = None
    email: str | None = None
    address: str | None = None
    medical_history: str | None = None
    allergies: str | None = None


class PatientResponse(BaseModel):
    id: int
    patient_id: str
    full_name: str
    date_of_birth: date | None
    gender: str | None
    phone: str | None
    email: str | None
    address: str | None
    medical_history: str | None
    allergies: str | None
    status: str

    model_config = ConfigDict(from_attributes=True)