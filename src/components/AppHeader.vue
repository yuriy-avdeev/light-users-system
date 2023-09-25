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
  /* // */
}

.router-link-exact-active {
  color: blue;
}

@media (hover: hover) {
  .header__link:hover {
    color: red;
  }
}
</style>
