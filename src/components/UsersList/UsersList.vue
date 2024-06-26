<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/users'
import type { User, SortableUsersListFields } from '@/types/store-types'
import Button from '@/components/UI/Button/Button.vue'
import Arrow from '@/components/UI/Arrow/Arrow.vue'
import Input from '@/components/UI/Input/Input.vue'
import ConfirmationContainer from '@/components/ConfirmationContainer/ConfirmationContainer.vue'
import PopupWrapper from '@/components/PopupWrapper/PopupWrapper.vue'
import UserForm from '@/components/UserForm/UserForm.vue'
import AppPagination from '@/components/AppPagination/AppPagination.vue'
import Loader from '@/components/UI/Loader/Loader.vue'

const usersStore = useUsersStore()
const { users: usersStoredList } = storeToRefs(usersStore)
const isCreateUserPopupOpen = ref(false)
const confirmationContainerToDeleteId = ref<string | number | null>(null)
const editUserPopupId = ref<string | number | null>(null)
const popupWarning = ref('')
const searchValue = ref('')
const isLoading = ref(false)

// filtering
const getFilteredList = () => {
  const query = searchValueModel.value.toLowerCase()
  return usersStoredList.value.filter((item) => {
    const { first_name, second_name, e_mail } = item
    return (
      first_name.toLowerCase().includes(query) ||
      second_name.toLowerCase().includes(query) ||
      e_mail.toLowerCase().includes(query)
    )
  })
}

const searchValueModel = computed(() => {
  if (searchValue.value.length >= 3) {
    return searchValue.value
  }
  return ''
})

const usersStoredListFiltered = computed(() => {
  if (searchValueModel.value) {
    return getFilteredList()
  }
  return usersStoredList.value
})

// sorting
const sortByFirstName = ref('')
const sortBySecondName = ref('')
const sortByEMail = ref('')

const getSortedList = (field: SortableUsersListFields, order: string) => {
  if (order === 'up') {
    return [...usersStoredListFiltered.value].sort((a, b) => a[field].localeCompare(b[field]))
  }
  return [...usersStoredListFiltered.value].sort((a, b) => b[field].localeCompare(a[field]))
}

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
  return usersStoredListFiltered.value
})

const resetSorting = () => {
  sortByFirstName.value = ''
  sortBySecondName.value = ''
  sortByEMail.value = ''
}

watch(sortByFirstName, () => {
  sortBySecondName.value = ''
  sortByEMail.value = ''
})

watch(sortBySecondName, () => {
  sortByFirstName.value = ''
  sortByEMail.value = ''
})

watch(sortByEMail, () => {
  sortByFirstName.value = ''
  sortBySecondName.value = ''
})

// CRUD
const createUser = async (user: User) => {
  // it's pointless to create new user manually but...
  try {
    isLoading.value = true
    isCreateUserPopupOpen.value = false
    await usersStore.addUser(user)
  } catch (e) {
    showWarning(e, 'Some problems with the creating new user.')
  } finally {
    isLoading.value = false
  }
}

const editUserData = async (user: User) => {
  try {
    isLoading.value = true
    const userId = editUserPopupId.value
    editUserPopupId.value = null
    if (userId) {
      await usersStore.editUserData(user, userId)
    }
  } catch (e) {
    showWarning(e, 'Some problems with the editing user data.')
  } finally {
    isLoading.value = false
  }
}

const deleteUser = async (id: number | string) => {
  try {
    isLoading.value = true
    confirmationContainerToDeleteId.value = null
    await usersStore.deleteUser(id)
  } catch (e) {
    showWarning(e, 'Some problems with the deleting user.')
  } finally {
    isLoading.value = false
  }
}

const showWarning = (e: any, warning: string) => {
  if (e.message) {
    popupWarning.value = e.message
  } else {
    popupWarning.value = warning
  }
  setTimeout(() => {
    popupWarning.value = ''
  }, 3000)
}

// Pagination
const currentPaginationPage = ref(1)
const numberOfEntriesPerPage = 5

const quantityOfPaginationPages = computed(() => {
  return Math.ceil(usersModelList.value.length / numberOfEntriesPerPage)
})

const usersListPaginated = computed(() => {
  if (usersModelList.value.length <= numberOfEntriesPerPage) {
    return usersModelList.value
  }
  const startIndex = (currentPaginationPage.value - 1) * numberOfEntriesPerPage
  return usersModelList.value.slice(startIndex, startIndex + numberOfEntriesPerPage)
})

const setCurrentPaginationPage = (payload: number) => {
  currentPaginationPage.value = payload
}
</script>

<template>
  <div class="users-list">
    <Loader v-if="isLoading" />

    <div class="users-list__top-container">
      <Input
        v-model="searchValue"
        class="users-list__input"
        placeholder="Search users by names"
        :warning-text="
          searchValue.length && searchValue.length < 3
            ? 'It should include at least 3 characters'
            : ''
        "
      >
        <div class="users-list__input-icon-container">
          <button
            v-if="searchValue"
            class="users-list__input-button-clear"
            type="button"
            @click.prevent="searchValue = ''"
          >
            &#10006;
          </button>

          <img
            v-else
            class="users-list__input-search-icon"
            src="@/assets/icons/search.svg"
            alt="search icon"
            width="11"
            height="11"
          />
        </div>
      </Input>

      <Button
        class="users-list__create-button"
        text="Create User"
        type="button"
        @click.prevent="isCreateUserPopupOpen = true"
      />
    </div>

    <PopupWrapper v-if="popupWarning" @close-popup="popupWarning = ''">
      <h3 class="users-list__popup-warning">
        {{ popupWarning }}
      </h3>
    </PopupWrapper>

    <PopupWrapper v-if="isCreateUserPopupOpen" @close-popup="isCreateUserPopupOpen = false">
      <UserForm button-text="Register" show-password @user-data="createUser" />
    </PopupWrapper>

    <!-- TODO: try to create a table component -->
    <table class="users-table">
      <thead>
        <tr class="users-table__header">
          <th class="users-table__column users-table__column_order">
            <button class="users-table__update-button" @click.prevent="resetSorting">
              <img
                src="@/assets/icons/update.svg"
                alt="update button"
                width="13"
                height="13"
                loading="lazy"
              />
            </button>
          </th>

          <th class="users-table__column users-table__column_id users-table__column_mobile-hidden">
            ID
          </th>

          <th class="users-table__column users-table__column_first-name">
            <Arrow
              direction="up"
              :is-active="sortByFirstName === 'up'"
              :is-disabled="!usersStoredListFiltered.length"
              @click.prevent="sortByFirstName = 'up'"
            />

            <Arrow
              direction="down"
              :is-active="sortByFirstName === 'down'"
              :is-disabled="!usersStoredListFiltered.length"
              @click.prevent="sortByFirstName = 'down'"
            />
            <span>First Name</span>
          </th>

          <th class="users-table__column users-table__column_second-name">
            <Arrow
              direction="up"
              :is-active="sortBySecondName === 'up'"
              :is-disabled="!usersStoredListFiltered.length"
              @click.prevent="sortBySecondName = 'up'"
            />

            <Arrow
              direction="down"
              :is-active="sortBySecondName === 'down'"
              :is-disabled="!usersStoredListFiltered.length"
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
              :is-disabled="!usersStoredListFiltered.length"
              @click.prevent="sortByEMail = 'up'"
            />

            <Arrow
              direction="down"
              :is-active="sortByEMail === 'down'"
              :is-disabled="!usersStoredListFiltered.length"
              @click.prevent="sortByEMail = 'down'"
            />
            <span>E-mail</span>
          </th>

          <th class="users-table__column_mobile-hidden"></th>

          <th class="users-table__column_mobile-hidden"></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="user in usersListPaginated" :key="user.id" class="users-table__row">
          <td class="users-table__column users-table__column_order">
            {{ user.order }}
          </td>

          <td class="users-table__column users-table__column_id users-table__column_mobile-hidden">
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
              @click.stop.prevent="editUserPopupId = editUserPopupId ? null : user.id"
              class="users-table__button"
            />

            <PopupWrapper v-if="editUserPopupId === user.id" @close-popup="editUserPopupId = null">
              <UserForm
                button-text="Update"
                :first-name="user.first_name"
                :second-name="user.second_name"
                :e-mail="user.e_mail"
                @user-data="editUserData"
              />
            </PopupWrapper>
          </td>

          <td
            class="users-table__column users-table__column_button users-table__column_mobile-hidden"
          >
            <Button
              text="Delete"
              type="button"
              @click.stop.prevent="
                confirmationContainerToDeleteId = confirmationContainerToDeleteId ? null : user.id
              "
              class="users-table__button"
            />

            <ConfirmationContainer
              v-if="confirmationContainerToDeleteId === user.id"
              @click-no="confirmationContainerToDeleteId = null"
              @click-yes="deleteUser(user.id)"
              text="Are you sure?"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <AppPagination
      v-if="quantityOfPaginationPages > 1"
      :quantity-of-pages="quantityOfPaginationPages"
      :current-page="currentPaginationPage"
      @click-page="setCurrentPaginationPage"
    />
  </div>
</template>

<style scoped src="./users-list.scss"></style>
