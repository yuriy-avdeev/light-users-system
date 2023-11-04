<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';

const userStore = useUserStore();
const { isAuthenticated, user } = storeToRefs(userStore);
const userName = computed(
  () => `${user?.value?.first_name} ${user?.value?.second_name}`
);
</script>

<template>
  <ul class="users-list-page">
    <li class="users-list-page__item">
      isAuthenticated - {{ isAuthenticated }}
    </li>

    <li class="users-list-page__item">user - {{ userName }}</li>
  </ul>
</template>
