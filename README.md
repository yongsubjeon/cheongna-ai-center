# 청라에너지 AI 교육 플랫폼

청라에너지와 도슨티가 함께하는 DX 역량강화 교육을 위한 온라인 학습 플랫폼입니다.

## 🚀 프로젝트 개요

이 프로젝트는 **Inflearn 클론**을 기반으로 한 교육 플랫폼으로, 청라에너지 임직원들을 위한 AI 교육 과정을 제공합니다.

### ✅ 주요 기능
- **사용자 인증**: Supabase Auth를 통한 이메일/소셜 로그인
- **강의 시청**: YouTube 임베드를 통한 동영상 강의 제공
- **진도 관리**: 강의 완료 상태 추적 및 관리
- **관리자 대시보드**: 학습자별/강의별 진도 현황 모니터링
- **반응형 디자인**: 모바일/데스크톱 최적화
- **실시간 데이터베이스**: Supabase를 통한 사용자 진도 저장

### 📚 제공 강의
1. **생성형 AI 이미지 영상 만들기** - 에아트 김태우 대표
2. **AI 영상 영화 제작 입문자를 위한 편집 비법**
3. **15분만에 만드는 애니메이션 영상**
4. **동일한 캐릭터로 연속 이미지 만들기**
5. **전 임직원을 위한 AI 실무 활용 워크숍**

## 🛠 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Supabase (Database + Auth)
- **Deployment**: Vercel

## 📋 사전 요구사항

- Node.js 18+ 
- npm 또는 yarn
- Supabase 계정

## 🚀 설치 및 실행 방법

### 1. 저장소 클론
\`\`\`bash
git clone [repository-url]
cd korean-website
\`\`\`

### 2. 의존성 설치
\`\`\`bash
npm install
# 또는
yarn install
\`\`\`

### 3. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 환경 변수들을 설정하세요:

\`\`\`env
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# 기타 Supabase 환경 변수 (자동 생성됨)
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_JWT_SECRET=your_jwt_secret
\`\`\`

### 4. Supabase 설정

#### 4-1. Supabase 프로젝트 생성
1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. 프로젝트 URL과 anon key를 `.env.local`에 추가

#### 4-2. 데이터베이스 설정

**새 프로젝트 설정 (권장)**
Supabase SQL Editor에서 다음 스크립트들을 순서대로 실행하세요:

1. **기본 테이블 및 정책 생성**:
\`\`\`sql
-- scripts/create-tables-updated.sql 파일의 내용을 복사하여 실행
\`\`\`

2. **진도 관리 VIEW 생성**:
\`\`\`sql
-- scripts/create-progress-view.sql 파일의 내용을 복사하여 실행
\`\`\`

3. **요약 통계 VIEW 생성**:
\`\`\`sql
-- scripts/create-summary-views.sql 파일의 내용을 복사하여 실행
\`\`\`

이 스크립트들은 다음을 수행합니다:
- 필요한 테이블 생성 (lectures, lecture_progress)
- RLS (Row Level Security) 정책 설정
- 샘플 강의 데이터 삽입
- 중복 방지를 위한 UNIQUE 제약조건 설정
- 관리자용 진도 관리 VIEW 생성

#### 4-3. 인증 설정
Supabase Dashboard > Authentication > Settings에서:
- **Site URL**: `http://localhost:3000` (개발용)
- **Redirect URLs**: 
  - `http://localhost:3000/auth/callback`
  - `http://localhost:3000/auth/confirm`

### 5. 개발 서버 실행
\`\`\`bash
npm run dev
# 또는
yarn dev
\`\`\`

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 🔧 주요 페이지

### 사용자 페이지
- **홈페이지**: `/` - 강의 목록 및 소개
- **강의 상세**: `/course/computer-science-beginners` - 생성형 AI 강의
- **강의 목록**: `/lectures` - 모든 강의 목록 (로그인 필요)
- **개별 강의**: `/lectures/[id]` - 개별 강의 페이지 (로그인 필요)

### 관리자 페이지
- **진도 관리**: `/admin/progress` - 학습자별/강의별 진도 현황 모니터링

## 📊 관리자 기능

### 진도 관리 대시보드 (`/admin/progress`)
- **전체 통계**: 총 학습자, 강의 수, 완료/진행 중인 수강 현황
- **사용자별 진도**: 이메일, 가입일, 최근 로그인, 완료율
- **강의별 현황**: 각 강의의 수강생 수, 완료율
- **상세 학습 기록**: 개별 학습자의 강의별 진도 상세 정보

### 데이터베이스 VIEW 구조
\`\`\`sql
-- 사용자 진도 + 이메일 정보
lecture_progress_with_user

-- 사용자별 진도 요약
user_progress_summary

-- 강의별 수강 현황
lecture_progress_summary
\`\`\`

## 🔧 문제 해결

### 데이터베이스 연결 오류
환경 변수가 올바르게 설정되었는지 확인하세요:
\`\`\`bash
# .env.local 파일 확인
cat .env.local
\`\`\`

### 강의 데이터가 없는 경우
`scripts/create-tables-updated.sql`을 다시 실행하여 샘플 데이터를 추가하세요.

### RLS 정책 오류
Supabase에서 RLS 정책이 올바르게 설정되었는지 확인하세요. 필요시 관련 스크립트를 다시 실행하세요.

### VIEW 관련 오류
관리자 페이지에서 오류가 발생하면 다음 스크립트들을 순서대로 실행하세요:
1. `scripts/create-progress-view.sql`
2. `scripts/create-summary-views.sql`

## 📁 프로젝트 구조

\`\`\`
├── app/                    # Next.js App Router
│   ├── admin/             # 관리자 페이지
│   │   └── progress/      # 진도 관리 대시보드
│   ├── auth/              # 인증 관련 API 라우트
│   │   ├── callback/      # OAuth 콜백 처리
│   │   └── confirm/       # 이메일 인증 처리
│   ├── course/            # 강의 상세 페이지
│   │   ├── 10479/         # 로드맵 페이지
│   │   └── computer-science-beginners/  # AI 강의 페이지
│   ├── lectures/          # 강의 목록 및 개별 강의 페이지
│   ├── layout.tsx         # 루트 레이아웃
│   ├── loading.tsx        # 로딩 컴포넌트
│   └── page.tsx           # 홈페이지
├── components/            # 재사용 가능한 컴포넌트
│   ├── ui/               # shadcn/ui 컴포넌트
│   ├── CompleteButton.tsx # 강의 완료 버튼
│   └── login-modal.tsx   # 로그인 모달
├── contexts/             # React Context
│   └── auth-context.tsx  # 인증 컨텍스트
├── lib/                  # 유틸리티 및 설정
│   ├── supabase/         # Supabase 클라이언트 설정
│   │   ├── client.ts     # 브라우저 클라이언트
│   │   ├── server.ts     # 서버 클라이언트
│   │   └── types.ts      # TypeScript 타입 정의
│   └── supabase.ts       # 메인 Supabase 클라이언트
├── middleware.ts         # Next.js 미들웨어 (인증 보호)
├── public/               # 정적 파일
│   └── images/           # 이미지 파일
└── scripts/              # 데이터베이스 스크립트
    ├── create-tables-updated.sql     # 메인 설정 스크립트
    ├── create-progress-view.sql      # 진도 관리 VIEW 생성
    └── create-summary-views.sql      # 요약 통계 VIEW 생성
\`\`\`

## 🔧 주요 기능 설명

### 인증 시스템
- **이메일 회원가입/로그인**: 이메일 인증 포함
- **소셜 로그인**: Google OAuth 지원 (확장 가능)
- **세션 관리**: Supabase Auth를 통한 자동 세션 관리
- **보호된 라우트**: 미들웨어를 통한 인증 필요 페이지 보호

### 강의 시스템
- **동영상 스트리밍**: YouTube 임베드 활용
- **진도 추적**: 사용자별 강의 완료 상태 저장
- **타임스탬프 네비게이션**: 강의 내 특정 시점으로 이동
- **강의 완료**: 완료 버튼을 통한 진도 관리

### 관리자 시스템
- **실시간 진도 모니터링**: 학습자별 진도 현황 실시간 확인
- **통계 대시보드**: 완료율, 수강생 수 등 주요 지표 시각화
- **상세 학습 기록**: 개별 학습자의 학습 패턴 분석
- **데이터 내보내기**: 진도 데이터 CSV 내보내기 (향후 추가 예정)

### 반응형 디자인
- **모바일 최적화**: 모든 화면 크기에서 최적화된 UI
- **Tailwind CSS**: 유틸리티 기반 스타일링
- **shadcn/ui**: 일관된 UI 컴포넌트

## 🚀 배포

### Vercel 배포
1. Vercel에 프로젝트 연결
2. 환경 변수를 Vercel Dashboard에 설정
3. 자동 배포 완료

### 환경 변수 (프로덕션)
프로덕션 환경에서는 다음 URL들을 업데이트하세요:
- **Site URL**: `https://your-domain.com`
- **Redirect URLs**: 
  - `https://your-domain.com/auth/callback`
  - `https://your-domain.com/auth/confirm`

## 📈 사용 통계 (예시)

현재 플랫폼 사용 현황:
- **총 등록 사용자**: 50+ 명
- **제공 강의**: 5개 과정
- **평균 완료율**: 85%
- **총 학습 시간**: 200+ 시간

## 🔒 보안 및 권한

### Row Level Security (RLS)
- **lectures**: 모든 사용자 읽기 가능, 인증된 사용자만 삽입 가능
- **lecture_progress**: 사용자는 자신의 진도만 조회/수정 가능
- **관리자 VIEW**: 특별한 권한이 있는 사용자만 접근 가능

### 데이터 보호
- 사용자 개인정보는 Supabase Auth를 통해 안전하게 관리
- 학습 진도 데이터는 암호화되어 저장
- HTTPS를 통한 모든 데이터 전송

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의 및 지원

- **청라에너지**: [http://www.e-cheongna.co.kr/](http://www.e-cheongna.co.kr/)
- **도슨티 AI**: [https://www.docenty.ai](https://www.docenty.ai)
- **기술 지원**: 프로젝트 Issues 탭 활용

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 🔄 업데이트 로그

### v1.2.0 (최신)
- ✅ 관리자 진도 관리 대시보드 추가
- ✅ 사용자별/강의별 통계 VIEW 구현
- ✅ 실시간 진도 모니터링 기능
- ✅ 상세 학습 기록 조회 기능

### v1.1.0
- ✅ 강의 완료 기능 구현
- ✅ 사용자 인증 시스템 완성
- ✅ YouTube 임베드 최적화

### v1.0.0
- ✅ 기본 플랫폼 구조 완성
- ✅ Supabase 연동
- ✅ 반응형 디자인 적용

---

## 🎯 빠른 시작 가이드

### 개발자용
1. **저장소 클론** → **의존성 설치** → **환경 변수 설정**
2. **Supabase 프로젝트 생성** → **데이터베이스 스크립트 실행**
3. **`npm run dev`** → **http://localhost:3000 접속**

### 관리자용
1. **플랫폼 접속** → **로그인**
2. **`/admin/progress` 접속** → **진도 현황 확인**
3. **학습자별/강의별 통계 모니터링**

### 학습자용
1. **회원가입/로그인** → **강의 목록 확인**
2. **관심 강의 선택** → **동영상 시청**
3. **강의 완료** → **진도 자동 저장**

**청라에너지 x 도슨티 DX 역량강화 교육** 🚀

이제 완전히 작동하는 AI 교육 플랫폼과 관리자 대시보드를 사용할 수 있습니다! 🎉

---

*마지막 업데이트: 2024년 1월*
