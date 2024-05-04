<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  computed,
  type Ref,
  ref,
  onMounted,
} from 'vue'
import { debounce } from '@/services/debounce'

const emit = defineEmits(['update:modelValue'])
const inputElement: Ref<HTMLInputElement | null> = ref(null)

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },

  placeholder: {
    type: String,
    default: '',
  },

  labelText: {
    type: String,
    default: '',
  },

  warningText: {
    type: String,
    default: '',
  },

  isFocused: {
    type: Boolean,
    default: false,
  },

  type: {
    type: String,
    default: 'text',
  },

  isDisabled: {
    type: Boolean,
    default: false,
  },

  debounceDelay: {
    type: Number,
    default: 200,
  },
})

onMounted(() => {
  if (props.isFocused) {
    inputElement.value?.focus()
  }
})

const inputModel = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    setValueByDebounce(newValue.trim())
  },
})

const setValueByDebounce = debounce((value: string) => {
  emit('update:modelValue', value)
}, props.debounceDelay)
</script>

<template>
  <label
    class="input"
    :class="{
      input_disabled: props.isDisabled,
    }"
  >
    {{ props.labelText && props.labelText }}

    <input
      ref="inputElement"
      v-model="inputModel"
      class="input__input"
      :class="{ input__input_labeled: labelText }"
      :type="props.type"
      :placeholder="props.placeholder && props.placeholder"
    />

    <slot></slot>

    <span v-if="props.warningText" class="input__warning">
      {{ props.warningText }}
    </span>
  </label>
</template>

<style scoped src="./input.scss"></style>
