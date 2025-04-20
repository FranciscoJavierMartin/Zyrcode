<template>
  <!-- eslint-disable-next-line vuejs-accessibility/heading-has-content-->
  <h4 class="heading-form">
    <slot />
  </h4>
</template>

<script setup lang="ts"></script>

<style scoped>
@reference '@/assets/styles.css';

.heading-form {
  @apply bg-background sticky top-13 -ml-8 w-full pl-8;
}
</style>
