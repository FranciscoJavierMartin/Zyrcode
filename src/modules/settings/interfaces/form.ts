import type {
  aiSchema,
  commonSchema,
  editorSchema,
} from '@/modules/settings/helpers/schemas';

export type FormEditorFields = keyof typeof editorSchema.shape;
export type FormAIFields = keyof typeof aiSchema.shape;
export type FormCommonFields = keyof typeof commonSchema.shape;
