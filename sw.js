const CACHE_VERSION = 'poke-math-v1'
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/battle-field.jpg',
  './assets/icon.svg',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './src/app.js',
  './src/experience.css',
  './src/layout-fixes.css',
  './src/math.js',
  './src/pokeapi.js',
  './src/sound.js',
  './src/storage.js',
  './src/styles.css',
  './src/ui-fixes.js',
  './src/visuals.js'
]

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_VERSION).then(cache => cache.addAll(APP_SHELL)))
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_VERSION).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return

  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(() => caches.match('./index.html')))
    return
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200) return response
        const copy = response.clone()
        caches.open(CACHE_VERSION).then(cache => cache.put(event.request, copy))
        return response
      })
    })
  )
})
