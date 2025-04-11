<template>
  <NavBar />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from '@/modules/common/components/nav-bar/nav-bar.vue';
</script>
