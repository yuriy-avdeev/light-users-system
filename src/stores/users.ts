import { ref } from 'vue'
import { defineStore } from 'pinia'
import bcrypt from 'bcryptjs'
import type { NewUser, UserWithCredentials } from '@/types/store-types'

// TODO - check before add new user its existing - needs mock or real DB

const mockUsers: UserWithCredentials[] = [
  {
    first_name: 'John',
    second_name: 'Smith',
    id: 1,
    login: 'user',
    password: '',
  },
  {
    first_name: 'Jane',
    second_name: 'Doe',
    id: 2,
    login: 'jane_doe',
    password: '',
  },
  {
    first_name: 'Jim',
    second_name: 'Beam',
    id: 3,
    login: 'jim_beam',
    password: '',
  },
]

// TODO - add admin rights on /users route with CRUD

export const useUsersStore = defineStore('users', () => {
  const users = ref<UserWithCredentials[]>([])

  // simulate BE - hash passwords and initialize users
  const initializeUsers = async () => {
    if (users.value.length) {
      return
    }
    try {
      for (const user of mockUsers) {
        user.password = await bcrypt.hash('qwerty', 10)
        users.value.push(user)
      }
    } catch {
      throw new Error('Error: fetching users')
    }
  }

  const addUser = async (newUserData: NewUser) => {
    const existedUser = users.value.find((u) => u.login === newUserData.login)
    if (existedUser) {
      return
    }
    const hashedPassword = await bcrypt.hash(newUserData.password, 10)
    users.value.push({
      ...newUserData,
      id: users.value.length + 1,
      password: hashedPassword,
    })
  }
  return { users, initializeUsers, addUser }
})
