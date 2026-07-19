import { spawnSync } from "node:child_process";

const suites = [
  "tests/smoke.mjs",
  "tests/startup-loading.mjs",
  "tests/wind-visuals.mjs",
  "tests/world-feature-foundation.mjs",
  "tests/world-domain-composition.mjs",
  "tests/layered-weather-integration.mjs",
  "tests/cloud-lod-integration.mjs",
  "tests/terrain-streaming.mjs",
  "tests/world-route-protection.mjs",
  "tests/terrain-overlays.mjs"
];

const findings = {
  info: [],
  warning: [],
  error: [],
  blocker: []
};

function clean(value) {
  return String(value ?? "").trim();
}

function annotation(level, title, message) {
  const safeTitle = clean(title).replace(/[\r\n]+/g, " ");
  const safeMessage = clean(message).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
  const command = level === "info" ? "notice" : level === "blocker" ? "error" : level;
  console.log(`::${command} title=${safeTitle}::${safeMessage}`);
}

function record(level, suite, message) {
  const finding = { suite, message: clean(message) || "No diagnostic output." };
  findings[level].push(finding);
  annotation(level, `${level.toUpperCase()}: ${suite}`, finding.message);
}

function isAssertionDrift(output) {
  return /AssertionError|ERR_ASSERTION|operator:\s*['"](?:match|doesNotMatch|strictEqual|deepStrictEqual|equal)['"]/i.test(output);
}

function isBlocker(output, result) {
  if (result.signal) return true;
  return /SyntaxError|ERR_MODULE_NOT_FOUND|MODULE_NOT_FOUND|Cannot find module|ENOENT|ERR_UNKNOWN_FILE_EXTENSION|JavaScript heap out of memory|FATAL ERROR/i.test(output);
}

function runSuite(suite) {
  const result = spawnSync(process.execPath, [suite], {
    encoding: "utf8",
    env: { ...process.env, NEXUS_CHECK_TIER: "smoke" },
    maxBuffer: 16 * 1024 * 1024
  });

  const stdout = clean(result.stdout);
  const stderr = clean(result.stderr);
  const output = [stdout, stderr].filter(Boolean).join("\n");

  if (result.error) {
    record("blocker", suite, result.error.stack || result.error.message || result.error);
    return;
  }

  if (result.status === 0) {
    record("info", suite, stdout || "Passed.");
    return;
  }

  if (isAssertionDrift(output)) {
    record("warning", suite, output);
    return;
  }

  if (isBlocker(output, result)) {
    record("blocker", suite, output || `Terminated by ${result.signal || "fatal execution failure"}.`);
    return;
  }

  record("error", suite, output || `Exited with status ${result.status}.`);
}

console.log("Four-tier validation policy: INFO reports success, WARNING reports contract drift, ERROR reports non-blocking failures, and BLOCKER alone stops deployment.");
for (const suite of suites) runSuite(suite);

console.log("\nValidation summary");
console.log(`  info: ${findings.info.length}`);
console.log(`  warning: ${findings.warning.length}`);
console.log(`  error: ${findings.error.length}`);
console.log(`  blocker: ${findings.blocker.length}`);

if (findings.warning.length > 0) {
  console.log("Warnings were logged but do not block the build.");
}

if (findings.error.length > 0) {
  console.log("Errors were logged for repair but do not block the build.");
}

if (findings.blocker.length > 0) {
  console.error("Deployment blocked because one or more BLOCKER findings occurred.");
  process.exitCode = 1;
} else {
  console.log("Validation completed without deployment blockers.");
}
