<template>
  <div class="size-32 rounded-md border-2 border-blue-500">
    <div
      class="animate-horizontal -mt-1 -ml-0.5 h-px w-32 translate-y-16 border border-red-500"
    />
    <!-- <div
      class="animate-vertical -mt-1 h-32 w-px translate-x-16 border border-green-500"
    /> -->
  </div>
</template>

<style scoped>
.animate-horizontal {
  /* animation: animate-ruler 2s infinite alternate ease-in-out; */
}

.animate-vertical {
  /* animation: animate-ruler 2s infinite alternate ease-in-out; */
}

@keyframes animate-ruler {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>
