import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import bcrypt from 'bcryptjs'
import { useUsersStore } from './users'
import type { User } from '@/types/store-types'
import { mockUsers } from '@/services/mock-data'

export const useUserStore = defineStore('user', () => {
  // 'user' is a ref that can hold or User or null, initial value is null
  const currentUser = ref<User | null>(null)
  const isAdmin = ref(false)
  const auth = ref(false)
  const usersStore = useUsersStore()

  const isAuthenticated = computed(() => auth.value)

  const initializeUsersStore = async (userData: User | null) => {
    await usersStore.initializeUsers(userData)
  }

  const login = async (e_mail: string, password: string): Promise<boolean> => {
    // is admin credentials
    if (e_mail === import.meta.env.VITE_ADMIN_E_MAIL) {
      if (password !== import.meta.env.VITE_ADMIN_PASSWORD) {
        return false
      }
      isAdmin.value = true
      auth.value = true
      initializeUsersStore(null)
      localStorage.removeItem('currentUser')
      sessionStorage.setItem('admin', 'true')
      return true
    }

    // normal user login process
    const foundUser = mockUsers[e_mail]
    if (!foundUser) {
      return false
    }
    const savedPassword = await usersStore.hashPassword(foundUser.password)
    const passwordMatch = await bcrypt.compare(password, savedPassword)
    if (!passwordMatch) {
      return false
    }

    // set the current user data and store it in the local storage
    currentUser.value = {
      first_name: foundUser.first_name,
      second_name: foundUser.second_name,
      id: foundUser.id,
      e_mail: foundUser.e_mail,
      password: savedPassword,
      order: 0
    }
    auth.value = true
    initializeUsersStore(currentUser.value)
    storeUserInLocalStorage(currentUser.value)
    return true
  }

  const logout = () => {
    auth.value = false
    usersStore.users = []
    if (isAdmin.value) {
      isAdmin.value = false
      sessionStorage.removeItem('admin')
    } else {
      currentUser.value = null
      localStorage.removeItem('currentUser')
    }
  }

  const storeUserInLocalStorage = (user: User) => {
    const data = {
      user,
      timestamp: new Date().getTime()
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
  const loadUserFromLocalStorages = () => {
    if (sessionStorage.getItem('admin')) {
      isAdmin.value = true
      auth.value = true
      return
    }
    const storedUser = getUserFromLocalStorageIfValid()
    if (storedUser) {
      currentUser.value = storedUser
      auth.value = true
    }
  }

  const editUserData = async (userData: User, userId: number | string) => {
    currentUser.value = await usersStore.editUserData(userData, userId)
  }

  loadUserFromLocalStorages()

  return {
    auth,
    isAdmin,
    currentUser,
    isAuthenticated,
    login,
    logout,
    editUserData
  }
})
