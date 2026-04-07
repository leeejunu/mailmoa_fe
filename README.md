# Mailmoa — 프론트엔드

> 여러 메일 계정을 하나의 화면에서 확인하는 통합 메일 클라이언트

## 소개

Mailmoa는 Gmail, Naver 등 여러 메일 계정을 한 곳에서 관리할 수 있는 웹 애플리케이션입니다.
계정을 연동하면 메일을 자동으로 동기화하고, 깔끔한 UI에서 읽기·삭제·검색을 모두 처리할 수 있습니다.

---

## 화면 구성

### 랜딩 페이지
![Landing](https://placehold.co/800x450/0f172a/6366f1?text=Landing+Page)

서비스 소개 및 로그인/회원가입 진입점.

### 메인 메일함
![Mail App](https://placehold.co/800x450/0f172a/6366f1?text=Mail+App)

| 영역 | 설명 |
|------|------|
| **사이드바** | 전체/읽지않음/중요 필터, 계정별 필터, 계정 추가 |
| **메일 목록** | 무한 스크롤, 검색, 읽음/안읽음 표시 |
| **메일 상세** | 본문 lazy 로딩, 별표, 삭제 |

### 계정 연동 모달
![Connect Modal](https://placehold.co/800x450/0f172a/6366f1?text=Connect+Account+Modal)

- **Gmail**: Google OAuth2 리디렉션 연동
- **Naver**: IMAP 아이디/앱 비밀번호 입력

---

## 주요 기능

- **통합 메일함** — Gmail, Naver 메일을 하나의 목록으로
- **실시간 동기화** — 계정 연동 직후 자동 동기화 및 로딩 상태 표시
- **무한 스크롤** — 스크롤 끝에 도달하면 이전 메일 자동 로드
- **통합 검색** — 발신자·제목·미리보기 전체 검색
- **읽음 처리** — 메일 열람 시 자동 읽음 처리 (서버 반영)
- **메일 삭제** — 휴지통 이동 처리
- **별표(중요)** — 로컬 상태 관리
- **본문 lazy 로딩** — 메일 클릭 시 본문만 별도 요청

---

## 기술 스택

| 항목 | 내용 |
|------|------|
| Framework | React 19 |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 |
| Build | Vite 8 |
| 상태 관리 | useState / useContext (AuthContext) |
| API 통신 | fetch (REST) |

---

## 프로젝트 구조

```
src/
├── api/
│   ├── mail.js          # 메일 관련 API (목록, 동기화, 삭제 등)
│   └── mailaccount.js   # 계정 연결 API (Naver)
├── components/
│   ├── Sidebar.jsx          # 사이드바 (필터, 계정 목록)
│   ├── MailList.jsx          # 메일 목록 + 무한 스크롤
│   ├── MailDetail.jsx        # 메일 상세 뷰
│   └── ConnectAccountModal.jsx  # 계정 연동 모달
├── context/
│   └── AuthContext.jsx  # JWT 토큰 / 로그인 상태 전역 관리
├── pages/
│   ├── LandingPage.jsx
│   ├── LoginPage.jsx
│   └── SignupPage.jsx
└── App.jsx              # 라우팅, 메일 앱 상태 관리
```

---

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev

# 프로덕션 빌드
npm run build
```

백엔드 서버는 `http://localhost:8080`에서 실행 중이어야 합니다.
백엔드 레포지토리: [`mailmoa`](../mailmoa)

---

## 환경 변수

별도 `.env` 설정 없이 `src/api/mail.js` 상단의 `BASE_URL`을 수정해 백엔드 주소를 변경할 수 있습니다.

```js
const BASE_URL = 'http://localhost:8080'
```

---

## Naver 메일 연동 전 설정

IMAP 연동을 위해 네이버 메일에서 아래 설정이 필요합니다.

1. 네이버 메일 → 환경설정 → **POP3/IMAP 설정**
2. **IMAP/SMTP 사용함** 으로 변경 후 저장
3. **2단계 인증** 설정
4. **애플리케이션 비밀번호 생성** (종류: 직접 입력 → `mailmoa`)
5. 생성된 12자리 비밀번호를 계정 연동 시 입력
