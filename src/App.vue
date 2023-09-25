<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
</script>

<template>
  <div class="app">
    <AppHeader title="Vue-3 test application" />

    <RouterView />
  </div>
</template>

<style scoped>
.app {
  width: 100%;
  max-width: 1024px;
  min-height: 100vh;
  padding: 0 12px;
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .app {
    /* // */
  }
}
</style>
