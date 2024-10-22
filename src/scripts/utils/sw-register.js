import { Workbox } from 'workbox-window';
import Swal from 'sweetalert2';

const promptForUpdate = async () => {
  Swal.fire({
    icon: 'warning',
    title: 'HeyCa versi terbaru udah ada!',
    text: 'Kamu udah gak kepo ya?, gapapa peduliin aja sana orang yg kamu suka!',
    showConfirmButton: true,
  });
  return true;
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
