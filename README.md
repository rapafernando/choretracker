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
