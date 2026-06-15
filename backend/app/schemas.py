from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from uuid import UUID
from app.models import EventType


class EventCreate(BaseModel):
    user_id: str
    type: EventType
    payload: Optional[dict] = None


class EventRead(BaseModel):
    id: UUID
    user_id: str
    type: EventType
    created_at: datetime
    payload: Optional[dict] = None

    model_config = {"from_attributes": True}


class UserSummary(BaseModel):
    user_id: str
    total_events: int
    by_type: dict[str, int]
    first_event_at: Optional[datetime]
    last_event_at: Optional[datetime]