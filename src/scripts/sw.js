import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';

registerRoute(
  ({url}) => url.pathname.startsWith('/images/'),
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 90,
      }),
    ],
  }),
);

registerRoute(
  ({url}) => url.pathname.startsWith('/songs/'),
  new StaleWhileRevalidate({
    cacheName: 'songs',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 90,
      }),
    ],
  }),
);

registerRoute(
  ({ url }) => url.href.startsWith('https://notes-api.dicoding.dev/v1/users/me'),
  new NetworkFirst(),
);

registerRoute(
  ({ url }) => url.href.startsWith('https://notes-api.dicoding.dev/v1'),
  new StaleWhileRevalidate({
    cacheName: 'notesAPI-data',
  }),
);

registerRoute(
  ({ url }) => url.href.startsWith('https://fonts.googleapis.com'),
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  }),
);

registerRoute(
  ({ url }) => url.href.startsWith('https://fonts.gstatic.com'),
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  }),
);

precacheAndRoute(
  self.__WB_MANIFEST
);
