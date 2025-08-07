-- Remove duplicates from lectures table (if any exist)
-- We'll keep the first occurrence of each title based on created_at
DELETE FROM public.lectures a
WHERE a.id NOT IN (
    SELECT DISTINCT ON (title) id
    FROM public.lectures
    ORDER BY title, created_at ASC
);

-- Add unique constraint to lectures table
DO $$
BEGIN
    -- Check if constraint already exists
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'lectures_title_unique' 
        AND table_name = 'lectures'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.lectures 
        ADD CONSTRAINT lectures_title_unique UNIQUE (title);
    END IF;
END $$;
