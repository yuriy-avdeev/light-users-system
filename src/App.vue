<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
</script>

<template>
  <div class="app">
    <AppHeader msg="Header content" />

    <nav class="app__nav">
      <!-- transfer to the Header -->
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>

    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
.app {
  max-height: 100vh;

  &__nav a.router-link-exact-active {
    color: var(--color-text);
  }

  &__nav a.router-link-exact-active:hover {
    background-color: transparent;
  }

  @media (min-width: 1024px) {
    //
  }
}
</style>
