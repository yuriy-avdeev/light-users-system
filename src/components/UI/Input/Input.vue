<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },

  placeholder: {
    type: String,
    default: 'Type your text here',
  },

  warningText: {
    type: String,
    default: '',
  },

  isFocused: {
    type: Boolean,
    default: false,
  },

  isDisabled: {
    type: Boolean,
    default: false,
  },

  debounceDelay: {
    type: Number,
    default: 0,
  },
})

const inputModel = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue.trim())
  },
})
</script>

<template>
  <div class="input">
    <input
      type="text"
      class="input__input"
      :class="{
        input__input_disabled: props.isDisabled,
        'input__input_has-warning': props.warningText,
      }"
      :placeholder="props.placeholder"
      v-model="inputModel"
    />

    <button
      class="input__button-close"
      type="button"
      @click.prevent="inputModel = ''"
    >
      &#10006;
    </button>

    <span class="input__warning">
      {{ props.warningText }}
    </span>
  </div>
</template>

<style scoped src="./input.scss"></style>
