<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<template>
  <main class="main-introduction">
    <img
      class="main-introduction__image"
      src="@/assets/images/feather.png"
      alt="feather"
      width="110"
      height="110"
    />

    <strong class="main-introduction__text">
      I created this project to refresh my knowledge on Vue-3 with TypeScript.
      <br />

      In this project yoy can find 2 static routes - Home (current) and

      <RouterLink class="main-introduction__link" to="/about">About</RouterLink>

      pages and two additional routes -

      <RouterLink
        v-if="userStore.isAdmin"
        class="main-introduction__link"
        to="/users"
      >
        List of users
      </RouterLink>

      <span v-else>List of users</span>

      and

      <RouterLink
        v-if="userStore.currentUser"
        class="main-introduction__link"
        :to="`/users/${userStore.currentUser.id}`"
      >
        Your page.
      </RouterLink>

      <span v-else>Your page.</span>

      Two latest ones are available for an admin and an ordinary user
      accordingly and they provide the most various features like browsing users
      list or page of a single user and their CRUD.
      <br />

      I have also created a login form and a registration form. They are
      available for all users.
      <br />

      At the moment it works with hardcoded list of users but my plan is to
      create some mock interaction with real API to get list of users and to
      process slightly their data to be digestible and reachable here.
      <br />

      <br />

      During working on this site I have used the following technologies:
      <ul class="main-introduction__list">
        <li>Vue-3</li>
        <li>TypeScript</li>
        <li>SCSS</li>
        <li>Vite</li>
        <li>Pinia</li>
        <li>Vue-Router</li>
      </ul>

      <br />

      And yes - don't swear at me because of the design... It wasn't a my
      purpose to create an attractive site but just to train myself with my
      preferable technologies.
    </strong>
  </main>
</template>

<style scoped src="./main-introduction.scss"></style>
