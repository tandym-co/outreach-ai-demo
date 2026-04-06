-- Migration 001: Add engagement_score to prospects
-- Applied automatically on merge to main via GitHub Actions (db-migrate.yml)
ALTER TABLE prospects ADD COLUMN IF NOT EXISTS engagement_score integer not null default 0;
