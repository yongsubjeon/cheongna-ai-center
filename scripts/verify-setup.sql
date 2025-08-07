-- Verification script to check if everything is working correctly

-- Check table structure
SELECT 'Table structure for lectures:' as info;
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'lectures' AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check constraints
SELECT 'Constraints on lectures table:' as info;
SELECT constraint_name, constraint_type
FROM information_schema.table_constraints
WHERE table_name = 'lectures' AND table_schema = 'public';

-- Check RLS policies
SELECT 'RLS policies:' as info;
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename IN ('lectures', 'lecture_progress');

-- Check lecture data
SELECT 'Current lectures:' as info;
SELECT id, title, video_url FROM public.lectures ORDER BY title;

-- Check if RLS is enabled
SELECT 'RLS status:' as info;
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE tablename IN ('lectures', 'lecture_progress');
