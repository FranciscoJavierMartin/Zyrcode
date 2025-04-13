import * as esbuild from 'esbuild-wasm';

export default function unpkgPathPlugin(): esbuild.Plugin {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild): void {
      // Handle root entry file of 'index.js'
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return {
          path: 'index.js',
          namespace: 'a',
        };
      });

      // Handle relative paths in a module
      build.onResolve(
        { filter: /^\.+\// },
        async (
          args: esbuild.OnResolveArgs,
        ): Promise<esbuild.OnResolveResult> => ({
          namespace: 'a',
          path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href,
        }),
      );

      // Handle main file of a module
      build.onResolve(
        { filter: /.*/ },
        async (
          args: esbuild.OnResolveArgs,
        ): Promise<esbuild.OnResolveResult> => ({
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        }),
      );
    },
  };
}
