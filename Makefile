.PHONY: staging prod dev seed migrate

# Push current branch to staging → Vercel auto-deploys preview
staging:
	git push origin HEAD:staging --force
	@echo "Pushed to staging. Check Vercel dashboard for preview URL."

# Merge staging into main → Vercel auto-deploys production
prod:
	git checkout main
	git merge staging --no-edit
	git push origin main
	git checkout -
	@echo "Pushed to production."

# Run locally
dev:
	npm run dev

# Migrations run automatically on merge via GitHub Actions (db-migrate.yml)
# To apply a migration manually, paste it into the Supabase SQL Editor
migrate:
	@echo "Pending migrations in supabase/migrations/:"
	@ls supabase/migrations/*.sql

# Reset and re-seed the database (requires SUPABASE_DB_URL env var)
seed:
	psql $$SUPABASE_DB_URL -f supabase/schema.sql
	psql $$SUPABASE_DB_URL -f supabase/seed.sql
	@echo "Database seeded."
