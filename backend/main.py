from fastapi import FastAPI

from database.connection import Base, engine
from models.user import User
from models.patient import Patient
from routers.patients import router as patients_router


Base.metadata.create_all(bind=engine)


app = FastAPI()


app.include_router(
    patients_router,
    prefix="/api",
)


@app.get("/")
def home():
    return {"message": "CareFlow backend is running"}