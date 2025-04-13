import { computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import type { CellsState, Cell } from '@/modules/cells/interfaces/cells';

export const useCellsStore = defineStore('cells', () => {
  const state = reactive<CellsState>({
    order: ['a', 'b'],
    cells: {
      a: {
        id: 'a',
        content: 'console.log("Hello world! from JavaScript!");',
        language: 'javascript',
      },
      b: {
        id: 'b',
        content: 'console.log("Hello world! from TypeScript!");',
        language: 'javascript',
      },
    },
  });
  const cells = computed<Cell[]>(() =>
    state.order.map((id) => state.cells[id]),
  );

  function updateCell({ id, content, language }: Cell): void {
    state.cells[id].content = content;
    state.cells[id].language = language;
  }

  return { cells, updateCell };
});
