import Pusher from 'pusher-js';
import Echo from 'laravel-echo';

export {};

declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: Echo<'reverb'>;
  }
}
