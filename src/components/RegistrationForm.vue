<script setup lang="ts">
import { ref, type Ref, onMounted, computed, watch } from 'vue'
import { useUsersStore } from '@/stores/users'
import { debounce } from '@/utilities/debounce'
import UiButton from './UI/UiButton.vue'

// TODO - reuse this form for register user from header button click (needs to add the button)
const usersStore = useUsersStore()
const firstName = ref('')
const trimmedFirstName = ref('')
const secondName = ref('')
const trimmedSecondName = ref('')
const eMail = ref('')
const trimmedEMail = ref('')
const password = ref('')
const trimmedPassword = ref('')
const userNotification = ref('')
const firstNameInput: Ref<HTMLInputElement | null> = ref(null)

const isButtonDisabled = computed(() =>
    trimmedEMail.value.length < 4
    || trimmedPassword.value.length < 5
    || !trimmedFirstName.value.length
    || !trimmedSecondName.value.length
)

watch(firstName, debounce((newValue: string) => {
    trimmedFirstName.value = newValue.trim()
}, 200))

watch(secondName, debounce((newValue: string) => {
    trimmedSecondName.value = newValue.trim()
}, 200))

watch(eMail, debounce((newValue: string) => {
    trimmedEMail.value = newValue.trim()
}, 200))

watch(password, debounce((newValue: string) => {
    trimmedPassword.value = newValue.trim()
}, 200))

watch(userNotification, () => {
    setTimeout(() => {
        userNotification.value = ''
    }, 2500)
})

onMounted(() => {
    firstNameInput.value?.focus()
})

const performRegistration = async () => {
    userNotification.value = await usersStore.addUser({
        e_mail: trimmedEMail.value,
        password: trimmedPassword.value,
        first_name: trimmedFirstName.value,
        second_name: trimmedSecondName.value,
    })
    // TODO - offer to insert eMail and password one more time
    // TODO - user notification logic here
    // TODO - add logic (here or in the parent and check user type + in the store (mock BE) existing users)
}
</script>

<template>
    <div class="registration-form">
        <h3
            v-if="userNotification"
            class="registration-form__user-notification"
        >
            {{ userNotification }}
        </h3>

        <form
            v-else
            class="registration-form__form"
            @submit.enter.prevent="performRegistration"
        >
            <label class="registration-form__label">
                First name

                <input
                    ref="firstNameInput"
                    class="registration-form__input"
                    v-model="firstName"
                />
            </label>

            <label class="registration-form__label">
                Second name

                <input
                    class="registration-form__input"
                    v-model="secondName"
                />
            </label>

            <label class="registration-form__label">
                E-mail

                <input
                    class="registration-form__input"
                    v-model="eMail"
                />

                <span
                    v-if="trimmedEMail.length && trimmedEMail.length < 4"
                    class="registration-form__input-hint"
                >
                    it needs {{ 4 - trimmedEMail.length }} more {{ trimmedEMail.length === 3 ? 'char' : 'chars' }} here
                </span>
            </label>

            <label class="registration-form__label">
                Password

                <input
                    class="registration-form__input"
                    v-model="password"
                    type="password"
                />

                <span
                    v-if="trimmedPassword.length && trimmedPassword.length < 5"
                    class="registration-form__input-hint"
                >
                    it needs {{ 5 - trimmedPassword.length }} more {{ trimmedPassword.length === 4 ? 'char' : 'chars' }}
                    here
                </span>
            </label>

            <UiButton
                text="Register"
                :isDisabled="isButtonDisabled"
                class="registration-form__button"
            />
        </form>
    </div>
</template>

<style scoped>
.registration-form {
    width: 100%;
    max-width: 320px;
}

.registration-form__user-notification {
    padding: 0 15px;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
}

.registration-form__user-notification_success {
    color: var(--color-success);
}

.registration-form__user-notification_failure {
    color: var(--color-danger);
}

.registration-form__form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.registration-form__label {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-size: 13px;
    font-weight: 500;
    position: relative;
}

.registration-form__input {
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

.registration-form__input-hint {
    font-size: 10px;
    font-weight: 400;
    color: var(--color-danger);
    position: absolute;
    left: 0;
    bottom: 0;
}

.registration-form__input:focus-visible {
    outline: none;
    box-shadow: 0 0 3px var(--color-background-secondary);
}

.registration-form__button {
    margin-top: 15px;
}
</style>
