<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { checkEMail } from '@/services/helper'
import Input from '@/components/UI/Input/Input.vue'
import Button from '@/components/UI/Button/Button.vue'

const props = defineProps({
  nextPage: {
    type: String,
    default: '/'
  }
})
const emit = defineEmits(['is-login'])
const userStore = useUserStore()
const router = useRouter()
const eMail = ref('')
const password = ref('')

const isValidEMail = computed(() => checkEMail(eMail.value))

const isButtonDisabled = computed(() => !isValidEMail || password.value.length < 5)

const eMailPlaceholder = computed(() =>
  import.meta.env.DEV ? 'my@mail.com or admin' : 'jim@mail.com or admin'
)

const passwordPlaceholder = computed(() =>
  import.meta.env.DEV ? 'qwerty or admin' : 'qwerty or 12345'
)

const performLogin = async () => {
  const isAuth = await userStore.login(eMail.value, password.value)
  if (isAuth) {
    const userName = userStore.isAdmin ? 'Admin' : userStore.currentUser?.first_name
    emit('is-login', { is_successful: true, message: `Welcome, ${userName}!` })
    router.push(props.nextPage)
  } else {
    emit('is-login', {
      is_successful: false,
      message: "Please, let's use correct e-mail and password."
    })
  }
}
</script>

<template>
  <form class="login-form" @submit.enter.prevent="performLogin">
    <Input
      v-model="eMail"
      class="login-form__input"
      label-text="E-mail"
      is-focused
      :placeholder="eMailPlaceholder"
      :warning-text="
        eMail.length && eMail !== 'admin' && !isValidEMail ? 'Please add valid e-mail here' : ''
      "
    />

    <Input
      v-model="password"
      class="login-form__input"
      label-text="Password"
      :placeholder="passwordPlaceholder"
      type="password"
      :warning-text="
        password.length && password.length < 5
          ? `it needs ${5 - password.length} more ${password.length === 4 ? 'char' : 'chars'} here`
          : ''
      "
      :debounce-delay="0"
    />

    <Button text="Login" :isDisabled="isButtonDisabled" class="login-form__button" />
  </form>
</template>

<style scoped src="./login-form.scss"></style>
