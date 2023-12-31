<script setup lang="ts">
import { ref, type Ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useLoginFormStore } from '@/stores/loginForm'
import { debounce } from '@/utilities/debounce'
import UiButton from './UI/UiButton.vue'

const props = defineProps({
    nextPage: {
        type: String,
        default: '/',
    },
})

const userStore = useUserStore()
const loginFormStore = useLoginFormStore()
const router = useRouter()
const login = ref('')
const trimmedLogin = ref('')
const password = ref('')
const trimmedPassword = ref('')
const userNotification = ref('')
const loginInput: Ref<HTMLInputElement | null> = ref(null)

const isButtonDisabled = computed(() => trimmedLogin.value.length < 4 || trimmedPassword.value.length < 5)
const loginPlaceholder = computed(() => import.meta.env.DEV ? 'user or admin' : 'jim_beam or admin')
const passwordPlaceholder = computed(() => import.meta.env.DEV ? 'qwerty or admin' : 'qwerty or 12345')

watch(login, debounce((newValue: string) => {
    trimmedLogin.value = newValue.trim()
}, 200))

watch(password, debounce((newValue: string) => {
    trimmedPassword.value = newValue.trim()
}, 200))

onMounted(() => {
    loginInput.value?.focus()
})

const performLogin = async () => {
    if (isButtonDisabled.value) {
        return
    }
    const isAuth = await userStore.login(trimmedLogin.value, trimmedPassword.value)
    if (isAuth) {
        const userName = userStore.isAdmin ? 'Admin' : userStore.currentUser?.first_name
        userNotification.value = `Welcome, ${userName}!`
        setTimeout(() => {
            loginFormStore.closeLoginForm()
        }, 2000)
        router.push(props.nextPage)
    }
    if (!isAuth) {
        userNotification.value = 'Please, let\'s use correct login and password.'
        setTimeout(() => {
            userNotification.value = ''
        }, 3000)
    }
}
</script>

<template>
    <div class="login-form">
        <h3
            v-if="userNotification"
            class="login-form__user-notification"
            :class="[{
                'login-form__user-notification_success': userStore.isAuthenticated,
                'login-form__user-notification_failure': !userStore.isAuthenticated,
            }]"
        >
            {{ userNotification }}
        </h3>

        <form
            v-else
            class="login-form__form"
            @submit.enter.prevent="performLogin"
        >
            <!-- TODO - add a reminder if DEV mode -> if (import.meta.env.DEV) ... else (import.meta.env.PROD) ... -->
            <label class="login-form__label">
                Username

                <input
                    ref="loginInput"
                    class="login-form__input login-page__input_login"
                    v-model="login"
                    :placeholder="loginPlaceholder"
                />

                <span
                    v-if="trimmedLogin.length && trimmedLogin.length < 4"
                    class="login-form__input-hint"
                >
                    it needs {{ 4 - trimmedLogin.length }} more {{ trimmedLogin.length === 3 ? 'char' : 'chars' }} here
                </span>
            </label>

            <label class="login-form__label">
                Password

                <input
                    class="login-form__input login-page__input_password"
                    v-model="password"
                    type="password"
                    :placeholder="passwordPlaceholder"
                />

                <span
                    v-if="trimmedPassword.length && trimmedPassword.length < 5"
                    class="login-form__input-hint"
                >
                    it needs {{ 5 - trimmedPassword.length }} more {{ trimmedPassword.length === 4 ? 'char' : 'chars' }}
                    here
                </span>
            </label>

            <UiButton
                text="Login"
                :isDisabled="isButtonDisabled"
            />
        </form>
    </div>
</template>

<style scoped>
.login-form {
    width: 100%;
    max-width: 320px;
    padding: 10px 6px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-form__user-notification {
    padding: 0 15px;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
}

.login-form__user-notification_success {
    color: var(--color-success);
}

.login-form__user-notification_failure {
    color: var(--color-danger);
}

.login-form__form {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.login-form__label {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    font-weight: 500;
    position: relative;
}

.login-form__input {
    margin: 3px 0 13px;
    padding: 5px 8px;
    border: 1px solid var(--color-background-secondary);
    border-radius: 4px;
    background: transparent;
    color: var(--color-background-secondary);
    caret-color: var(--color-background-secondary);
    cursor: default;
    transition: box-shadow 250ms;
}

.login-form__input-hint {
    font-size: 10px;
    font-weight: 400;
    color: var(--color-danger);
    position: absolute;
    left: 0;
    bottom: 0;
}

.login-form__input:focus-visible {
    outline: none;
    box-shadow: 0 0 3px var(--color-background-secondary);
}
</style>
