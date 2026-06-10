# 총무 업무 관리 PWA 프로젝트 파악 문서

작성일: 2026-06-09  
작업 범위: `작업폴더` 내부 파일만 확인 및 문서화

## 1. 프로젝트 개요

이 프로젝트는 자산개발, 일반총무, 계약/문서 작성, 일정, 백업 업무를 한 화면에서 처리하기 위한 브라우저 기반 PWA입니다.

서버나 별도 데이터베이스 없이 `index.html` 중심으로 동작하며, 사용자가 입력한 업무 데이터는 브라우저 `localStorage`에 JSON 형태로 저장됩니다. Netlify 같은 정적 호스팅에 올려 바로 배포할 수 있고, `manifest.json`과 `service-worker.js`를 통해 설치형 앱처럼 사용할 수 있도록 구성되어 있습니다.

## 2. 폴더 구조

```text
작업폴더/
├─ index.html
├─ README.md
├─ manifest.json
├─ netlify.toml
├─ service-worker.js
├─ .gitignore
└─ icons/
   ├─ icon-192.png
   └─ icon-512.png
```

| 파일 | 역할 |
| --- | --- |
| `index.html` | 화면, 스타일, 데이터 모델, 업무 로직이 들어 있는 메인 앱 파일 |
| `README.md` | 사용자용 실행, 배포, 업데이트, FAQ 안내 |
| `manifest.json` | PWA 이름, 아이콘, 표시 방식, 시작 URL 설정 |
| `service-worker.js` | 앱 파일 및 일부 CDN 파일 캐시, 오프라인 기본 진입 처리 |
| `netlify.toml` | Netlify 정적 배포, 보안 헤더, 서비스 워커 캐시 정책, `.docx` MIME 설정 |
| `icons/` | PWA 설치 아이콘 |

## 3. 실행 방식

로컬에서 `file://`로 직접 열면 Service Worker와 PWA 설치 기능이 제한됩니다. 로컬 확인은 웹 서버로 실행하는 방식이 맞습니다.

```bash
python -m http.server 8080
```

접속 주소:

```text
http://localhost:8080
```

배포는 정적 파일 배포 방식입니다. `netlify.toml`의 `publish = "."` 설정에 따라 현재 폴더 전체가 배포 대상입니다.

## 4. 기술 구조

| 구분 | 내용 |
| --- | --- |
| 앱 형태 | 정적 HTML 기반 PWA |
| 프론트엔드 | 순수 HTML, CSS, JavaScript |
| 데이터 저장 | 브라우저 `localStorage` |
| 백업/복구 | JSON 파일 저장, JSON 텍스트 복사/붙여넣기, 범위별 복구 |
| 출력 | CSV 다운로드, 인쇄/PDF 출력, HTML 클립보드 복사, 계약서 Word 복사 |
| 배포 | Netlify 정적 호스팅 |
| 오프라인 | Service Worker 캐시 기반 |

외부 빌드 도구, 패키지 매니저, 프레임워크 설정은 현재 폴더에 없습니다. 앱의 대부분은 `index.html` 한 파일에 직접 포함되어 있습니다.

## 5. 주요 화면과 업무 영역

### 홈

- 앱 시작 화면
- 주요 업무 바로가기
- 사용설명서 및 백업/복구 진입
- 첫 방문 안내 모달 제공

### 자산개발

| 화면 | 주요 기능 |
| --- | --- |
| 자산개발 대시보드 | 자산, 임대, 미납, 만기 등 핵심 지표 요약 |
| 자산 관리 | 사업장/건물/자산 정보 관리 |
| 투자/대여 관리 | 투자 및 대여 관련 데이터 관리 |
| 임대 현황 | 임대 계약, 공실, 임차사, 보증금, 월 임대료, 관리비, 계약기간 관리 |
| 임대료 관리 | 월별 입금 등록, 미납/미수금 현황, 연간 월별 임대료 현황 |
| 자산개발 거래처 관리 | 회사, 사업자번호, 담당자, 이메일, 연락처 관리 |
| 자산개발 캘린더/만기 관리 | 임대 계약 만기 일정, 30/60/90일/1년 기준 만기 필터 |
| 자산개발 통계/요약 | 사업장별 임대율, 공실률, 건물별 임대료 합계, 월별 만기 예정 |

### 일반총무

| 화면 | 주요 기능 |
| --- | --- |
| 일반총무 대시보드 | 임차, 차량, 만기 예정 현황 요약 |
| 임차 현황 | 임차 주택, 이용 사업부, 임대/임차인, 보증금, 월세, 계약기간 관리 |
| 차량 현황 | 차량명, 사용자, 차량번호, 계약/보험 기간, 렌트료, 반납 계획 관리 |
| 일반총무 거래처 관리 | 거래처 마스터 확인 및 출력 |
| 일반총무 캘린더/만기 관리 | 임차/차량 계약 만기, 보험 만기 관리 |

### 업무 툴

| 화면/기능 | 주요 기능 |
| --- | --- |
| 매출세금계산서 | 문서 목록, 발행 양식 작성, 금액 검증, PDF 인쇄, 엑셀/전표 엑셀 출력, HTML 복사 |
| 기안문 작성 | 현재 앱 내부 섹션과 별도 팝업 연동 흔적이 함께 있음 |
| 내용증명서 작성 | 외부 사이트 `https://demandletterapp.netlify.app` 팝업 연결 |
| 임대차계약서 작성 | 3단계 위저드, 계약 조건/특약/관리비 입력, 미리보기, 인쇄/PDF, Word 복사 |
| 매매계약서 작성 | 4단계 위저드, 부동산 표시, 당사자, 매매 조건, 특약/첨부, Word 복사 |

참고: 사이드바의 `기안문 작성` 버튼은 현재 내부 `drafts` 탭이 아니라 `https://gwformatter.netlify.app` 팝업을 여는 방식입니다. 다만 `index.html` 안에는 `drafts` 섹션과 관련 함수도 남아 있어, 기존 내부 기능과 외부 팝업 전환이 섞여 있는 상태로 보입니다.

### 일정 및 데이터 관리

| 화면 | 주요 기능 |
| --- | --- |
| 일정 캘린더 | 월간 일정 등록, 선택 일정 삭제, 사이드바 미니 캘린더와 연동 |
| 데이터 관리 | 저장 상태 확인, 현재 시점 저장, 복원 지점 복구/삭제, 백업/복구 모달 진입 |

## 6. 데이터 저장 구조

앱은 업무별 배열을 `localStorage` 키로 나누어 저장합니다.

| 저장 키 | 저장 데이터 |
| --- | --- |
| `realEstateLeaseManager.records.v1` | 임대 계약/공실 데이터 |
| `realEstateLeaseManager.assets.v1` | 자산/사업장 데이터 |
| `realEstateLeaseManager.investments.v1` | 투자/대여 데이터 |
| `realEstateLeaseManager.leaseIns.v1` | 일반총무 임차 현황 |
| `realEstateLeaseManager.vehicles.v1` | 차량 현황 |
| `realEstateLeaseManager.payments.v1` | 임대료 입금 내역 |
| `realEstateLeaseManager.customers.v1` | 거래처 마스터 |
| `realEstateLeaseManager.taxInvoices.v1` | 매출세금계산서 문서 |
| `realEstateLeaseManager.draftDocs.v1` | 기안문 문서 |
| `realEstateLeaseManager.leaseContracts.v1` | 임대차계약서 문서 |
| `realEstateLeaseManager.saleContracts.v1` | 매매계약서 문서 |
| `realEstateLeaseManager.schedules.v1` | 일정 데이터 |
| `realEstateLeaseManager.hiddenColumns.v1` | 임대 현황 표 숨김 열 설정 |
| `realEstateLeaseManager.leaseInHiddenColumns.v1` | 임차 현황 표 숨김 열 설정 |
| `realEstateLeaseManager.vehicleHiddenColumns.v1` | 차량 현황 표 숨김 열 설정 |
| `realEstateLeaseManager.restorePoints.v1` | 앱 내부 복원 지점 |

저장소 접근이 막힌 브라우저 환경에서는 임시 객체 저장소로 대체하는 fallback 로직이 있습니다. 이 경우 탭 안에서만 임시 저장되므로 백업 파일 저장이 중요합니다.

## 7. 백업/복구 흐름

백업 함수는 전체 데이터를 하나의 JSON 구조로 묶습니다.

포함 데이터:

- 임대 계약/공실
- 자산
- 투자/대여
- 임차 현황
- 차량 현황
- 입금 내역
- 거래처
- 세금계산서
- 기안문
- 임대차계약서
- 매매계약서
- 일정
- 숨김 열 설정
- 복원 지점 메타 정보

백업 방식:

- 전체 JSON 파일 저장
- 전체 JSON 텍스트 생성 및 복사
- 자산개발 범위만 백업/복구
- 일반총무 범위만 백업/복구
- 텍스트 붙여넣기 복구
- 앱 내부 수동/자동 복원 지점 저장

자동 복원 지점은 날짜별로 생성되며, 수동 복원 지점과 함께 보관 개수를 제한하는 정리 로직이 있습니다.

## 8. 출력/문서 생성 방식

| 기능 | 출력 방식 |
| --- | --- |
| 임대/임차/차량/거래처 목록 | CSV 다운로드, 인쇄/PDF |
| 임대료 미수금 | PDF 출력, 엑셀 출력 |
| 매출세금계산서 | PDF 인쇄, 엑셀 출력, 전표 엑셀 출력, HTML 복사 |
| 기안문 | HTML 복사, 그룹웨어용 HTML 복사 |
| 임대차계약서 | 인쇄/PDF, Word 복사 |
| 매매계약서 | 인쇄/PDF, Word 복사 |

`엑셀 출력`이라는 버튼명은 실제로는 CSV 파일을 생성하는 로직이 많습니다. Excel에서 바로 열 수 있도록 UTF-8 BOM을 붙이는 방식입니다.

## 9. PWA 및 오프라인 구성

`manifest.json` 주요 설정:

- 앱 이름: `총무 업무 관리`
- 짧은 이름: `총무관리`
- 시작 URL: `./index.html`
- 표시 방식: `standalone`
- 언어: `ko-KR`
- 아이콘: `icons/icon-192.png`, `icons/icon-512.png`

`service-worker.js` 주요 설정:

- 캐시 버전: `v16`
- 캐시 이름: `cert-app-v16`
- 사전 캐시 대상: `./`, `index.html`, `template.docx`, `manifest.json`, 아이콘, 일부 CDN URL
- 설치 시 일부 파일이 없어도 실패하지 않도록 개별 캐시 예외 처리
- 활성화 시 이전 캐시 삭제
- GET 요청은 캐시 우선, 네트워크 성공 응답은 런타임 캐시에 저장
- 오프라인 화면 이동 요청은 `index.html` fallback

## 10. Netlify 배포 설정

`netlify.toml` 내용상 현재 폴더를 그대로 정적 배포합니다.

주요 설정:

- HTTP 요청을 HTTPS로 리다이렉트
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `service-worker.js`는 `Cache-Control: no-cache`
- `.docx` MIME 타입 명시

## 11. 확인된 특이사항

1. `index.html`이 매우 큰 단일 파일입니다.
   - HTML, CSS, JS, 샘플 데이터 함수, 문서 생성 로직이 한 파일에 집중되어 있습니다.
   - 빠른 배포에는 유리하지만, 유지보수 시 기능별 분리가 어려울 수 있습니다.

2. `sample-data.json` 참조가 있지만 현재 폴더에는 파일이 없습니다.
   - 코드상 `sample-data.json` 로딩 실패 시 내장 샘플 함수로 fallback합니다.
   - 따라서 실행 자체는 가능하지만, README나 기능 설명과 실제 파일 구성이 다소 다를 수 있습니다.

3. `template.docx`가 서비스 워커 캐시 목록과 README에 언급되지만 현재 폴더에는 없습니다.
   - 서비스 워커는 해당 파일 캐시 실패를 경고만 하고 넘어가도록 작성되어 있습니다.
   - 실제 Word 템플릿 기반 기능을 추가/복원하려면 파일 배치 여부를 다시 확인해야 합니다.

4. 업무 툴 일부가 외부 Netlify 앱 팝업으로 연결됩니다.
   - 기안문 작성: `https://gwformatter.netlify.app`
   - 내용증명서 작성: `https://demandletterapp.netlify.app`

5. 저장 데이터는 사용자의 브라우저에 종속됩니다.
   - 다른 PC나 브라우저로 이동하려면 백업/복구 기능을 사용해야 합니다.
   - 실무 데이터 유실 방지를 위해 정기 JSON 백업이 필요합니다.

6. README와 설정 파일은 UTF-8로 읽으면 한글이 정상입니다.
   - 일부 터미널/출력 환경에서 인코딩을 지정하지 않으면 한글이 깨져 보일 수 있습니다.

## 12. 유지보수 관점 제안

우선순위가 높은 개선 방향:

1. `index.html` 기능 분리
   - `css`, `js`, `data`, `documents` 등으로 나누면 기능 추가와 오류 추적이 쉬워집니다.

2. 샘플/템플릿 파일 정리
   - `sample-data.json`, `template.docx` 사용 여부를 확정하고 실제 파일 또는 문서 설명을 맞추는 것이 좋습니다.

3. 백업 안내 강화
   - 실무 데이터가 로컬 브라우저에 저장되므로, 홈/데이터 관리 화면에서 정기 백업 필요성을 더 명확히 안내하면 안전합니다.

4. CSV와 Excel 표현 정리
   - 실제 파일은 CSV인데 버튼명이 엑셀인 경우가 많습니다.
   - 사용자 입장에서는 괜찮지만, 내부 문서에서는 `CSV(Excel 열기 가능)`로 명확히 구분하는 것이 좋습니다.

5. 외부 팝업 앱 의존성 관리
   - 기안문/내용증명서 외부 앱 주소가 바뀌면 현재 앱의 기능도 영향을 받습니다.
   - 외부 링크 목록을 별도 설정 영역이나 문서에 관리하는 방식이 안전합니다.

## 13. 한 줄 요약

현재 프로젝트는 `index.html` 하나에 업무 화면과 로직을 집중시킨 정적 PWA이며, 자산개발/일반총무/문서/일정/백업 업무를 브라우저 `localStorage` 기반으로 처리하는 실무형 총무 업무 도구입니다.
