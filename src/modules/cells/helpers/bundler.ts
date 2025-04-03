import * as esbuild from 'esbuild-wasm';

export async function startService(): Promise<void> {
  await esbuild.initialize({
    worker: true,
    wasmURL: 'esbuild.wasm',
  });
}

export async function stopService(): Promise<void> {
  await esbuild.stop();
}
