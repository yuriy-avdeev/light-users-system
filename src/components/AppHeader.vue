<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps<{
  title: String;
}>();
</script>

<template>
  <header class="header">
    <h3 class="header__title">{{ title }}</h3>

    <nav class="header__nav">
      <RouterLink class="header__link" to="/">Home</RouterLink>
      <RouterLink class="header__link" to="/about">About</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  padding: 12px;
  background-color: var(--color-background-secondary);
}

.header__title,
.header__nav {
  width: 100%;
}

.router-link-exact-active {
  text-decoration: underline;
}

@media (min-width: 1048px) {
  .header {
    padding: 16px calc((100% - 1024px) / 2);
  }
}
</style>
