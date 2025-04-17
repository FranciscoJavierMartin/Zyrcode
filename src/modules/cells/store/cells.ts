import { computed, reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import type { Cell } from '@/modules/cells/interfaces/store';
import type { Language } from '@/modules/cells/interfaces/code';
import { generateRandomID } from '@/modules/common/helpers/random';

export const useCellsStore = defineStore('cells', () => {
  const order = ref<string[]>(['z', 'a', 'b', 'c']);
  const cells = reactive<Record<string, Cell>>({
    z: {
      id: 'z',
      language: 'javascript',
      content: `
  console.log('Log');
  console.error('Error');
  console.warn('Warn');
  console.debug('Debug');
  console.info('Info');
        `,
    },
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
  });
  const orderedCells = computed<Cell[]>(() =>
    order.value.map((id) => cells[id]),
  );

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

  function addCellBelow(id: string, language?: Language): void {
    // Random Id
    const newCellId: string = Date.now().toString();
    const previousIndex = order.value.indexOf(id);

    cells[newCellId] = {
      id: newCellId,
      content: '',
      language: language ?? 'javascript',
    };

    order.value.splice(previousIndex + 1, 0, newCellId);
  }

  function addCellAtBottom(): void {
    const previousId =
      order.value[order.value.length - 1] ?? generateRandomID();
    addCellBelow(previousId);
  }

  function removeCell(id: string): void {
    const index = order.value.indexOf(id);
    order.value.splice(index, 1);
    delete cells[id];
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

  return {
    cells: orderedCells,
    updateContent,
    updateLanguage,
    addCellBelow,
    addCellAtBottom,
    removeCell,
    moveCell,
  };
});
