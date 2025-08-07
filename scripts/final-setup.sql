-- Complete setup script that handles all existing conditions

-- Step 1: Drop and recreate RLS policies
DROP POLICY IF EXISTS "Allow public read access to lectures" ON public.lectures;
DROP POLICY IF EXISTS "Allow authenticated users to insert lectures" ON public.lectures;
DROP POLICY IF EXISTS "Users can view their own progress" ON public.lecture_progress;
DROP POLICY IF EXISTS "Users can insert their own progress" ON public.lecture_progress;
DROP POLICY IF EXISTS "Users can update their own progress" ON public.lecture_progress;

-- Step 2: Ensure RLS is enabled
ALTER TABLE public.lectures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lecture_progress ENABLE ROW LEVEL SECURITY;

-- Step 3: Create RLS policies
CREATE POLICY "Allow public read access to lectures" ON public.lectures
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to insert lectures" ON public.lectures
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can view their own progress" ON public.lecture_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" ON public.lecture_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" ON public.lecture_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Step 4: Remove duplicates from lectures table (if any exist)
DELETE FROM public.lectures a
WHERE a.ctid NOT IN (
    SELECT MIN(ctid)
    FROM public.lectures
    GROUP BY title
);

-- Step 5: Add unique constraint if it doesn't exist
DO $$
BEGIN
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

-- Step 6: Add created_at column if it doesn't exist
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

-- Step 7: Ensure all required lectures exist
INSERT INTO public.lectures (title, video_url) VALUES
  ('생성형 AI 이미지 영상 만들기', 'https://www.youtube.com/embed/8P6Q_RnlvJo?enablejsapi=1'),
  ('AI 영상 영화 제작 입문자를 위한 시간 아끼는 편집 비법 공개', 'https://www.youtube.com/embed/8P6Q_RnlvJo?enablejsapi=1'),
  ('15분만에 만드는 애니메이션 영상', 'https://www.youtube.com/embed/vWycO5TfawY?enablejsapi=1'),
  ('동일한 캐릭터로 연속 이미지 만들기', 'https://www.youtube.com/embed/-vAmrsYw2VI?enablejsapi=1'),
  ('전 임직원을 위한 AI 실무 활용 워크숍', 'https://www.youtube.com/embed/dQw4w9WgXcQ')
ON CONFLICT (title) DO NOTHING;

-- Step 8: Verify the setup
SELECT 'Setup completed successfully. Lectures in database:' as status;
SELECT title FROM public.lectures ORDER BY title;
