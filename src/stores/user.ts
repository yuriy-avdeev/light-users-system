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

  // 'user' is a ref that can hold or User or null, initial value is set to null
  const user = ref<User | null>(null);

  // TODO - create for this list separate store and import it here
  // TODO - check before add new user its existing
  // TODO - create additional workspace and way to save users' passwords
  const users = ref<User[]>([
    {
      login: 'user',
      password: '555',
      first_name: 'John',
      second_name: 'Dow',
      id: 555,
    },
    {
      login: 'admin',
      password: '333',
      first_name: 'Admin',
      second_name: 'Admin',
      id: 333,
    },
  ]);

  const isAuthenticated = computed(() => auth.value);

  const login = (login: string, password: string): boolean => {
    const isAdmin =
      login === import.meta.env.VITE_ADMIN_LOGIN &&
      password === import.meta.env.VITE_ADMIN_PASSWORD;

    if (isAdmin) {
      user.value = users.value[0]; // mock action
      auth.value = true;
    }
    return auth.value;

    // const foundUser = users.value.find(
    //   (u) => u.login === login && u.password === password
    // );
    // if (foundUser) {
    //   user.value = foundUser;
    //   auth.value = true;
    //   // save credentials (e.g., in cookies or local storage) - to save a progress between page reloads
    // }
    // return auth.value;
  };

  const logout = () => {
    user.value = null;
    auth.value = false;
  };

  return { auth, user, users, isAuthenticated, login, logout };
});
