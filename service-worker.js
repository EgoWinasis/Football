importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);






workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/pages/about.html', revision: '1' },
    { url: '/pages/contact.html', revision: '1' },
    { url: '/pages/home.html', revision: '1' },
    { url: '/pages/teams.html', revision: '1' },
    { url: '/pages/favorites.html', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/style.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/script.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: 'https://cdn.jsdelivr.net/npm/sweetalert2@10', revision: '1' },
    { url: 'https://code.jquery.com/jquery-3.5.1.min.js', revision: '1' },
    { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
    { url: '/images/background.png', revision: '1' },
    { url: '/images/apple-touch-icon-180x180.png', revision: '1' },
    { url: '/images/pwa-192x192.png', revision: '1' },
    { url: '/images/pwa-512x512.png', revision: '1' },
    { url: '/images/tile70x70.png', revision: '1' },
    { url: '/images/tile150x150.png', revision: '1' },
    { url: '/images/tile310x310.png', revision: '1' },
    { url: '/images/preloader.gif', revision: '1' },
    { url: '/manifest.json', revision: '1' },
]);


workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/competitions/2001/teams'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'teams'
  })
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/competitions/CL/matches'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'matches'
  })
);


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