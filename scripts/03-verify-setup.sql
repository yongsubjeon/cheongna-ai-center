-- 설정 확인 스크립트

-- 테이블 구조 확인
SELECT 'Table structure for lectures:' as info;
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'lectures' AND table_schema = 'public'
ORDER BY ordinal_position;

-- 제약조건 확인
SELECT 'Constraints on lectures table:' as info;
SELECT constraint_name, constraint_type
FROM information_schema.table_constraints
WHERE table_name = 'lectures' AND table_schema = 'public';

-- RLS 정책 확인
SELECT 'RLS policies:' as info;
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename IN ('lectures', 'lecture_progress');

-- 강의 데이터 확인
SELECT 'Current lectures:' as info;
SELECT id, title FROM public.lectures ORDER BY title;

-- RLS 활성화 상태 확인
SELECT 'RLS status:' as info;
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE tablename IN ('lectures', 'lecture_progress');
