-- Sample data for development.
-- Safe for local testing.

TRUNCATE TABLE simulations RESTART IDENTITY CASCADE;

INSERT INTO simulations (title, road_name, data, created_at) VALUES
  ('Del Rosario Intersection', 'Del Rosario', '{"cycleMode": "phases", "directions": {"Northbound": true, "Southbound": true, "Eastbound": true, "Westbound": true}}'::jsonb, now() - interval '2 days'),
  ('Clark x Friendship T-Intersection', 'Clark x Friendship', '{"cycleMode": "phases", "directions": {"Northbound": true, "Southbound": false, "Eastbound": true, "Westbound": true}}'::jsonb, now() - interval '1 day');
