import dts from "vite-plugin-dts";
import { defineConfig } from "vitest/config";
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  build: {
    target: "esnext",
    ssr: true,
    lib: {
      entry: {
        'ts-graphviz': "src/ts-graphviz.ts",
        'ast': "src/ast.ts",
        'common': "src/common.ts",
        'core': "src/core.ts",
        'utils': "src/utils.ts",
        'adapter/utils': 'src/adapter/utils.ts',
        'adapter/browser': 'src/adapter/browser.ts',
        'adapter/node': 'src/adapter/node.ts',
        'adapter/deno': 'src/adapter/deno.ts',
      },
      formats: ["es", "cjs"],
    },
    outDir: "lib",
  },
  plugins: [
    tsconfigPaths(),
    dts({
      outDir: "lib",
      copyDtsFiles: true,
    }),
  ],
});
