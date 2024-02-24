///<reference types="vite/client" />
import path from 'node:path';
import { DotSyntaxError, parse } from 'ts-graphviz/ast';
import { expect, test } from 'vitest';

for (const [file, getContents] of Object.entries(
  import.meta.glob<string>('./dot/*.dot', {
    query: 'raw',
    import: 'default',
  }),
)) {
  testAstSnapshot(file, getContents);
}

function testAstSnapshot(file: string, getContents: ()=> Promise<string>) {
  test.concurrent(file, async () => {
    try {
      const dot = await getContents();
      const snapshot = path.format({
        ...path.parse(file),
        base: '',
        ext: '.snapshot',
      });
      expect(parse(dot)).toMatchFileSnapshot(snapshot);
    } catch (e) {
      if (e instanceof DotSyntaxError) {
        console.log(e.location);
      }
      throw e;
    }
  });
}
