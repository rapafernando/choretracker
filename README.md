# choretracker

Calendar orchestration utilities for linking household calendars from Google Calendar and Microsoft Graph. The package includes connectors with token refresh handling, registry helpers to track surfaced calendars, and an ingestion service that normalizes events and flags conflicts.

## Running tests

```
pip install -e .[test]
pytest
```
# Choretracker

This starter sets up a Next.js demo with protected tabs for Calendar, Chores, and Settings plus server-side role and household context. OAuth/OIDC provider metadata is scaffolded for Google, Microsoft, and Apple with optional email/password.

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. Use the **demo sign in** on `/login` to create a session cookie that unlocks the protected routes.

## Features
- Protected routes enforced by `middleware.ts`.
- Household context and role-aware session helpers in `lib/auth/session.ts`.
- OAuth/OIDC provider definitions in `lib/auth/providers.ts` with environment-driven enablement.
- Responsive, accessible layout with tab navigation between Calendar, Chores, and Settings.
- API routes for session handling and provider metadata.
# ChoreTracker

ChoreTracker is a web-based family calendar and chore tracker inspired by Skylight.
It is intended to provide parents with a portal to link Google and Microsoft calendars,
manage households, and assign chores with rewards.

## Project Overview
- **SSO**: Google and Microsoft login for parents/guardians; kid logins can be simplified with PIN/magic link.
- **Calendars**: Two-way sync with Google and Microsoft calendars to display family events.
- **Chores**: Recurring chores (daily with weekday/full week options, weekly, monthly) with points and rewards.
- **Views**: Parent portal for configuration plus kid-friendly views for daily chores and calendar awareness.

More details are documented in [`docs/project-plan.md`](docs/project-plan.md).
