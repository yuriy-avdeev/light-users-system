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
            <tr>
                <th>ID</th>

                <th>First Name</th>

                <th>Second Name</th>

                <th></th>

                <th></th>
            </tr>
        </thead>

        <tbody>
            <tr
                v-for="user in users"
                :key="user.id"
            >
                <td>{{ user.id }}</td>

                <td>{{ user.first_name }}</td>

                <td>{{ user.second_name }}</td>

                <td>
                    <UiButton
                        text="Edit"
                        @click.prevent="editUser(user)"
                    />
                </td>

                <td>
                    <UiButton
                        text="Delete"
                        @click.prevent="deleteUser(user.id)"
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
</style>
