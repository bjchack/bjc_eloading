const CACHE_NAME = "bjc-eload-v1";
const urlsToCache = [
  "/bjc_eloading/",
  "/bjc_eloading/index.html",
  "/bjc_eloading/eload.html",
  "/bjc_eloading/style.css",
  "/bjc_eloading/script.js",
  "/bjc_eloading/images/tarp.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
