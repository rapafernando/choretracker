from datetime import datetime, timedelta, timezone

from choretracker.connectors.google import GoogleCalendarConnector
from choretracker.connectors.microsoft import MicrosoftGraphConnector
from choretracker.ingestion import EventIngestionService
from choretracker.models import CalendarAccount, CalendarEvent, ProviderEventMetadata, TokenInfo
from choretracker.registry import HouseholdCalendarRegistry
from choretracker.storage import InMemoryStore


def test_ingestion_surfaces_selected_calendars_and_conflicts():
    store = InMemoryStore()
    registry = HouseholdCalendarRegistry(store)

    now = datetime.now(timezone.utc)
    google_account = CalendarAccount(
        household_id="house-1",
        provider="google",
        account_id="google-1",
        tokens=TokenInfo(
            access_token="access-a", refresh_token="refresh-a", expires_at=now + timedelta(hours=1)
        ),
    )
    m365_account = CalendarAccount(
        household_id="house-1",
        provider="microsoft",
        account_id="ms-1",
        tokens=TokenInfo(
            access_token="access-b", refresh_token="refresh-b", expires_at=now + timedelta(hours=1)
        ),
    )

    registry.link_account(google_account)
    registry.link_account(m365_account)
    registry.select_calendars("google-1", ["family"])
    registry.select_calendars("ms-1", ["family"])

    connectors = {
        "google": GoogleCalendarConnector(store),
        "microsoft": MicrosoftGraphConnector(store),
    }
    service = EventIngestionService(store, connectors)

    result = service.ingest("house-1")

    assert len(result.events) >= 2
    assert any(conflict for conflict in result.conflicts.values())


def test_pushes_created_event_back_to_provider():
    store = InMemoryStore()
    registry = HouseholdCalendarRegistry(store)
    now = datetime.now(timezone.utc)
    google_account = CalendarAccount(
        household_id="house-1",
        provider="google",
        account_id="google-1",
        tokens=TokenInfo(
            access_token="access-a", refresh_token="refresh-a", expires_at=now + timedelta(hours=1)
        ),
    )
    registry.link_account(google_account)
    registry.select_calendars("google-1", ["family"])

    connectors = {"google": GoogleCalendarConnector(store)}
    service = EventIngestionService(store, connectors)

    created = service.create_event(
        "google-1",
        CalendarEvent(
            title="New chore",
            start=now + timedelta(hours=6),
            end=now + timedelta(hours=7),
            metadata=ProviderEventMetadata(
                provider="google", calendar_id="family", event_id=""
            ),
        ),
    )

    assert created.metadata.event_id.startswith("g-created")
