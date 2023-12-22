<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useLoginFormStore } from '@/stores/loginForm'
import UiButton from './UI/UiButton.vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})

const router = useRouter()
const userStore = useUserStore()
const loginFormStore = useLoginFormStore()
const isConfirmationContainerOpened = ref(false)

const loginButtonText = computed(() => {
  return userStore.isAuthenticated ? 'Logout' : 'Login'
})

const handleLoginButton = () => {
  if (userStore.isAuthenticated) {
    isConfirmationContainerOpened.value = !isConfirmationContainerOpened.value
  } else {
    loginFormStore.openLoginForm()
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

    <nav class="header__nav">
      <RouterLink
        class="header__link"
        to="/"
      >
        Home
      </RouterLink>

      <RouterLink
        class="header__link"
        to="/about"
      >
        About
      </RouterLink>

      <RouterLink
        v-if="userStore.isAdmin"
        class="header__link"
        to="/users"
      >
        List of users
      </RouterLink>

      <RouterLink
        v-if="userStore.currentUser"
        class="header__link"
        :to="`/users/${userStore.currentUser.id}`"
      >
        Your page
      </RouterLink>
    </nav>

    <div class="header__login">
      <UiButton
        :text="loginButtonText"
        isDarkBase
        :isActive="isConfirmationContainerOpened"
        :class="[
          'header__login-button',
          { 'header__login-button_has-user': userStore.auth && !userStore.isAdmin },
          { 'header__login-button_active': isConfirmationContainerOpened }
        ]"
        @click.prevent="handleLoginButton"
      >
        <span
          v-if="userStore.isAdmin"
          class="header__button-admin-letter"
        >
          A
        </span>
      </UiButton>

      <div
        class="header__confirmation-wrapper"
        :class="{ 'header__confirmation-wrapper_active': isConfirmationContainerOpened }"
      >
        <div
          class="header__confirmation-container"
          :class="{ 'header__confirmation-container_active': isConfirmationContainerOpened }"
        >
          <p class="header__confirmation-text">
            Are you sure?
          </p>

          <UiButton
            text="YES"
            @click.prevent="logout"
            class="header__confirmation-button"
          />

          <UiButton
            text="NO"
            @click.prevent="isConfirmationContainerOpened = false"
            class="header__confirmation-button"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: var(--color-background-secondary);
}

.header__title {
  width: 100%;
  text-align: center;
  font: 500 20px/1.3 'Roboto';
  color: var(--color-white-soft);
  margin-bottom: 5px;
}

.header__nav {
  text-align: right;
}

.header__link {
  font: 500 14px/1.3 'Roboto';
  color: var(--color-white-soft);
  margin-left: 14px;
  transition: color 350ms;
  text-decoration: none;
  padding-bottom: 1px;
  border-bottom: solid 2px transparent;
  cursor: default;
  position: relative;
}

.router-link-exact-active {
  color: var(--color-text-hovered);
  border-bottom: solid 2px var(--color-text-hovered);
}

.header__login {
  margin-left: auto;
  position: relative;
}

.header__login-button {
  min-height: 30px;
  padding: 4px 15px;
  border: none;
}

.header__login-button_active {
  border-radius: 16px 16px 0 16px;
}

.header__login-button_has-user {
  padding-left: 36px;
  background: url(@/assets/icons/user.svg) no-repeat;
  background-size: 18px;
  background-position: 9px center;
}

.header__button-admin-letter {
  font-size: 18px;
  margin-right: 4px;
}

.header__confirmation-wrapper {
  height: 0;
  width: 125px;
  overflow: hidden;
  position: absolute;
  top: calc(100% + 2px);
  right: 0;
  height: 0;
  border-radius: 8px 0 8px 8px;
}

.header__confirmation-wrapper_active {
  height: 75px;
}

.header__confirmation-container {
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 7px;
  position: relative;
  top: -90px;
  opacity: 0;
  border-radius: 8px 0 8px 8px;
  background-color: var(--color-white);
  transition: top 450ms, opacity 400ms;
}

.header__confirmation-container_active {
  top: 0;
  opacity: 1;
}

.header__confirmation-text {
  margin-top: 7px;
  width: 100%;
  font: 400 13px/1 'Roboto';
  color: var(--color-black-soft);
  text-align: center;
}

.header__confirmation-button {
  padding: 4px 12px;
  border: none;
}

@media (min-width: 1048px) {
  .header {
    padding: 16px calc((100% - 1024px) / 2);
  }
}

@media (hover: hover) {
  .header__link:hover:not(.router-link-exact-active) {
    color: var(--color-text-hovered);
    cursor: pointer;
  }

  .header__link::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--color-text-hovered);
    transition: width 300ms;
  }

  .header__link:hover:not(.router-link-exact-active)::after {
    width: 100%;
  }
}
</style>
