-- Test Database Queries for Papermark
-- Run these queries in your PostgreSQL client (pgAdmin, DBeaver, psql, etc.)

-- ============================================
-- IMPORTANT: Table names are case-sensitive!
-- Use double quotes around table names
-- ============================================

-- 1. Check if database exists and is connected
SELECT current_database();

-- 2. List all tables in the database
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- 3. Count records in each main table
SELECT 'Users' as table_name, COUNT(*) as count FROM "User"
UNION ALL
SELECT 'Teams', COUNT(*) FROM "Team"
UNION ALL
SELECT 'Documents', COUNT(*) FROM "Document"
UNION ALL
SELECT 'Links', COUNT(*) FROM "Link"
UNION ALL
SELECT 'Views', COUNT(*) FROM "View"
UNION ALL
SELECT 'Viewers', COUNT(*) FROM "Viewer";

-- 4. View all users (if any exist)
SELECT id, name, email, "createdAt" 
FROM "User" 
ORDER BY "createdAt" DESC;

-- 5. View all teams (if any exist)
SELECT id, name, "createdAt" 
FROM "Team" 
ORDER BY "createdAt" DESC;

-- 6. View all documents (if any exist)
SELECT id, name, type, "createdAt" 
FROM "Document" 
ORDER BY "createdAt" DESC;

-- 7. View all links (if any exist)
SELECT id, slug, "createdAt" 
FROM "Link" 
ORDER BY "createdAt" DESC 
LIMIT 10;

-- 8. Check database size
SELECT 
    pg_size_pretty(pg_database_size('papermark')) as database_size;

-- 9. Check table sizes
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- ============================================
-- COMMON MISTAKES TO AVOID
-- ============================================

-- ❌ WRONG: This will fail because "papermark" is the database name, not a table
-- SELECT * FROM papermark;

-- ✅ CORRECT: Query actual table names with double quotes
-- SELECT * FROM "User";
-- SELECT * FROM "Document";
-- SELECT * FROM "Team";

-- ❌ WRONG: Case-sensitive without quotes
-- SELECT * FROM user;  -- This will fail

-- ✅ CORRECT: Use double quotes for case-sensitive names
-- SELECT * FROM "User";

