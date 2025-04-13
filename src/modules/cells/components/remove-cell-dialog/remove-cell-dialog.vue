<template>
  <AlertDialog :open="isAlertDialogOpen">
    <AlertDialogTrigger as-child>
      <Button
        variant="hover"
        class="button-icon dark:text-foreground dark:hover:text-background text-red-500"
        @click="isAlertDialogOpen = true"
      >
        <Trash2 class="size-5" />
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent @interact-outside="closeAlertDialog">
      <AlertDialogHeader>
        <AlertDialogTitle>{{ $t('notebook.areYouSure') }}</AlertDialogTitle>
        <AlertDialogDescription>
          {{ $t('notebook.actionCannotBeUndo') }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel class="cursor-pointer" @click="closeAlertDialog">
          {{ $t('cancel') }}
        </AlertDialogCancel>
        <AlertDialogAction as-child class="cursor-pointer">
          <Button variant="destructive" @click="removeCell">
            {{ $t('remove') }}
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
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

const isAlertDialogOpen = ref<boolean>(false);
const props = defineProps<{ id: string }>();
const store = useCellsStore();

function removeCell(): void {
  store.removeCell(props.id);
}

function closeAlertDialog(): void {
  isAlertDialogOpen.value = false;
}
</script>
