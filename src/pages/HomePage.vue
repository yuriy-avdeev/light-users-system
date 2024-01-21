<script setup lang="ts">
import { ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useUserAccessFormStore } from '@/stores/userAccessForm'
import PopupWrapper from '@/components/PopupWrapper.vue'
import LoginForm from '@/components/LoginForm.vue'
import RegistrationForm from '@/components/RegistrationForm.vue'
import UiButton from '@/components/UI/UiButton.vue'

const userAccessFormStore = useUserAccessFormStore()
const previousRoute = ref('')
const showLoginForm = ref(true)
const userNotification = ref('')
const userNotificationClassModifier = ref('')

// TODO - transfer almost all logic outside and leave here omnly components

onBeforeRouteLeave((to) => {
  previousRoute.value = to.fullPath
})

const closePopup = () => {
  userAccessFormStore.closeUserAccessForm()
  showLoginForm.value = true
  userNotification.value = ''
}

const handleLogin = (payload: { isSuccessful: boolean, message: string }) => {
  showNotification(payload.message, payload.isSuccessful ? 'success' : 'failed')
  resetNotificationWithDelay(2500, payload.isSuccessful)
}

const handleRegistration = (payload: { isSuccessful: boolean, message: string }) => {
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

const resetNotificationWithDelay = (delay: number, shouldCosePopup: boolean = false) => {
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
        <UiButton
          class="home-page__toggle-button"
          type="button"
          @click.prevent="showLoginForm = !showLoginForm"
        >
          click to {{ showLoginForm ? 'register' : 'login' }}
        </UiButton>

        <LoginForm
          v-if="showLoginForm"
          :next-page="previousRoute"
          @is-login="handleLogin"
        />

        <RegistrationForm
          v-else
          @is-registered="handleRegistration"
        />
      </template>
    </PopupWrapper>
  </div>
</template>

<style>
.home-page {
  display: flex;
  justify-content: center;
}

.home-page__toggle-button {
  width: fit-content;
  margin: 0 auto 15px 0;
  padding: 4px 8px !important;
}

.home-page__popup-notification {
  padding: 0 15px;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
}

.home-page__popup-notification.success {
  color: var(--color-success);
}

.home-page__popup-notification.failed {
  color: var(--color-danger);
}
</style>
