-- Deduplicate region rows by (province, district)
-- This migration is idempotent: safe to run multiple times.

-- 1) Build keep table (one row per (province,district))
CREATE TEMPORARY TABLE IF NOT EXISTS region_keep AS
SELECT MIN(id) AS keep_id, province, district
FROM region
GROUP BY province, district;

-- 2) Repoint address.region_id to the kept region ids
UPDATE address a
JOIN region r ON r.id = a.region_id
JOIN region_keep k ON k.province = r.province AND k.district = r.district
SET a.region_id = k.keep_id;

-- 3) Remove duplicate region rows (non-keepers)
DELETE r FROM region r
LEFT JOIN region_keep k ON k.keep_id = r.id
WHERE k.keep_id IS NULL;

-- 4) Cleanup
DROP TEMPORARY TABLE IF EXISTS region_keep;


