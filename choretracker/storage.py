from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from typing import Dict, List

from .models import CalendarAccount, CalendarSelection, TokenInfo


@dataclass
class StoredEventRecord:
    provider: str
    calendar_id: str
    event_id: str


class InMemoryStore:
    """Simple in-memory storage for demo purposes."""

    def __init__(self) -> None:
        self.tokens: Dict[str, TokenInfo] = {}
        self.accounts: Dict[str, CalendarAccount] = {}
        self.selections: Dict[str, CalendarSelection] = {}
        self.events: Dict[str, StoredEventRecord] = {}

    def upsert_account(self, account: CalendarAccount) -> None:
        self.accounts[account.account_id] = account
        self.tokens[account.account_id] = account.tokens

    def get_account(self, account_id: str) -> CalendarAccount:
        return self.accounts[account_id]

    def set_selection(self, selection: CalendarSelection) -> None:
        key = f"{selection.account_id}:{selection.calendar_id}"
        self.selections[key] = selection

    def list_selections(self, household_id: str) -> List[CalendarSelection]:
        return [
            selection
            for selection in self.selections.values()
            if self.accounts[selection.account_id].household_id == household_id
            and selection.surface
        ]

    def update_token(self, account_id: str, token: TokenInfo) -> None:
        if account_id in self.accounts:
            account = self.accounts[account_id]
            account.tokens = token
            self.tokens[account_id] = token

    def remember_event(self, event: StoredEventRecord) -> None:
        key = f"{event.provider}:{event.calendar_id}:{event.event_id}"
        self.events[key] = event

    def seen_event(self, provider: str, calendar_id: str, event_id: str) -> bool:
        key = f"{provider}:{calendar_id}:{event_id}"
        return key in self.events
