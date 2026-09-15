from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.connection import Base, engine
from models.user import User
from models.patient import Patient
from models.doctor import Doctor
from routers.patients import router as patients_router
from routers.doctors import router as doctors_router


Base.metadata.create_all(bind=engine)


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    patients_router,
    prefix="/api",
)


app.include_router(
    doctors_router,
    prefix="/api",
)


@app.get("/")
def home():
    return {"message": "CareFlow backend is running"}