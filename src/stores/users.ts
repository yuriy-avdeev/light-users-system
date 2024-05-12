import { ref } from 'vue'
import { defineStore } from 'pinia'
// 'bcrypt' is destined to work in Node.js environments so it'll produce warnings in my case
// but it is used here intentionally as there isn't a corresponding server-side part for this app
import bcrypt from 'bcryptjs'
import type { User, NewUser } from '@/types/store-types'
import { mockUsers } from '@/services/mock-data'

// TODO:
// rearrange components by functionality (not states then computed then watch and methods)
// revive api.js

export const useUsersStore = defineStore('users', () => {
  // in a real app with server-side part it wouldn't be like that with the reactive list of users here
  const users = ref<User[]>([])

  const hashPassword = async (barePassword: string) => {
    return await bcrypt.hash(barePassword, 10)
  }

  const initializeUsers = async (singleUserData: User | null) => {
    if (users.value.length) {
      return
    }

    if (singleUserData) {
      users.value = [singleUserData]
      return
    }

    try {
      const list = []
      let order = 1
      for (const key in mockUsers) {
        const userData = mockUsers[key]
        userData.password = await hashPassword('qwerty')
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
    if (mockUsers[newUserData.e_mail]) {
      throw new Error(
        `This login or e-mail - "${newUserData.e_mail}" is already used. Please, choose another one and try again.`
      )
    }

    return new Promise<User>((resolve, reject) => {
      setTimeout(async () => {
        const hashedPassword = await bcrypt.hash(newUserData.password, 10)
        const mockId = Math.random().toString(36).substr(2, 6)
        const userData = {
          ...newUserData,
          id: mockId,
          password: hashedPassword,
          order: users.value.length + 1
        }
        mockUsers[userData.e_mail] = userData
        users.value.push(userData)
        resolve({ ...newUserData, id: mockId })
      }, 1500)
    })
  }

  const deleteUser = (id: number | string) => {
    return new Promise<number | string>((resolve, reject) => {
      setTimeout(() => {
        const userIndex = users.value.findIndex((item) => item.id === id)
        if (userIndex === -1) {
          reject(new Error('User not found'))
        }
        users.value.splice(userIndex, 1)
        resolve(id)
      }, 1000)
    })
  }

  const editUserData = (user: User, userId: number | string) => {
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        const index = users.value.findIndex((item) => item.id === userId)
        if (index === -1) {
          reject(new Error('User not found'))
        }
        const updatedUser = {
          ...users.value[index],
          first_name: user.first_name,
          second_name: user.second_name,
          e_mail: user.e_mail
        }
        users.value[index] = updatedUser
        resolve(updatedUser)
      }, 1500)
    })
  }

  return { users, initializeUsers, addUser, deleteUser, editUserData, hashPassword }
})
