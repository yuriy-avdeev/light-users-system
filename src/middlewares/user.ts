import type { RouteLocationNormalized } from 'vue-router';
import { useUserStore } from '@/stores/user';

export const validateId = (to: RouteLocationNormalized) => {
  const userStore = useUserStore();
  const userId: number = Number(to.params.id);
  const isUserExists: boolean = userStore.users.some((u) => u.id === userId);
  if (!isUserExists) {
    return { path: '/not-found' };
  }
  return true;
};

export const validateAuth = (to: RouteLocationNormalized) => {
  const userStore = useUserStore();
  if (userStore.isAuthenticated) {
    return true;
  }
  const isHomePage = to.path === '/';
  const isNotFoundPage = to.matched[0].path === '/:pathMatch(.*)*';
  if (isHomePage || isNotFoundPage) {
    return true;
  }
  return { path: '/', query: { fromProtectedRoute: 'true' } };
};
