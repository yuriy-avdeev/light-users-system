<script setup lang="ts">
import { ref, type Ref, onMounted, onUnmounted } from "vue";

const emit = defineEmits(["close-container"]);
const containerRef: Ref<HTMLElement | null> = ref(null);

onMounted(() => {
  document.addEventListener("keydown", handlePressEsc);
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handlePressEsc);
  document.removeEventListener("click", handleClickOutside);
});

const handlePressEsc = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    emit("close-container");
  }
};

const handleClickOutside = (e: MouseEvent) => {
  if (!containerRef.value?.contains(e.target as Node)) {
    emit("close-container");
  }
};
</script>

<template>
  <div class="dropdown-wrapper">
    <div ref="containerRef" class="dropdown-wrapper__container">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped src="./dropdown-wrapper.scss"></style>
