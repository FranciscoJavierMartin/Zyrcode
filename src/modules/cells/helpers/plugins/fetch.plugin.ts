import * as esbuild from 'esbuild-wasm';
import { db } from '@/modules/common/helpers/package-cache';
import type { Language } from '@/modules/cells/interfaces/code';

const loaders: Record<Language, esbuild.Loader> = {
  javascript: 'jsx',
  typescript: 'tsx',
  markdown: 'text',
};

export default function fetchPlugin(
  inputCode: string,
  language: Language,
): esbuild.Plugin {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild): void {
      build.onLoad(
        { filter: /(^index\.js$)/ },
        async (): Promise<esbuild.OnLoadResult> => ({
          loader: loaders[language],
          contents: inputCode,
        }),
      );

      build.onLoad(
        { filter: /.*/ },
        async (
          args: esbuild.OnLoadArgs,
        ): Promise<esbuild.OnLoadResult | undefined> =>
          (await db.packages.get(args.path))?.content,
      );

      build.onLoad(
        { filter: /.css$/ },
        async (args: esbuild.OnLoadArgs): Promise<esbuild.OnLoadResult> => {
          const response = await fetch(args.path);
          const data = await response.text();
          const resolveDir = new URL('./', response.url).pathname;

          const escaped = data
            .replace(/\n/g, '')
            .replace(/"/g, '\\"')
            .replace(/'/g, "\\'");

          const contents = `
                    const style = document.createElement('style');
                    style.innerHTML = \`${escaped}\`;
                    document.head.appendChild(style);`;

          const content: esbuild.OnLoadResult = {
            loader: loaders[language],
            contents,
            resolveDir,
          };

          await db.packages.add({
            path: args.path,
            content,
          });

          return content;
        },
      );

      build.onLoad(
        { filter: /.*/ },
        async (args: esbuild.OnLoadArgs): Promise<esbuild.OnLoadResult> => {
          const response = await fetch(args.path);
          const contents = await response.text();
          const resolveDir = new URL('./', response.url).pathname;

          const content: esbuild.OnLoadResult = {
            loader: loaders[language],
            contents,
            resolveDir,
          };

          await db.packages.add({
            path: args.path,
            content,
          });

          return content;
        },
      );
    },
  };
}
