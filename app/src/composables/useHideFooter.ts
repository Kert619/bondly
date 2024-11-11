import { useRoute } from 'vue-router';

export const useHideFooter = () => {
  const route = useRoute();
  return !!route.meta.hideFooter;
};
