-- Deployment Script for Techverse 2026 Database
-- Run this script to set up the complete database schema and sample data

-- Step 1: Drop existing tables if you want a fresh start (OPTIONAL - UNCOMMENT IF NEEDED)
-- DROP TABLE IF EXISTS activity_logs CASCADE;
-- DROP TABLE IF EXISTS content_sections CASCADE;
-- DROP TABLE IF EXISTS team_members CASCADE;
-- DROP TABLE IF EXISTS sponsors CASCADE;
-- DROP TABLE IF EXISTS admin_users CASCADE;
-- DROP FUNCTION IF EXISTS update_updated_at_column();

-- Step 2: Create the complete schema
\i complete-schema.sql

-- Step 3: Insert sample data
\i sample-data.sql

-- Step 4: Verify the setup
SELECT 'Admin Users' as table_name, count(*) as record_count FROM admin_users
UNION ALL
SELECT 'Sponsors' as table_name, count(*) as record_count FROM sponsors
UNION ALL
SELECT 'Team Members' as table_name, count(*) as record_count FROM team_members
UNION ALL
SELECT 'Content Sections' as table_name, count(*) as record_count FROM content_sections;

-- Step 5: Test queries
SELECT 'Testing Sponsors View:' as test;
SELECT tier, count(*) as count FROM public_sponsors GROUP BY tier ORDER BY tier;

SELECT 'Testing Team Members View:' as test;
SELECT hierarchy, count(*) as count FROM public_team_members GROUP BY hierarchy ORDER BY hierarchy;

SELECT 'Testing Featured Team Members:' as test;
SELECT name, position FROM featured_team_members ORDER BY hierarchy_order, display_order;

-- Success message
SELECT 'Database setup completed successfully!' as status;