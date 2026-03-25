const CACHE = 'famcal-v6';
const STATIC = ['./manifest.json','./icon-192.svg','./icon-512.svg'];

self.addEventListener('install', e => {
  // Cache static assets but DO NOT skipWaiting here.
  // We wait for the app to send SKIP_WAITING so the banner can show first.
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(STATIC))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  const isHTML = e.request.destination === 'document'
    || url.pathname.endsWith('.html')
    || url.pathname === '/';
  const isFont = url.hostname === 'fonts.googleapis.com'
    || url.hostname === 'fonts.gstatic.com';

  if (isHTML) {
    // Network-first: always serve fresh HTML so app updates are instant
    e.respondWith(
      fetch(e.request)
        .then(res => {
          caches.open(CACHE).then(c => c.put(e.request, res.clone()));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  if (isFont) {
    e.respondWith(
      caches.match(e.request).then(cached =>
        cached || fetch(e.request).then(res => {
          caches.open(CACHE).then(c => c.put(e.request, res.clone()));
          return res;
        })
      )
    );
    return;
  }

  // Default: network-first with cache fallback
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res.ok) caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        return res;
      })
      .catch(() => caches.match(e.request) || new Response('', { status: 503 }))
  );
});

// App sends this when user taps "Uppdatera nu"
self.addEventListener('message', e => {
  if (e.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
