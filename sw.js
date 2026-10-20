// Keeps the site's files on the phone so it still opens with no internet,
// or if GitHub Pages is down. Ticket data is not handled here: the page
// keeps its own copy and talks to the Google script directly.
const CACHE = 'casnival-tickets-v4';
const SHELL = ['./', './index.html', './config.js', './manifest.webmanifest', './icon.svg', './icon-180.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Try the network for a few seconds (so updates arrive), then fall back to the saved copy.
function networkFirst(req) {
  const fromCache = () => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('./index.html'));
  return new Promise(resolve => {
    let done = false;
    const timer = setTimeout(() => { if (!done) { done = true; resolve(fromCache()); } }, 4000);
    fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      if (!done) { done = true; clearTimeout(timer); resolve(res); }
    }).catch(() => { if (!done) { done = true; clearTimeout(timer); resolve(fromCache()); } });
  });
}
function cacheFirst(req) {
  return caches.match(req).then(hit => hit || fetch(req).then(res => {
    const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res;
  }));
}

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin === location.origin) e.respondWith(networkFirst(e.request));
  else if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) e.respondWith(cacheFirst(e.request));
});
