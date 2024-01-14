<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['close-popup'])

onMounted(() => {
    document.addEventListener('keydown', handlePressEsc)
})

onUnmounted(() => {
    document.removeEventListener('keydown', handlePressEsc)
})

const handlePressEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
        emit('close-popup')
    }
}
</script>

<template>
    <div
        class="popup"
        @click.self="emit('close-popup')"
    >
        <div class="popup__container">
            <button
                class="popup__button-close"
                @click.stop.prevent="emit('close-popup')"
            >
                &#10006;
            </button>
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.popup {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
}

.popup__container {
    display: flex;
    flex-direction: column;
    width: calc(100% - 30px);
    max-width: 320px;
    padding: 0 14px 30px;
    border-radius: 6px;
    background-color: var(--color-white);
}

.popup__button-close {
    margin: 4px 0 12px auto;
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    color: var(--color-black-soft);
    transition: opacity 400ms;
    position: relative;
    left: 5px;
}

@media (hover: hover) {
    .popup__button-close:hover {
        opacity: 0.6;
    }
}
</style>
