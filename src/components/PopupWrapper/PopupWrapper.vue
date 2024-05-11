<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

const emit = defineEmits(["close-popup"]);

onMounted(() => {
  document.addEventListener("keydown", handlePressEsc);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handlePressEsc);
});

const handlePressEsc = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    emit("close-popup");
  }
};
</script>

<template>
  <div class="popup" @click.self="emit('close-popup')">
    <div class="popup__container">
      <button
        class="popup__button-close"
        type="button"
        @click.stop.prevent="emit('close-popup')"
      >
        &#10006;
      </button>

      <slot></slot>
    </div>
  </div>
</template>

<style scoped src="./popup-wrapper.scss"></style>
