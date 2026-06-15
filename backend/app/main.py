from fastapi import FastAPI
from app.database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Event Tracker API")

@app.get("/health")
def health():
    return {"status": "ok"}