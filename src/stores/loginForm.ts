import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginFormStore = defineStore('loginForm', () => {
  const showForm = ref(false)

  const openLoginForm = () => {
    showForm.value = true
  }

  const closeLoginForm = () => {
    showForm.value = false
  }

  return { showForm, openLoginForm, closeLoginForm }
})
