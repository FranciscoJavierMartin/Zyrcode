import * as esbuild from 'esbuild-wasm';
import fetchPlugin from '@/modules/cells/helpers/plugins/fetch.plugin';
import unpkgPathPlugin from '@/modules/cells/helpers/plugins/unpkg-path.plugin';
import type { TranspiledCode, Language } from '@/modules/cells/interfaces/code';

export async function startService(): Promise<void> {
  await esbuild.initialize({
    worker: true,
    wasmURL: 'esbuild.wasm',
  });
}

export async function stopService(): Promise<void> {
  await esbuild.stop();
}

export async function transpile(
  code: string,
  language: Language,
): Promise<TranspiledCode> {
  let result: TranspiledCode;

  try {
    const codeTranspiled = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(code, language)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });

    result = {
      code: codeTranspiled.outputFiles[0].text,
      error: '',
    };
  } catch (error) {
    console.log(error);
    result = {
      code: '',
      error: (error as Error).message,
    };
  }

  return result;
}
