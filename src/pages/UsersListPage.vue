<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/users'
import type { User } from '@/types/store-types'
import UsersList from '@/components/UsersList.vue'


const usersStore = useUsersStore()
const { users } = storeToRefs(usersStore)
import UiButton from '@/components/UI/UiButton.vue'

const createUser = () => {
  // open popup with form - pointless to create new user manually here, but...
}
</script>

<template>
  <div v-if="!users">
    <!-- TODO - add loader component -->
    Loading users...
  </div>


  <div
    v-else
    class="users-list-page"
  >
    <UiButton
      text="Create User"
      @click.prevent="createUser"
    />

    <UsersList />
  </div>
</template>

<style scoped>
.users-list-page {
  /*  */
}
</style>
