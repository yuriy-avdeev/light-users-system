import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoginFormStore = defineStore('loginForm', () => {
  const showForm = ref(false);
  const nextPage = ref('/');

  const defineNextPage = (payload: string) => {
    nextPage.value = payload;
  };

  const openLoginForm = () => {
    showForm.value = true;
  };

  const closeLoginForm = () => {
    showForm.value = false;
  };

  return { showForm, nextPage, openLoginForm, closeLoginForm, defineNextPage };
});
