from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas
from app.database import get_db

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/{user_id}/summary", response_model=schemas.UserSummary)
def get_user_summary(user_id: str, db: Session = Depends(get_db)):
    summary = crud.get_user_summary(db, user_id)
    if summary is None:
        raise HTTPException(status_code=404, detail=f"No events found for user '{user_id}'")
    return summary