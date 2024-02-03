<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/users'
import type { User, SortableUsersListFields } from '@/types/store-types'
import Button from '@/components/UI/Button/Button.vue'
import Arrow from '@/components/UI/Arrow/Arrow.vue'
import PopupWrapper from '@/components/PopupWrapper/PopupWrapper.vue'
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm.vue'

const usersStore = useUsersStore()
const { users } = storeToRefs(usersStore)
const isOpenPopup = ref(false)
const sortByFirstName = ref('')
const sortBySecondName = ref('')
const sortByEMail = ref('')

const usersModelList = computed(() => {
  let sortField: SortableUsersListFields | null = null
  let sortOrder = ''
  if (sortByFirstName.value) {
    sortField = 'first_name'
    sortOrder = sortByFirstName.value
  } else if (sortBySecondName.value) {
    sortField = 'second_name'
    sortOrder = sortBySecondName.value
  } else if (sortByEMail.value) {
    sortField = 'e_mail'
    sortOrder = sortByEMail.value
  }
  if (sortField) {
    return getSortedList(sortField, sortOrder)
  }
  return users.value
})

const getSortedList = (field: SortableUsersListFields, order: string) => {
  if (order === 'up') {
    return [...users.value].sort((a, b) => a[field].localeCompare(b[field]))
  }
  return [...users.value].sort((a, b) => b[field].localeCompare(a[field]))
}

watch(sortByFirstName, (newValue) => {
  if (newValue) {
    sortBySecondName.value = ''
    sortByEMail.value = ''
  }
})

watch(sortBySecondName, (newValue) => {
  if (newValue) {
    sortByFirstName.value = ''
    sortByEMail.value = ''
  }
})

watch(sortByEMail, (newValue) => {
  if (newValue) {
    sortByFirstName.value = ''
    sortBySecondName.value = ''
  }
})

const createUser = () => {
  // it's pointless to create new user manually and it needs just for training
  isOpenPopup.value = true
}

const editUser = (user: User) => {
  console.log('user: ', user)
  //
}

const deleteUser = (id: number | string) => {
  console.log('id: ', id)
  //
}
</script>

<template>
  <div class="users-list">
    <Button
      text="Create User"
      type="button"
      @click.prevent="createUser"
      class="users-list__create-button"
    />

    <PopupWrapper v-if="isOpenPopup" @close-popup="isOpenPopup = false">
      <RegistrationForm @is-registered="isOpenPopup = false" />
    </PopupWrapper>

    <table class="users-table">
      <thead>
        <tr class="users-table__header">
          <th class="users-table__column users-table__column_order">
            &#x2116;
          </th>

          <th
            class="users-table__column users-table__column_id users-table__column_mobile-hidden"
          >
            ID
          </th>

          <th class="users-table__column users-table__column_first-name">
            <Arrow
              direction="up"
              :is-active="sortByFirstName === 'up'"
              @click.prevent="sortByFirstName = 'up'"
            />

            <Arrow
              direction="down"
              :is-active="sortByFirstName === 'down'"
              @click.prevent="sortByFirstName = 'down'"
            />
            <span>First Name</span>
          </th>

          <th class="users-table__column users-table__column_second-name">
            <Arrow
              direction="up"
              :is-active="sortBySecondName === 'up'"
              @click.prevent="sortBySecondName = 'up'"
            />

            <Arrow
              direction="down"
              :is-active="sortBySecondName === 'down'"
              @click.prevent="sortBySecondName = 'down'"
            />
            <span>Second Name</span>
          </th>

          <th
            class="users-table__column users-table__column_e-mail users-table__column_mobile-hidden"
          >
            <Arrow
              direction="up"
              :is-active="sortByEMail === 'up'"
              @click.prevent="sortByEMail = 'up'"
            />

            <Arrow
              direction="down"
              :is-active="sortByEMail === 'down'"
              @click.prevent="sortByEMail = 'down'"
            />
            <span>E-mail</span>
          </th>

          <th class="users-table__column_mobile-hidden"></th>

          <th class="users-table__column_mobile-hidden"></th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(user, index) in usersModelList"
          :key="user.id"
          class="users-table__row"
        >
          <td class="users-table__column users-table__column_order">
            {{ index + 1 }}
          </td>

          <td
            class="users-table__column users-table__column_id users-table__column_mobile-hidden"
          >
            {{ user.id }}
          </td>

          <td class="users-table__column users-table__column_first-name">
            {{ user.first_name }}
          </td>

          <td class="users-table__column users-table__column_second-name">
            {{ user.second_name }}
          </td>

          <td
            class="users-table__column users-table__column_e-mail users-table__column_mobile-hidden"
          >
            {{ user.e_mail }}
          </td>

          <td
            class="users-table__column users-table__column_button users-table__column_mobile-hidden"
          >
            <Button
              text="Edit"
              type="button"
              @click.prevent="editUser(user)"
              class="users-table__button"
            />
          </td>

          <td
            class="users-table__column users-table__column_button users-table__column_mobile-hidden"
          >
            <Button
              text="Delete"
              type="button"
              @click.prevent="deleteUser(user.id)"
              class="users-table__button"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped src="./users-list.scss"></style>
