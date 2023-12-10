<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/users'
import UsersList from '@/components/UsersList.vue'
import UiButton from '@/components/UI/UiButton.vue'
import AppLoader from '@/components/AppLoader.vue'
import PopupWrapper from '@/components/PopupWrapper.vue'
// import type of the new user

const usersStore = useUsersStore()
const { users } = storeToRefs(usersStore)
const isLoading = ref(false)
const error: Ref<null | string> = ref(null)

const createUser = () => {
  // open popup with form - pointless to create new user manually here, but...
}

onMounted(async () => {
  if (!users.value.length) {
    try {
      isLoading.value = true
      await usersStore.initializeUsers()
      error.value = null
    } catch (e) {
      if (e instanceof Error) {
        error.value = e.message
      } else {
        error.value = 'Error: loading users data'
      }
    } finally {
      isLoading.value = false
    }
  }
})
</script>

<template>
  <div class="users-list-page">
    <AppLoader v-if="isLoading" />

    <!-- TODO rework these handlers -->
    <PopupWrapper
      v-else-if="error"
      @click.self="error = null"
      @keydown.esc="error = null"
    >
      <p class="users-list-page"> {{ error }}</p>
      {{ error }}
    </PopupWrapper>

    <template v-else>
      <UiButton
        text="Create User"
        @click.prevent="createUser"
      />

      <UsersList />
    </template>
  </div>
</template>

<style scoped>
.users-list-page {
  /*  */
}
</style>
