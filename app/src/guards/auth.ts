import { useAuthStore } from 'src/stores/auth';
import { RouteLocationNormalizedGeneric } from 'vue-router';

export const auth = (to: RouteLocationNormalizedGeneric) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.token) return '/login';
};
