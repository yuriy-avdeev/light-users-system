import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/about',
      name: 'about',
      // route is lazy-loaded when the route is visited
      component: () => import('../pages/AboutPage.vue'),
    },
  ],
});

export default router;
