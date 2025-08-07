-- Quick verification that everything is working
SELECT 'Current lectures in database:' as info;
SELECT id, title FROM public.lectures ORDER BY title;

SELECT 'RLS policies:' as info;
SELECT tablename, policyname, cmd FROM pg_policies WHERE tablename = 'lectures';

SELECT 'Table constraints:' as info;
SELECT constraint_name FROM information_schema.table_constraints 
WHERE table_name = 'lectures' AND constraint_type = 'UNIQUE';
