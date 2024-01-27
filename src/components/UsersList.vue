<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/users'
import type { User, SortableUsersListFields } from '@/types/store-types'
import UiButton from './UI/UiButton.vue'
import PopupWrapper from '@/components/PopupWrapper.vue'
import RegistrationForm from './RegistrationForm.vue'

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
        <UiButton
            text="Create User"
            @click.prevent="createUser"
            class="users-list__create-button"
        />

        <PopupWrapper
            v-if="isOpenPopup"
            @close-popup="isOpenPopup = false"
        >
            <RegistrationForm @is-registered="isOpenPopup = false" />
        </PopupWrapper>

        <table class="users-table">
            <thead>
                <tr class="users-table__header">
                    <th class="users-table__column users-table__column_order">&#x2116;</th>

                    <th class="users-table__column users-table__column_id">
                        ID
                    </th>

                    <th class="users-table__column users-table__column_first-name">
                        <button
                            class="users-table__arrow"
                            :class="{ 'users-table__arrow_active': sortByFirstName === 'up' }"
                            type="button"
                            @click.prevent="sortByFirstName = 'up'"
                        >
                            ▲
                        </button>

                        <button
                            class="users-table__arrow"
                            :class="{ 'users-table__arrow_active': sortByFirstName === 'down' }"
                            type="button"
                            @click.prevent="sortByFirstName = 'down'"
                        >
                            ▼
                        </button>

                        First Name
                    </th>

                    <th class="users-table__column users-table__column_second-name">
                        <button
                            class="users-table__arrow"
                            :class="{ 'users-table__arrow_active': sortBySecondName === 'up' }"
                            type="button"
                            @click.prevent="sortBySecondName = 'up'"
                        >
                            ▲
                        </button>

                        <button
                            class="users-table__arrow"
                            :class="{ 'users-table__arrow_active': sortBySecondName === 'down' }"
                            type="button"
                            @click.prevent="sortBySecondName = 'down'"
                        >
                            ▼
                        </button>

                        Second Name
                    </th>

                    <th class="users-table__column users-table__column_e-mail">
                        <button
                            class="users-table__arrow"
                            :class="{ 'users-table__arrow_active': sortByEMail === 'up' }"
                            type="button"
                            @click.prevent="sortByEMail = 'up'"
                        >
                            ▲
                        </button>

                        <button
                            class="users-table__arrow"
                            :class="{ 'users-table__arrow_active': sortByEMail === 'down' }"
                            type="button"
                            @click.prevent="sortByEMail = 'down'"
                        >
                            ▼
                        </button>

                        E-mail
                    </th>

                    <th></th>

                    <th></th>
                </tr>
            </thead>

            <tbody>
                <tr
                    v-for="(user, index) in usersModelList"
                    :key="user.id"
                    class="users-table__row"
                >
                    <td class="users-table__column users-table__column_order">{{ index + 1 }}</td>

                    <td class="users-table__column users-table__column_id">{{ user.id }}</td>

                    <td class="users-table__column users-table__column_first-name"> {{ user.first_name }} </td>

                    <td class="users-table__column users-table__column_second-name">{{ user.second_name }}</td>

                    <td class="users-table__column users-table__column_e-mail">{{ user.e_mail }}</td>

                    <td class="users-table__column users-table__column_button">
                        <UiButton
                            text="Edit"
                            @click.prevent="editUser(user)"
                            class="users-table__button"
                        />
                    </td>

                    <td class="users-table__column users-table__column_button">
                        <UiButton
                            text="Delete"
                            @click.prevent="deleteUser(user.id)"
                            class="users-table__button"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.users-list__create-button {
    margin: 0 0 15px auto;
}

.users-table {
    width: 100%;
}

.users-table__header {
    height: 35px;
    background-color: var(--color-light-grey);
}

.users-table__row {
    height: 55px;
}

.users-table__row:nth-of-type(even) {
    background-color: var(--color-light-grey);
}

.users-table__column {
    padding: 4px;
    text-align: start;
    font-size: 14px;
}

.users-table__column_order {
    width: 45px;
}

.users-table__column_id {
    width: 90px;
}

.users-table__column_first-name {
    width: 200px;
}

.users-table__column_second-name {
    width: 200px;
}

.users-table__column_e-mail {
    width: 240px;
}

.users-table__column_button {
    padding: 2px 10px;
}

.users-table__button {
    padding: 4px 14px;
}

.users-table__arrow:last-of-type {
    margin-right: 20px;
}

.users-table__arrow {
    padding: 1px;
    border: none;
    outline: none;
    background: none;
    font-size: 13px;
    transition: color 300ms;
}

.users-table__arrow_active {
    color: var(--color-info);
}

@media (hover: hover) {
    .users-table__arrow:hover {
        cursor: pointer;
        color: var(--color-info);
    }
}
</style>
