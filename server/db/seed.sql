-- Sample database setup for TrafficSync intersections.
TRUNCATE TABLE simulations RESTART IDENTITY CASCADE;

INSERT INTO simulations (title, road_name, data) VALUES
(
  'MacArthur x Del Rosario Intersection',
  'MacArthur Highway / Brgy. Del Rosario Road',
  '{"roadName": "Del Rosario Intersection", "directions": {"Northbound": true, "Southbound": true, "Eastbound": true, "Westbound": true}, "laneConfigs": {"Northbound": [{"id": 1, "type": "Through & Left"}], "Southbound": [{"id": 1, "type": "Through & Left"}], "Eastbound": [{"id": 1, "type": "Straight"}], "Westbound": [{"id": 1, "type": "Straight"}]}, "phaseTimings": {"Northbound-1": {"go": 45, "amber": 4, "red": 2}, "Southbound-1": {"go": 45, "amber": 4, "red": 2}, "Eastbound-1": {"go": 40, "amber": 4, "red": 2}, "Westbound-1": {"go": 40, "amber": 4, "red": 2}}, "pedestrians": {"Northbound": "No", "Southbound": "No", "Eastbound": "No", "Westbound": "No"}, "lanesCount": 4, "cycleLength": 182}'::jsonb
),
(
  'Clark x Friendship Intersection',
  'Fil-Am Friendship Highway / Clark Main Gate',
  '{"roadName": "Clark x Friendship Intersection", "directions": {"Northbound": true, "Southbound": true, "Eastbound": true, "Westbound": true}, "laneConfigs": {"Northbound": [{"id": 1, "type": "Straight"}], "Southbound": [{"id": 1, "type": "Straight"}], "Eastbound": [{"id": 1, "type": "Through & Left"}], "Westbound": [{"id": 1, "type": "Through & Left"}]}, "phaseTimings": {"Northbound-1": {"go": 30, "amber": 3, "red": 2}, "Southbound-1": {"go": 30, "amber": 3, "red": 2}, "Eastbound-1": {"go": 35, "amber": 3, "red": 2}, "Westbound-1": {"go": 35, "amber": 3, "red": 2}}, "pedestrians": {"Northbound": "No", "Southbound": "No", "Eastbound": "No", "Westbound": "No"}, "lanesCount": 4, "cycleLength": 140}'::jsonb
);
