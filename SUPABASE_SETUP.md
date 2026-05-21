# Supabase 설정 및 실행 가이드

## 1. 패키지 설치

```bash
npm install
```

## 2. Supabase 프로젝트 생성

1. [Supabase Dashboard](https://supabase.com/dashboard)에서 새 프로젝트 생성
2. **SQL Editor**에서 [`supabase/migrations/001_students_and_missions.sql`](supabase/migrations/001_students_and_missions.sql) 내용을 실행

## 3. 환경변수 설정

`.env.local.example`을 복사해 `.env.local` 생성:

```bash
cp .env.local.example .env.local
```

| 변수 | 설명 |
|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role key (서버 전용, 절대 공개 금지) |
| `SESSION_SECRET` | 학생 JWT 서명용 (32자 이상 랜덤 문자열) |
| `ADMIN_SESSION_SECRET` | 관리자 JWT 서명용 (선택, 없으면 SESSION_SECRET 사용) |
| `ADMIN_USERNAME` | 관리자 로그인 아이디 |
| `ADMIN_PASSWORD` | 관리자 로그인 비밀번호 |

Supabase Dashboard → **Project Settings → API**에서 URL과 키를 확인할 수 있습니다.

## 4. 로컬 실행

```bash
npm run dev
```

- 홈: http://localhost:3000
- 회원가입: http://localhost:3000/register
- 미션 (로그인 필요): http://localhost:3000/mission
- 리더보드: http://localhost:3000/score
- 관리자: http://localhost:3000/admin/login

## 5. Vercel 배포

1. GitHub에 푸시 후 Vercel에 프로젝트 연결
2. **Environment Variables**에 `.env.local`과 동일한 변수 등록
3. `SUPABASE_SERVICE_ROLE_KEY`, `SESSION_SECRET`, `ADMIN_*`는 **Production / Preview / Development** 모두 설정 권장

## 6. DB 스키마 요약

- **students**: 학번, 이름, password_hash(bcrypt), total_score
- **mission_attempts**: 학생별 미션 풀이 기록 (mission_id당 1건, 최초 정답만 점수)
- **RLS**: anon/authenticated 직접 접근 차단, 서버(service role) 경유

## 7. 점수 규칙

| 난이도 | 기본점 |
|--------|--------|
| 쉬움 | 20 |
| 보통 | 30 |
| 어려움 | 50 |

오답 1회당 -5점, 최소 0점. 이미 맞춘 mission_id는 재제출 시 점수 미반영.
