import { Workbox } from 'workbox-window';

const promptForUpdate = async (text) => {
  const confirm = window.confirm(`There update version ${text}, you won't ?`);
  return confirm;
}

navigator.serviceWorker.addEventListener('message', async event => {
  // Optional: ensure the message came from workbox-broadcast-update
  if (event.data.meta === 'workbox-broadcast-update') {
    const {cacheName, updatedURL} = event.data.payload;

    // Do something with cacheName and updatedURL.
    // For example, get the cached content and update
    // the content on the page.
    const cache = await caches.open(cacheName);
    const updatedResponse = await cache.match(updatedURL);
    const updatedText = await updatedResponse.text();
    await promptForUpdate(updatedText);
  }
});

const swRegister = async () => {
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('./sw.js');
    try {
      const showSkipWaitingPrompt = async (event) => {
        wb.addEventListener('controlling', () => {
          window.location.reload();
        });

        const updateAccepted = await promptForUpdate();

        if (updateAccepted) {
          wb.messageSkipWaiting();
        }
      };

      wb.addEventListener('waiting', (event) => {
        showSkipWaitingPrompt(event);
      });
    
      await wb.register();
      console.log('Service worker registered');
    } catch (error) {
      console.log('Failed to register service worker', error);
    }
  } else {
    console.log('Service Worker not supported in the browser');
    return;
  }
};

export default swRegister;
