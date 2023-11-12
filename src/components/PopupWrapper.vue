<template>
    <div class="popup">
        <slot></slot>
    </div>
</template>

<style scoped>
.popup {
    padding: 0 10px;
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
</style>
