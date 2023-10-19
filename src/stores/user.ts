// store/user.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

interface User {
  login: string;
  password: string;
  first_name: string;
  second_name: string;
  id: number;
}

export const useUserStore = defineStore('user', () => {
  const auth = ref(false);

  const user = ref<User>({
    login: 'admin',
    password: 'qwerty',
    first_name: 'John',
    second_name: 'Dow',
    id: 555,
  });

  const users = ref<User[]>([
    {
      login: 'admin',
      password: 'qwerty',
      first_name: 'John',
      second_name: 'Dow',
      id: 555,
    },
  ]);

  const isAuthenticated = computed(() => auth.value);

  function login(login: string, password: string) {
    const foundUser = users.value.find(
      (u) => u.login === login && u.password === password
    );
    if (foundUser) {
      // user = foundUser;
      auth.value = true;
      // Save credentials (e.g., in cookies or local storage)
    }
  }

  function logout() {
    auth.value = false;
  }

  return { auth, user, users, isAuthenticated, login, logout };
});
