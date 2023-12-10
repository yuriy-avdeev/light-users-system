<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<!-- TODO - puzzle out fonts uploading on the slow connection -->
<template>
  <div class="app">
    <AppHeader title="Light users system" />

    <RouterView class="app__body" />

    <AppFooter />
  </div>
</template>

<style scoped>
.app {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app__body {
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  flex: 1;
  box-shadow: 0 5px 25px #d5d5d5;
  padding: 16px 12px;
}
</style>
