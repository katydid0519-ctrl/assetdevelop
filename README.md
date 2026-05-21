# 총무 업무 관리 PWA

## 📌 프로젝트 소개

총무 업무 관리 앱은 자산개발, 일반총무, 매출세금계산서, 계약서, 기안문, 일정과 백업 데이터를 한곳에서 관리하는 브라우저 기반 업무 도구입니다.

주요 기능:

- 자산개발/일반총무 현황, 계약 만기, 차량/임차 데이터를 관리합니다.
- 매출세금계산서, 기안문, 임대차/매매계약서를 작성하고 Word, PDF, HTML로 출력합니다.
- 사이드바 일정 캘린더와 데이터 백업/복구 기능을 제공합니다.
- PWA 설치를 지원하여 배포 주소 접속 후 앱처럼 실행할 수 있습니다.

## 🚀 빠른 시작 (사용자용)

1. 배포된 Netlify 주소에 접속합니다.
2. 크롬 또는 엣지 주소창의 설치 아이콘을 누르거나, 앱 상단의 `앱 설치` 버튼을 클릭합니다.
3. 설치가 완료되면 바탕화면 또는 시작 메뉴의 아이콘으로 실행합니다.
4. 필요한 업무 정보를 입력한 뒤 문서, 계약서, 엑셀, PDF를 다운로드하거나 복사해 사용합니다.

## 🛠️ 로컬 개발 환경

`file://` 주소로 직접 열면 브라우저 보안 정책 때문에 Service Worker와 PWA 설치 기능이 정상 동작하지 않습니다. 로컬에서도 반드시 간단한 웹 서버로 실행하세요.

### VS Code Live Server

1. VS Code에서 프로젝트 폴더를 엽니다.
2. Live Server 확장을 설치합니다.
3. `index.html`에서 `Open with Live Server`를 실행합니다.

### Python 서버

```bash
python -m http.server 8080
```

브라우저에서 아래 주소로 접속합니다.

```text
http://localhost:8080
```

## 📦 GitHub에 올리기 (단계별)

GitHub 웹사이트에서 먼저 새 저장소를 만듭니다.

1. [github.com](https://github.com)에 로그인합니다.
2. 오른쪽 위 `+` 버튼에서 `New repository`를 선택합니다.
3. 저장소 이름을 입력하고 `Create repository`를 클릭합니다.
4. 아래 명령어를 프로젝트 폴더에서 실행합니다.

```bash
git init
git add .
git commit -m "Initial commit: 총무 업무 관리 PWA"
git branch -M main
git remote add origin https://github.com/{사용자명}/{저장소명}.git
git push -u origin main
```

## 🌐 Netlify 배포

### 방법 A) GitHub 연동 (추천)

1. [netlify.com](https://www.netlify.com)에 가입하고 GitHub 계정으로 로그인합니다.
2. `Add new site` → `Import an existing project`를 선택합니다.
3. GitHub 저장소를 선택합니다.
4. Build settings는 그대로 두고 `Deploy`를 클릭합니다.
5. 발급된 주소 예: `random-name.netlify.app`를 확인합니다.
6. `Site settings` → `Change site name`에서 원하는 사이트 이름으로 변경합니다.

### 방법 B) 드래그&드롭 (간단)

1. [netlify.com](https://www.netlify.com)에 로그인합니다.
2. 프로젝트 폴더 전체를 Netlify 배포 화면에 드래그합니다.
3. 즉시 배포가 완료됩니다.

## 🔄 업데이트 방법

1. `index.html` 또는 필요한 파일을 수정합니다.
2. `service-worker.js`의 `CACHE_VERSION` 값을 `v2`, `v3`처럼 올립니다.
3. 변경 사항을 커밋하고 `git push`합니다.
4. Netlify가 자동 재배포합니다.
5. 사용자는 앱을 한 번 닫았다 다시 열면 새 버전을 받을 수 있습니다.

## 🎨 아이콘 만들기

PWA 설치를 위해 아래 PNG 파일이 필요합니다.

- `icons/icon-192.png`
- `icons/icon-512.png`

무료 도구:

- [PWA Builder Image Generator](https://www.pwabuilder.com/imageGenerator)
- [RealFaviconGenerator](https://realfavicongenerator.net)

아이콘을 만든 뒤 `icons/` 폴더에 같은 파일명으로 넣으면 됩니다.

## ❓ 문제 해결 FAQ

### 설치 버튼이 안 보여요

HTTPS 주소로 접속했는지 확인하세요. 크롬 또는 엣지에서 가장 안정적으로 동작합니다. 이미 설치된 상태라면 설치 버튼은 자동으로 숨겨질 수 있습니다.

### 오프라인에서 안 돼요

첫 접속은 온라인 상태여야 합니다. 한 번 정상 접속해 주요 파일이 캐시된 뒤 오프라인 실행이 가능합니다.

### 업데이트가 안 보여요

브라우저에서 `Ctrl+Shift+R`로 강력 새로고침하거나 앱을 완전히 종료한 뒤 다시 실행하세요. 배포 시 `service-worker.js`의 `CACHE_VERSION`도 올려야 합니다.

### template.docx를 못 찾아요

Word 템플릿을 사용하는 기능이 있다면 `template.docx`를 프로젝트 루트에 넣어야 합니다. Netlify 배포 시 `netlify.toml`에서 `.docx` MIME 타입을 명시하고 있습니다.

### file://에서는 왜 설치가 안 되나요

Service Worker는 보안상 HTTPS 또는 `localhost` 환경에서만 등록됩니다. 로컬 테스트는 Live Server 또는 `python -m http.server`를 사용하세요.
