import * as esbuild from 'esbuild-wasm';

export default function fetchPlugin(inputCode: string): esbuild.Plugin {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild): void {
      build.onLoad(
        { filter: /(^index\.js$)/ },
        async (): Promise<esbuild.OnLoadResult> => ({
          loader: 'jsx',
          contents: inputCode,
        }),
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

          const res: esbuild.OnLoadResult = {
            loader: 'jsx',
            contents,
            resolveDir,
          };

          return res;
        },
      );

      build.onLoad(
        { filter: /.*/ },
        async (args: esbuild.OnLoadArgs): Promise<esbuild.OnLoadResult> => {
          const response = await fetch(args.path);
          const contents = await response.text();
          const resolveDir = new URL('./', response.url).pathname;

          const content: esbuild.OnLoadResult = {
            loader: 'jsx',
            contents,
            resolveDir,
          };

          return content;
        },
      );
    },
  };
}
