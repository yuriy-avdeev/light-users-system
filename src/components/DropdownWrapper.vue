<script setup lang="ts">
import { ref, type Ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['closeContainer'])
const containerRef: Ref<HTMLElement | null> = ref(null)

onMounted(() => {
    document.addEventListener('keydown', handlePressEsc)
    document.addEventListener('click', handleClickOutside)
})


onUnmounted(() => {
    document.removeEventListener('keydown', handlePressEsc)
    document.removeEventListener('click', handleClickOutside)
})


const handlePressEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
        emit('closeContainer')
    }
}

const handleClickOutside = (e: MouseEvent) => {
    if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
        emit('closeContainer')
    }
}
</script>

<template>
    <div class="dropdown-wrapper">
        <div
            ref="containerRef"
            class="dropdown-wrapper__container"
        >
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
.dropdown-wrapper {
    height: 75px;
    width: 125px;
    overflow: hidden;
    position: absolute;
    top: calc(100% + 2px);
    right: 0;
    border-radius: 8px 0 8px 8px;

    &__container {
        width: 100%;
        height: 75px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 7px;
        position: relative;
        border-radius: 8px 0 8px 8px;
        background-color: var(--color-white);
        animation: top-appearance 350ms ease-out;
    }
}

@keyframes top-appearance {
    0% {
        top: -120px;
        opacity: 0.5;
    }

    100% {
        top: 0;
        opacity: 1;
    }
}
</style>