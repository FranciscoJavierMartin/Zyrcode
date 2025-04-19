<template>
  <div class="container-lg mt-13 flex gap-5">
    <nav class="flex flex-col">
      <ol class="sticky top-20">
        <li><a href="#common-settings"> Common </a></li>
        <li><a href="#editor-settings"> Editor </a></li>
        <li><a href="#ai-settings"> AI </a></li>
      </ol>
    </nav>
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
