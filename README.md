# 청라에너지 AI 교육 플랫폼

청라에너지와 도슨티가 함께하는 DX 역량강화 교육을 위한 온라인 학습 플랫폼입니다.

## 🚀 현재 상황

이 프로젝트는 **Inflearn 클론**을 기반으로 한 교육 플랫폼으로, 다음과 같은 기능들이 구현되어 있습니다:

### ✅ 구현된 기능
- **사용자 인증**: Supabase Auth를 통한 이메일/소셜 로그인
- **강의 시청**: YouTube 임베드를 통한 동영상 강의 제공
- **진도 관리**: 강의 완료 상태 추적 및 관리
- **반응형 디자인**: 모바일/데스크톱 최적화
- **실시간 데이터베이스**: Supabase를 통한 사용자 진도 저장

### 📚 현재 제공 중인 강의
1. **생성형 AI 이미지 영상 만들기** - 에아트 김태우 대표
2. **AI 영상 영화 제작 입문자를 위한 편집 비법**
3. **15분만에 만드는 애니메이션 영상**
4. **동일한 캐릭터로 연속 이미지 만들기**

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

#### 4-2. 데이터베이스 테이블 생성

**옵션 1: 기존 데이터를 유지하면서 수정 (권장)**
Supabase SQL Editor에서 다음 스크립트들을 순서대로 실행하세요:

1. `scripts/fix-rls-policies-final.sql` - RLS 정책 수정 및 필요한 강의 데이터 추가
2. `scripts/add-unique-constraint-fixed.sql` - 중복 제거 및 유니크 제약조건 추가

**옵션 2: 완전히 새로 시작 (데이터 삭제됨)**
기존 데이터를 모두 삭제하고 새로 시작하려면:
- `scripts/reset-and-recreate-tables.sql` 실행

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

## 🔧 문제 해결

### RLS 정책 오류가 발생하는 경우
\`\`\`
Error creating lecture: new row violates row-level security policy for table "lectures"
\`\`\`

이 오류가 발생하면 다음 스크립트를 실행하세요:
1. `scripts/fix-rls-policies-final.sql`
2. `scripts/add-unique-constraint-fixed.sql`

### 강의 데이터가 없는 경우
강의 목록이 비어있다면 `scripts/fix-rls-policies-final.sql`을 실행하여 샘플 데이터를 추가하세요.

## 📁 프로젝트 구조

\`\`\`
├── app/                    # Next.js App Router
│   ├── auth/              # 인증 관련 API 라우트
│   ├── course/            # 강의 상세 페이지
│   ├── lectures/          # 강의 목록 및 개별 강의 페이지
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 홈페이지
├── components/            # 재사용 가능한 컴포넌트
│   ├── ui/               # shadcn/ui 컴포넌트
│   ├── CompleteButton.tsx # 강의 완료 버튼
│   └── login-modal.tsx   # 로그인 모달
├── contexts/             # React Context
│   └── auth-context.tsx  # 인증 컨텍스트
├── lib/                  # 유틸리티 및 설정
│   └── supabase/         # Supabase 클라이언트 설정
├── public/               # 정적 파일
└── scripts/              # 데이터베이스 스크립트
\`\`\`

## 🔧 주요 기능 설명

### 인증 시스템
- **이메일 회원가입/로그인**: 이메일 인증 포함
- **소셜 로그인**: Google OAuth 지원
- **세션 관리**: Supabase Auth를 통한 자동 세션 관리

### 강의 시스템
- **동영상 스트리밍**: YouTube 임베드 활용
- **진도 추적**: 사용자별 강의 완료 상태 저장
- **타임스탬프 네비게이션**: 강의 내 특정 시점으로 이동

### 반응형 디자인
- **모바일 최적화**: 모든 화면 크기에서 최적화된 UI
- **다크모드 지원**: 사용자 선호도에 따른 테마 변경

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

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

- **청라에너지**: [http://www.e-cheongna.co.kr/](http://www.e-cheongna.co.kr/)
- **도슨티 AI**: [https://www.docenty.ai](https://www.docenty.ai)

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

---

**청라에너지 x 도슨티 DX 역량강화 교육** 🚀
