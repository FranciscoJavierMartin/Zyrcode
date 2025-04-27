import * as z from 'zod';
import * as v from 'valibot';

const cellIdSchema = v.pipe(
  v.string(),
  v.minLength(1),
  v.maxLength(64),
  v.regex(/^[a-zA-Z0-9-_]+$/),
);

const execution_count = v.nullable(
  v.pipe(v.number(), v.integer(), v.minValue(0)),
);

const metadataNameSchema = v.pipe(v.string(), v.regex(/^.+$/));
// const metadataTagsSchema = z
//   .array(z.string().regex(/^[^,]+$/))
//   .superRefine((items, ctx) => {
//     const uniqueItemsCount = new Set(items).size;

//     if (uniqueItemsCount !== items.length) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: 'Duplicated values are not allowed',
//       });
//     }
//   });
const metadataTagsSchema = v.pipe(
  v.array(v.pipe(v.string(), v.regex(/^[^,]+$/))),
  v.rawCheck<string[]>(({ addIssue, dataset }) => {
    const uniqueItemsCount = new Set(dataset.value as string[]).size;

    if (uniqueItemsCount !== dataset.value) {
      addIssue({
        message: 'Duplicated values are not allowed',
      });
    }
  }),
);

const outputMetadata = v.record(v.string(), v.any());
const mimebundle = v.string();
const multilineString = v.union([v.string(), v.array(v.string())]);
const sourceSchema = multilineString;

const execute_result = v.object({
  output_type: v.literal('execute_result'),
  execution_count,
  data: mimebundle,
  metadata: outputMetadata,
});

const display_data = v.object({
  output_type: v.literal('display_data'),
  data: mimebundle,
  metadata: outputMetadata,
});

const stream = v.object({
  output_type: v.literal('stream'),
  name: v.union([v.literal('stdout'), v.literal('stderr')]),
  text: multilineString,
});

const error_output = v.object({
  output_type: v.literal('error'),
  ename: v.string(),
  evalue: v.string(),
  traceback: v.array(v.string()),
});

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
