<template>
  <div class="mx-auto flex max-w-6xl flex-col gap-10">
    <div v-for="i of [1, 2, 3]" :key="i">
      <div
        class="grid-layout grid grid-cols-1 grid-rows-[40px_100px_100px_40px] gap-2.5 lg:grid-cols-2 lg:grid-rows-[40px_300px_40px]"
      >
        <Skeleton
          class="grid-area-[toolbar] grid-area-toolbar h-full max-h-[300px] rounded-xl"
        />
        <Skeleton
          class="grid-area-[toolbar] grid-area-editor h-full max-h-[300px] rounded-xl"
        />
        <Skeleton
          class="grid-area-[toolbar] grid-area-preview h-full max-h-[300px] rounded-xl"
        />
        <Skeleton
          class="grid-area-[toolbar] grid-area-console h-full max-h-[300px] rounded-xl"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Skeleton from '@/modules/common/components/ui/skeleton/Skeleton.vue';
</script>

<style scoped>
.grid-layout {
  grid-template-areas: 'toolbar' 'editor' 'preview' 'console';

  @media (width >= 64rem /* 1024px */) {
    grid-template-areas: 'toolbar toolbar' 'editor preview' 'console console';
  }
}

.grid-area-toolbar {
  grid-area: toolbar;
}

.grid-area-editor {
  grid-area: editor;
}

.grid-area-preview {
  grid-area: preview;
}

.grid-area-console {
  grid-area: console;
}
</style>
