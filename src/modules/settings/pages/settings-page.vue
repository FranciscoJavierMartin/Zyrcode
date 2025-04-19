<template>
  <div class="container-lg mt-13 flex gap-5">
    <nav class="border-muted-foreground/50 flex min-w-40 flex-col border-r">
      <ol class="sticky top-13 w-full">
        <li class="cursor-pointer">
          <a href="#common-settings"> Common </a>
        </li>
        <li class="cursor-pointer">
          <a href="#editor-settings"> Editor </a>
        </li>
        <li class="cursor-pointer">
          <a href="#ai-settings"> AI </a>
        </li>
      </ol>
    </nav>
    <main class="pb-20">
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
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { Button } from '@/modules/common/components/ui/button';
import CommonSettings from '@/modules/settings/components/forms/common-settings/common-settings.vue';
import EditorSettings from '@/modules/settings/components/forms/editor-settings/editor-settings.vue';
import AiSettings from '@/modules/settings/components/forms/ai-settings/ai-settings.vue';

const mainNavLinks = ref<NodeListOf<Element>>();
const mainSections = ref<NodeListOf<Element>>();

function handleScroll() {
  const fromTop = window.scrollY;

  mainNavLinks.value?.forEach((link) => {
    const section = document.querySelector(
      (link as HTMLAnchorElement).hash,
    ) as HTMLElement;

    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add('current');
    } else {
      link.classList.remove('current');
    }
  });
}

onMounted(() => {
  mainNavLinks.value = document.querySelectorAll('nav ol li a');
  mainSections.value = document.querySelectorAll('main section');

  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
@reference '@/assets/styles.css';

.current {
  @apply bg-yellow-300;
}
</style>
