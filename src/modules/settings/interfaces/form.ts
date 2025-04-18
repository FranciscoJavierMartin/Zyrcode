import type {
  aiSchema,
  editorSchema,
} from '@/modules/settings/helpers/schemas';

export type FormEditorFields = keyof typeof editorSchema.shape;
export type FormAIFields = keyof typeof aiSchema.shape;
