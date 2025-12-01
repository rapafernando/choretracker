from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import List

from .base import CalendarConnector
from ..models import CalendarEvent


class MicrosoftGraphConnector(CalendarConnector):
    provider = "microsoft"

    def _exchange_refresh_token(self, refresh_token: str):
        new_token = f"m365-access-{refresh_token[:4]}"
        expiry = datetime.now(timezone.utc) + timedelta(hours=1)
        return new_token, expiry

    def list_calendars(self, account_id: str) -> List[str]:
        self.get_access_token(account_id)
        return ["default", "family", "sports"]

    def list_events(self, account_id: str, calendar_id: str) -> List[CalendarEvent]:
        self.get_access_token(account_id)
        now = datetime.now(timezone.utc)
        return [
            self._build_event(
                account_id,
                calendar_id,
                event_id=f"m-{calendar_id}-1",
                title="Doctor visit",
                start=now + timedelta(hours=2),
                end=now + timedelta(hours=4),
            ),
            self._build_event(
                account_id,
                calendar_id,
                event_id=f"m-{calendar_id}-2",
                title="Music lesson",
                start=now + timedelta(hours=4),
                end=now + timedelta(hours=5, minutes=30),
            ),
        ]

    def create_event(self, account_id: str, event: CalendarEvent) -> CalendarEvent:
        self.get_access_token(account_id)
        return self._build_event(
            account_id,
            event.metadata.calendar_id,
            event_id=f"m-created-{hash(event.title) % 1000}",
            title=event.title,
            start=event.start,
            end=event.end,
            description=event.description,
            location=event.location,
            attendees=event.attendees,
        )

    def update_event(self, account_id: str, event: CalendarEvent) -> CalendarEvent:
        self.get_access_token(account_id)
        return event
