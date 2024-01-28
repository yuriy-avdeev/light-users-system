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

const toggleNavigationContainerState = () => {
    isNavigationContainerOpened.value = !isNavigationContainerOpened.value
}
</script>

<template>
    <div class="header-navigation">
        <div
            class="header-navigation__dropdown-wrapper"
            :class="{ 'header-navigation__list-wrapper_active': isNavigationContainerOpened }"
        >
            <button
                class="header-navigation__menu"
                @click.prevent="toggleNavigationContainerState"
            >
                <div class="header-navigation__menu-bar"></div>
                <div class="header-navigation__menu-bar"></div>
                <div class="header-navigation__menu-bar"></div>
            </button>

            <!-- :class="{ 'header-navigation__list-container_active': isNavigationContainerOpened }" -->
            <div
                v-if="isNavigationContainerOpened"
                class="header-navigation__dropdown-list"
            >
                <RouterLink
                    v-for="route in listOfPages"
                    :key="route.name"
                    :to='route.path'
                    class="header-navigation__link header-navigation__link_mobile"
                >
                    {{ route.name }}
                </RouterLink>
            </div>
        </div>

        <nav class="header-navigation__desktop-list">
            <RouterLink
                v-for="route in listOfPages"
                :key="route.name"
                :to='route.path'
                class="header-navigation__link header-navigation__link_desktop"
            >
                {{ route.name }}
            </RouterLink>
        </nav>
    </div>
</template>

<style scoped lang="scss">
.header-navigation {
    &__dropdown-wrapper {
        position: relative;
    }

    &__dropdown-list {
        padding: 12px 14px;
        min-width: 140px;
        position: absolute;
        top: 100%;
        left: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
        border-radius: 6px;
        background-color: var(--color-white);
    }

    &__menu {
        display: inline-block;
        cursor: pointer;
        background-color: transparent;
        border: none;
        outline: none;
        padding: 3px;
    }

    &__menu-bar {
        width: 35px;
        height: 4px;
        border-radius: 2px;
        background-color: var(--color-white-soft);
        margin: 4px 0;
    }

    &__desktop-list {
        display: none;
    }

    &__link {
        font: 500 14px/1.3 'Roboto';
        text-decoration: none;
    }

    &__link_mobile {
        color: var(--color-black-soft);
        padding-bottom: 8px;
    }

    &__link_desktop {
        color: var(--color-white-soft);
        margin-left: 14px;
        transition: color 350ms;
        padding-bottom: 3px;
        border-bottom: solid 2px transparent;
        cursor: pointer;
        position: relative;
    }

    &__link_mobile.router-link-exact-active {
        color: var(--color-text-hovered);
    }

    &__link_desktop.router-link-exact-active {
        cursor: default;
        color: var(--color-text-hovered);
        border-bottom: solid 2px var(--color-text-hovered);
    }
}

@media (min-width: 768px) {
    .header-navigation {
        &__desktop-list {
            display: flex;
        }

        &__menu,
        &__dropdown-list {
            display: none;
        }
    }
}

@media (hover: hover) {
    .header-navigation {
        &__link_desktop::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background-color: var(--color-text-hovered);
            transition: width 300ms;
        }

        &__link_desktop:hover:not(.router-link-exact-active) {
            color: var(--color-text-hovered);
        }

        &__link_desktop:hover:not(.router-link-exact-active)::after {
            width: 100%;
        }
    }
}
</style>
