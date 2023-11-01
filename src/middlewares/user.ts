import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { useUserStore } from '@/stores/user';

export const validateId = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const userStore = useUserStore();
  const userId: number = Number(to.params.id);
  const isUserExists: boolean = userStore.users.some((u) => u.id === userId);
  if (isUserExists) {
    next();
  } else {
    next('/not-found');
  }
};

export const validateAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const userStore = useUserStore();
  const isAllowedPath = ['/', '/login'].includes(to.path);
  if (!isAllowedPath && !userStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
};

export const protectLoginPage = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const userStore = useUserStore();
  if (userStore.isAuthenticated) {
    next('/');
  } else {
    next();
  }
};
