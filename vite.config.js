import { resolve } from "node:path";
import { defineConfig } from "vite";

const nexusEngineEntry = resolve(".nexus-engine/src/index.js");
const nexusEngineSha = process.env.VITE_NEXUS_ENGINE_SHA || "local-main";

export default defineConfig({
  base: "/TheOpenAbove/",
  resolve: {
    alias: {
      "@nexus-engine": nexusEngineEntry
    }
  },
  define: {
    __NEXUS_ENGINE_SHA__: JSON.stringify(nexusEngineSha)
  },
  build: {
    outDir: "dist",
    emptyOutDir: true
  }
});
