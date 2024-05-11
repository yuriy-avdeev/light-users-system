<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  type: {
    type: String as PropType<'submit' | 'button'>,
    default: 'submit'
  },

  text: {
    type: String,
    require: true
  },

  isActive: {
    type: Boolean,
    default: false
  },

  isDisabled: {
    type: Boolean,
    default: false
  },

  isDarkBase: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button
    class="button"
    :class="{
      button_active: props.isActive,
      button_disabled: props.isDisabled,
      button_dark: !props.isDarkBase,
      button_light: props.isDarkBase
    }"
    :disabled="props.isDisabled"
    :type="props.type"
  >
    <slot></slot>

    {{ props.text }}
  </button>
</template>

<style scoped src="./button.scss"></style>
