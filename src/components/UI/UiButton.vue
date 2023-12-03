<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
    type: {
        type: String as PropType<'submit' | 'button'>,
        default: 'submit',
    },

    text: {
        type: String,
        require: true,
    },

    isActive: {
        type: Boolean,
        default: false,
    },

    isDisabled: {
        type: Boolean,
        default: false,
    },

    isDarkBase: {
        type: Boolean,
        default: false,
    }
})
</script>

<template>
    <button
        class="ui-button"
        :class="{
            'ui-button_active': props.isActive,
            'ui-button_disabled': props.isDisabled,
            'ui-button_dark': !props.isDarkBase,
            'ui-button_light': props.isDarkBase
        }"
        :type="props.type"
    >
        <slot></slot>

        {{ props.text }}
    </button>
</template>

<style scoped>
.ui-button {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    outline: none;
    background-color: transparent;
    padding: 6px 8px;
    cursor: pointer;
    font: 500 13px/1.2 var(--main-font);
    transition: box-shadow 200ms, border-color, 300ms;
}

.ui-button_dark {
    color: var(--color-background-secondary);
    border: 1px solid var(--color-background-secondary);
}

.ui-button_light {
    color: var(--color-white);
    border: 1px solid var(--color-background);
}

.ui-button_active.ui-button_dark {
    box-shadow: inset 4px -4px 8px var(--color-background-secondary);
}

.ui-button_active.ui-button_light {
    box-shadow: inset 4px -4px 8px var(--color-background);
}

.ui-button_disabled {
    pointer-events: none;
    background-color: var(--color-dark-grey);
    border: 1px solid var(--color-dark-grey);
    color: var(--color-white);
}

@media (hover: hover) {
    .ui-button_dark:hover {
        box-shadow: inset 3px -3px 6px var(--color-background-secondary);
    }

    .ui-button_light:hover {
        box-shadow: inset 4px -4px 8px var(--color-background);
    }
}
</style>
