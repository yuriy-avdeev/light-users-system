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
  background-color: greenyellow;
}

.router-link-exact-active {
  color: blue;
}
</style>
