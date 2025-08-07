-- Simple approach: just add the unique constraint and handle duplicates
-- Remove duplicates using ctid (physical row identifier)
DELETE FROM public.lectures a
WHERE a.ctid NOT IN (
    SELECT MIN(ctid)
    FROM public.lectures
    GROUP BY title
);

-- Add unique constraint if it doesn't exist
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

-- Ensure all required lectures exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.lectures WHERE title = '생성형 AI 이미지 영상 만들기') THEN
        INSERT INTO public.lectures (title, video_url) VALUES
        ('생성형 AI 이미지 영상 만들기', 'https://www.youtube.com/embed/8P6Q_RnlvJo?enablejsapi=1');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.lectures WHERE title = 'AI 영상 영화 제작 입문자를 위한 시간 아끼는 편집 비법 공개') THEN
        INSERT INTO public.lectures (title, video_url) VALUES
        ('AI 영상 영화 제작 입문자를 위한 시간 아끼는 편집 비법 공개', 'https://www.youtube.com/embed/8P6Q_RnlvJo?enablejsapi=1');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.lectures WHERE title = '15분만에 만드는 애니메이션 영상') THEN
        INSERT INTO public.lectures (title, video_url) VALUES
        ('15분만에 만드는 애니메이션 영상', 'https://www.youtube.com/embed/vWycO5TfawY?enablejsapi=1');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.lectures WHERE title = '동일한 캐릭터로 연속 이미지 만들기') THEN
        INSERT INTO public.lectures (title, video_url) VALUES
        ('동일한 캐릭터로 연속 이미지 만들기', 'https://www.youtube.com/embed/-vAmrsYw2VI?enablejsapi=1');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.lectures WHERE title = '전 임직원을 위한 AI 실무 활용 워크숍') THEN
        INSERT INTO public.lectures (title, video_url) VALUES
        ('전 임직원을 위한 AI 실무 활용 워크숍', 'https://www.youtube.com/embed/dQw4w9WgXcQ');
    END IF;
END $$;
