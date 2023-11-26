<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/users'
import type { User } from '@/types/store-types'

const usersStore = useUsersStore()
const { users } = storeToRefs(usersStore)

onMounted(async () => {
  if (!users.value.length) {
    await usersStore.initializeUsers()
  }
})

const createUser = () => [
  // open popup with form - pointless to create new user manually here, but...
]

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
  <div v-if="!users">
    <!-- TODO - add loader component -->
    Loading users...
  </div>

  <div
    v-else
    class="users-list-page"
  >
    <button @click.prevent="createUser">Create User</button>

    <table>
      <thead>
        <tr>
          <th>ID</th>

          <th>Name</th>

          <th>Email</th>

          <th>Actions</th>
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
            <button @click.prevent="editUser(user)">Edit</button>
            <button @click.prevent="deleteUser(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.users-list-page {}
</style>
