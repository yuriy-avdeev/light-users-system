<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/users'
import type { IUser } from '@/types/store-types'
import UiButton from './UI/UiButton.vue'
import PopupWrapper from '@/components/PopupWrapper.vue'
import RegistrationForm from './RegistrationForm.vue'
// import type of the new user

const usersStore = useUsersStore()
const { users } = storeToRefs(usersStore)
const isOpenPopup = ref(false)

const createUser = () => {
    isOpenPopup.value = true
    // open popup with form - pointless to create new user manually here, but...
}

const editUser = (user: IUser) => {
    console.log('user: ', user)
    //
}

const deleteUser = (id: number | string) => {
    console.log('id: ', id)
    //
}
</script>

<template>
    <div class="user-list">
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
                    <th class="users-table__column users-table__column_id">ID</th>

                    <th class="users-table__column users-table__column_first-name">First Name</th>

                    <th class="users-table__column users-table__column_second-name">Second Name</th>

                    <th class="users-table__column users-table__column_e-mail">E-mail</th>

                    <th></th>

                    <th></th>
                </tr>
            </thead>

            <tbody>
                <tr
                    v-for="user in users"
                    :key="user.id"
                    class="users-table__row"
                >
                    <td class="users-table__column users-table__column_id">{{ user.id }}</td>

                    <td class="users-table__column users-table__column_first-name">{{ user.first_name }}</td>

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

.users-table__header,
.users-table__row:nth-of-type(even) {
    background-color: var(--color-light-grey);
}

.users-table__column {
    padding: 4px;
    text-align: start;
    font-size: 14px;
}

.users-table__column_id {
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
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
</style>
