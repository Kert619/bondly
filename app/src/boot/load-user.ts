import { Preferences } from '@capacitor/preferences';
import { boot } from 'quasar/wrappers';
import { useAuthStore } from 'src/stores/auth';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async () => {
  const token = (await Preferences.get({ key: 'auth_token' })).value;
  if (token) {
    const authStore = useAuthStore();
    try {
      await authStore.loadUser(false);
      authStore.token = token;
    } catch (error) {}
  }
});
