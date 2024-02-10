import { ref } from 'vue'
import { defineStore } from 'pinia'
import bcrypt from 'bcryptjs'
import type { User, NewUser } from '@/types/store-types'
import { mockUsers } from '@/assets/mock-data'

// TODO:
// user page with logic to change e-mail, names etc...
// pagination
// home and about page content // lorem
// rearrange components by functionality (not states then computed then watch and methods)
// tests
// rethink here users list as an object - in order not to iterate list of users in real life

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
    // TODO - compare not with mockUserUsers but with 'users' list (and it should be converted into an object)
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

  const deleteUser = (id: number | string) => {
    users.value = users.value.filter((item) => item.id !== id)
  }

  const editUser = (user: User, userId: number | string) => {
    users.value = users.value.map((item) => {
      if (item.id === userId) {
        return {
          ...item,
          first_name: user.first_name,
          second_name: user.second_name,
          e_mail: user.e_mail,
        }
      }
      return item
    })
  }

  return { users, initializeUsers, addUser, deleteUser, editUser }
})
