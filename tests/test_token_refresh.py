from datetime import datetime, timedelta, timezone

from choretracker.connectors.google import GoogleCalendarConnector
from choretracker.models import CalendarAccount, TokenInfo
from choretracker.storage import InMemoryStore


def test_token_refresh_triggers_on_expiry():
    store = InMemoryStore()
    expired_token = TokenInfo(
        access_token="expired",
        refresh_token="refresh-1234",
        expires_at=datetime.now(timezone.utc) - timedelta(seconds=1),
    )
    account = CalendarAccount(
        household_id="house-1", provider="google", account_id="acct-1", tokens=expired_token
    )
    store.upsert_account(account)

    connector = GoogleCalendarConnector(store)
    token = connector.get_access_token(account.account_id)

    assert token.startswith("google-access")
    assert store.get_account(account.account_id).tokens.access_token == token
