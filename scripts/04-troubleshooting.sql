-- 문제 해결용 스크립트 (필요시에만 실행)

-- 중복 데이터 제거
DELETE FROM public.lectures a
WHERE a.ctid NOT IN (
    SELECT MIN(ctid)
    FROM public.lectures
    GROUP BY title
);

-- UNIQUE 제약조건 추가 (없는 경우에만)
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

-- RLS 정책 재생성 (문제가 있는 경우)
DROP POLICY IF EXISTS "Allow public read access to lectures" ON public.lectures;
CREATE POLICY "Allow public read access to lectures" ON public.lectures
  FOR SELECT USING (true);

-- 누락된 강의 추가
INSERT INTO public.lectures (title, video_url) VALUES
  ('생성형 AI 이미지 영상 만들기', 'https://www.youtube.com/embed/8P6Q_RnlvJo?enablejsapi=1'),
  ('AI 영상 영화 제작 입문자를 위한 시간 아끼는 편집 비법 공개', 'https://www.youtube.com/embed/8P6Q_RnlvJo?enablejsapi=1'),
  ('15분만에 만드는 애니메이션 영상', 'https://www.youtube.com/embed/vWycO5TfawY?enablejsapi=1'),
  ('동일한 캐릭터로 연속 이미지 만들기', 'https://www.youtube.com/embed/-vAmrsYw2VI?enablejsapi=1'),
  ('전 임직원을 위한 AI 실무 활용 워크숍', 'https://www.youtube.com/embed/dQw4w9WgXcQ')
ON CONFLICT (title) DO NOTHING;
