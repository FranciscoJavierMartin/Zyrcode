import Dexie, { type EntityTable } from 'dexie';
import type { OnLoadResult } from 'esbuild-wasm';

export interface Package {
  path: string;
  content: OnLoadResult;
}

export const db = new Dexie('packageCache') as Dexie & {
  packages: EntityTable<Package, 'path'>;
};

db.version(1).stores({
  packages: 'path, content',
});
