const CACHE = 'walmart-v1';

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then((c) =>
      c.addAll(['/', '/walmart', '/manifest.json', '/apple-touch-icon.png'])
    )
  );
});

self.addEventListener('activate', () => self.clients.claim());

self.addEventListener('fetch', (e) => {
  // Network-first: always try network, fall back to cache
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
