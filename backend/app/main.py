from fastapi import FastAPI
from app.database import engine, Base
from app.routers import events, users

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Event Tracker API")

app.include_router(events.router)
app.include_router(users.router)

@app.get("/health")
def health():
    return {"status": "ok"}