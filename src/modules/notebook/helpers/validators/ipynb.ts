import * as z from 'zod';

export const ipynbSchema = z.object({
  nbformat_minor: z.number(),
  nbformat: z.number(),
  metadata: z.object({
    kernelspec: z.object({
      name: z.string(),
      display_name: z.string(),
    }),
    lenguage_info: z.object({
      name: z.string(),
      codemirror_mode: z.union([z.string(), z.object({})]),
      file_extension: z.string(),
      mimetype: z.string(),
      pygments_lexer: z.string(),
    }),
    orig_nbformat: z.number().int().min(1),
    title: z.string(),
    authors: z.array(z.object({ name: z.string() })),
  }),
  cells: z.array(z.object({})),
});
