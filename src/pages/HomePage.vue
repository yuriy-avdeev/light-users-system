<script setup lang="ts">
import { useLoginFormStore } from '@/stores/loginForm';
import PopupWrapper from '@/components/PopupWrapper.vue';
import LoginForm from '@/components/LoginForm.vue';

const loginFormStore = useLoginFormStore();
</script>

<template>
  <div class="home-page">
    <h1 class="home-page__title">Home page test</h1>
    <PopupWrapper
      v-if="loginFormStore.showForm"
      @click.self="loginFormStore.closeLoginForm()"
    >
      <LoginForm :next-page="loginFormStore.nextPage" />
    </PopupWrapper>
  </div>
</template>

<style>
.home-page {
  display: flex;
  justify-content: center;
  position: relative;
}
</style>
