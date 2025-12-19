# 온라인 마른김 거래소 - 관리자 시스템

## 📋 프로젝트 개요

Next.js 15 (App Router) + Supabase 기반의 B2B 마른김 거래소 관리자 시스템입니다.

### 주요 기능

- ✅ **회원 관리**: 바이어 가입 승인/반려, 회원 정보 조회/수정
- ✅ **제품 관리**: 마른김 제품 등록/수정/삭제, 등급별 관리
- ✅ **예약 관리**: 구매 예약 승인/반려, 예약 내역 조회
- ✅ **시세 관리**: 국가별(한국/중국/일본) 시세 등록/조회, 차트 시각화
- ✅ **공지사항 관리**: 공지사항 및 뉴스 게시/관리
- ✅ **대시보드**: 주요 통계 및 최근 활동 요약
- ✅ **감사 로그**: 모든 데이터 변경사항 추적

---

## 🛠️ 기술 스택

### Frontend
- **Framework**: Next.js 15.2.4 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Radix UI + shadcn/ui
- **Charts**: Chart.js + react-chartjs-2
- **Forms**: react-hook-form + zod

### Backend
- **Database**: PostgreSQL (Supabase)
- **API**: Next.js API Routes
- **Authentication**: JWT + bcryptjs
- **ORM**: Supabase Client

### Infrastructure
- **Hosting**: Vercel (권장)
- **Database**: Supabase
- **Storage**: Supabase Storage (파일 업로드)

---

## 📁 프로젝트 구조

```
SOMIHO-USER/
├── app/                          # Next.js App Router
│   ├── admin/                    # 관리자 페이지
│   │   ├── layout.tsx            # 관리자 공통 레이아웃
│   │   ├── page.tsx              # 대시보드
│   │   ├── members/              # 회원 관리
│   │   ├── products/             # 제품 관리
│   │   ├── market-price/         # 시세 관리
│   │   ├── reservations/         # 예약 관리
│   │   └── notices/              # 공지사항 관리
│   └── api/                      # Next.js API Routes
│       ├── auth/                 # 인증 API
│       ├── members/              # 회원 API
│       ├── products/             # 제품 API
│       ├── reservations/         # 예약 API
│       ├── market-prices/        # 시세 API
│       └── notices/              # 공지사항 API
├── components/                   # React 컴포넌트
│   ├── ui/                       # shadcn/ui 컴포넌트
│   ├── sidebar.tsx               # 사이드바 네비게이션
│   ├── price-chart.tsx           # 시세 차트
│   └── confirm-modal.tsx         # 확인 모달
├── lib/                          # 유틸리티 함수
│   ├── supabase/                 # Supabase 클라이언트
│   ├── auth/                     # 인증 관련
│   ├── middleware/               # API 미들웨어
│   └── utils/                    # 공통 유틸
├── types/                        # TypeScript 타입 정의
│   ├── supabase.ts               # Supabase DB 타입
│   └── api.ts                    # API 타입
├── supabase/                     # Supabase 설정
│   └── migrations/               # DB 마이그레이션 파일
└── docs/                         # 문서
    ├── database/                 # 데이터베이스 설계
    └── SUPABASE_SETUP.md         # Supabase 설정 가이드
```

---

## 🚀 시작하기

### 1. 필수 요구사항

- Node.js 18.17 이상
- pnpm (권장) 또는 npm/yarn
- Supabase 계정

### 2. 설치

```bash
# 저장소 클론
git clone https://github.com/your-username/SOMIHO-USER.git
cd SOMIHO-USER

# 패키지 설치
pnpm install
# 또는
npm install
```

### 3. Supabase 설정

**자세한 설정 방법은 [docs/SUPABASE_SETUP.md](./docs/SUPABASE_SETUP.md)를 참조하세요.**

#### 3-1. Supabase 프로젝트 생성
1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. 프로젝트 대시보드에서 API 키 확인

#### 3-2. 데이터베이스 마이그레이션
Supabase SQL 에디터에서 `supabase/migrations/` 폴더의 파일들을 순서대로 실행

#### 3-3. 환경변수 설정
`.env.local` 파일 생성:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this

# Other
BCRYPT_SALT_ROUNDS=10
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

### 4. 개발 서버 실행

```bash
pnpm dev
# 또는
npm run dev
```

브라우저에서 http://localhost:3000/admin 접속

### 5. 기본 관리자 계정

```
이메일: admin@johns635.com
비밀번호: admin123
```

**⚠️ 배포 전 반드시 비밀번호 변경 필요!**

---

## 📚 API 문서

### 인증

```bash
# 로그인
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@johns635.com",
  "password": "admin123"
}

# 응답
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expires_at": "2025-01-20T..."
  }
}

# 인증된 요청
GET /api/members
Authorization: Bearer {token}
```

### 주요 엔드포인트

| 엔드포인트 | Method | 설명 |
|-----------|--------|------|
| `/api/auth/login` | POST | 로그인 |
| `/api/auth/me` | GET | 현재 사용자 정보 |
| `/api/members` | GET, POST | 회원 목록, 등록 |
| `/api/members/:id` | GET, PATCH, DELETE | 회원 상세, 수정, 삭제 |
| `/api/members/:id/approve` | POST | 회원 승인 |
| `/api/members/:id/reject` | POST | 회원 반려 |
| `/api/products` | GET, POST | 제품 목록, 등록 |
| `/api/products/:id` | GET, PATCH, DELETE | 제품 상세, 수정, 삭제 |
| `/api/reservations` | GET, POST | 예약 목록, 등록 |
| `/api/reservations/:id/approve` | POST | 예약 승인 |
| `/api/reservations/:id/reject` | POST | 예약 반려 |
| `/api/market-prices` | GET, POST | 시세 목록, 등록 |
| `/api/market-prices/:id` | PATCH, DELETE | 시세 수정, 삭제 |
| `/api/notices` | GET, POST | 공지사항 목록, 등록 |
| `/api/notices/:id` | GET, PATCH, DELETE | 공지사항 상세, 수정, 삭제 |
| `/api/notices/:id/toggle-publish` | POST | 게시/미게시 토글 |

---

## 🗄️ 데이터베이스 스키마

### 주요 테이블

- **admin_users**: 관리자 계정
- **members**: 회원(바이어)
- **products**: 제품
- **reservations**: 예약
- **market_prices**: 시세
- **notices**: 공지사항
- **audit_logs**: 감사 로그

자세한 스키마는 [docs/database/schema-design.md](./docs/database/schema-design.md) 참조

---

## 🔐 보안

### 인증 및 인가
- JWT 토큰 기반 인증
- 역할 기반 접근 제어 (RBAC)
- bcrypt 비밀번호 해싱

### 데이터베이스
- Supabase Row Level Security (RLS)
- API Service Role 키는 서버 사이드에서만 사용
- SQL Injection 방지

### 환경변수
- `.env.local` 파일은 Git에 포함되지 않음
- 프로덕션 환경변수는 배포 플랫폼에 별도 설정

---

## 🧪 테스트

```bash
# (추후 구현 예정)
pnpm test
```

---

## 📦 빌드 및 배포

### 빌드

```bash
pnpm build
```

### Vercel 배포

1. [Vercel](https://vercel.com)에 프로젝트 연결
2. 환경변수 설정 (`.env.local` 내용)
3. 배포 (자동)

자세한 내용은 [Next.js 배포 문서](https://nextjs.org/docs/deployment) 참조

---

## 📝 개발 로그

개발 히스토리 및 변경사항은 `docs/` 폴더 참조

- [2025-10-13-01-4th-modifications.md](./docs/2025-10-13-01-4th-modifications.md): 4차 수정사항

---

## 🤝 기여

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feat/amazing-feature`)
3. Commit your Changes (`git commit -m 'feat(scope): add amazing feature'`)
4. Push to the Branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

### 커밋 메시지 규칙

```
type(scope): 설명

예시:
- feat(auth): JWT 토큰 인증 구현
- fix(api): 회원 승인 버그 수정
- docs(readme): 설치 가이드 추가
```

---

## 📄 라이선스

이 프로젝트는 비공개 프로젝트입니다.

---

## 📞 문의

- 이메일: kwon@johns635.com
- 전화: +82-10-7330-7314

---

## 🙏 감사의 말

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

