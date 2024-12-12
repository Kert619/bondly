import { boot } from 'quasar/wrappers';
import { Preferences } from '@capacitor/preferences';
import { useEcho } from 'src/composables/useEcho';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  const token = await Preferences.get({ key: 'auth_token' });
  if (token.value) {
    useEcho(token.value);
  }
});
