<script setup lang="ts">
import { ref, type Ref, onMounted, computed, watch } from 'vue'
import { debounce } from '@/utilities/debounce'
import Button from '@/components/UI/Button/Button.vue'

const props = defineProps({
  buttonText: {
    type: String,
    require: true,
  },
})

const emit = defineEmits(['user-data'])

const isButtonDisabled = computed(
  () =>
    trimmedEMail.value.length < 4 ||
    trimmedPassword.value.length < 5 ||
    !trimmedFirstName.value.length ||
    !trimmedSecondName.value.length
)

const firstNameInput: Ref<HTMLInputElement | null> = ref(null)
onMounted(() => {
  firstNameInput.value?.focus()
})

const firstName = ref('')
const trimmedFirstName = ref('')
watch(
  firstName,
  debounce((newValue: string) => {
    trimmedFirstName.value = newValue.trim()
  }, 200)
)

const secondName = ref('')
const trimmedSecondName = ref('')
watch(
  secondName,
  debounce((newValue: string) => {
    trimmedSecondName.value = newValue.trim()
  }, 200)
)

const eMail = ref('')
const trimmedEMail = ref('')
watch(
  eMail,
  debounce((newValue: string) => {
    trimmedEMail.value = newValue.trim()
  }, 200)
)

const password = ref('')
const trimmedPassword = ref('')
watch(
  password,
  debounce((newValue: string) => {
    trimmedPassword.value = newValue.trim()
  }, 200)
)

const handleSubmitForm = () => {
  emit('user-data', {
    first_name: trimmedFirstName.value,
    second_name: trimmedSecondName.value,
    e_mail: trimmedEMail.value,
    password: trimmedPassword.value,
  })
}
</script>

<template>
  <form class="user-form" @submit.enter.prevent="handleSubmitForm">
    <label class="user-form__label">
      First name

      <input
        ref="firstNameInput"
        class="user-form__input"
        v-model="firstName"
      />
    </label>

    <label class="user-form__label">
      Second name

      <input class="user-form__input" v-model="secondName" />
    </label>

    <label class="user-form__label">
      E-mail

      <input class="user-form__input" v-model="eMail" />

      <span
        v-if="trimmedEMail.length && trimmedEMail.length < 4"
        class="user-form__input-hint"
      >
        it needs {{ 4 - trimmedEMail.length }} more
        {{ trimmedEMail.length === 3 ? 'char' : 'chars' }} here
      </span>
    </label>

    <label class="user-form__label">
      Password

      <input class="user-form__input" v-model="password" type="password" />

      <span
        v-if="trimmedPassword.length && trimmedPassword.length < 5"
        class="user-form__input-hint"
      >
        it needs {{ 5 - trimmedPassword.length }} more
        {{ trimmedPassword.length === 4 ? 'char' : 'chars' }}
        here
      </span>
    </label>

    <Button
      :text="$props.buttonText"
      :isDisabled="isButtonDisabled"
      class="user-form__button"
    />
  </form>
</template>

<style scoped src="./user-form.scss"></style>
