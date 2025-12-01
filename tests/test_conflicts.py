from datetime import datetime, timedelta, timezone

from choretracker.conflicts import detect_conflicts
from choretracker.models import CalendarEvent, ProviderEventMetadata


def build_event(offset_hours: int, duration: int, calendar_id: str, event_id: str):
    now = datetime(2024, 1, 1, tzinfo=timezone.utc)
    return CalendarEvent(
        title=event_id,
        start=now + timedelta(hours=offset_hours),
        end=now + timedelta(hours=offset_hours + duration),
        metadata=ProviderEventMetadata(
            provider="google", calendar_id=calendar_id, event_id=event_id
        ),
    )


def test_detects_overlapping_events():
    events = [
        build_event(1, 2, "family", "a"),
        build_event(2, 2, "family", "b"),
        build_event(5, 1, "family", "c"),
    ]

    conflicts = detect_conflicts(events)

    assert "family:2024-01-01" in conflicts
    assert {e.metadata.event_id for e in conflicts["family:2024-01-01"]} == {"a", "b"}
