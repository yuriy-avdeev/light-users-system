<script setup lang="ts">
import Button from "@/components/UI/Button/Button.vue";
import DropdownWrapper from "@/components/DropdownWrapper/DropdownWrapper.vue";

const emit = defineEmits(["click-no", "click-yes"]);

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <DropdownWrapper
    class="confirmation-container"
    @close-container="emit('click-no')"
  >
    <p class="confirmation-container__text">{{ props.text }}</p>

    <Button
      text="YES"
      type="button"
      class="confirmation-container__button"
      @click.stop.prevent="emit('click-yes')"
    />

    <Button
      text="NO"
      type="button"
      class="confirmation-container__button"
      @click.stop.prevent="emit('click-no')"
    />
  </DropdownWrapper>
</template>

<style scoped src="./confirmation-container.scss"></style>
