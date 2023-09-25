<template>
  <div class="not-found-page">
    <h2 class="not-found-page__text">We have not created this page yet...</h2>

    <RouterLink class="not-found-page__link" to="/">
      To the home page... &rarr;
    </RouterLink>
  </div>
</template>

<style scoped>
.not-found-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.not-found-page__text {
  font: 500 24px/1.2 var(--main-font);
  margin: 50px 0 30px;
  text-align: center;
}

.not-found-page__link {
  font: 500 16px/1.2 var(--main-font);
  font-style: italic;
  transition: color 300ms;
  text-decoration: none;
  color: var(--color-text);
}

@media (hover: hover) {
  .not-found-page__link:hover {
    color: var(--color-text-hovered);
  }
}
</style>
