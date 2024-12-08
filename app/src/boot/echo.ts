import { boot } from 'quasar/wrappers';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { Preferences } from '@capacitor/preferences';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  window.Pusher = Pusher;
  const token = await Preferences.get({ key: 'auth_token' });

  window.Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT,
    wssPort: import.meta.env.VITE_REVERB_PORT,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
    authEndpoint: import.meta.env.VITE_BROADCASTING_AUTH_URL,
    auth: {
      headers: {
        Authorization: `Bearer ${token.value}`, // or use another method to get the token
      },
    },
  });
});
