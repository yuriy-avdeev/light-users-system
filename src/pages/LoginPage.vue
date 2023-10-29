<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const login = ref('');
const password = ref('');

const performLogin = () => {
  userStore.login(login.value, password.value);
};
</script>

<template>
  <div>
    <!-- TODO - add a reminder id DEV mode -> if (import.meta.env.DEV) ... else (import.meta.env.PROD) ... -->
    <input v-model="login" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="performLogin">Login</button>
  </div>
</template>
