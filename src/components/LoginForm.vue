<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const props = defineProps({
    redirectedFrom: {
        type: String,
        default: null,
    },
});

const router = useRouter();
const userStore = useUserStore();
const login = ref('');
const password = ref('');

const performLogin = () => {
    // TODO - split login for user and for admin
    const isAuth = userStore.login(login.value, password.value);
    // TODO - add logic if !redirectedFrom
    if (isAuth) {
        router.push(props.redirectedFrom);
    } else {
        // TODO - add some user notification
    }
};
</script>

<template>
    <form
        class="login-form"
        @submit.enter.prevent="performLogin"
    >
        <!-- TODO - add a reminder if DEV mode -> if (import.meta.env.DEV) ... else (import.meta.env.PROD) ... -->
        <input
            class="login-form__input login-page__input_login"
            v-model="login"
            placeholder="Username"
        />

        <input
            class="login-form__input login-page__input_password"
            v-model="password"
            type="password"
            placeholder="Password"
        />

        <button
            class="login-form__button"
            type="submit"
        >
            Login
        </button>
    </form>
</template>

<style scoped>
.login-form {
    padding: 16px 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    border-radius: 6px;
    background-color: var(--color-white);
}

.login-form__input {
    padding: 5px 8px;
    border: 1px solid var(--color-background-secondary);
    border-radius: 4px;
    background: transparent;
    color: var(--color-background-secondary);
    caret-color: var(--color-background-secondary);
    cursor: default;
    transition: box-shadow 250ms;
}

.login-form__input:focus-visible {
    outline: none;
    box-shadow: 0 0 3px var(--color-background-secondary);
}

.login-form__button {
    border-radius: 8px;
    border: none;
    background-color: var(--color-background-secondary);
    padding: 4px;
    cursor: pointer;
    font: 500 13px/1.2 var(--main-font);
    color: var(--color-white);
    transition: color 300ms, background-color 300ms;
}

@media (hover: hover) {
    .login-form__button:hover {
        background-color: var(--color-white);
        box-shadow: inset 10px -10px 15px var(--color-background);
        color: var(--color-background-secondary);
    }
}
</style>
