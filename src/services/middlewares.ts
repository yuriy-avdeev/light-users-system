import type { RouteLocationNormalized } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useUserAccessFormStore } from '@/stores/userAccessForm'

export const validateId = (to: RouteLocationNormalized) => {
  const userStore = useUserStore()
  const userId = to.params.id
  if (String(userStore.currentUser?.id) === userId) {
    return true
  }
  return { path: '/not-found' }
}

export const validateAuth = (to: RouteLocationNormalized) => {
  if (to.meta.requiresAdminCredentials) {
    const userStore = useUserStore()
    return userStore.isAdmin ? true : { path: '/' }
  }
  if (to.meta.requiresAuth) {
    const userStore = useUserStore()
    if (userStore.isAuthenticated) {
      return true
    }
    const userAccessFormStore = useUserAccessFormStore()
    userAccessFormStore.openUserAccessForm()
    return { path: '/' }
  }
  return true
}
