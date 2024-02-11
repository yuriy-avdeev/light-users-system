<script setup lang="ts">
import { ref } from 'vue'
import { useUsersStore } from '@/stores/users'
import { onBeforeRouteLeave } from 'vue-router'
import { useUserAccessFormStore } from '@/stores/userAccessForm'
import PopupWrapper from '@/components/PopupWrapper/PopupWrapper.vue'
import LoginForm from '@/components/LoginForm/LoginForm.vue'
import UserForm from '@/components/UserForm/UserForm.vue'
import Button from '@/UI/Button/Button.vue'
import type { User } from '@/types/store-types'

const usersStore = useUsersStore()
const userAccessFormStore = useUserAccessFormStore()
const previousRoute = ref('')
const showLoginForm = ref(true)
const userNotification = ref('')
const userNotificationClassModifier = ref('')

onBeforeRouteLeave((to) => {
  previousRoute.value = to.fullPath
})

const closePopup = () => {
  userAccessFormStore.closeUserAccessForm()
  showLoginForm.value = true
  userNotification.value = ''
}

const handleLogin = (payload: { is_successful: boolean; message: string }) => {
  showNotification(
    payload.message,
    payload.is_successful ? 'success' : 'failed'
  )
  resetNotificationWithDelay(2500, payload.is_successful)
}

const handleRegistration = async (user: User) => {
  try {
    await usersStore.addUser(user)
    showNotification(
      `${user.first_name}, you were registered successfully. Now you just need to login.`,
      'success'
    )
    showLoginForm.value = true
  } catch (e) {
    let message: string
    if (e instanceof Error && e.message) {
      message = e.message
    } else {
      message = 'Some problems with your registration. Please, try again later.'
    }
    showNotification(message, 'failed')
  } finally {
    resetNotificationWithDelay(3000)
  }
}

const showNotification = (message: string, modifier: string) => {
  userNotification.value = message
  userNotificationClassModifier.value = modifier
}

const resetNotificationWithDelay = (
  delay: number,
  shouldCosePopup: boolean = false
) => {
  setTimeout(() => {
    userNotification.value = ''
    userNotificationClassModifier.value = ''
    if (shouldCosePopup) {
      closePopup()
    }
  }, delay)
}
</script>

<template>
  <div class="home-page">
    <h1 class="home-page__title">Home page</h1>

    <PopupWrapper
      v-if="userAccessFormStore.showAccessForm"
      @close-popup="closePopup"
    >
      <h3
        v-if="userNotification"
        :class="`home-page__popup-notification ${userNotificationClassModifier}`"
      >
        {{ userNotification }}
      </h3>

      <template v-else>
        <Button
          class="home-page__toggle-button"
          type="button"
          @click.prevent="showLoginForm = !showLoginForm"
        >
          click to {{ showLoginForm ? 'register' : 'login' }}
        </Button>

        <LoginForm
          v-if="showLoginForm"
          :next-page="previousRoute"
          @is-login="handleLogin"
        />

        <UserForm
          v-else
          button-text="Register"
          @user-data="handleRegistration"
        />
      </template>
    </PopupWrapper>
  </div>
</template>

<style scoped src="./home-page.scss"></style>
