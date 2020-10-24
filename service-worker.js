const CACHE_NAME = "football-v1";
const urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/favorites.html",
  "/pages/teams.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/css/materialize.min.css",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
  "https://cdn.jsdelivr.net/npm/sweetalert2@10",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/script.js",
  "/js/api.js",
  "/js/db.js",
  "/js/idb.js",
  "/manifest.json",
  "/soccer_ball_512.png",
  "/soccer_ball_192.png",
  "/images/background.png"
];
 
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


self.addEventListener("fetch", event => {
    const base_url = "https://api.football-data.org/v2/";
    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return fetch(event.request).then(function(response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {'ignoreSearch': true}).then(function(response) {
                return response || fetch (event.request);
            })
        )
    }
});


// membuat push

self.addEventListener("push", event => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  let options = {
    body: body,
    icon: 'images/background.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});