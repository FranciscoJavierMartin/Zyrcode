import type {
  aiSchema,
  commonSchema,
  editorSchema,
} from '@/modules/settings/helpers/schemas';

export type FormEditorFields = keyof typeof editorSchema.entries;
export type FormAIFields = keyof typeof aiSchema.entries;
export type FormCommonFields = keyof typeof commonSchema.entries;
