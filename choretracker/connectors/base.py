from __future__ import annotations

from abc import ABC, abstractmethod
from datetime import datetime, timedelta, timezone
from typing import List, Tuple

from ..models import CalendarEvent, ProviderEventMetadata, TokenInfo
from ..storage import InMemoryStore


class CalendarConnector(ABC):
    """Base connector implementing token refresh management."""

    provider: str

    def __init__(self, store: InMemoryStore) -> None:
        self.store = store

    def get_access_token(self, account_id: str) -> str:
        account = self.store.get_account(account_id)
        if account.tokens.is_expired():
            account.tokens = self.refresh_access_token(account.tokens)
            self.store.update_token(account_id, account.tokens)
        return account.tokens.access_token

    def refresh_access_token(self, token: TokenInfo) -> TokenInfo:
        """Refresh tokens using provider-specific implementation."""
        new_access_token, expires_at = self._exchange_refresh_token(token.refresh_token)
        return TokenInfo(
            access_token=new_access_token,
            refresh_token=token.refresh_token,
            expires_at=expires_at,
        )

    @abstractmethod
    def _exchange_refresh_token(self, refresh_token: str) -> Tuple[str, datetime]:
        raise NotImplementedError

    @abstractmethod
    def list_calendars(self, account_id: str) -> List[str]:
        raise NotImplementedError

    @abstractmethod
    def list_events(self, account_id: str, calendar_id: str) -> List[CalendarEvent]:
        raise NotImplementedError

    @abstractmethod
    def create_event(self, account_id: str, event: CalendarEvent) -> CalendarEvent:
        raise NotImplementedError

    @abstractmethod
    def update_event(self, account_id: str, event: CalendarEvent) -> CalendarEvent:
        raise NotImplementedError

    def _generate_fake_expiry(self) -> datetime:
        return datetime.now(timezone.utc) + timedelta(hours=1)

    def _build_event(
        self, account_id: str, calendar_id: str, event_id: str, **payload: str
    ) -> CalendarEvent:
        metadata = ProviderEventMetadata(
            provider=self.provider, calendar_id=calendar_id, event_id=event_id
        )
        return CalendarEvent(
            title=payload.get("title", ""),
            start=payload.get("start"),
            end=payload.get("end"),
            description=payload.get("description"),
            location=payload.get("location"),
            attendees=payload.get("attendees", []),
            metadata=metadata,
        )
