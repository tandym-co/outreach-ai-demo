-- Migration 002: Add next_action to prospects
-- Applied automatically on merge to main via GitHub Actions (db-migrate.yml)
ALTER TABLE prospects ADD COLUMN IF NOT EXISTS next_action text CHECK (next_action IN ('call', 'email', 'follow_up'));

-- Seed initial values for demo prospects
UPDATE prospects SET next_action = 'call'        WHERE name = 'Sarah Chen';
UPDATE prospects SET next_action = 'email'       WHERE name = 'James Park';
UPDATE prospects SET next_action = 'follow_up'   WHERE name = 'Marco Rossi';
UPDATE prospects SET next_action = 'call'        WHERE name = 'Rachel Kim';
UPDATE prospects SET next_action = 'email'       WHERE name = 'Alex Thompson';
UPDATE prospects SET next_action = 'follow_up'   WHERE name = 'Tom Nguyen';
