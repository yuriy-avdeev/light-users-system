<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps<{
  title: String;
}>();
</script>

<template>
  <div class="about">
    <h1>About page test</h1>

    <nav class="header__nav">
      <RouterLink class="header__link" to="/">Home</RouterLink>
      <RouterLink class="header__link" to="/about">About</RouterLink>
    </nav>
  </div>
</template>

<style>
.about {
  display: flex;
  justify-content: center;
}
</style>
