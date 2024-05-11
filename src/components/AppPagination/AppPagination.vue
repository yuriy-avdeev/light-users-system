<script setup lang="ts">
import { computed } from 'vue'
import Button from '@/components/UI/Button/Button.vue'

// TODO: add arrows right and left to toggle pages
const emit = defineEmits(['click-page'])

const props = defineProps({
  quantityOfPages: {
    type: Number,
    required: true
  },

  currentPage: {
    type: Number,
    required: true
  }
})

const pages = computed(() => {
  const { currentPage, quantityOfPages } = props
  if (quantityOfPages <= 3) {
    const pageArray = []
    for (let i = 1; i <= quantityOfPages; i++) {
      pageArray.push(i)
    }
    return pageArray
  }
  if (currentPage === 1) {
    return [1, 2, 3]
  }
  if (currentPage === quantityOfPages) {
    return [quantityOfPages - 2, quantityOfPages - 1, quantityOfPages]
  }
  return [currentPage - 1, currentPage, currentPage + 1]
})

const hasArrowButtons = computed(() => {
  return props.quantityOfPages > 3
})
</script>

<template>
  <div class="app-pagination">
    <button
      v-if="hasArrowButtons"
      :class="[
        'app-pagination__arrow-button',
        {
          'app-pagination__arrow-button_disabled': props.currentPage === 1
        }
      ]"
      @click.prevent="emit('click-page', props.currentPage - 1)"
    >
      &#9664;
    </button>

    <ul class="app-pagination__list">
      <li v-for="item in pages" :key="item" class="app-pagination__list-item">
        <Button
          :text="String(item)"
          type="button"
          :class="[
            'app-pagination__list-button',
            {
              'app-pagination__list-button_active': item === props.currentPage
            }
          ]"
          @click.prevent="emit('click-page', item)"
        />
      </li>
    </ul>

    <button
      v-if="hasArrowButtons"
      :class="[
        'app-pagination__arrow-button',
        {
          'app-pagination__arrow-button_disabled': props.currentPage === props.quantityOfPages
        }
      ]"
      @click.prevent="emit('click-page', props.currentPage + 1)"
    >
      &#9654;
    </button>
  </div>
</template>

<style scoped src="./app-pagination.scss"></style>
