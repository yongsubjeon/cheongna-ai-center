-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access to lectures" ON public.lectures;
DROP POLICY IF EXISTS "Allow authenticated users to insert lectures" ON public.lectures;

-- Recreate policies
CREATE POLICY "Allow public read access to lectures" ON public.lectures
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to insert lectures" ON public.lectures
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Ensure the sample lecture exists for the computer science course
-- Check if it exists first, then insert if it doesn't
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM public.lectures 
        WHERE title = '생성형 AI 이미지 영상 만들기'
    ) THEN
        INSERT INTO public.lectures (title, video_url) VALUES
        ('생성형 AI 이미지 영상 만들기', 'https://www.youtube.com/embed/8P6Q_RnlvJo?enablejsapi=1');
    END IF;
END $$;

-- Also ensure other sample lectures exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM public.lectures 
        WHERE title = 'AI 영상 영화 제작 입문자를 위한 시간 아끼는 편집 비법 공개'
    ) THEN
        INSERT INTO public.lectures (title, video_url) VALUES
        ('AI 영상 영화 제작 입문자를 위한 시간 아끼는 편집 비법 공개', 'https://www.youtube.com/embed/8P6Q_RnlvJo?enablejsapi=1');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM public.lectures 
        WHERE title = '15분만에 만드는 애니메이션 영상'
    ) THEN
        INSERT INTO public.lectures (title, video_url) VALUES
        ('15분만에 만드는 애니메이션 영상', 'https://www.youtube.com/embed/vWycO5TfawY?enablejsapi=1');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM public.lectures 
        WHERE title = '동일한 캐릭터로 연속 이미지 만들기'
    ) THEN
        INSERT INTO public.lectures (title, video_url) VALUES
        ('동일한 캐릭터로 연속 이미지 만들기', 'https://www.youtube.com/embed/-vAmrsYw2VI?enablejsapi=1');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM public.lectures 
        WHERE title = '전 임직원을 위한 AI 실무 활용 워크숍'
    ) THEN
        INSERT INTO public.lectures (title, video_url) VALUES
        ('전 임직원을 위한 AI 실무 활용 워크숍', 'https://www.youtube.com/embed/dQw4w9WgXcQ');
    END IF;
END $$;
