import { Workbox } from 'workbox-window';
 
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
        await showSkipWaitingPrompt(event);
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
