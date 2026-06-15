// 총무 업무 관리 PWA 서비스 워커
// 앱 실행에 필요한 주요 파일을 캐시하여, 최초 접속 이후 오프라인에서도 기본 화면을 열 수 있게 합니다.

const CACHE_VERSION = "v30";
const CACHE_NAME = `cert-app-${CACHE_VERSION}`;

const CDN_URLS = [
  "https://cdnjs.cloudflare.com/ajax/libs/pizzip/3.1.5/pizzip.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/pizzip-utils/0.1.0/pizzip-utils.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/docxtemplater/3.47.4/docxtemplater.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"
];

const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./template.docx",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  ...CDN_URLS
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);

    // 일부 선택 파일(template.docx 등)이 없더라도 PWA 설치가 실패하지 않도록 개별 캐시합니다.
    await Promise.all(PRECACHE_URLS.map(async (url) => {
      try {
        await cache.add(new Request(url, { cache: "reload" }));
      } catch (error) {
        console.warn("[서비스 워커] 사전 캐시 생략:", url, error);
      }
    }));

    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys();

    // 버전이 바뀐 이전 캐시는 자동 삭제합니다.
    await Promise.all(cacheNames
      .filter((cacheName) => cacheName !== CACHE_NAME)
      .map((cacheName) => caches.delete(cacheName)));

    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  event.respondWith((async () => {
    const requestUrl = new URL(request.url);
    if (requestUrl.origin === self.location.origin && requestUrl.pathname.endsWith("/managed-backup.json")) {
      return fetch(new Request(request, { cache: "no-store" }));
    }

    const cachedResponse = await caches.match(request);
    if (cachedResponse) return cachedResponse;

    try {
      const networkResponse = await fetch(request);

      // 정상 응답만 런타임 캐시에 저장합니다.
      if (
        networkResponse &&
        networkResponse.status === 200 &&
        (networkResponse.type === "basic" || networkResponse.type === "cors")
      ) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, networkResponse.clone());
      }

      return networkResponse;
    } catch (error) {
      // 화면 이동 요청은 오프라인일 때 index.html로 대체합니다.
      if (request.mode === "navigate") {
        const fallback = await caches.match("./index.html");
        if (fallback) return fallback;
      }

      throw error;
    }
  })());
});
