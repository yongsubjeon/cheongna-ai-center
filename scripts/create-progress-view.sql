-- lecture_progress와 auth.users를 조인한 VIEW 생성
CREATE OR REPLACE VIEW public.lecture_progress_with_user AS
SELECT 
    lp.user_id,
    lp.lecture_id,
    lp.completed,
    lp.completed_at,
    lp.created_at,
    lp.updated_at,
    l.title as lecture_title,
    l.video_url,
    au.email,
    au.created_at as user_created_at,
    au.last_sign_in_at
FROM public.lecture_progress lp
JOIN public.lectures l ON lp.lecture_id = l.id
JOIN auth.users au ON lp.user_id = au.id;

-- VIEW에 대한 RLS 정책 설정
ALTER VIEW public.lecture_progress_with_user SET (security_invoker = true);

-- VIEW에 대한 RLS 정책 생성
CREATE POLICY "Users can view their own progress with email" ON public.lecture_progress_with_user
  FOR SELECT USING (auth.uid() = user_id);

-- 관리자용 VIEW (모든 사용자의 진도를 볼 수 있음)
CREATE OR REPLACE VIEW public.admin_lecture_progress AS
SELECT 
    lp.user_id,
    lp.lecture_id,
    lp.completed,
    lp.completed_at,
    lp.created_at as progress_created_at,
    lp.updated_at as progress_updated_at,
    l.title as lecture_title,
    l.video_url,
    au.email,
    au.created_at as user_created_at,
    au.last_sign_in_at,
    au.email_confirmed_at,
    -- 진도율 계산을 위한 추가 정보
    CASE 
        WHEN lp.completed = true THEN '완료'
        ELSE '미완료'
    END as status_korean
FROM public.lecture_progress lp
JOIN public.lectures l ON lp.lecture_id = l.id
JOIN auth.users au ON lp.user_id = au.id
ORDER BY au.email, l.title;

-- 관리자 VIEW는 특별한 권한이 있는 사용자만 접근 가능하도록 설정
-- (실제 운영에서는 관리자 역할을 확인하는 로직 필요)
