-- 샘플 강의 데이터 삽입
INSERT INTO public.lectures (title, video_url) VALUES
  ('AI 영상 영화 제작 입문자를 위한 시간 아끼는 편집 비법 공개', 'https://www.youtube.com/embed/8P6Q_RnlvJo?enablejsapi=1'),
  ('15분만에 만드는 애니메이션 영상', 'https://www.youtube.com/embed/vWycO5TfawY?enablejsapi=1'),
  ('동일한 캐릭터로 연속 이미지 만들기', 'https://www.youtube.com/embed/-vAmrsYw2VI?enablejsapi=1'),
  ('전 임직원을 위한 AI 실무 활용 워크숍', 'https://www.youtube.com/embed/dQw4w9WgXcQ'),
  ('생성형 AI 이미지 영상 만들기', 'https://www.youtube.com/embed/dQw4w9WgXcQ')
ON CONFLICT DO NOTHING;
