import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import {
  validateId,
  validateAuth,
  protectLoginPage,
} from '../middlewares/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      component: HomePage,
    },

    {
      path: '/login',
      component: () => import('../pages/LoginPage.vue'),
      // pass a prop - to continue going to a page after login
      props: (route) => ({
        redirectedFrom: route.redirectedFrom?.path,
      }),
      beforeEnter: protectLoginPage,
    },

    {
      path: '/about',
      component: () => import('../pages/AboutPage.vue'),
    },

    {
      path: '/users',
      component: () => import('../pages/UsersListPage.vue'),
    },

    {
      path: '/users/:id',
      component: () => import('../pages/UserPage.vue'),
      beforeEnter: validateId,
    },

    {
      path: '/:pathMatch(.*)*',
      component: () => import('../pages/NotFoundPage.vue'),
    },
  ],
});

router.beforeEach(validateAuth);

export default router;
