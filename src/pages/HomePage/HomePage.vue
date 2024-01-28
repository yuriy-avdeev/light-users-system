<script setup lang="ts">
import { ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useUserAccessFormStore } from '@/stores/userAccessForm'
import PopupWrapper from '@/components/PopupWrapper/PopupWrapper.vue'
import LoginForm from '@/components/LoginForm/LoginForm.vue'
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm.vue'
import Button from '@/components/UI/Button/Button.vue'

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

const handleLogin = (payload: { isSuccessful: boolean; message: string }) => {
  showNotification(payload.message, payload.isSuccessful ? 'success' : 'failed')
  resetNotificationWithDelay(2500, payload.isSuccessful)
}

const handleRegistration = (payload: {
  isSuccessful: boolean
  message: string
}) => {
  showNotification(payload.message, payload.isSuccessful ? 'success' : 'failed')
  resetNotificationWithDelay(3000)
  if (payload.isSuccessful) {
    showLoginForm.value = true
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

        <RegistrationForm v-else @is-registered="handleRegistration" />
      </template>
    </PopupWrapper>
  </div>
</template>

<style scoped src="./home-page.scss"></style>
