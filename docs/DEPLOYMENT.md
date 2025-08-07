# 배포 가이드

## 환경별 Supabase 설정

### 개발 환경
1. Supabase에서 개발용 프로젝트 생성
2. `.env.local`에 개발용 환경변수 설정
3. 개발용 DB에 스크립트 실행

### 프로덕션 환경  
1. Supabase에서 프로덕션용 프로젝트 생성
2. Vercel Dashboard에 프로덕션 환경변수 설정
3. 프로덕션 DB에 스크립트 실행

## 데이터 마이그레이션

개발에서 프로덕션으로 데이터 이동이 필요한 경우:

\`\`\`sql
-- 1. 개발 DB에서 데이터 내보내기
SELECT * FROM public.lectures;

-- 2. 프로덕션 DB에 데이터 입력
INSERT INTO public.lectures (title, video_url) VALUES (...);
\`\`\`

## 환경별 URL 설정

### 개발 환경
- Site URL: `http://localhost:3000`
- Redirect URLs: `http://localhost:3000/auth/callback`

### 프로덕션 환경  
- Site URL: `https://your-domain.vercel.app`
- Redirect URLs: `https://your-domain.vercel.app/auth/callback`
