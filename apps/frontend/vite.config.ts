/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import generouted from "@generouted/react-router/plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), generouted()],
  server: {
    host: true,
    watch: {
      usePolling: true,
    },
  },
  test: {
    environment: "happy-dom",
    setupFiles: "./src/__tests__/setup.ts",
    globals: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
