<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/users'
import UsersList from '@/components/UsersList.vue'
import UiLoader from '@/components/UI/UiLoader.vue'
import PopupWrapper from '@/components/PopupWrapper.vue'

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
    <UiLoader v-if="isLoading" />

    <PopupWrapper
      v-else-if="error"
      @close-popup="error = null"
    >
      <div class="users-list-page__error-container">
        <span class="users-list-page__error-sign"> &#10006; </span>
        <p class="users-list-page__error-text"> {{ error }}</p>
      </div>
    </PopupWrapper>

    <UsersList v-if="!isLoading && users.length" />
  </div>
</template>

<style scoped lang="scss">
.users-list-page {
  &__error-sign {
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
    margin: 0 auto 20px;
  }

  &__error-text {
    font-size: 15px;
    font-weight: 500;
    text-align: center;
    color: var(--color-danger);
    margin: 0 auto;
  }
}
</style>
