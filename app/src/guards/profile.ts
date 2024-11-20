import { useAuthStore } from 'src/stores/auth';
import { RouteLocationNormalizedGeneric } from 'vue-router';

export const profile = (to: RouteLocationNormalizedGeneric) => {
  const authStore = useAuthStore();

  if (to.meta.requiresProfile && !authStore.userProfile?.profile_completed)
    return '/setup-profile';
};
