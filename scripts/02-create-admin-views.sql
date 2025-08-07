-- 관리자용 진도 관리 VIEW 생성

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

-- 사용자별 진도 요약 VIEW
CREATE OR REPLACE VIEW public.user_progress_summary AS
SELECT 
    au.id as user_id,
    au.email,
    au.created_at as user_created_at,
    au.last_sign_in_at,
    COUNT(lp.lecture_id) as total_lectures_started,
    COUNT(CASE WHEN lp.completed = true THEN 1 END) as completed_lectures,
    COUNT(CASE WHEN lp.completed = false THEN 1 END) as incomplete_lectures,
    ROUND(
        (COUNT(CASE WHEN lp.completed = true THEN 1 END) * 100.0 / 
         NULLIF(COUNT(lp.lecture_id), 0)), 2
    ) as completion_percentage
FROM auth.users au
LEFT JOIN public.lecture_progress lp ON au.id = lp.user_id
GROUP BY au.id, au.email, au.created_at, au.last_sign_in_at
ORDER BY au.email;

-- 강의별 진도 요약 VIEW
CREATE OR REPLACE VIEW public.lecture_progress_summary AS
SELECT 
    l.id as lecture_id,
    l.title as lecture_title,
    l.video_url,
    l.created_at as lecture_created_at,
    COUNT(lp.user_id) as total_students,
    COUNT(CASE WHEN lp.completed = true THEN 1 END) as completed_students,
    COUNT(CASE WHEN lp.completed = false THEN 1 END) as incomplete_students,
    ROUND(
        (COUNT(CASE WHEN lp.completed = true THEN 1 END) * 100.0 / 
         NULLIF(COUNT(lp.user_id), 0)), 2
    ) as completion_rate
FROM public.lectures l
LEFT JOIN public.lecture_progress lp ON l.id = lp.lecture_id
GROUP BY l.id, l.title, l.video_url, l.created_at
ORDER BY l.title;
