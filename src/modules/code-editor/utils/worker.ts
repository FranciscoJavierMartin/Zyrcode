import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

self.MonacoEnvironment = {
  getWorker(_: unknown, label: string): Worker {
    let worker: Worker;

    switch (label) {
      case 'json':
        worker = new jsonWorker();
        break;
      case 'css':
      case 'scss':
      case 'less':
        worker = new cssWorker();
        break;
      case 'html':
      case 'handlebars':
      case 'razor':
        worker = new htmlWorker();
        break;
      case 'typescript':
      case 'javascript':
        worker = new tsWorker();
        break;
      default:
        worker = new editorWorker();
    }

    return worker;
  },
};

console.log('Test', monaco.languages.typescript);
monaco.languages.typescript?.typescriptDefaults.setEagerModelSync(true);
