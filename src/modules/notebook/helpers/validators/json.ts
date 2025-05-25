import * as v from 'valibot';

const cellSchema = v.object({
  id: v.string(),
  language: v.union([
    v.literal('javascript'),
    v.literal('typescript'),
    v.literal('markdown'),
  ]),
  content: v.string(),
});

export const jsonSchema = v.object({
  title: v.string(),
  order: v.array(v.string()),
  cells: v.record(v.string(), cellSchema),
});
