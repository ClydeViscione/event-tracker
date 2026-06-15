from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models import Event, EventType
from app.schemas import EventCreate


def create_event(db: Session, event: EventCreate) -> Event:
    db_event = Event(
        user_id=event.user_id,
        type=event.type,
        payload=event.payload,
    )
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event


def get_events(db: Session, user_id: str = None, type: EventType = None) -> list[Event]:
    query = db.query(Event)
    if user_id:
        query = query.filter(Event.user_id == user_id)
    if type:
        query = query.filter(Event.type == type)
    return query.order_by(Event.created_at.desc()).all()


def get_user_summary(db: Session, user_id: str) -> dict | None:
    events = db.query(Event).filter(Event.user_id == user_id).all()

    if not events:
        return None

    by_type = {}
    for event in events:
        key = event.type.value
        by_type[key] = by_type.get(key, 0) + 1

    dates = [e.created_at for e in events]

    return {
        "user_id": user_id,
        "total_events": len(events),
        "by_type": by_type,
        "first_event_at": min(dates),
        "last_event_at": max(dates),
    }