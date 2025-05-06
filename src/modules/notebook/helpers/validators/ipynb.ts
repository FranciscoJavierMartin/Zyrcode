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
const metadataTagsSchema = v.pipe(
  v.array(v.pipe(v.string(), v.regex(/^[^,]+$/))),
  v.check(
    (tags) => new Set(tags).size === tags.length,
    'Duplicated values are not allowed',
  ),
);
const metadataExecutionSchema = v.optional(
  v.pipe(v.string(), v.regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)),
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

const outputSchema = v.variant('output_type', [
  execute_result,
  display_data,
  stream,
  error_output,
]);

export const ipynbSchema = v.object({
  nbformat_minor: v.number(),
  nbformat: v.number(),
  metadata: v.object({
    kernelspec: v.object({
      name: v.string(),
      display_name: v.string(),
    }),
    lenguage_info: v.object({
      name: v.string(),
      codemirror_mode: v.optional(v.union([v.string(), v.object({})])),
      file_extension: v.pipe(v.string(), v.minLength(1)),
      mimetype: v.string(),
      pygments_lexer: v.optional(v.string()),
    }),
    orig_nbformat: v.pipe(v.number(), v.integer(), v.minValue(1)),
    title: v.optional(v.string()),
    authors: v.optional(v.array(v.object({ name: v.string() }))),
  }),
  cells: v.array(
    v.variant('cell_type', [
      v.object({
        cell_type: v.literal('markdown'),
        id: cellIdSchema,
        metadata: v.object({
          name: metadataNameSchema,
          tags: metadataTagsSchema,
          jupyter: v.object({
            source_hidden: v.boolean(),
          }),
        }),
        source: sourceSchema,
      }),
      v.object({
        cell_type: v.literal('code'),
        id: cellIdSchema,
        metadata: v.object({
          jupyter: v.object({
            source_hidden: v.boolean(),
            outputs_hidden: v.boolean(),
          }),
          execution: v.object({
            'iopub.execute_input': metadataExecutionSchema,
            'iopub.status.busy': metadataExecutionSchema,
            'shell.execute_reply': metadataExecutionSchema,
            'iopub.status.idle': metadataExecutionSchema,
          }),
          collapsed: v.boolean(),
          scrolled: v.union([v.boolean(), v.literal('auto')]),
          name: metadataNameSchema,
          tags: metadataTagsSchema,
        }),
        source: sourceSchema,
        outputs: v.array(outputSchema),
        execution_count,
      }),
    ]),
  ),
});
