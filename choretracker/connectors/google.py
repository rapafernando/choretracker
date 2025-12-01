from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import List

from .base import CalendarConnector
from ..models import CalendarEvent, TokenInfo


class GoogleCalendarConnector(CalendarConnector):
    provider = "google"

    def _exchange_refresh_token(self, refresh_token: str):
        new_token = f"google-access-{refresh_token[:4]}"
        expiry = datetime.now(timezone.utc) + timedelta(hours=1)
        return new_token, expiry

    def list_calendars(self, account_id: str) -> List[str]:
        self.get_access_token(account_id)
        return ["primary", "family", "chores"]

    def list_events(self, account_id: str, calendar_id: str) -> List[CalendarEvent]:
        self.get_access_token(account_id)
        now = datetime.now(timezone.utc)
        return [
            self._build_event(
                account_id,
                calendar_id,
                event_id=f"g-{calendar_id}-1",
                title="Grocery pickup",
                start=now + timedelta(hours=1),
                end=now + timedelta(hours=3),
            ),
            self._build_event(
                account_id,
                calendar_id,
                event_id=f"g-{calendar_id}-2",
                title="School run",
                start=now + timedelta(hours=4),
                end=now + timedelta(hours=5),
            ),
        ]

    def create_event(self, account_id: str, event: CalendarEvent) -> CalendarEvent:
        self.get_access_token(account_id)
        return self._build_event(
            account_id,
            event.metadata.calendar_id,
            event_id=f"g-created-{hash(event.title) % 1000}",
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
