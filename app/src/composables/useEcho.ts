import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

export const useEcho = (token: string) => {
  window.Pusher = Pusher;

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
        Authorization: `Bearer ${token}`, // or use another method to get the token
      },
    },
  });
};
