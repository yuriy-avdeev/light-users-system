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
  if (['/users', '/users/'].includes(to.fullPath)) {
    const userStore = useUserStore()
    return userStore.isAdmin ? true : { path: '/' }
  }

  const isRequiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  if (isRequiresAuth) {
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
