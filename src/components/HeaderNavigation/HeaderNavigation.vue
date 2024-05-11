<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'
import DropdownWrapper from '@/components/DropdownWrapper/DropdownWrapper.vue'

const userStore = useUserStore()
const isNavigationContainerOpened = ref(false)

const listOfPages = computed(() => {
  const pages = [
    { path: '/', name: 'Home' },
    { path: '/about', name: 'About' }
  ]
  if (userStore.isAdmin) {
    pages.push({ path: '/users', name: 'List of users' })
  }
  if (userStore.currentUser) {
    pages.push({
      path: `/users/${userStore.currentUser.id}`,
      name: 'Your page'
    })
  }
  return pages
})
</script>

<template>
  <div class="header-navigation">
    <button
      class="header-navigation__menu"
      @click.stop.prevent="isNavigationContainerOpened = !isNavigationContainerOpened"
    >
      <div class="header-navigation__menu-bar"></div>
      <div class="header-navigation__menu-bar"></div>
      <div class="header-navigation__menu-bar"></div>
    </button>

    <DropdownWrapper
      v-if="isNavigationContainerOpened"
      @close-container="isNavigationContainerOpened = false"
      class="header-navigation__dropdown"
    >
      <RouterLink
        v-for="route in listOfPages"
        :key="route.name"
        :to="route.path"
        @click.stop.prevent="isNavigationContainerOpened = false"
        class="header-navigation__link header-navigation__link_mobile"
      >
        {{ route.name }}
      </RouterLink>
    </DropdownWrapper>

    <nav class="header-navigation__desktop-list">
      <RouterLink
        v-for="route in listOfPages"
        :key="route.name"
        :to="route.path"
        class="header-navigation__link header-navigation__link_desktop"
      >
        {{ route.name }}
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped src="./header-navigation.scss"></style>
