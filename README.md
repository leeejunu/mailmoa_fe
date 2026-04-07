<div align="center">

# Mailmoa

<img src="https://placehold.co/300x300/0f172a/6366f1?text=Mailmoa" width="300" alt="Mailmoa Logo"/>

여러 메일 계정을 **한 곳에서** 통합 관리하는 메일 클라이언트 서비스

</div>

---

## 프로젝트 소개

현대인은 업무용 Gmail, 개인용 Naver 메일 등 여러 계정을 동시에 사용합니다.
매번 탭을 바꿔가며 각 서비스에 접속하는 불편함을 해결하기 위해 Mailmoa를 만들었습니다.

Mailmoa는 Gmail, Naver 메일을 하나의 화면에서 확인하고 관리할 수 있는 통합 메일 클라이언트입니다.
계정을 연동하면 메일이 자동으로 동기화되고, 읽기·삭제·검색을 한 곳에서 처리할 수 있습니다.

- 여러 계정의 메일을 **하나의 타임라인**으로 통합하여 확인
- 계정 연동 직후 **자동 동기화** 및 로딩 상태 표시
- 메일 목록 **무한 스크롤** 및 통합 검색
- 메일 본문은 **클릭 시 lazy 로딩**으로 빠른 목록 렌더링

---

## 시작 가이드

### 요구 사항

- Node.js 18 이상
- 백엔드 서버 실행 중 (`http://localhost:8080`)

### 설치 및 실행

```bash
# 1. 레포지토리 클론
git clone https://github.com/your-username/mailmoa_fe.git
cd mailmoa_fe

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:5173` 으로 접속합니다.

```bash
# 프로덕션 빌드
npm run build
```

---

## 기술 스택

**Environment**

![VSCode](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

**Development**

![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router_v7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## 화면 구성

| 랜딩 페이지 | 로그인 |
|:-----------:|:------:|
| ![Landing](https://placehold.co/400x250/0f172a/6366f1?text=Landing) | ![Login](https://placehold.co/400x250/0f172a/6366f1?text=Login) |

| 메인 메일함 | 계정 연동 모달 |
|:-----------:|:-------------:|
| ![Mail](https://placehold.co/400x250/0f172a/6366f1?text=Mail+App) | ![Modal](https://placehold.co/400x250/0f172a/6366f1?text=Connect+Modal) |

---

## 주요 기능

### 통합 메일함
- Gmail, Naver 메일을 하나의 목록으로 통합 표시
- 전체 / 읽지 않음 / 중요 / 계정별 필터링
- 발신자·제목·미리보기 통합 검색

### 메일 동기화
- 계정 연동 직후 자동 동기화 + 로딩 메시지 표시
- 수동 동기화 요청 지원
- 무한 스크롤로 이전 메일 추가 로드

### 메일 관리
- 메일 열람 시 자동 읽음 처리 (서버 반영)
- 메일 삭제 (휴지통 이동)
- 별표(중요) 표시

### 계정 연동
- **Gmail**: Google OAuth2 리디렉션 연동
- **Naver**: IMAP 아이디 + 앱 비밀번호 입력 연동 (설정 안내 포함)

---

## 백엔드

백엔드 레포지토리: [`mailmoa`](../mailmoa)
