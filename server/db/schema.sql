-- The complete shape of the database. Safe to run against an empty database,
-- and safe to run twice.

CREATE TABLE IF NOT EXISTS simulations (
  id          SERIAL PRIMARY KEY,
  title       TEXT        NOT NULL,
  road_name   TEXT        NOT NULL DEFAULT '',
  data        JSONB       NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS simulations_created_at_idx
  ON simulations (created_at DESC);
