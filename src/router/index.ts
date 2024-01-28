import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage/HomePage.vue'
import { validateId, validateAuth } from '../services/middlewares.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      component: HomePage,
      meta: { requiresAuth: false },
    },

    {
      path: '/about',
      component: () => import('../pages/AboutPage/AboutPage.vue'),
      meta: { requiresAuth: true },
    },

    {
      path: '/users',
      component: () => import('../pages/UsersListPage/UsersListPage.vue'),
      meta: { requiresAdminCredentials: true },
    },

    {
      path: '/users/:id',
      component: () => import('../pages/UserPage/UserPage.vue'),
      beforeEnter: validateId,
      meta: { requiresAuth: false },
    },

    {
      path: '/:pathMatch(.*)*',
      component: () => import('../pages/NotFoundPage/NotFoundPage.vue'),
      meta: { requiresAuth: false },
    },
  ],
})

router.beforeEach(validateAuth)

export default router
