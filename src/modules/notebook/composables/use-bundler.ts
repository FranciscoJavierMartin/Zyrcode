import { onMounted, onUnmounted, ref } from 'vue';
import { startService, stopService } from '@/modules/cells/helpers/bundler';

export default function useBundler() {
  const isServiceLoading = ref<boolean>(true);

  onMounted(async () => {
    isServiceLoading.value = true;
    await startService();
    isServiceLoading.value = false;
  });

  onUnmounted(async () => {
    await stopService();
  });

  return {
    isServiceLoading,
  };
}
