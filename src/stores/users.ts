import { ref } from 'vue'
import { defineStore } from 'pinia'
import bcrypt from 'bcryptjs'
import type { NewUser, UserWithCredentials } from '@/types/store-types'

// TODO - rework as an object in order not to iterate huge array if adding new user
const mockUsers: UserWithCredentials[] = [
  {
    first_name: 'John',
    second_name: 'Smith',
    id: 1,
    e_mail: 'my@mail.com',
    password: '',
  },
  {
    first_name: 'Jane',
    second_name: 'Doe',
    id: 2,
    e_mail: 'jane@mail.com',
    password: '',
  },
  {
    first_name: 'Jim',
    second_name: 'Beam',
    id: 3,
    e_mail: 'jim@mail.com',
    password: '',
  },
]

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
      users.value = []
      throw new Error('Error: fetching users')
    }
  }

  const addUser = async (newUserData: NewUser) => {
    const existedUser = users.value.find((u) => u.e_mail === newUserData.e_mail)
    if (existedUser) {
      return `This e-mail - ${newUserData.e_mail} is already used. Please choose another one and try again.`
    }
    const hashedPassword = await bcrypt.hash(newUserData.password, 10)
    // here should be logic to update mockUsers but it's pointless without DB
    users.value.push({
      ...newUserData,
      id: users.value.length + 1,
      password: hashedPassword,
    })
    return `Welcome, ${newUserData.first_name}!`
  }
  return { users, initializeUsers, addUser }
})
