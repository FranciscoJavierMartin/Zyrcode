<template>
  <div class="grid h-dvh w-dvw place-content-center">
    <header class="space-y-6 pt-6 pb-8 md:pt-10 md:pb-12 lg:py-32">
      <div
        class="relative isolate container flex max-w-[64rem] flex-col items-center gap-4 text-center"
      >
        <div
          class="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            :style="{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }"
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <h1
          class="text-foreground text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {{ $t('appName') }}
        </h1>
        <p class="quote-typing">&quot;{{ $t('home.subtitle') }}&quot;</p>
        <Button variant="hover" as-child>
          <router-link :to="{ name: ROUTES.NOTEBOOK.name }">
            {{ $t('home.createNotebookButton') }}
          </router-link>
        </Button>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { ROUTES } from '@/router/routes';
import { callOllamaAPI, getOllamaModels } from './ai';
import { Button } from '@/components/ui/button';

onMounted(() => {
  callOllamaAPI()
    .then((res) => res.text())
    .then(console.log)
    .catch(console.log);

  getOllamaModels().then(console.log);
});
</script>

<style>
@reference '@/assets/styles.css';

.quote-typing {
  @apply border-r-foreground text-foreground w-64 overflow-hidden border-r-[3px] text-lg whitespace-nowrap;
  animation:
    typing 2s steps(28),
    blink 0.5s step-end infinite alternate;
}

@keyframes typing {
  from {
    width: 0;
  }
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}
</style>
