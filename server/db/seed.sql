-- Sample database setup.
TRUNCATE TABLE simulations RESTART IDENTITY CASCADE;

INSERT INTO simulations (title, road_name, data) VALUES
(
  'Del Rosario Intersection',
  'MacArthur Highway / Del Rosario',
  '{"intersectionName": "Del Rosario Intersection", "cycleMode": "delrosario", "customCycleLength": 345, "directions": {"north": true, "south": true, "east": true, "west": true}, "lanes": {"north": [{"type": "Through & Left", "go": 45, "amber": 4, "red": 2}], "south": [{"type": "Through & Left", "go": 45, "amber": 4, "red": 2}], "east": [{"type": "Through", "go": 40, "amber": 4, "red": 2}], "west": [{"type": "Through", "go": 40, "amber": 4, "red": 2}]}}'::jsonb
),
(
  'Clark x Friendship Intersection',
  'Friendship Highway / Clark Main Gate',
  '{"intersectionName": "Clark x Friendship Intersection", "cycleMode": "clark", "customCycleLength": 175, "directions": {"north": true, "south": true, "east": true, "west": true}, "lanes": {"north": [{"type": "Through", "go": 30, "amber": 3, "red": 2}], "south": [{"type": "Through", "go": 30, "amber": 3, "red": 2}], "east": [{"type": "Through & Left", "go": 35, "amber": 3, "red": 2}], "west": [{"type": "Through & Left", "go": 35, "amber": 3, "red": 2}]}}'::jsonb
);
