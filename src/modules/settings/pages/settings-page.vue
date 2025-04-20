<template>
  <SidebarProvider class="mt-13" open>
    <SettingsSidebar />
    <main class="w-full">
      <CommonSettings />
      <EditorSettings />
      <AiSettings />
      <section>
        <h4>Packages Cache</h4>
        <Button>Clear package cache</Button>
      </section>
    </main>
    <!-- 6,  -->
  </SidebarProvider>
</template>

<script setup lang="ts">
import { SidebarProvider } from '@/modules/common/components/ui/sidebar';
import { Button } from '@/modules/common/components/ui/button';
import SettingsSidebar from '@/modules/settings/components/settings-sidebar/settings-sidebar.vue';
import CommonSettings from '@/modules/settings/components/forms/common-settings/common-settings.vue';
import EditorSettings from '@/modules/settings/components/forms/editor-settings/editor-settings.vue';
import AiSettings from '@/modules/settings/components/forms/ai-settings/ai-settings.vue';
</script>
