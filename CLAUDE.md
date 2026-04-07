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

## Environments

| Environment | URL | Branch |
|-------------|-----|--------|
| Production  | https://outreach-ai-demo.vercel.app | `main` |
| Staging     | https://staging-outreach-ai-demo.vercel.app | `staging` |

## Deploying

```bash
make staging   # push current branch to staging → updates staging URL above
make preview   # push current branch → get a one-off Vercel preview URL
make pr        # create a PR from current branch to main (founder approval step)
```

Merging a PR to `main` auto-deploys to production.

## Database

Schema and seed data are in `supabase/`.
Paste `schema.sql` then `seed.sql` directly into the Supabase SQL editor to set up.
Or run `make seed` if you have `SUPABASE_DB_URL` set locally.

### Migrations

When a feature requires a DB schema change:
1. Create a new numbered file in `supabase/migrations/` — e.g. `003_add_my_column.sql`
2. Write the change as idempotent SQL (use `IF NOT EXISTS`, `IF EXISTS`, etc.)
3. Include the migration file in the PR — it will appear in the diff
4. On merge to `main`, the GitHub Action `.github/workflows/db-migrate.yml` applies it automatically

**Never modify existing migration files.** Always create a new one.
**Never apply migrations manually** unless doing one-time setup — let the GitHub Action handle it.

### prospects table columns

| Column | Type | Notes |
|--------|------|-------|
| `engagement_score` | integer | Added in migration 001 |
| `next_action` | text | Added in migration 002. Allowed values: `call`, `email`, `follow_up`. Nullable. |
| `priority` | text | Added in migration 003. Allowed values: `high`, `medium`, `low`. Nullable. |

## Adding a feature (founder workflow)

1. Describe the feature in v0 → it builds on a new branch automatically
2. Ask Claude Code to check integration: *"Review the v0 changes on branch [name]. Check Supabase queries, types, and nothing is broken."*
3. Run `make staging` → test at https://staging-outreach-ai-demo.vercel.app
4. When happy → `make pr` or click "Create PR" in v0
5. Review the PR description → click Merge → production auto-deploys

## Claude API wiring

The chat route at `src/app/api/chat/route.ts`:
- Fetches all prospects from Supabase
- Serializes them into a plain-text context block via `buildProspectsContext()`
- Injects context + persona into the Claude system prompt
- Calls `claude-haiku-4-5` (fast, cheap, good for demos)
- Returns the assistant reply as JSON

Do not add tool use, streaming, or RAG — keep it simple for the demo.
