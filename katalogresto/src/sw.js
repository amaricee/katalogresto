import 'regenerator-runtime';
import * as workbox from 'workbox-window';
import CacheHelper from './utils/cache-helper';

/* eslint-disable no-restricted-globals */
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      CacheHelper.cachingAppShell([
        './',
        './public/app.webmanifest',
        './public/icon/RA-48-48.png',
        './public/icon/RA-72-72.png',
        './public/icon/RA-96-96.png',
        './public/icon/RA-128-128.png',
        './public/icon/RA-144-144.png',
        './public/icon/RA-192-192.png',
        './public/icon/RA-512-512.png',
        './public/images/heros/hero-image_2.jpg',
        '../dist/index.html',
        '../dist/app.bundle.js',
        '../dist/sw.bundle.js',
      ]),
      CacheHelper.deleteOldCache(),
    ]),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    CacheHelper.deleteOldCache(),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    CacheHelper.revalidateCache(event.request),
  );
});

workbox.routing.registerRoute(
  /.*\.json/,
  new workbox.strategies.StaleWhileRevalidate(),
);
/* eslint-enable no-restricted-globals */
