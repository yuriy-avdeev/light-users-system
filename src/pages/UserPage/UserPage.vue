<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import Button from '@/components/UI/Button/Button.vue'
import PopupWrapper from '@/components/PopupWrapper/PopupWrapper.vue'
import UserForm from '@/components/UserForm/UserForm.vue'
import type { User } from '@/types/store-types'

const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)
const isPopupActive = ref(false)

const editUserData = async (userData: User) => {
  // TODO: add loader
  // if e_mail - send a notification to confirm it
  if (currentUser.value) {
    await userStore.editUserData(userData, currentUser.value.id)
  }
  isPopupActive.value = false
}
</script>

<template>
  <div v-if="currentUser" class="user-page">
    <h2 class="user-page__title">
      Hey {{ currentUser.first_name }}!
      <br />
      Here is your data:
    </h2>

    <ul class="user-page__data-list">
      <li class="user-page__data-item">
        First name:
        <p class="user-page__data-text">
          {{ currentUser.first_name }}
        </p>
      </li>

      <li class="user-page__data-item">
        Second name:
        <p class="user-page__data-text">
          {{ currentUser.second_name }}
        </p>
      </li>

      <li class="user-page__data-item">
        Your e_mail:
        <p class="user-page__data-text">
          {{ currentUser.e_mail }}
        </p>
      </li>
    </ul>

    <p class="user-page__message">
      If you want to change your data, please click button below and when you are ready don't forget
      to save updates.
    </p>

    <Button text="Update" class="user-page__button" @click.prevent="isPopupActive = true" />

    <PopupWrapper v-if="isPopupActive" @close-popup="isPopupActive = false">
      <UserForm
        button-text="Save"
        :first-name="currentUser.first_name"
        :second-name="currentUser.second_name"
        :e-mail="currentUser.e_mail"
        @user-data="editUserData"
      />
    </PopupWrapper>
  </div>
</template>

<style scoped src="./user-page.scss"></style>
