import type { Language } from '@/modules/cells/interfaces/code';

export interface Cell {
  id: string;
  content: string;
  language: Language;
}

export interface CellsState {
  cells: Record<string, Cell>;
  order: string[];
}
