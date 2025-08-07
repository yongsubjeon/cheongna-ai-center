-- Fix RLS policies for lectures table
DROP POLICY IF EXISTS "Allow public read access to lectures" ON public.lectures;
DROP POLICY IF EXISTS "Allow authenticated users to insert lectures" ON public.lectures;

-- Recreate policies
CREATE POLICY "Allow public read access to lectures" ON public.lectures
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to insert lectures" ON public.lectures
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Ensure the sample lecture exists for the computer science course
INSERT INTO public.lectures (title, video_url) VALUES
  ('생성형 AI 이미지 영상 만들기', 'https://www.youtube.com/embed/8P6Q_RnlvJo?enablejsapi=1')
ON CONFLICT (title) DO NOTHING;

-- If there's no unique constraint on title, we need to check if it exists first
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
