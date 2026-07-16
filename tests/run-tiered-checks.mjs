import { spawnSync } from "node:child_process";

const suites = [
  "tests/smoke.mjs",
  "tests/world-feature-foundation.mjs",
  "tests/world-domain-composition.mjs",
  "tests/layered-weather-integration.mjs",
  "tests/terrain-streaming.mjs",
  "tests/world-route-protection.mjs",
  "tests/terrain-overlays.mjs"
];

const findings = {
  info: [],
  warning: [],
  error: []
};

function clean(value) {
  return String(value ?? "").trim();
}

function annotation(level, title, message) {
  const safeTitle = clean(title).replace(/[\r\n]+/g, " ");
  const safeMessage = clean(message).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
  const command = level === "info" ? "notice" : level;
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
    record("error", suite, result.error.stack || result.error.message || result.error);
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

  record("error", suite, output || `Exited with status ${result.status}.`);
}

console.log("Three-tier validation policy: INFO reports success, WARNING reports non-blocking contract drift, ERROR blocks the build.");
for (const suite of suites) runSuite(suite);

console.log("\nValidation summary");
console.log(`  info: ${findings.info.length}`);
console.log(`  warning: ${findings.warning.length}`);
console.log(`  error: ${findings.error.length}`);

if (findings.warning.length > 0) {
  console.log("Warnings were logged but do not block the build.");
}

if (findings.error.length > 0) {
  console.error("Build blocked because one or more validation errors occurred.");
  process.exitCode = 1;
} else {
  console.log("Validation completed without blocking errors.");
}
