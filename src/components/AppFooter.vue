<template>
  <footer class="footer">
    <p class="footer__text">
      &copy; {{ new Date().getFullYear() }}. Yuriy Avdeed. All rights reserved.
    </p>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: auto;
  width: 100%;
  padding: 12px;
  background-color: var(--color-background-secondary);
}

.footer__text {
  font: 500 12px/1.3 'Roboto';
  color: var(--color-white-soft);
}

@media (min-width: 768px) {
  .footer__text {
    font-size: 14px;
  }
}

@media (min-width: 1048px) {
  .footer {
    padding: 16px calc((100% - 1024px) / 2);
  }
}
</style>
