import { Preferences } from '@capacitor/preferences';
import { Loading } from 'quasar';
import { boot } from 'quasar/wrappers';
import { useAuthStore } from 'src/stores/auth';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async () => {
  const token = (await Preferences.get({ key: 'auth_token' })).value;
  if (token) {
    Loading.show();
    const authStore = useAuthStore();
    try {
      await authStore.loadUser();
      authStore.token = token;
    } finally {
      Loading.hide();
    }
  }
});
