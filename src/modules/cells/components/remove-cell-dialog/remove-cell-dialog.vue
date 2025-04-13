<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <Button
        variant="hover"
        class="button-icon dark:text-foreground dark:hover:text-background text-red-500"
      >
        <Trash2 class="size-5" />
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ $t('notebook.areYouSure') }}</AlertDialogTitle>
        <AlertDialogDescription>
          {{ $t('notebook.actionCannotBeUndo') }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>{{ $t('cancel') }}</AlertDialogCancel>
        <AlertDialogAction @click="removeCell">
          {{ $t('remove') }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/modules//common/components/ui/alert-dialog';
import { Button } from '@/modules/common/components/ui/button';
import { Trash2 } from 'lucide-vue-next';
import { useCellsStore } from '@/modules/cells/store/cells';

const props = defineProps<{ id: string }>();
const store = useCellsStore();

function removeCell(): void {
  store.removeCell(props.id);
}
</script>
