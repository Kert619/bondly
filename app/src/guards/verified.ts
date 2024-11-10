import { useAuthStore } from 'src/stores/auth';
import { RouteLocationNormalizedGeneric } from 'vue-router';

export const verified = (to: RouteLocationNormalizedGeneric) => {
  const authStore = useAuthStore();

  if (to.meta.requiresVerified && !authStore.user?.email_verified_at)
    return '/verify-email';
};