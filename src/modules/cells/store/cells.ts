import { computed, reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import type { Cell } from '@/modules/cells/interfaces/store';
import type { Language } from '@/modules/cells/interfaces/code';

export const useCellsStore = defineStore('cells', () => {
  const _notebookTitle = ref<string>('');
  const order = ref<string[]>([]);
  const cells = reactive<Record<string, Cell>>({});
  const orderedCells = computed<Cell[]>(() =>
    order.value.map((id) => cells[id]),
  );
  const isEmpty = computed<boolean>(() => order.value.length === 0);
  const isLastOne = computed<boolean>(() => order.value.length === 1);
  const notebookTitle = computed<string>({
    get() {
      return _notebookTitle.value;
    },
    set(value: string) {
      _notebookTitle.value = value;
    },
  });

  function updateLanguage({
    id,
    language,
  }: Pick<Cell, 'id' | 'language'>): void {
    //FIXME: ¿Computed warning??
    cells[id].language = language;
  }

  function updateContent({ id, content }: Pick<Cell, 'id' | 'content'>): void {
    //FIXME: ¿Computed warning??
    cells[id].content = content;
  }

  function addCellBelow(
    id: string,
    language?: Language,
    content?: string,
  ): void {
    // Random Id
    const newCellId: string = Date.now().toString();
    const previousIndex = order.value.indexOf(id);

    cells[newCellId] = {
      id: newCellId,
      content: content ?? '',
      language: language ?? 'javascript',
    };

    order.value.splice(previousIndex + 1, 0, newCellId);
  }

  function addCellAtBottom(): void {
    const previousId =
      order.value[order.value.length - 1] ?? Date.now().toString();
    addCellBelow(previousId);
  }

  function removeCell(id: string): void {
    if (order.value.length > 1) {
      const index = order.value.indexOf(id);
      if (index !== -1) {
        order.value.splice(index, 1);
        delete cells[id];
      }
    }
  }

  function moveCell(id: string, direction: 'up' | 'down'): void {
    const currentIndex = order.value.indexOf(id);
    const targetIndex =
      direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex >= 0 && targetIndex < order.value.length) {
      [order.value[currentIndex], order.value[targetIndex]] = [
        order.value[targetIndex],
        order.value[currentIndex],
      ];
    }
  }

  function clearAll(): void {
    order.value = [];
    Object.keys(cells).forEach((key) => delete cells[key]);
  }

  function loadNotebook(notebookData: {
    title: string;
    cells: Record<string, Cell>;
    order: string[];
  }): void {
    clearAll();
    notebookTitle.value = notebookData.title;
    Object.entries(notebookData.cells).map(([id, cell]) => {
      cells[id] = cell;
    });
    order.value = notebookData.order;
  }

  function copyCell(id: string): void {
    addCellBelow(id, cells[id].language, cells[id].content);
  }

  return {
    notebookTitle,
    cells: orderedCells,
    updateContent,
    updateLanguage,
    addCellBelow,
    addCellAtBottom,
    removeCell,
    moveCell,
    isLastOne,
    clearAll,
    isEmpty,
    loadNotebook,
    copyCell,
  };
});
