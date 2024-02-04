<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/users'
import UsersList from '@/components/UsersList/UsersList.vue'
import Loader from '@/components/UI/Loader/Loader.vue'
import PopupWrapper from '@/components/PopupWrapper/PopupWrapper.vue'

const usersStore = useUsersStore()
const { users } = storeToRefs(usersStore)
const isLoading = ref(false)
const error: Ref<null | string> = ref(null)

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
    <Loader v-if="isLoading" />

    <PopupWrapper v-else-if="error" @close-popup="error = null">
      <div class="users-list-page__error-container">
        <span class="users-list-page__error-sign">&#10006;</span>
        <p class="users-list-page__error-text">{{ error }}</p>
      </div>
    </PopupWrapper>

    <UsersList v-if="!isLoading" />
  </div>
</template>

<style scoped scr="./users-list-page.scss"></style>
