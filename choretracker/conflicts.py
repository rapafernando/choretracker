from __future__ import annotations

from collections import defaultdict
from typing import Dict, Iterable, List

from .models import CalendarEvent


def detect_conflicts(events: Iterable[CalendarEvent]) -> Dict[str, List[CalendarEvent]]:
    """Return groups of events that overlap."""

    conflicts: Dict[str, List[CalendarEvent]] = defaultdict(list)
    sorted_events = sorted(events, key=lambda e: e.start)
    for idx, event in enumerate(sorted_events):
        for later in sorted_events[idx + 1 :]:
            if later.start >= event.end:
                break
            if event.overlaps(later):
                key = f"{event.metadata.calendar_id}:{event.start.date()}"
                if event not in conflicts[key]:
                    conflicts[key].append(event)
                conflicts[key].append(later)
    return conflicts
