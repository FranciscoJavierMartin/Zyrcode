import type { Language } from '@/modules/cells/interfaces/code';

export interface Cell {
  id: string;
  content: string;
  language: Language;
}
