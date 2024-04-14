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

onMounted(() => {
  if (props.isFocused) {
    inputElement.value?.focus()
  }
})

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
    setValueByDebounce(newValue.trim())
  },
})

const setValueByDebounce = debounce((value: string) => {
  emit('update:modelValue', value)
}, props.debounceDelay)
</script>

<template>
  <div
    class="input"
    :class="{
      input_disabled: props.isDisabled,
    }"
  >
    <input
      ref="inputElement"
      type="text"
      class="input__input"
      :placeholder="props.placeholder"
      v-model="inputModel"
    />

    <div class="input__icons-container">
      <button
        v-if="inputModel"
        class="input__button-clear"
        type="button"
        @click.prevent="inputModel = ''"
      >
        &#10006;
      </button>

      <img
        v-else
        class="input__search-icon"
        src="@/assets/icons/search.svg"
        alt="search icon"
        width="11"
        height="11"
      />
    </div>

    <span class="input__warning">
      {{ props.warningText }}
    </span>
  </div>
</template>

<style scoped src="./input.scss"></style>
