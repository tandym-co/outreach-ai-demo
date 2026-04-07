-- Migration 003: Add priority column to prospects
ALTER TABLE prospects
  ADD COLUMN IF NOT EXISTS priority text CHECK (priority IN ('high', 'medium', 'low'));
