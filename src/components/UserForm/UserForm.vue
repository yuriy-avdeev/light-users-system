<script setup lang="ts">
import { ref, computed } from 'vue'
import { checkEMail } from '@/services/helper.ts'
import Input from '@/components/UI/Input/Input.vue'
import Button from '@/components/UI/Button/Button.vue'

const emit = defineEmits(['user-data'])
const props = defineProps({
  buttonText: {
    type: String,
    require: true,
  },

  firstName: {
    type: String,
    default: '',
  },

  secondName: {
    type: String,
    default: '',
  },

  eMail: {
    type: String,
    default: '',
  },

  password: {
    type: String,
    default: '',
  },

  showPassword: {
    type: Boolean,
    default: false,
  },
})

const modelFirstName = ref(props.firstName)
const modelSecondName = ref(props.secondName)
const modelEMail = ref(props.eMail)
const modelPassword = ref(props.password)

const isButtonAvailable = computed(() => {
  if (props.showPassword) {
    return (
      isValidEMail.value &&
      modelFirstName.value.length &&
      modelSecondName.value.length &&
      modelPassword.value.length >= 5
    )
  }
  return (
    isValidEMail.value &&
    modelFirstName.value.length &&
    modelSecondName.value.length
  )
})

const isValidEMail = computed(() => checkEMail(modelEMail.value))

const handleSubmitForm = () => {
  emit('user-data', {
    first_name: modelFirstName.value,
    second_name: modelSecondName.value,
    e_mail: modelEMail.value,
    password: modelPassword.value,
  })
}
</script>

<template>
  <form class="user-form" @submit.enter.prevent="handleSubmitForm">
    <Input
      v-model="modelFirstName"
      class="user-form__input"
      label-text="First name"
      is-focused
      :debounce-delay="0"
    />

    <Input
      v-model="modelSecondName"
      class="user-form__input"
      label-text="Second name"
      :debounce-delay="0"
    />

    <Input
      v-model="modelEMail"
      class="user-form__input"
      label-text="E-mail"
      :warning-text="
        modelEMail.length && !isValidEMail ? 'Please add valid e-mail here' : ''
      "
    />

    <Input
      v-if="showPassword"
      v-model="modelPassword"
      class="user-form__input"
      label-text="Password"
      :type="password"
      :warning-text="
        modelPassword.length && modelPassword.length < 5
          ? `it needs ${5 - modelPassword.length} more ${
              modelPassword.length === 4 ? 'char' : 'chars'
            }   here`
          : ''
      "
      :debounce-delay="0"
    />

    <Button
      :text="$props.buttonText"
      :isDisabled="!isButtonAvailable"
      class="user-form__button"
    />
  </form>
</template>

<style scoped src="./user-form.scss"></style>
