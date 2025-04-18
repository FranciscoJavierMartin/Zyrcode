import * as z from 'zod';

export const editorSchema = z.object({
  fontSize: z.number().min(6).max(30),
  tabSize: z.number().min(2).max(30),
});
