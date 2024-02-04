<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useUserAccessFormStore } from '@/stores/userAccessForm'
import Button from '@/components/UI/Button/Button.vue'
import HeaderNavigation from '@/components/HeaderNavigation/HeaderNavigation.vue'
import DropdownWrapper from '@/components/DropdownWrapper/DropdownWrapper.vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})

const router = useRouter()
const userStore = useUserStore()
const userAccessFormStore = useUserAccessFormStore()
const isConfirmationContainerOpened = ref(false)

const loginButtonText = computed(() => {
  return userStore.isAuthenticated ? 'Logout' : 'Login'
})

const handleLoginButton = () => {
  if (userStore.isAuthenticated) {
    isConfirmationContainerOpened.value = !isConfirmationContainerOpened.value
  } else {
    userAccessFormStore.openUserAccessForm()
    router.push('/')
  }
}

const logout = () => {
  userStore.logout()
  isConfirmationContainerOpened.value = false
  router.push('/')
}
</script>

<template>
  <header class="header">
    <h3 class="header__title">{{ props.title }}</h3>

    <HeaderNavigation />

    <div class="header__login">
      <Button
        :text="loginButtonText"
        isDarkBase
        :isActive="isConfirmationContainerOpened"
        type="button"
        :class="[
          'header__login-button',
          {
            'header__login-button_has-user':
              userStore.auth && !userStore.isAdmin,
          },
          { 'header__login-button_active': isConfirmationContainerOpened },
        ]"
        @click.stop.prevent="handleLoginButton"
      >
        <span v-if="userStore.isAdmin" class="header__button-admin-letter">
          A
        </span>
      </Button>

      <DropdownWrapper
        v-if="isConfirmationContainerOpened"
        @close-container="isConfirmationContainerOpened = false"
        class="header__confirmation-dropdown"
      >
        <p class="header__confirmation-text">Are you sure?</p>

        <Button
          text="YES"
          @click.prevent="logout"
          type="button"
          class="header__confirmation-button"
        />

        <Button
          text="NO"
          @click.stop.prevent="isConfirmationContainerOpened = false"
          class="header__confirmation-button"
          type="button"
        />
      </DropdownWrapper>
    </div>
  </header>
</template>

<style scoped src="./app-header.scss"></style>
