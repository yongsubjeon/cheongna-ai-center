-- Insert the computer science beginners course into lectures table
INSERT INTO public.lectures (title, video_url) VALUES
  ('생성형 AI 이미지 영상 만들기', 'https://www.youtube.com/embed/8P6Q_RnlvJo?enablejsapi=1')
ON CONFLICT (title) DO NOTHING;
