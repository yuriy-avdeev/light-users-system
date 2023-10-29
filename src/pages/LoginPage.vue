<template>
  <div>
    <!-- TODO - add a reminder id DEV mode -> if (import.meta.env.DEV) ... else (import.meta.env.PROD) ... -->
    <input v-model="login" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="performLogin">Login</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';

export default {
  setup() {
    const userStore = useUserStore();
    const login = ref('');
    const password = ref('');

    const performLogin = () => {
      userStore.login(login.value, password.value);
    };

    return { login, password, performLogin };
  },
};
</script>
