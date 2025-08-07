-- Add unique constraint to existing lectures table
-- First, remove any duplicate titles if they exist
WITH duplicates AS (
  SELECT title, MIN(id) as keep_id
  FROM public.lectures
  GROUP BY title
  HAVING COUNT(*) > 1
)
DELETE FROM public.lectures 
WHERE id NOT IN (SELECT keep_id FROM duplicates)
AND title IN (SELECT title FROM duplicates);

-- Now add the unique constraint
ALTER TABLE public.lectures 
ADD CONSTRAINT lectures_title_unique UNIQUE (title);
