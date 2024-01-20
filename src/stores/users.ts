import { ref } from 'vue'
import { defineStore } from 'pinia'
import bcrypt from 'bcryptjs'
import type { User, NewUser, MockUser } from '@/types/store-types'

// TODO:
// in the popup with login add button to open registration form - go to user's tab and automatically login if new user (check init user list - only if admin)
// mobile-first flexibility
// pagination
// table user list - full width of parent container

const mockUsers: MockUser = {
  'my@mail.com': {
    first_name: 'User#1',
    second_name: 'Smith',
    id: 1,
    e_mail: 'my@mail.com',
    password: '',
  },
  'sam@mail.com': {
    first_name: 'Sam',
    second_name: 'Snow',
    id: 2,
    e_mail: 'sam@mail.com',
    password: '',
  },
  'anna@mail.com': {
    first_name: 'Anna',
    second_name: 'Doe',
    id: 3,
    e_mail: 'anna@mail.com',
    password: '',
  },
  'jim@mail.com': {
    first_name: 'Jim',
    second_name: 'Beam',
    id: 4,
    e_mail: 'jim@mail.com',
    password: '',
  },
}

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])

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

  const addUser = async (newUserData: NewUser) => {
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
