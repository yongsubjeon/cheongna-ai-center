-- Check the current structure of the lectures table
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'lectures' AND table_schema = 'public'
ORDER BY ordinal_position;

-- Also check if there are any existing lectures
SELECT * FROM public.lectures LIMIT 5;
