<template>
    <div class="loader">
        <div class="loader__spinner"></div>
    </div>
</template>

<style scoped>
.loader {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.loader__spinner {
    border: 5px solid var(--color-dark-grey);
    border-top: 5px solid var(--color-light-grey);
    border-bottom: 5px solid var(--color-light-grey);
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    animation: spin 1700ms linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
