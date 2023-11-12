import type { RouteLocationNormalized } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useLoginFormStore } from '@/stores/loginForm'

export const validateId = (to: RouteLocationNormalized) => {
  const userStore = useUserStore()
  const userId: number = Number(to.params.id)
  if (userStore.isAdmin || userStore.currentUser?.id === userId) {
    return true
  }
  return { path: '/not-found' }
}

export const validateAuth = (to: RouteLocationNormalized) => {
  const userStore = useUserStore()
  if (userStore.isAuthenticated) {
    return true
  }

  const isHomePage = to.path === '/'
  const isNotFoundPage = to.matched[0].path === '/:pathMatch(.*)*'
  if (isHomePage || isNotFoundPage) {
    return true
  }

  const loginFormStore = useLoginFormStore()
  loginFormStore.openLoginForm()
  return { path: '/' }
}
