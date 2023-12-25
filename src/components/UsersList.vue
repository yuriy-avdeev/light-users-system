<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/users'
import type { User } from '@/types/store-types'
import UiButton from './UI/UiButton.vue'

const usersStore = useUsersStore()
const { users } = storeToRefs(usersStore)

const editUser = (user: User) => [
    console.log('user: ', user)
    //
]

const deleteUser = (id: number) => [
    console.log('id: ', id)
    //
]
</script>

<template>
    <table class="users-list">
        <thead>
            <tr class="users-list__header">
                <th class="users-list__column users-list__column_id">ID</th>

                <th class="users-list__column users-list__column_first-name">First Name</th>

                <th class="users-list__column users-list__column_second-name">Second Name</th>
                <th></th>
                <th></th>
            </tr>
        </thead>

        <tbody>
            <tr
                v-for="user in users"
                :key="user.id"
                class="users-list__row"
            >
                <td class="users-list__column users-list__column_id">{{ user.id }}</td>

                <td class="users-list__column users-list__column_first-name">{{ user.first_name }}</td>

                <td class="users-list__column users-list__column_second-name">{{ user.second_name }}</td>

                <td class="users-list__column users-list__column_button">
                    <UiButton
                        text="Edit"
                        @click.prevent="editUser(user)"
                        class="users-list__button"
                    />
                </td>

                <td class="users-list__column users-list__column_button">
                    <UiButton
                        text="Delete"
                        @click.prevent="deleteUser(user.id)"
                        class="users-list__button"
                    />
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
.users-list {
    /*  */
}

.users-list__header,
.users-list__row:nth-of-type(even) {
    background-color: var(--color-light-grey);
}

.users-list__column {
    padding: 4px;
    text-align: start;
    font-size: 14px;
}

.users-list__column_id {
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.users-list__column_first-name {
    width: 160px;
}

.users-list__column_second-name {
    width: 190px;
}

.users-list__column_button {
    padding: 2px 10px;
}

.users-list__button {
    padding: 4px 14px;
}
</style>
