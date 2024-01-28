<script setup lang="ts">
import { ref, type Ref, onMounted, computed, watch } from 'vue'
import { useUsersStore } from '@/stores/users'
import { debounce } from '@/utilities/debounce'
import Button from '@/components/UI/Button/Button.vue'

const emit = defineEmits(['is-registered'])
const usersStore = useUsersStore()
const firstName = ref('')
const trimmedFirstName = ref('')
const secondName = ref('')
const trimmedSecondName = ref('')
const eMail = ref('')
const trimmedEMail = ref('')
const password = ref('')
const trimmedPassword = ref('')
const firstNameInput: Ref<HTMLInputElement | null> = ref(null)

const isButtonDisabled = computed(
  () =>
    trimmedEMail.value.length < 4 ||
    trimmedPassword.value.length < 5 ||
    !trimmedFirstName.value.length ||
    !trimmedSecondName.value.length
)

watch(
  firstName,
  debounce((newValue: string) => {
    trimmedFirstName.value = newValue.trim()
  }, 200)
)

watch(
  secondName,
  debounce((newValue: string) => {
    trimmedSecondName.value = newValue.trim()
  }, 200)
)

watch(
  eMail,
  debounce((newValue: string) => {
    trimmedEMail.value = newValue.trim()
  }, 200)
)

watch(
  password,
  debounce((newValue: string) => {
    trimmedPassword.value = newValue.trim()
  }, 200)
)

onMounted(() => {
  firstNameInput.value?.focus()
})

const handleRegistration = async () => {
  try {
    const { user } = await usersStore.addUser({
      e_mail: trimmedEMail.value,
      password: trimmedPassword.value,
      first_name: trimmedFirstName.value,
      second_name: trimmedSecondName.value,
    })
    emit('is-registered', {
      isSuccessful: true,
      message: `${user.first_name}, you were registered successfully. Now you just need to login.`,
    })
    cleanForm()
  } catch (e) {
    let message: string
    if (e instanceof Error && e.message) {
      message = e.message
    } else {
      message = 'Some problems with your registration. Please, try again later.'
    }
    emit('is-registered', { isSuccessful: false, message })
  }
}

const cleanForm = () => {
  firstName.value = ''
  secondName.value = ''
  eMail.value = ''
  password.value = ''
}
</script>

<template>
  <form class="registration-form" @submit.enter.prevent="handleRegistration">
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

      <input class="registration-form__input" v-model="secondName" />
    </label>

    <label class="registration-form__label">
      E-mail

      <input class="registration-form__input" v-model="eMail" />

      <span
        v-if="trimmedEMail.length && trimmedEMail.length < 4"
        class="registration-form__input-hint"
      >
        it needs {{ 4 - trimmedEMail.length }} more
        {{ trimmedEMail.length === 3 ? 'char' : 'chars' }} here
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
        it needs {{ 5 - trimmedPassword.length }} more
        {{ trimmedPassword.length === 4 ? 'char' : 'chars' }}
        here
      </span>
    </label>

    <Button
      text="Register"
      :isDisabled="isButtonDisabled"
      class="registration-form__button"
    />
  </form>
</template>

<style scoped src="./registration-form.scss"></style>
