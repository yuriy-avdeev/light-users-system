<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useLoginFormStore } from '@/stores/loginForm'

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
        class="header__link"
        to="/users"
      >
        Users
      </RouterLink>

      <RouterLink
        v-if="userStore.currentUser"
        class="header__link"
        :to="`/users/${userStore.currentUser.id}`"
      >
        Your page
      </RouterLink>
    </nav>

    <div class="header__login-container">
      <button
        class="header__login-button"
        :class="[{
          'header__login-button--active': userStore.auth && !userStore.isAdmin,
          'header__login-button--focus': isConfirmationContainerOpened
        }]"
        @click.prevent="handleLoginButton"
      >
        <span
          v-if="userStore.isAdmin"
          class="header__button-admin-letter"
        >
          A
        </span>

        {{ loginButtonText }}
      </button>

      <div
        class="header__confirmation-container"
        :class="{ 'header__confirmation-container--active': isConfirmationContainerOpened }"
      >
        <p class="header__confirmation-text">
          Are you sure?
        </p>

        <button
          class="
          header__confirmation-button"
          @click.prevent="logout"
        >
          YES
        </button>

        <button
          class="header__confirmation-button"
          @click.prevent="isConfirmationContainerOpened = false"
        >
          NO
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  padding: 12px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: var(--color-background-secondary);
}

.header__title {
  width: 100%;
  text-align: center;
  font: 500 18px/1.3 'Roboto';
  color: var(--color-white-soft);
  margin-bottom: 5px;
}

.header__nav {
  text-align: right;
}

.header__link {
  font: 500 12px/1.3 'Roboto';
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

.header__login-container {
  position: relative;
}

.header__login-button {
  padding: 8px 10px;
  height: 28px;
  display: flex;
  align-items: center;
  border-radius: 6px;
  border: none;
  outline: none;
  background: transparent;
  font: 500 12px/1 'Roboto';
  color: var(--color-white-soft);
  transition: box-shadow 350ms;
  cursor: pointer;
}

.header__login-button--focus {
  box-shadow: inset 3px -3px 6px var(--color-white-soft);
  border-radius: 6px 6px 0 0;
}

.header__login-button--active {
  padding-left: 28px;
  background: url(@/assets/icons/user.svg) no-repeat;
  background-size: 18px;
  background-position: 5px center;
}

.header__button-admin-letter {
  font-size: 18px;
  margin-right: 4px;
}

.header__confirmation-container {
  width: 125px;
  height: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 7px;
  position: absolute;
  top: calc(100% + 2px);
  right: 0;
  border-radius: 8px 0 8px 8px;
  background-color: var(--color-white);
  transition: height 350ms;
}

.header__confirmation-container--active {
  height: 75px;
}

.header__confirmation-text {
  margin-top: 7px;
  width: 100%;
  font: 400 13px/1 'Roboto';
  color: var(--color-black-soft);
  text-align: center;
}

.header__confirmation-button {
  padding: 6px;
  display: flex;
  align-items: center;
  border-radius: 3px;
  border: none;
  outline: none;
  background: none;
  font: 500 14px/1 'Roboto';
  color: var(--color-black-soft);
  transition: box-shadow 350ms;
  cursor: pointer;
}

@media (min-width: 1048px) {
  .header {
    padding: 16px calc((100% - 1024px) / 2);
  }
}

@media (hover: hover) {
  .header__login-button:hover {
    box-shadow: inset 3px -3px 6px var(--color-white-soft);
  }

  .header__confirmation-button:first-of-type:hover {
    box-shadow: inset 0 0 5px var(--color-dark-grey);
  }

  .header__confirmation-button:last-of-type:hover {
    box-shadow: inset 0 0 5px var(--color-success);
  }

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
