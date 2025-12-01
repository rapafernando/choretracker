# Project Plan

## Goals
- Deliver a web-based family calendar and chore tracker inspired by Skylight.
- Support parents/guardians linking Google and Microsoft accounts for authentication and calendar sync.
- Provide clear separation between parent/admin capabilities and kid-facing experiences.

## Functional Requirements
### Identity and Roles
- SSO providers: Google and Microsoft for launch.
- Optional kid access via PIN or magic link (no full SSO requirement for kids).
- Roles: parent/guardian (admin), child (limited permissions), optional household-level co-guardians.

### Calendar Integration
- Data sources: Google Calendar and Microsoft (Outlook/Office 365) calendars.
- Sync: Two-way sync (read events from providers; create/update events and propagate back).
- Parent portal allows linking multiple calendars per household and selecting which to surface.
- Calendar views: month/week/day with color-coding by member/calendar and quick-add events.

### Chores
- Recurrence options: daily (weekday-only or full week), weekly, monthly.
- Completion flow: kids can mark completion; parents may require approval.
- Points and rewards: chores earn score points; parents can define rewards based on accumulated points.
- Views: kid dashboard shows daily/weekly chores; parent view supports assignment, recurrence rules, and reward configuration.

### Parent Portal
- Manage households (single-household MVP), parent/guardian profiles, and kid profiles.
- Link/unlink calendars; set permissions per calendar.
- Configure reminders/notifications (email/push roadmap) for events and chore deadlines.

### Security and Privacy
- Use OAuth/OIDC best practices for Google/Microsoft with refresh token handling and minimal scopes.
- Enforce household-level data isolation; audit logging for chore approvals and calendar edits.

## Architecture Outline
- **Frontend**: React/Next.js with protected routes and tabbed layout (Family Calendar, Chores, Settings/Parent Portal).
- **Backend**: Node/Express or Next.js API routes with OAuth clients for Google and Microsoft, storing tokens securely.
- **Data Storage**: Persistence for users, households, roles, linked calendars, chores, rewards, and event cache for sync.
- **Sync Services**: Background jobs/webhooks for Google/Microsoft calendar sync; conflict detection and push of updates.

## Open Questions
- Do you want Apple Sign In added soon after launch?
- Should we support multiple households per parent from the start?
- Do you need localization (languages/RTL) at MVP?
- Should offline/PWA support be part of the initial release?
