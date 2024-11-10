import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { Preferences } from '@capacitor/preferences';
import { useAuthStore } from 'src/stores/auth';
import { Router } from 'src/router';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: process.env.API + '/api' });

export default boot(({ app, redirect }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  api.interceptors.request.use(
    async (config) => {
      const token = (await Preferences.get({ key: 'auth_token' })).value;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response?.status == 401) {
        const authStore = useAuthStore();
        authStore.token = null;
        authStore.user = null;
        authStore.userProfile = null;
        await Preferences.remove({ key: 'auth_token' });

        if (Router.currentRoute.value.path != '/login') {
          redirect({ path: '/login' });
        }
      }

      return Promise.reject(error);
    }
  );
});

export { api };
