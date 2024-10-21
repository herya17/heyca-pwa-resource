import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate, NetworkFirst, NetworkOnly } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import {BroadcastUpdatePlugin} from 'workbox-broadcast-update';

const bgSyncPlugin = new BackgroundSyncPlugin('Heyca Queue API', {
  maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
  /\/api\/.*\/*.json/,
  new NetworkOnly({
    plugins: [bgSyncPlugin]
  }),
);

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
    plugins: [
      new BroadcastUpdatePlugin({
        headersToCheck: ['notesAPI-data-Header'],
      }),
    ],
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
  self.__WB_MANIFEST,
);
