# choretracker

Calendar orchestration utilities for linking household calendars from Google Calendar and Microsoft Graph. The package includes connectors with token refresh handling, registry helpers to track surfaced calendars, and an ingestion service that normalizes events and flags conflicts.

## Running tests

```
pip install -e .[test]
pytest
```
