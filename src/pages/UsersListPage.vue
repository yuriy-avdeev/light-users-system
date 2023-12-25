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

    <PopupWrapper
      v-else-if="error"
      @click.self=" error = null"
    >
      <div class="users-list-page__error-container">
        <button
          class="users-list-page__error-close"
          @click.prevent=" error = null"
        >
          &#10006;
        </button>
        <span class="users-list-page__error-sign"> &#10006; </span>
        <p class="users-list-page__error-text"> {{ error }}</p>
      </div>
    </PopupWrapper>

    <template v-if="!isLoading && users.length">
      <UiButton
        text="Create User"
        @click.prevent="createUser"
        class="users-list-page__create-button"
      />

      <UsersList />
    </template>
  </div>
</template>

<style scoped>
.users-list-page {
  /*  */
}

.users-list-page__error-container {
  width: calc(100% - 30px);
  max-width: 320px;
  padding: 0 8px 34px;
  border-radius: 6px;
  background-color: var(--color-white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.users-list-page__error-close {
  margin: 4px 0 12px auto;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  color: var(--color-danger);
  transition: opacity 400ms;
}

.users-list-page__error-sign {
  font-size: 16px;
  line-height: 1;
  font-weight: 500;
  color: var(--color-danger);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid var(--color-danger);
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.users-list-page__error-text {
  font-size: 15px;
  font-weight: 500;
  color: var(--color-danger);
}

.users-list-page__create-button {
  margin: 0 0 15px auto;
}

@media (hover: hover) {
  .users-list-page__error-close:hover {
    opacity: 0.6;
  }
}
</style>
