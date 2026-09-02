import assert from "node:assert/strict";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { createEngine } from "nexusengine";
import {
  createBuildDomain,
  createBuildMcpProvider
} from "nexusengine/domains/build";
import { createMcpDomain } from "nexusengine/domains/mcp";

import { balloonVerticalAcceleration } from "../src/native/balloon-flight-kernel.js";
import { readFile } from "node:fs/promises";
import { NEXUS_ENGINE_CHANNEL, NEXUS_ENGINE_REGISTRY_HASH } from "../src/release-identity.js";

const lockfile = JSON.parse(await readFile(new URL("../package-lock.json", import.meta.url), "utf8"));
const resolvedEngineSource = lockfile.packages?.["node_modules/nexusengine"]?.resolved ?? "";
const NEXUS_ENGINE_COMMIT = resolvedEngineSource.match(/#([a-f0-9]{40})$/i)?.[1] ?? null;
assert.ok(NEXUS_ENGINE_COMMIT, "NexusEngine lockfile must resolve main to an exact commit");

const project = path.resolve(".");
const stateRoot = await mkdtemp(path.join(tmpdir(), "open-above-nexus-state-"));
const outputRoot = await mkdtemp(path.join(tmpdir(), "open-above-nexus-output-"));
const build = createBuildDomain({ stateRoot });
const provider = createBuildMcpProvider({ build });
let controlEngine = createEngine({ kits: createMcpDomain({ providers: [provider] }) });

const inspection = await controlEngine.n.mcp.callTool("build_inspect", { project });
assert.equal(inspection.structuredContent.irValidation.ok, true);

const aggregate = await controlEngine.n.mcp.callTool("build_plan", {
  project,
  profile: "native-preferred",
  targets: ["pcvr", "web-live", "android-xr", "web-static", "web-live"]
});
const aggregatePlan = aggregate.structuredContent;
assert.deepEqual(aggregatePlan.request.targets, ["android-xr", "pcvr", "web-live", "web-static"]);
for (const id of ["android-xr", "pcvr"]) {
  const target = aggregatePlan.targets.find((entry) => entry.id === id);
  assert.equal(target.analysis.entry, "src/native/balloon-flight-kernel.js");
  assert.equal(target.executionSelection.mode, "native");
}

const planned = await controlEngine.n.mcp.callTool("build_plan", {
  project,
  profile: "native-preferred",
  targets: ["web-static", "web-live"]
});
const plan = planned.structuredContent;
assert.equal(plan.registryHash, NEXUS_ENGINE_REGISTRY_HASH);

const authorize = async ({ tool, arguments: args }) => (
  tool.name === "build_apply"
  && args.planId === plan.id
  && args.approvePlan === plan.id
);
const first = await controlEngine.n.mcp.callTool("build_apply", {
  planId: plan.id,
  approvePlan: plan.id,
  out: outputRoot
}, { authorize });
if (first.structuredContent.status !== "succeeded") {
  console.error(JSON.stringify(first.structuredContent, null, 2));
}
assert.equal(first.structuredContent.status, "succeeded");
assert.equal(first.structuredContent.noOp, false);

const repeated = await controlEngine.n.mcp.callTool("build_apply", {
  planId: plan.id,
  approvePlan: plan.id,
  out: outputRoot
}, { authorize });
assert.equal(repeated.structuredContent.status, "succeeded");
assert.equal(repeated.structuredContent.noOp, true);
assert.equal(repeated.structuredContent.sequence, first.structuredContent.sequence);

controlEngine = null;
const restartedBuild = createBuildDomain({ stateRoot });
const restored = await restartedBuild.getReceipt(plan.id);
assert.equal(restored.planId, plan.id);
assert.equal(restored.sequence, first.structuredContent.sequence);

const disconnectedRuntimeResult = balloonVerticalAcceleration(0.5, 0.1, 0.2, 0.4, 0);
assert.equal(Number.isFinite(disconnectedRuntimeResult), true);

console.log(JSON.stringify({
  status: "passed",
  engineChannel: NEXUS_ENGINE_CHANNEL,
  engineCommit: NEXUS_ENGINE_COMMIT,
  registryHash: NEXUS_ENGINE_REGISTRY_HASH,
  aggregatePlanId: aggregatePlan.id,
  webPlanId: plan.id,
  firstSequence: first.structuredContent.sequence,
  repeatedNoOp: repeated.structuredContent.noOp,
  restartReceiptRestored: true,
  runtimeAfterMcpDisconnect: true,
  stateRoot,
  outputRoot,
  nativeTargets: aggregatePlan.targets
    .filter((target) => ["android-xr", "pcvr"].includes(target.id))
    .map((target) => ({
      id: target.id,
      status: target.status,
      executionMode: target.executionSelection.mode,
      proof: target.status === "ready" ? "ready-for-package-job" : "environment-gated"
    }))
}, null, 2));
