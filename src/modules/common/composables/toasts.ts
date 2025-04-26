import { toast } from 'vue-sonner';

export function errorToast(text: string): string | number {
  return toast.error(text, {
    style: {
      '--normal-bg': 'var(--error-background)',
      '--normal-text': 'var(--muted)',
    },
  });
}
