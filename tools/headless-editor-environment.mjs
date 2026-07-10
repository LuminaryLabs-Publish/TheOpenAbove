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

function inspectProject() {
  const required = [
    "src/main.js",
    "src/visual/visual-domain.js",
    "src/visual/post-process/hdr-composer-kit.js",
    "src/visual/post-process/god-ray-kit.js",
    "src/visual/landscape/water-surface-kit.js",
    "tests/smoke.mjs"
  ];
  const missing = required.filter((path) => !existsSync(resolve(root, path)));
  const composer = readFileSync(resolve(root, "src/visual/post-process/hdr-composer-kit.js"), "utf8");
  const water = readFileSync(resolve(root, "src/visual/landscape/water-surface-kit.js"), "utf8");
  const checks = {
    requiredFilesPresent: missing.length === 0,
    independentDepthTargets:
      /renderTarget1\.depthTexture = firstDepth/.test(composer)
      && /renderTarget2\.depthTexture = secondDepth/.test(composer),
    noSharedDepthGuard: !/if \(!buffer\.depthTexture\)/.test(composer),
    waterUsesExplicitFog: /uFogColor/.test(water) && /uFogDensity/.test(water) && /fog:\s*false/.test(water),
    waterDisablesImplicitFog: !/fog:\s*true/.test(water)
  };
  return { missing, checks, ok: Object.values(checks).every(Boolean) };
}

export function createEnvironment() {
  return {
    id: "the-open-above",
    label: "The Open Above validation environment",
    domains: ["project", "renderer", "build", "runtime"],
    metadata: {
      repository: "LuminaryLabs-Publish/TheOpenAbove",
      purpose: "Validate source contracts and production build through the NexusEngine headless editor runtime."
    },
    capabilities: {
      "project.inspect": {
        domain: "project",
        description: "Inspect required visual-domain files and renderer safety contracts.",
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
        description: "Validate framebuffer and custom shader safety contracts.",
        execute() {
          const inspection = inspectProject();
          const rendererChecks = {
            independentDepthTargets: inspection.checks.independentDepthTargets,
            noSharedDepthGuard: inspection.checks.noSharedDepthGuard,
            explicitWaterFog: inspection.checks.waterUsesExplicitFog,
            implicitWaterFogDisabled: inspection.checks.waterDisablesImplicitFog
          };
          const ok = Object.values(rendererChecks).every(Boolean);
          return {
            ok,
            status: ok ? "completed" : "failed",
            data: rendererChecks,
            errors: ok ? [] : [{ code: "renderer-contract-failed", message: JSON.stringify(rendererChecks) }]
          };
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
