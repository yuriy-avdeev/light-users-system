import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserAccessFormStore = defineStore("userAccessForm", () => {
  const showAccessForm = ref(false);

  const openUserAccessForm = () => {
    showAccessForm.value = true;
  };

  const closeUserAccessForm = () => {
    showAccessForm.value = false;
  };

  return { showAccessForm, openUserAccessForm, closeUserAccessForm };
});
