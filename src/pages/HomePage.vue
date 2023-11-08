<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import PopupWrapper from '@/components/PopupWrapper.vue';
import LoginForm from '@/components/LoginForm.vue';

const props = defineProps({
  redirectedFrom: {
    type: String,
    default: null,
  },
});

const router = useRouter();
const userStore = useUserStore();
const showLoginPopup = ref(false);

onMounted(() => {
  const fromProtectedRoute = router.currentRoute.value.query.fromProtectedRoute;
  if (fromProtectedRoute && !userStore.isAuthenticated) {
    showLoginPopup.value = true;
  }
});

// const openLoginPopup = () => {
//   showLoginPopup.value = true;
// };

// const closeLoginPopup = () => {
//   showLoginPopup.value = false;
// };
</script>

<template>
  <div class="home-page">
    <h1 class="home-page__title">Home page test</h1>

    <PopupWrapper>
      <LoginForm :redirected-from="props.redirectedFrom" />
    </PopupWrapper>
  </div>
</template>

<style>
.home-page {
  display: flex;
  justify-content: center;
}
</style>
