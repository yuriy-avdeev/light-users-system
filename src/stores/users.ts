import { ref } from 'vue'
import { defineStore } from 'pinia'
import bcrypt from 'bcryptjs'
import type { IUser, INewUser, IMockUser } from '@/types/store-types'

// table of users - add sorting
// in the popup with login add button to open registration form
// mobile-first flexibility

const mockUsers: IMockUser = {
  'my@mail.com': {
    first_name: 'John',
    second_name: 'Smith',
    id: 1,
    e_mail: 'my@mail.com',
    password: '',
  },
  'jane@mail.com': {
    first_name: 'Jane',
    second_name: 'Doe',
    id: 2,
    e_mail: 'jane@mail.com',
    password: '',
  },
  'jim@mail.com': {
    first_name: 'Jim',
    second_name: 'Beam',
    id: 3,
    e_mail: 'jim@mail.com',
    password: '',
  },
}

export const useUsersStore = defineStore('users', () => {
  const users = ref<IUser[]>([])

  // simulate BE - hash passwords and initialize users
  const initializeUsers = async () => {
    if (users.value.length) {
      return
    }
    try {
      for (const key in mockUsers) {
        const userData = mockUsers[key]
        userData.password = await bcrypt.hash('qwerty', 10)
        users.value.push(userData)
      }
    } catch {
      users.value = []
      throw new Error('Error: fetching users')
    }
  }

  const addUser = async (newUserData: INewUser) => {
    // here should be invocation of validation fields function
    if (mockUsers[newUserData.e_mail]) {
      throw new Error(
        `This e-mail - ${newUserData.e_mail} is already used. Please choose another one and try again.`
      )
    }
    const hashedPassword = await bcrypt.hash(newUserData.password, 10)
    // here should be logic to update mockUsers but it's pointless without DB
    users.value.push({
      ...newUserData,
      id: users.value.length + 1,
      password: hashedPassword,
    })
    return {
      user: {
        ...newUserData,
        id: users.value.length + 1,
      },
    }
  }
  return { users, initializeUsers, addUser }
})
