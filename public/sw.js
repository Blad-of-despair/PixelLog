const CACHE = 'pixellog-v1'

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll([
      '/',
      '/index.html',
      '/favicon.svg',
      '/manifest.json',
    ])).then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      )),
    ])
  )
})

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url)

  if (url.origin !== self.location.origin &&
      !url.hostname.includes('fonts.') &&
      !url.hostname.includes('googleapis.com')) {
    return
  }

  e.respondWith(
    caches.match(e.request).then((cached) => {
      const fetchAndCache = fetch(e.request).then((res) => {
        if (res && res.ok) {
          const clone = res.clone()
          caches.open(CACHE).then((c) => c.put(e.request, clone))
        }
        return res
      }).catch(() => cached)
      return cached || fetchAndCache
    })
  )
})
