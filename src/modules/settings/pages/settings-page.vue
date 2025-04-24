<template>
  <SidebarProvider class="mt-13" open>
    <SettingsSidebar />
    <main class="w-full pb-36">
      <CommonSettings />
      <EditorSettings />
      <AiSettings />
    </main>
  </SidebarProvider>
</template>

<script setup lang="ts">
import { SidebarProvider } from '@/modules/common/components/ui/sidebar';
import SettingsSidebar from '@/modules/settings/components/settings-sidebar/settings-sidebar.vue';
import CommonSettings from '@/modules/settings/components/forms/common-settings/common-settings.vue';
import EditorSettings from '@/modules/settings/components/forms/editor-settings/editor-settings.vue';
import AiSettings from '@/modules/settings/components/forms/ai-settings/ai-settings.vue';
</script>

<style>
main {
  section:last-of-type {
    min-height: calc(100dvh - 52px);
  }
}
</style>
