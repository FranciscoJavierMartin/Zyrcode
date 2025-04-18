<template>
  <div class="mt-13">
    <nav></nav>
    <main>
      <CommonSettings />
      <EditorSettings />
      <AiSettings />
      <section>
        <h4>Packages Cache</h4>
        <Button>Clear package cache</Button>
      </section>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { Button } from '@/modules/common/components/ui/button';
import CommonSettings from '@/modules/settings/components/forms/common-settings/common-settings.vue';
import EditorSettings from '@/modules/settings/components/forms/editor-settings/editor-settings.vue';
import AiSettings from '@/modules/settings/components/forms/ai-settings/ai-settings.vue';
</script>
