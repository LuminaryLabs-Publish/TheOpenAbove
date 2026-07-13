import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

const root = resolve(process.cwd());

function runNpm(script) {
  const output = execFileSync(process.platform === "win32" ? "npm.cmd" : "npm", ["run", script], {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });
  return output.trim();
}

function inspectWorldGeneration() {
  const required = [
    "src/world/world-generation-kit.js",
    "src/visual/visual-domain.js",
    "src/visual/landscape/terrain-surface-kit.js",
    "src/visual/landscape/terrain-chunk-streaming-kit.js",
    "src/visual/landscape/terrain-horizon-streaming-kit.js",
    "src/visual/landscape/vegetation-cluster-kit.js",
    "src/visual/grass-field/grass-field-domain.js",
    "src/visual/flower-field/flower-field-domain.js",
    "src/ui/parchment-map-overlay.js",
    "tests/world-generation.mjs"
  ];
  const missing = required.filter((path) => !existsSync(resolve(root, path)));
  if (missing.length) return { missing, checks: {}, ok: false };
  const world = readFileSync(resolve(root, "src/world/world-generation-kit.js"), "utf8");
  const visual = readFileSync(resolve(root, "src/visual/visual-domain.js"), "utf8");
  const terrain = readFileSync(resolve(root, "src/visual/landscape/terrain-surface-kit.js"), "utf8");
  const chunks = readFileSync(resolve(root, "src/visual/landscape/terrain-chunk-streaming-kit.js"), "utf8");
  const horizon = readFileSync(resolve(root, "src/visual/landscape/terrain-horizon-streaming-kit.js"), "utf8");
  const vegetation = readFileSync(resolve(root, "src/visual/landscape/vegetation-cluster-kit.js"), "utf8");
  const grass = readFileSync(resolve(root, "src/visual/grass-field/grass-field-domain.js"), "utf8");
  const flowers = readFileSync(resolve(root, "src/visual/flower-field/flower-field-domain.js"), "utf8");
  const map = readFileSync(resolve(root, "src/ui/parchment-map-overlay.js"), "utf8");
  const worldTests = readFileSync(resolve(root, "tests/world-generation.mjs"), "utf8");
  const checks = {
    stagedWorldGeneration: /WORLD_GENERATION_PHASES/.test(world) && /advanceGeneration\(units = generation\.workBudget\)/.test(world) && /function completeAtomicSwap/.test(world),
    firstFrameBeforeHeavyGeneration: /state\.firstFramePresented && world\.getGenerationState\(\)\.status === "working"/.test(visual),
    activeWorldRetainedUntilReady: /if \(!active\) return fallbackHeight/.test(world) && /active = Object\.freeze/.test(world),
    worldGenerationDiagnostics: /getGenerationDiagnostics/.test(world) && /phaseTimings/.test(world) && /failure/.test(world),
    terrainRefreshesAfterSwap: /nextGenerationRevision !== generationRevision/.test(terrain) && /function refresh\(\)/.test(chunks) && /function refresh\(\)/.test(horizon),
    populationsRefreshAfterSwap: /vegetation\.refresh/.test(visual) && /grass\.refresh/.test(visual) && /flowers\.refresh/.test(visual) && /refresh: populate/.test(vegetation) && /function refresh\(\)/.test(grass) && /function refresh\(\)/.test(flowers),
    mapRefreshesAfterSwap: /worldMapRevision/.test(map) && /refreshWorldMap/.test(map),
    stagedGenerationTests: /fixed-budget generation should span multiple updates/.test(worldTests) && /reset should retain the active world until replacement is complete/.test(worldTests) && /staged\.dispose\(\)/.test(worldTests)
  };
  return { missing, checks, ok: Object.values(checks).every(Boolean) };
}

function inspectProject() {
  const required = [
    "src/main.js",
    "src/world/world-generation-kit.js",
    "src/visual/visual-domain.js",
    "src/visual/post-process/hdr-composer-kit.js",
    "src/visual/post-process/color-grade-kit.js",
    "src/visual/landscape/terrain-surface-kit.js",
    "src/visual/landscape/terrain-chunk-streaming-kit.js",
    "src/visual/landscape/terrain-horizon-streaming-kit.js",
    "src/visual/landscape/vegetation-cluster-kit.js",
    "src/visual/grass-field/grass-field-domain.js",
    "src/visual/flower-field/flower-field-domain.js",
    "src/visual/landscape/water-surface-kit.js",
    "src/ui/parchment-map-overlay.js",
    "tests/smoke.mjs",
    "tests/world-generation.mjs"
  ];
  const missing = required.filter((path) => !existsSync(resolve(root, path)));
  const visual = readFileSync(resolve(root, "src/visual/visual-domain.js"), "utf8");
  const composer = readFileSync(resolve(root, "src/visual/post-process/hdr-composer-kit.js"), "utf8");
  const grade = readFileSync(resolve(root, "src/visual/post-process/color-grade-kit.js"), "utf8");
  const terrain = readFileSync(resolve(root, "src/visual/landscape/terrain-surface-kit.js"), "utf8");
  const chunks = readFileSync(resolve(root, "src/visual/landscape/terrain-chunk-streaming-kit.js"), "utf8");
  const horizon = readFileSync(resolve(root, "src/visual/landscape/terrain-horizon-streaming-kit.js"), "utf8");
  const vegetation = readFileSync(resolve(root, "src/visual/landscape/vegetation-cluster-kit.js"), "utf8");
  const grass = readFileSync(resolve(root, "src/visual/grass-field/grass-field-domain.js"), "utf8");
  const flowers = readFileSync(resolve(root, "src/visual/flower-field/flower-field-domain.js"), "utf8");
  const water = readFileSync(resolve(root, "src/visual/landscape/water-surface-kit.js"), "utf8");
  const world = readFileSync(resolve(root, "src/world/world-generation-kit.js"), "utf8");
  const map = readFileSync(resolve(root, "src/ui/parchment-map-overlay.js"), "utf8");
  const worldTests = readFileSync(resolve(root, "tests/world-generation.mjs"), "utf8");
  const checks = {
    requiredFilesPresent: missing.length === 0,
    independentDepthTargets:
      /renderTarget1\.depthTexture = firstDepth/.test(composer)
      && /renderTarget2\.depthTexture = secondDepth/.test(composer),
    noSharedDepthGuard: !/if \(!buffer\.depthTexture\)/.test(composer),
    neutralExposure: /exposure: 1\.0/.test(composer) && /autoExposureEnabled: false/.test(composer),
    cinematicPassesDisabled:
      /bloomEnabled: false/.test(composer)
      && /godRaysEnabled: false/.test(composer)
      && !/composer\.addPass\(bloom\.pass\)/.test(composer)
      && !/composer\.addPass\(godRays\.pass\)/.test(composer),
    neutralColorGrade:
      /uContrast: \{ value: 1\.0 \}/.test(grade)
      && !/uVignette/.test(grade)
      && !/uGrain/.test(grade),
    noMultiplyTerrainOverlay:
      !/createCloudShadowOverlay/.test(visual)
      && !/MultiplyBlending/.test(chunks),
    streamedTerrain:
      /createTerrainChunkStreamer/.test(terrain)
      && /chunks = new Map/.test(chunks)
      && /lodForDistance/.test(chunks),
    softTerrainCloudShadow:
      /gl_FragColor\.rgb \*= cloudLight/.test(chunks)
      && /mix\(1\.0, 0\.74/.test(chunks),
    waterUsesExplicitFog: /uFogColor/.test(water) && /uFogDensity/.test(water) && /fog:\s*false/.test(water),
    waterDisablesImplicitFog: !/fog:\s*true/.test(water),
    stagedWorldGeneration:
      /WORLD_GENERATION_PHASES/.test(world)
      && /advanceGeneration\(units = generation\.workBudget\)/.test(world)
      && /function completeAtomicSwap/.test(world),
    firstFrameBeforeHeavyGeneration:
      /state\.firstFramePresented && world\.getGenerationState\(\)\.status === "working"/.test(visual),
    activeWorldRetainedUntilReady:
      /if \(!active\) return fallbackHeight/.test(world)
      && /active = Object\.freeze/.test(world),
    worldGenerationDiagnostics:
      /getGenerationDiagnostics/.test(world)
      && /phaseTimings/.test(world)
      && /failure/.test(world),
    terrainRefreshesAfterSwap:
      /nextGenerationRevision !== generationRevision/.test(terrain)
      && /refresh/.test(chunks)
      && /refresh/.test(horizon),
    populationsRefreshAfterSwap:
      /vegetation\.refresh/.test(visual)
      && /grass\.refresh/.test(visual)
      && /flowers\.refresh/.test(visual)
      && /refresh: populate/.test(vegetation)
      && /function refresh\(\)/.test(grass)
      && /function refresh\(\)/.test(flowers),
    mapRefreshesAfterSwap:
      /worldMapRevision/.test(map)
      && /refreshWorldMap/.test(map),
    stagedGenerationTests:
      /fixed-budget generation should span multiple updates/.test(worldTests)
      && /reset should retain the active world until replacement is complete/.test(worldTests)
      && /staged\.dispose\(\)/.test(worldTests)
  };
  return { missing, checks, ok: Object.values(checks).every(Boolean) };
}

export function createEnvironment() {
  return {
    id: "the-open-above",
    label: "The Open Above validation environment",
    domains: ["project", "renderer", "build", "runtime", "world-generation"],
    metadata: {
      repository: "LuminaryLabs-Publish/TheOpenAbove",
      purpose: "Validate neutral lighting, streamed terrain, staged world generation, shader safety, and production build through the NexusEngine headless editor runtime."
    },
    capabilities: {
      "project.inspect": {
        domain: "project",
        description: "Inspect required visual-domain files, staged world generation, and renderer safety contracts.",
        execute() {
          const inspection = inspectProject();
          return {
            ok: inspection.ok,
            status: inspection.ok ? "completed" : "failed",
            data: inspection,
            errors: inspection.ok ? [] : [{ code: "project-inspection-failed", message: JSON.stringify(inspection) }]
          };
        }
      },
      "renderer.validate": {
        domain: "renderer",
        description: "Validate framebuffer, lighting baseline, terrain streaming, atomic world refresh, and shader safety contracts.",
        execute() {
          const inspection = inspectProject();
          const rendererChecks = { ...inspection.checks };
          const ok = Object.values(rendererChecks).every(Boolean);
          return {
            ok,
            status: ok ? "completed" : "failed",
            data: rendererChecks,
            errors: ok ? [] : [{ code: "renderer-contract-failed", message: JSON.stringify(rendererChecks) }]
          };
        }
      },
      "world-generation.validate": {
        domain: "world-generation",
        description: "Validate phased generation, fixed work budgets, atomic swap, diagnostics, reset, disposal, and deterministic output.",
        execute() {
          const inspection = inspectWorldGeneration();
          if (!inspection.ok) {
            return { ok: false, status: "failed", data: inspection, errors: [{ code: "world-generation-contract-failed", message: JSON.stringify(inspection) }] };
          }
          try {
            return { ok: true, status: "completed", data: { inspection, output: runNpm("check") } };
          } catch (error) {
            return { ok: false, status: "failed", errors: [{ code: "world-generation-check-failed", message: String(error.stderr || error.message || error) }] };
          }
        }
      },
      "project.check": {
        domain: "build",
        description: "Run the repository smoke test suite.",
        execute() {
          try {
            return { ok: true, data: { output: runNpm("check") } };
          } catch (error) {
            return { ok: false, status: "failed", errors: [{ code: "npm-check-failed", message: String(error.stderr || error.message || error) }] };
          }
        }
      },
      "project.build": {
        domain: "build",
        description: "Run the production Vite build after smoke validation.",
        execute() {
          try {
            return { ok: true, data: { output: runNpm("build") } };
          } catch (error) {
            return { ok: false, status: "failed", errors: [{ code: "npm-build-failed", message: String(error.stderr || error.message || error) }] };
          }
        }
      },
      "runtime.getState": {
        domain: "runtime",
        description: "Return the static validation state exposed to the headless editor.",
        execute() {
          return { ok: true, data: inspectProject() };
        }
      }
    }
  };
}

export default createEnvironment;
