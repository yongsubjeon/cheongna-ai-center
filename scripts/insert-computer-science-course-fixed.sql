-- Insert the computer science beginners course into lectures table
-- First check if it exists, then insert if it doesn't
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
