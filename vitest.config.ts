import { defineConfig } from "vitest/config"
import path from "node:path"

export default defineConfig({
  // tsconfig says `jsx: preserve` because Next does the JSX transform. Vitest
  // has to do it itself, and the classic runtime would need React in scope —
  // which none of these components import. Automatic matches what Next emits.
  esbuild: { jsx: "automatic" },
  test: { include: ["**/__tests__/**/*.test.ts"], environment: "node" },
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
})
