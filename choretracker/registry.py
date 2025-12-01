from __future__ import annotations

from typing import Dict, Iterable, List

from .models import CalendarAccount, CalendarSelection
from .storage import InMemoryStore


class HouseholdCalendarRegistry:
    """Track which calendars are surfaced per household."""

    def __init__(self, store: InMemoryStore) -> None:
        self.store = store

    def link_account(self, account: CalendarAccount) -> None:
        self.store.upsert_account(account)

    def select_calendars(
        self, account_id: str, calendar_ids: Iterable[str], surface: bool = True
    ) -> None:
        for cal_id in calendar_ids:
            self.store.set_selection(
                CalendarSelection(account_id=account_id, calendar_id=cal_id, surface=surface)
            )

    def get_surfaced_calendars(self, household_id: str) -> List[CalendarSelection]:
        return self.store.list_selections(household_id)
