<script setup lang="ts">
import { ref, type Ref, onMounted, computed, watch } from 'vue'
import { debounce } from '@/utilities/debounce'
import Button from '@/components/UI/Button/Button.vue'

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
    default: true,
  },
})

const emit = defineEmits(['user-data'])

const isButtonAvailable = computed(() => {
  if (!isEMailValidated.value) {
    return false
  }
  if (props.showPassword) {
    return (
      modelFirstName.value.length &&
      modelSecondName.value.length &&
      modelPassword.value.length > 4
    )
  }
  return modelFirstName.value.length && modelSecondName.value.length
})

const isEMailValidated = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(modelEMail.value)
})

const firstNameInput: Ref<HTMLInputElement | null> = ref(null)
onMounted(() => {
  firstNameInput.value?.focus()
})

const modelFirstName = ref(props.firstName)
watch(
  modelFirstName,
  debounce((newValue: string) => {
    modelFirstName.value = newValue.trim()
  }, 200)
)

const modelSecondName = ref(props.secondName)
watch(
  modelSecondName,
  debounce((newValue: string) => {
    modelSecondName.value = newValue.trim()
  }, 200)
)

const modelEMail = ref(props.eMail)
watch(
  modelEMail,
  debounce((newValue: string) => {
    modelEMail.value = newValue.trim()
  }, 200)
)

const modelPassword = ref(props.password)
watch(
  modelPassword,
  debounce((newValue: string) => {
    modelPassword.value = newValue.trim()
  }, 200)
)

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
    <label class="user-form__label">
      First name

      <input
        ref="firstNameInput"
        class="user-form__input"
        v-model="modelFirstName"
      />
    </label>

    <label class="user-form__label">
      Second name

      <input class="user-form__input" v-model="modelSecondName" />
    </label>

    <label class="user-form__label">
      E-mail

      <input class="user-form__input" v-model="modelEMail" />
    </label>

    <label v-if="showPassword" class="user-form__label">
      Password

      <input class="user-form__input" v-model="modelPassword" type="password" />

      <span
        v-if="modelPassword.length && modelPassword.length < 5"
        class="user-form__input-hint"
      >
        it needs {{ 5 - modelPassword.length }} more
        {{ modelPassword.length === 4 ? 'char' : 'chars' }}
        here
      </span>
    </label>

    <Button
      :text="$props.buttonText"
      :isDisabled="!isButtonAvailable"
      class="user-form__button"
    />
  </form>
</template>

<style scoped src="./user-form.scss"></style>
