<script setup lang="ts">
import { computed } from 'vue'
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

const buttonText = computed(() => {
  return userStore.isAuthenticated ? 'Logout' : 'Login'
})

const handleLoginButton = () => {
  router.push('/')
  if (userStore.isAuthenticated) {
    userStore.logout()
  } else {
    loginFormStore.openLoginForm()
  }
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

    <button
      class="header__button"
      :class="[{ 'header__button--active': userStore.auth && !userStore.isAdmin }]"
      @click.prevent="handleLoginButton"
    >
      <span
        v-if="userStore.isAdmin"
        class="header__button-admin-letter"
      >
        A
      </span>

      {{ buttonText }}
    </button>
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

.header__button {
  padding: 8px 10px;
  height: 28px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  border: none;
  outline: none;
  background: transparent;
  font: 500 12px/1 'Roboto';
  color: var(--color-white-soft);
  transition: box-shadow 350ms;
  cursor: pointer;
}

.header__button--active {
  padding-left: 28px;
  background: url(@/assets/icons/user.svg) no-repeat;
  background-size: 18px;
  background-position: 5px center;
}

.header__button-admin-letter {
  font-size: 18px;
  margin-right: 4px;
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

@media (min-width: 1048px) {
  .header {
    padding: 16px calc((100% - 1024px) / 2);
  }
}

@media (hover: hover) {
  .header__button:hover {
    box-shadow: inset 3px -3px 8px var(--color-text-hovered);
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
