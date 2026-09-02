import { readFile, writeFile } from "node:fs/promises";

const lockfile = JSON.parse(await readFile(new URL("../package-lock.json", import.meta.url), "utf8"));
const enginePackage = JSON.parse(await readFile(new URL("../node_modules/nexusengine/package.json", import.meta.url), "utf8"));
const resolved = lockfile.packages?.["node_modules/nexusengine"]?.resolved ?? "";
const commit = resolved.match(/#([a-f0-9]{40})$/i)?.[1] ?? null;
if (!commit) throw new Error("NexusEngine #main did not resolve to an exact Git commit.");

const diagnostics = {
  schema: "open-above.release-diagnostics/2",
  status: "validated-dependency",
  engineSource: {
    channel: "main",
    commit,
    repository: "https://github.com/LuminaryLabs-Dev/NexusEngine"
  },
  engineCommit: commit,
  engineVersion: enginePackage.version,
  generatedAt: new Date().toISOString(),
  target: "vite-development",
  sourceRecords: []
};

await writeFile(new URL("../public/nexusengine-build-diagnostics.json", import.meta.url), `${JSON.stringify(diagnostics, null, 2)}\n`);
console.log(`NexusEngine main resolved at ${commit}`);
