<script setup lang="ts">
import { RouterView } from "vue-router";
import AppHeader from "@/components/AppHeader/AppHeader.vue";
import AppFooter from "@/components/AppFooter/AppFooter.vue";
</script>

<template>
  <div class="app">
    <AppHeader title="Light users system" />

    <RouterView class="app__body" />

    <AppFooter />
  </div>
</template>

<style scoped lang="scss">
.app {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  &__body {
    flex: 1;
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    display: flex;
    box-shadow: 0 5px 25px var(--color-dark-grey);
    padding: 16px 12px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 7px;
      background-color: var(--color-light-grey);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--color-dark-grey);
      border-radius: 3px;
    }
  }
}

@media screen and (min-width: 768px) {
  .app__body {
    padding: 16px 20px;
  }
}
</style>
