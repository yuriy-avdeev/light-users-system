<script setup lang="ts">
//
</script>

<template>
    <div class="popup">
        <div class="popup__content-container">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.popup {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
}

.popup__content-container {
    /*  */
}
</style>
