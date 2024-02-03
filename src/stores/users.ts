import { ref } from 'vue'
import { defineStore } from 'pinia'
import bcrypt from 'bcryptjs'
import type { User, NewUser, MockUser } from '@/types/store-types'

// TODO:
// browser native popup <dialog>
// pagination
// home and about page content // lorem
// rearrange components by functionality (not states then computed then watch and methods)
// tests
// user page with logic to change e-mail, names etc...
// dropdown components for reusing

const mockUsers: MockUser = {
  'my@mail.com': {
    first_name: 'User',
    second_name: 'Smith',
    id: 'c30k0e',
    e_mail: 'my@mail.com',
    password: '',
  },
  'sam@mail.com': {
    first_name: 'Sam',
    second_name: 'Snow',
    id: 'c38kle',
    e_mail: 'sam@mail.com',
    password: '',
  },
  'anna@mail.com': {
    first_name: 'Anna',
    second_name: 'Doe',
    id: 'aa0k0e',
    e_mail: 'anna@mail.com',
    password: '',
  },
  'jim@mail.com': {
    first_name: 'Jim',
    second_name: 'Beam',
    id: '6ka8dh',
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
    if (
      mockUsers[newUserData.e_mail] ||
      newUserData.e_mail.toLowerCase() === 'admin'
    ) {
      throw new Error(
        `This login or e-mail - "${newUserData.e_mail}" is already used. Please, choose another one and try again.`
      )
    }
    const hashedPassword = await bcrypt.hash(newUserData.password, 10)
    const mockId = Math.random().toString(36).substr(2, 6)
    // here should be logic to update mockUsers but it's pointless without DB
    users.value.push({
      ...newUserData,
      id: mockId,
      password: hashedPassword,
    })

    return {
      user: {
        ...newUserData,
        id: mockId,
      },
    }
  }
  return { users, initializeUsers, addUser }
})
