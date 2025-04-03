import { onBeforeMount, onMounted, onUnmounted } from 'vue';
import { startService, stopService } from '@/modules/cells/helpers/bundler';

export default function useBundler() {
  onBeforeMount(async () => {
    await startService();
  });

  onUnmounted(async () => {
    await stopService();
  });
}
