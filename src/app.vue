<template>
  <NavBar />
  <div class="container-lg">
    <RouterView />
  </div>
  <Toaster />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from '@/modules/common/components/nav-bar/nav-bar.vue';
import { Toaster } from '@/modules/common/components/ui/sonner';
</script>
