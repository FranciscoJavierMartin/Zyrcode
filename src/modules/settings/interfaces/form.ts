import type { InferOutput } from 'valibot';
import type {
  aiSchema,
  commonSchema,
  editorSchema,
  formatterSchema,
} from '@/modules/settings/helpers/schemas';

export type FormSelectOption = {
  value: string;
  label: string;
  icon?: string;
  alt?: string;
};

export type FormCommonSettings = InferOutput<typeof commonSchema>;
export type FormEditorSettings = InferOutput<typeof editorSchema>;
export type FormFormatterSettings = InferOutput<typeof formatterSchema>;
export type FormAISettings = InferOutput<typeof aiSchema>;

export type FormCommonFields = keyof typeof commonSchema.entries;
export type FormEditorFields = keyof typeof editorSchema.entries;
export type FormFormatterFields = keyof typeof formatterSchema.entries;
export type FormAIFields = keyof typeof aiSchema.entries;

// TODO: Create an all fields type for forms inputs
