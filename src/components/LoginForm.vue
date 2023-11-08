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
/* rework */
.login-form {
    display: flex;
    flex-direction: column;
    gap: 12px;
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
    /*  */
}

@media (hover: hover) {
    .login-form__button:hover {
        /*  */
    }
}
</style>
