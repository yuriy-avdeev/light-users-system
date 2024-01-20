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
const showRegisterForm = ref(false)

onBeforeRouteLeave((to) => {
  previousRoute.value = to.fullPath
})

const closePopup = () => {
  userAccessFormStore.closeUserAccessForm()
  showRegisterForm.value = false
}
</script>

<template>
  <div class="home-page">
    <h1 class="home-page__title">Home page</h1>

    <PopupWrapper
      v-if="userAccessFormStore.showAccessForm"
      @close-popup="closePopup"
    >
      <UiButton
        class="home-page__toggle-button"
        type="button"
        @click.prevent="showRegisterForm = !showRegisterForm"
      >
        click to {{ showRegisterForm ? 'login' : 'register' }}
      </UiButton>

      <RegistrationForm v-if="showRegisterForm" />

      <LoginForm
        v-else
        :next-page="previousRoute"
      />
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
</style>
