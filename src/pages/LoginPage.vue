<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const props = defineProps({
  redirectedFrom: {
    type: String,
    default: '/',
  },
});

const router = useRouter();
const userStore = useUserStore();
const login = ref('');
const password = ref('');

const performLogin = () => {
  const path = props.redirectedFrom;
  // TODO - split login for user and for admin
  const isAuth = userStore.login(login.value, password.value);
  if (isAuth) {
    router.push(path);
  } else {
    // TODO - add some user notification
  }
};
</script>

<template>
  <div class="login-page">
    <!-- TODO - add a reminder id DEV mode -> if (import.meta.env.DEV) ... else (import.meta.env.PROD) ... -->
    <input
      class="login-page__login"
      v-model="login"
      placeholder="Username"
    />

    <input
      class="login-page__password"
      v-model="password"
      type="password"
      placeholder="Password"
    />

    <button
      class="login-page__button"
      @click="performLogin"
    >
      Login
    </button>
  </div>
</template>
