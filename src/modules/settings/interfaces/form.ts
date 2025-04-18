import type { editorSchema } from '@/modules/settings/helpers/schemas';

export type FormFields = keyof typeof editorSchema.shape;
