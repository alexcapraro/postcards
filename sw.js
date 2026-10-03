// Bump VERSION on every upload so phones pick up the new files.
const VERSION = "postcards-v1";
const FILES = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png",
  "fonts/overpass-latin-400-normal.woff2", "fonts/overpass-latin-600-normal.woff2", "fonts/overpass-latin-700-normal.woff2", "fonts/overpass-latin-800-normal.woff2",
  "fonts/overpass-mono-latin-400-normal.woff2", "fonts/overpass-mono-latin-600-normal.woff2", "fonts/caveat-latin-500-normal.woff2", "fonts/caveat-latin-700-normal.woff2"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  // App page, including share-target launches (?title=&text=&url=): network first, cached shell offline.
  if (e.request.mode === "navigate") { e.respondWith(fetch(e.request).catch(() => caches.match("index.html"))); return; }
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || fetch(e.request)));
});
