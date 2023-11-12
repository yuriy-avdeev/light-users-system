import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import bcrypt from 'bcryptjs'
import { useUsersStore } from './users'
import type { User } from '@/types/store-types'

export const useUserStore = defineStore('user', () => {
  // 'user' is a ref that can hold or User or null, initial value is null
  const currentUser = ref<User | null>(null)
  const isAdmin = ref<boolean>(false)
  const auth = ref<boolean>(false)
  const usersStore = useUsersStore()

  const isAuthenticated = computed(() => auth.value)

  const login = async (login: string, password: string): Promise<boolean> => {
    // is admin credentials
    if (
      login === import.meta.env.VITE_ADMIN_LOGIN &&
      password === import.meta.env.VITE_ADMIN_PASSWORD
    ) {
      isAdmin.value = true
      auth.value = true
      localStorage.removeItem('currentUser')
      return true
    }
    // normal user login process
    const foundUser = usersStore.users.find((u) => u.login === login)
    if (!foundUser) {
      return false
    }
    const passwordMatch = await bcrypt.compare(password, foundUser.password)
    if (!passwordMatch) {
      return false
    }
    // set the current user and store in local storage
    currentUser.value = {
      first_name: foundUser.first_name,
      second_name: foundUser.second_name,
      id: foundUser.id,
    }
    auth.value = true
    storeUserInLocalStorage(currentUser.value)
    return true
  }

  const logout = () => {
    currentUser.value = null
    isAdmin.value = false
    auth.value = false
    localStorage.removeItem('currentUser')
  }

  const storeUserInLocalStorage = (user: User) => {
    const data = {
      user,
      timestamp: new Date().getTime(),
    }
    localStorage.setItem('currentUser', JSON.stringify(data))
  }

  const getUserFromLocalStorageIfValid = () => {
    const dataString = localStorage.getItem('currentUser')
    if (!dataString) {
      return null
    }
    const data = JSON.parse(dataString)
    const currentTime = new Date().getTime()
    const timeLimit = 24 * 3600 * 1000 // 24 hours
    const ageOfData = currentTime - data.timestamp
    if (ageOfData < timeLimit) {
      return data.user
    }
    return null
  }

  // will be triggered only once during the store initialization
  const loadUserFromLocalStorage = () => {
    const storedUser = getUserFromLocalStorageIfValid()
    if (storedUser) {
      currentUser.value = storedUser
      auth.value = true
    }
  }

  loadUserFromLocalStorage()

  return { auth, isAdmin, currentUser, isAuthenticated, login, logout }
})
