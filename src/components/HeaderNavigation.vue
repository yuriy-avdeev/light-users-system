<script setup lang='ts'>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const isNavigationContainerOpened = ref(false)

const listOfPages = computed(() => {
    const pages = [
        { path: '/', name: 'Home' },
        { path: '/about', name: 'About' },
    ]
    if (userStore.isAdmin) {
        pages.push({ path: '/users', name: 'List of users' })
    }
    if (userStore.currentUser) {
        pages.push({ path: `/users/${userStore.currentUser.id}`, name: 'Your page' })
    }
    return pages
})
</script>

<template>
    <div class="header-navigation">
        <div
            class="header-navigation__dropdown-wrapper"
            :class="{ 'header-navigation__list-wrapper_active': isNavigationContainerOpened }"
        >
            <button
                class="header-navigation__menu"
                @click.prevent="isNavigationContainerOpened = !isNavigationContainerOpened"
            >
                <div class="header-navigation__menu-bar"></div>
                <div class="header-navigation__menu-bar"></div>
                <div class="header-navigation__menu-bar"></div>
            </button>

            <!-- :class="{ 'header-navigation__list-container_active': isNavigationContainerOpened }" -->
            <div
                v-if="isNavigationContainerOpened"
                ref="containerRef"
                class="header-navigation__dropdown-list"
            >
                // here list or RouterLink
            </div>
        </div>

        <nav class="header-navigation__desktop-list">
            <RouterLink
                v-for="route in listOfPages"
                :key="route.name"
                :to='route.path'
                class="header-navigation__link"
            >
                {{ route.name }}
            </RouterLink>
        </nav>
    </div>
</template>

<style scoped>
.header-navigation {
    /*  */
}

.header-navigation__dropdown-wrapper {
    position: relative;
}

.header-navigation__dropdown-list {
    position: absolute;
    top: 100%;
    left: 0;
    outline: 1px solid red;
}

.header-navigation__menu {
    display: inline-block;
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
    padding: 3px;
}

.header-navigation__menu-bar {
    width: 35px;
    height: 4px;
    border-radius: 2px;
    background-color: var(--color-white-soft);
    margin: 4px 0;
}

.header-navigation__desktop-list {
    display: none;
}

.header-navigation__link {
    font: 500 14px/1.3 'Roboto';
    color: var(--color-white-soft);
    margin-left: 14px;
    transition: color 350ms;
    text-decoration: none;
    padding-bottom: 3px;
    border-bottom: solid 2px transparent;
    cursor: pointer;
    position: relative;
}

.router-link-exact-active {
    cursor: default;
    color: var(--color-text-hovered);
    border-bottom: solid 2px var(--color-text-hovered);
}

@media (min-width: 768px) {
    .header-navigation {
        /* // */
    }

    .header-navigation__desktop-list {
        display: flex;
    }

    .header-navigation__menu,
    .header-navigation__dropdown-list {
        display: none;
    }
}

@media (hover: hover) {
    .header-navigation__link:hover:not(.router-link-exact-active) {
        color: var(--color-text-hovered);
    }

    .header-navigation__link::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background-color: var(--color-text-hovered);
    }

    .header-navigation__link:hover:not(.router-link-exact-active)::after {
        width: 100%;
        transition: width 300ms;
    }
}
</style>
