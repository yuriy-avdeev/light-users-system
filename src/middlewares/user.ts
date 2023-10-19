import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

// TODO - import users here
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 555, name: 'User 1' },
  { id: 333, name: 'User 2' },
];

export const validateUser = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const userId: number = Number(to.params.id);
  const userExists: boolean = users.some((user) => user.id === userId);
  if (userExists) next();
  else next('/not-found');
};
