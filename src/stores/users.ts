import { ref } from 'vue'
import { defineStore } from 'pinia'
// 'bcrypt' is designed to work in Node.js environments, so it'll produce warnings in my case
// but I use it here intentionally as I don't have a correspond server-side for this app
import bcrypt from 'bcryptjs'
import type { User, NewUser } from '@/types/store-types'
import { mockUsers } from '@/services/mock-data'

// TODO:
// filtering users list with highlighting result
// rearrange components by functionality (not states then computed then watch and methods)
// rethink here users list as an object - in order not to iterate list of users in real life
// revive api.js
// delete tests library

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])

  // simulate BE - hash passwords and initialize users
  const initializeUsers = async () => {
    if (users.value.length) {
      return
    }
    try {
      const list = []
      let order = 1
      for (const key in mockUsers) {
        const userData = mockUsers[key]
        userData.password = await bcrypt.hash('qwerty', 10)
        userData.order = order
        list.push(userData)
        order++
      }
      users.value = list
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
      order: users.value.length + 1,
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

  const editUserData = (user: User, userId: number | string) => {
    const index = users.value.findIndex((item) => item.id === userId)
    if (index === -1) {
      throw new Error('User not found')
    }
    const updatedUser = {
      ...users.value[index],
      first_name: user.first_name,
      second_name: user.second_name,
      e_mail: user.e_mail,
    }
    users.value[index] = updatedUser
    return updatedUser
  }

  return { users, initializeUsers, addUser, deleteUser, editUserData }
})
