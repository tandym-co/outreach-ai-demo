# CLAUDE.md — OutreachAI Demo

This file tells Claude Code (and Cursor) how to work in this repo.

## What this project is

A demo prototype of a LinkedIn Outreach Sales Tool built for Tandym to showcase a modern
dev workflow: GitHub → Vercel → Supabase → Claude API.

It is NOT a production app. Prioritize clarity and speed over robustness.

## Tech stack

- Next.js 14+ (App Router, TypeScript)
- Tailwind CSS
- Supabase (PostgreSQL) — prospects, messages, persona tables
- Anthropic Claude API (claude-haiku-4-5) — used in /api/chat
- Deployed on Vercel (staging + production), source on GitHub

## Repo structure

```
src/app/           → Next.js pages and API routes
src/components/    → UI components grouped by feature
src/lib/           → Supabase client, Claude client, shared types
src/hooks/         → React hooks (useChat)
supabase/          → schema.sql and seed.sql
```

## Key conventions

- All DB access from API routes only (never from client components directly)
- Use the server-side Supabase client (service role key) in API routes
- Keep components simple — this is a demo, not a design system
- Tailwind only — no CSS modules, no styled-components
- No complex state management — React useState + useChat hook is enough

## Running locally

```bash
cp .env.example .env.local
# fill in your Supabase and Anthropic keys
npm install
npm run dev
```

## Deploying

```bash
make staging   # push to staging branch → Vercel preview deployment
make prod      # merge staging → main → Vercel production deployment
```

## Database

Schema and seed data are in `supabase/`.
Paste `schema.sql` then `seed.sql` directly into the Supabase SQL editor to set up.
Or run `make seed` if you have `SUPABASE_DB_URL` set locally.

## Adding a feature (demo workflow)

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes, test locally with `make dev`
3. Push: `git push origin feature/your-feature`
4. Deploy preview: `make staging`
5. When approved: `make prod`

## Claude API wiring

The chat route at `src/app/api/chat/route.ts`:
- Fetches all prospects from Supabase
- Serializes them into a plain-text context block via `buildProspectsContext()`
- Injects context + persona into the Claude system prompt
- Calls `claude-haiku-4-5` (fast, cheap, good for demos)
- Returns the assistant reply as JSON

Do not add tool use, streaming, or RAG — keep it simple for the demo.
