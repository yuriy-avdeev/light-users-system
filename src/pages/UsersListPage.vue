<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'

const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)
const userName = computed(
  () => {
    if (currentUser.value) {
      return `${currentUser.value.first_name} ${currentUser.value.second_name}`
    }
    return ''
  }
)
</script>

<template>
  <ul class="users-list-page">
    <li class="users-list-page__item">
      something else
    </li>

    <li class="users-list-page__item">user - {{ userName }}</li>
  </ul>
</template>
