<template>
  <SidebarProvider>
    <SettingsSidebar />
    <main>
      <SidebarTrigger />
      <slot />
    </main>
  </SidebarProvider>
</template>

<script setup lang="ts">
import {
  SidebarProvider,
  SidebarTrigger,
} from '@/modules/common/components/ui/sidebar';
import SettingsSidebar from '@/modules/settings/components/settings-sidebar/settings-sidebar.vue';
</script>
