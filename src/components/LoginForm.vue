<script setup lang="ts">
import { ref, type Ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { debounce } from '@/utilities/debounce'
import UiButton from './UI/UiButton.vue'

const props = defineProps({
    nextPage: {
        type: String,
        default: '/',
    },
})
const emit = defineEmits(['is-login'])
const userStore = useUserStore()
const router = useRouter()
const eMail = ref('')
const trimmedEMail = ref('')
const password = ref('')
const trimmedPassword = ref('')
const eMailInput: Ref<HTMLInputElement | null> = ref(null)

const isButtonDisabled = computed(() => trimmedEMail.value.length < 4 || trimmedPassword.value.length < 5)
const eMailPlaceholder = computed(() => import.meta.env.DEV ? 'my@mail.com or admin' : 'jim@mail.com or admin')
const passwordPlaceholder = computed(() => import.meta.env.DEV ? 'qwerty or admin' : 'qwerty or 12345')

watch(eMail, debounce((newValue: string) => {
    trimmedEMail.value = newValue.trim()
}, 200))

watch(password, debounce((newValue: string) => {
    trimmedPassword.value = newValue.trim()
}, 200))

onMounted(() => {
    eMailInput.value?.focus()
})

const performLogin = async () => {
    const isAuth = await userStore.login(trimmedEMail.value, trimmedPassword.value)
    if (isAuth) {
        const userName = userStore.isAdmin ? 'Admin' : userStore.currentUser?.first_name
        emit('is-login', { isSuccessful: true, message: `Welcome, ${userName}!` })
        router.push(props.nextPage)
    } else {
        emit('is-login', { isSuccessful: false, message: 'Please, let\'s use correct e-mail and password.' })
    }
}
</script>

<template>
    <form
        class="login-form"
        @submit.enter.prevent="performLogin"
    >
        <label class="login-form__label">
            E-mail

            <input
                ref="eMailInput"
                class="login-form__input"
                v-model="eMail"
                :placeholder="eMailPlaceholder"
            />

            <span
                v-if="trimmedEMail.length && trimmedEMail.length < 4"
                class="login-form__input-hint"
            >
                it needs {{ 4 - trimmedEMail.length }} more {{ trimmedEMail.length === 3 ? 'char' : 'chars' }} here
            </span>
        </label>

        <label class="login-form__label">
            Password

            <input
                class="login-form__input"
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
            class="login-form__button"
        />
    </form>
</template>

<style scoped>
.login-form {
    width: 100%;
    max-width: 320px;
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

.login-form__button {
    margin-top: 15px;
}
</style>