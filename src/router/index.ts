import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import { validateUser } from '../middlewares/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      component: HomePage,
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
      beforeEnter: validateUser,
    },

    {
      path: '/:pathMatch(.*)*',
      component: () => import('../pages/NotFoundPage.vue'),
    },
  ],
});

export default router;
