import { computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import type { CellsState, Cell } from '@/modules/cells/interfaces/store';

export const useCellsStore = defineStore('cells', () => {
  const state = reactive<CellsState>({
    order: ['a', 'b', 'c'],
    cells: {
      a: {
        id: 'a',
        content: `
        console.log('Hello world! from JavaScr!');
console.log('Hello world! from JavaScr!');
console.log('Hello world! from JavaScr!');
console.log('Hello world! from JavaScr!');
console.log('Hello world! from JavaScr!');
console.log('Hello world! from JavaScr!');
console.log('Hello world! from JavaScr!');
console.log('Hello world! from JavaScr!');
console.log('Hello world! from JavaScr!');
console.log('Hello world! from JavaScr!');
console.log('Hello world! from JavaScr!');
console.log('Hello world! from JavaScr!');
console.log('Hello world! from JavaScr!');
console.log('Hello world! from JavaScr!');
console.log('Hello world! from JavaScr!');
console.log('Hello world! from JavaScr!');
console.log('Hello world! from JavaScr!');
console.log('Hello world! from JavaScr!');
console.log('Hello world! from JavaScr!');
console.log('Hello world! from JavaScr!');
console.log('Hello world! from JavaScr!');
console.log('Hello world! from JavaScr!');
console.log('Hello world! from JavaScr!');
console.log('Hello world! from JavaScr!');
        `,
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

  function updateLanguage({
    id,
    language,
  }: Pick<Cell, 'id' | 'language'>): void {
    //FIXME: ¿Computed warning??
    state.cells[id].language = language;
  }

  function updateContent({ id, content }: Pick<Cell, 'id' | 'content'>): void {
    //FIXME: ¿Computed warning??
    state.cells[id].content = content;
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

  function moveCell(id: string, direction: 'up' | 'down'): void {
    const currentIndex = state.order.indexOf(id);
    const targetIndex =
      direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex >= 0 && targetIndex < state.order.length) {
      [state.order[currentIndex], state.order[targetIndex]] = [
        state.order[targetIndex],
        state.order[currentIndex],
      ];
    }
  }

  return {
    cells,
    updateContent,
    updateLanguage,
    addCellBelow,
    removeCell,
    moveCell,
  };
});
