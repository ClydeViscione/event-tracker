from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app import crud, schemas
from app.database import get_db
from app.models import EventType
from typing import Optional

router = APIRouter(prefix="/events", tags=["events"])


@router.post("/", response_model=schemas.EventRead, status_code=201)
def create_event(event: schemas.EventCreate, db: Session = Depends(get_db)):
    return crud.create_event(db, event)


@router.get("/", response_model=list[schemas.EventRead])
def list_events(
    user_id: Optional[str] = Query(None),
    type: Optional[EventType] = Query(None),
    db: Session = Depends(get_db),
):
    return crud.get_events(db, user_id=user_id, type=type)