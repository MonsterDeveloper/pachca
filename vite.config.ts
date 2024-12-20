import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    minify: false,
    sourcemap: true,
    lib: {
      entry: fileURLToPath(new URL("src/index.ts", import.meta.url)),
      formats: ["es"],
    },
  },
  plugins: [
    tsconfigPaths(),
    dts({
      entryRoot: "src",
      exclude: ["**/*.test-d.ts", "**/*.test.ts", "mocks"],
      rollupTypes: true,
    }),
  ],
  test: {
    setupFiles: ["./vitest-setup.ts"],
    coverage: {
      reporter: ["json", "json-summary", "html"],
      all: true,
      exclude: [
        // type tests
        "**/*.test-d.ts",
        // MSW mocks
        "mocks/**/*",
        // type definitions
        "**/types.ts",
        "src/types/**/*.ts",

        // index files (re-exports)
        "src/**/index.ts",
      ],
      // only watermark functions and branches
      watermarks: {
        functions: [100, 100],
        lines: [0, 0],
        statements: [0, 0],
        branches: [100, 100],
      },
    },
  },
});
