import type { InferOutput } from 'valibot';
import type {
  aiSchema,
  commonSchema,
  editorSchema,
} from '@/modules/settings/helpers/schemas';

export type FormCommonSettings = InferOutput<typeof commonSchema>;
export type FormEditorSettings = InferOutput<typeof editorSchema>;
export type FormAISettings = InferOutput<typeof aiSchema>;

export type FormCommonFields = keyof typeof commonSchema.entries;
export type FormEditorFields = keyof typeof editorSchema.entries;
export type FormAIFields = keyof typeof aiSchema.entries;
