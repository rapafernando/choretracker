from __future__ import annotations

from typing import List, Mapping

from .conflicts import detect_conflicts
from .models import CalendarEvent, IngestionResult
from .storage import InMemoryStore, StoredEventRecord


class EventIngestionService:
    """Coordinate pulling events and pushing updates across providers."""

    def __init__(self, store: InMemoryStore, connectors: Mapping[str, object]):
        self.store = store
        self.connectors = connectors

    def ingest(self, household_id: str) -> IngestionResult:
        surfaced = self.store.list_selections(household_id)
        events: List[CalendarEvent] = []
        for selection in surfaced:
            account = self.store.get_account(selection.account_id)
            connector = self.connectors[account.provider]
            for event in connector.list_events(selection.account_id, selection.calendar_id):
                if not self.store.seen_event(
                    account.provider, selection.calendar_id, event.metadata.event_id
                ):
                    self.store.remember_event(
                        StoredEventRecord(
                            provider=account.provider,
                            calendar_id=selection.calendar_id,
                            event_id=event.metadata.event_id,
                        )
                    )
                events.append(event)
        conflicts = detect_conflicts(events)
        return IngestionResult(events=events, conflicts=conflicts)

    def create_event(self, account_id: str, event: CalendarEvent) -> CalendarEvent:
        account = self.store.get_account(account_id)
        connector = self.connectors[account.provider]
        created = connector.create_event(account_id, event)
        return created

    def update_event(self, account_id: str, event: CalendarEvent) -> CalendarEvent:
        account = self.store.get_account(account_id)
        connector = self.connectors[account.provider]
        return connector.update_event(account_id, event)
