import { computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import type { CellsState, Cell } from '@/modules/cells/interfaces/cells';

export const useCellsStore = defineStore('cells', () => {
  const state = reactive<CellsState>({
    order: ['a', 'b', 'c'],
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
      c: {
        id: 'c',
        content: 'console.log("Third cell!");',
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

  function addCellBelow(id: string): void {
    // Random Id
    const newCellId: string = Date.now().toString();
    const previousIndex = state.order.indexOf(id);

    state.cells[newCellId] = {
      id: newCellId,
      content: '',
      language: 'javascript',
    };

    state.order.splice(previousIndex + 1, 0, newCellId);
  }

  function removeCell(id: string): void {
    const index = state.order.indexOf(id);
    state.order.splice(index, 1);
    delete state.cells[id];
  }

  function moveUp(id: string): void {}

  return { cells, updateCell, addCellBelow, removeCell, moveUp };
});
