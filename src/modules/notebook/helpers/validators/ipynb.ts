import * as z from 'zod';

const cellIdSchema = z
  .string()
  .min(1)
  .max(64)
  .regex(/^[a-zA-Z0-9-_]+$/);

const execution_count = z.number().int().min(0).nullable();
const metadataNameSchema = z.string().regex(/^.+$/);
const metadataTagsSchema = z
  .array(z.string().regex(/^[^,]+$/))
  .superRefine((items, ctx) => {
    const uniqueItemsCount = new Set(items).size;

    if (uniqueItemsCount !== items.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Duplicated values are not allowed',
      });
    }
  });
const outputMetadata = z.record(z.string(), z.any());
const mimebundle = z.string();
const multilineString = z.union([z.string(), z.array(z.string())]);
const sourceSchema = multilineString;

const execute_result = z.object({
  output_type: z.literal('execute_result'),
  execution_count,
  data: mimebundle,
  metadata: outputMetadata,
});

const display_data = z.object({
  output_type: z.literal('display_data'),
  data: mimebundle,
  metadata: outputMetadata,
});

const stream = z.object({
  output_type: z.literal('stream'),
  name: z.union([z.literal('stdout'), z.literal('stderr')]),
  text: multilineString,
});

const error_output = z.object({
  output_type: z.literal('error'),
  ename: z.string(),
  evalue: z.string(),
  traceback: z.array(z.string()),
});

// TODO: https://github.com/jupyter/nbformat/blob/main/nbformat/v4/nbformat.v4.schema.json
const outputSchema = z.discriminatedUnion('output_type', [
  execute_result,
  display_data,
  stream,
  error_output,
]);

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
      codemirror_mode: z.union([z.string(), z.object({})]).optional(),
      file_extension: z.string(),
      mimetype: z.string(),
      pygments_lexer: z.string().optional(),
    }),
    orig_nbformat: z.number().int().min(1),
    title: z.string().optional(),
    authors: z.array(z.object({ name: z.string() })).optional(),
  }),
  cells: z.array(
    z.discriminatedUnion('cell_type', [
      z.object({
        cell_type: z.literal('markdown'),
        id: cellIdSchema,
        metadata: z.object({
          name: metadataNameSchema,
          tags: metadataTagsSchema,
          jupyter: z.object({
            source_hidden: z.boolean(),
          }),
        }),
        source: sourceSchema,
      }),
      z.object({
        cell_type: z.literal('code'),
        id: cellIdSchema,
        metadata: z.object({
          jupyter: z.object({
            source_hidden: z.boolean(),
            outputs_hidden: z.boolean(),
          }),
          execution: z.object({
            'iopub.execute_input': z
              .string()
              .datetime()
              .regex(/^.*$/)
              .optional(),
            'iopub.status.busy': z.string().datetime().regex(/^.*$/).optional(),
            'shell.execute_reply': z
              .string()
              .datetime()
              .regex(/^.*$/)
              .optional(),
            'iopub.status.idle': z.string().datetime().regex(/^.*$/).optional(),
          }),
          collapsed: z.boolean(),
          scrolled: z.union([z.boolean(), z.literal('auto')]),
          name: metadataNameSchema,
          tags: metadataTagsSchema,
        }),
        source: sourceSchema,
        outputs: z.array(outputSchema),
        execution_count,
      }),
    ]),
  ),
});
