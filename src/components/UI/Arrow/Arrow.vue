<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  direction: {
    type: String as PropType<'up' | 'down'>,
    required: true,
  },

  isActive: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button class="arrow" :class="{ arrow_active: props.isActive }" type="button">
    {{ direction === 'up' ? '▲' : '▼' }}
  </button>
</template>

<style scoped src="./arrow.scss"></style>
