from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Dict, List


@dataclass
class TokenInfo:
    """Represents an access token and associated refresh information."""

    access_token: str
    refresh_token: str
    expires_at: datetime

    def is_expired(self, buffer_seconds: int = 60) -> bool:
        """Return True when the token is close to expiry."""
        now = datetime.now(timezone.utc)
        return self.expires_at <= now.replace(tzinfo=timezone.utc) or (
            self.expires_at - now
        ).total_seconds() < buffer_seconds


@dataclass
class CalendarAccount:
    """Calendar account linked by a household member."""

    household_id: str
    provider: str  # e.g., "google" or "microsoft"
    account_id: str
    tokens: TokenInfo


@dataclass
class CalendarSelection:
    """Selection state for provider calendars visible in a household."""

    account_id: str
    calendar_id: str
    surface: bool = True


@dataclass
class ProviderEventMetadata:
    provider: str
    calendar_id: str
    event_id: str


@dataclass
class CalendarEvent:
    """Normalized event representation."""

    title: str
    start: datetime
    end: datetime
    metadata: ProviderEventMetadata
    description: str | None = None
    location: str | None = None
    attendees: List[str] = field(default_factory=list)

    def overlaps(self, other: "CalendarEvent") -> bool:
        return self.start < other.end and other.start < self.end


@dataclass
class IngestionResult:
    events: List[CalendarEvent]
    conflicts: Dict[str, List[CalendarEvent]]
