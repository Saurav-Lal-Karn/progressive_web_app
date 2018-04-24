var cacheName = 'weatherPWA-step-6-1';
var filesToCache = [
  '/progressive_web_app/smart_city/work/',
  '/progressive_web_app/smart_city/work/index.html',
  '/progressive_web_app/smart_city/work/scripts/app.js',
  '/progressive_web_app/smart_city/work/styles/inline.css',
  '/progressive_web_app/smart_city/work/images/clear.png',
  '/progressive_web_app/smart_city/work/images/cloudy-scattered-showers.png',
  '/progressive_web_app/smart_city/work/images/cloudy.png',
  '/progressive_web_app/smart_city/work/images/fog.png',
  '/progressive_web_app/smart_city/work/images/ic_add_white_24px.svg',
  '/progressive_web_app/smart_city/work/images/ic_refresh_white_24px.svg',
  '/progressive_web_app/smart_city/work/images/partly-cloudy.png',
  '/progressive_web_app/smart_city/work/images/rain.png',
  '/progressive_web_app/smart_city/work/images/scattered-showers.png',
  '/progressive_web_app/smart_city/work/images/sleet.png',
  '/progressive_web_app/smart_city/work/images/snow.png',
  '/progressive_web_app/smart_city/work/images/thunderstorm.png',
  '/progressive_web_app/smart_city/work/images/wind.png'
];

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});



self.addEventListener('install', function(e) {
  	console.log('[ServiceWorker] Install');
  	e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      	console.log('[ServiceWorker] Caching app shell');
      	return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});