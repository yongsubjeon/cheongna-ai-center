-- Add created_at column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'lectures' 
        AND column_name = 'created_at'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.lectures 
        ADD COLUMN created_at TIMESTAMPTZ DEFAULT NOW();
        
        -- Update existing rows to have a created_at value
        UPDATE public.lectures 
        SET created_at = NOW() 
        WHERE created_at IS NULL;
    END IF;
END $$;

-- Remove duplicates from lectures table (if any exist)
-- We'll use id instead of created_at since created_at might not exist
DELETE FROM public.lectures a
WHERE a.ctid NOT IN (
    SELECT MIN(ctid)
    FROM public.lectures
    GROUP BY title
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
