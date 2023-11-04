<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const userStore = useUserStore();

const buttonText = computed(() => {
  return userStore.isAuthenticated ? 'Logout' : 'Login';
})

const handleLoginButton = () => {
  if (userStore.isAuthenticated) {
    userStore.logout();
    router.push('/');
  } else {
    router.push('/login');
  }
}
</script>

<template>
  <header class="header">
    <h3 class="header__title">{{ props.title }}</h3>

    <button
      class="header__button"
      @click.prevent="handleLoginButton"
    >
      {{ buttonText }}
    </button>

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
    </nav>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  padding: 12px;
  background-color: var(--color-background-secondary);
}

.header__title {
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
    transition: width 350ms;
  }

  .header__link:hover:not(.router-link-exact-active)::after {
    width: 100%;
  }
}
</style>
