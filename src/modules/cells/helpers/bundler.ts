import * as esbuild from 'esbuild-wasm';
import fetchPlugin from '@/modules/cells/helpers/plugins/fetch.plugin';
import unpkgPathPlugin from '@/modules/cells/helpers/plugins/unpkg-path.plugin';

export async function startService(): Promise<void> {
  await esbuild.initialize({
    worker: true,
    wasmURL: 'esbuild.wasm',
  });
}

export async function stopService(): Promise<void> {
  await esbuild.stop();
}

export async function transpile(code: string): Promise<string> {
  let result: string;

  try {
    const codeTranspiled = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(code)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });

    result = codeTranspiled.outputFiles[0].text;
  } catch (error) {
    console.log(error);
    result = 'Error';
  }

  return result;
}
