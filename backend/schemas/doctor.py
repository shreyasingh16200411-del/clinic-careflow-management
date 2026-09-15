from pydantic import BaseModel, ConfigDict


class DoctorCreate(BaseModel):
    full_name: str
    specialization: str
    phone: str | None = None
    email: str | None = None
    status: str = "Active"


class DoctorResponse(BaseModel):
    id: int
    doctor_id: str
    full_name: str
    specialization: str
    phone: str | None
    email: str | None
    status: str

    model_config = ConfigDict(from_attributes=True)