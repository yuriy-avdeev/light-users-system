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

  // TODO - create for this list separate store and import it here
  // TODO - check before add new user its existing
  const users = ref<User[]>([
    {
      login: 'admin',
      password: 'qwerty',
      first_name: 'John',
      second_name: 'Dow',
      id: 555,
    },
    {
      login: 'admin',
      password: 'qwerty',
      first_name: 'Admin',
      second_name: 'Admin',
      id: 333,
    },
  ]);

  const isAuthenticated = computed(() => auth.value);

  function login(login: string, password: string) {
    const foundUser = users.value.find(
      (u) => u.login === login && u.password === password
    );
    if (foundUser) {
      user.value = foundUser;
      auth.value = true;
      // save credentials (e.g., in cookies or local storage) - to save a progress between page reloads
    }
  }
  // TODO - add a button to the header
  function logout() {
    auth.value = false;
  }

  return { auth, user, users, isAuthenticated, login, logout };
});
