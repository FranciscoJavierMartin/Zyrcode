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

  function moveDown(id: string): void {
    const currentIndex = state.order.indexOf(id);
    const nextIndex = currentIndex + 1;

    if (nextIndex < state.order.length) {
      [state.order[currentIndex], state.order[nextIndex]] = [
        state.order[nextIndex],
        state.order[currentIndex],
      ];
    }
  }

  function moveUp(id: string): void {
    const currentIndex = state.order.indexOf(id);
    const previousIndex = currentIndex - 1;

    if (previousIndex >= 0) {
      [state.order[currentIndex], state.order[previousIndex]] = [
        state.order[previousIndex],
        state.order[currentIndex],
      ];
    }
  }

  return { cells, updateCell, addCellBelow, removeCell, moveDown, moveUp };
});
