import * as z from 'zod';

const cellSchema = z.object({
  id: z.string(),
  language: z.enum(['javascript', 'typescript', 'markdown']),
  content: z.string(),
});

export const jsonSchema = z.object({
  title: z.string(),
  order: z.string().array(),
  cells: z.record(z.string(), cellSchema),
});
