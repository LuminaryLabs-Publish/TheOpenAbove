# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-10T16-20-09-04-00`

## Plan ledger

### Goal

Make one committed frame the authority for telemetry, adaptive-resolution decisions, render statistics, HUD projection, and GameHost readback without changing the visible Balloon Drift experience.

### Full checklist

- [ ] Add a monotonic runtime `frameId` allocated before simulation.
- [ ] Keep normalized keyboard and wheel result IDs available to the frame record.
- [ ] Add an explicit pre-render visual update row.
- [ ] Make `visual.render(dt, frameMs)` return a JSON-safe render result.
- [ ] Record render-scale before and after `resolution.sample()`.
- [ ] Record smoothed frame cost, sample counter, decision reason, resize decision, draw calls, and triangles.
- [ ] Copy the post-sample scale into committed visual state in the same frame.
- [ ] Publish Nexus telemetry from the committed frame or explicitly mark a pre-render publication phase.
- [ ] Make HUD consume the committed frame snapshot rather than a mixed mutable object.
- [ ] Add additive `GameHost.runtimeProof` readback with bounded frame and quality-decision journals.
- [ ] Preserve `GameHost.local` and `GameHost.nexusEngine` compatibility fields.
- [ ] Add consumer rows for simulation, camera, visual update, telemetry, render, HUD, and GameHost.
- [ ] Add status values for `sampled`, `held`, `downscaled`, `upscaled`, `resized`, `rendered`, `published`, `projected`, `skipped`, and `failed`.
- [ ] Add a grass kit truth row classifying active grass-field kits and the inactive legacy grass-detail kit.
- [ ] Add a DOM-free fixture that can drive at least 180 synthetic frame-cost samples.
- [ ] Prove no decision before sample 90, one deterministic decision at sample 90, and deterministic recovery behavior.
- [ ] Prove telemetry, HUD, and GameHost reference the same committed frame and post-sample scale.
- [ ] Add headless `runtime.fixture` and `runtime.getProofState` capabilities.
- [ ] Make `npm run check` execute the phase fixture before the current static smoke assertions.
- [ ] Make headless `project.check` report the same fixture result.
- [ ] Run `npm run check`.
- [ ] Run `npm run headless:check`.
- [ ] Run `npm run build` after checks pass.
- [ ] Run browser smoke and compare GameHost proof shape with fixture shape.
- [ ] Update repo-local and central ledgers after implementation.

## Recommended files

```txt
src/proof/frame-phase-ledger.js
src/proof/adaptive-quality-decision-ledger.js
src/proof/runtime-consumer-ledger.js
src/proof/committed-frame-snapshot.js
src/proof/gamehost-frame-proof.js
src/proof/grass-kit-truth-ledger.js
scripts/open-above-render-phase-fixture.mjs
```

## Required frame flow

```txt
begin frame
  -> allocate frameId and input range
  -> simulation update row
  -> balloon/presentation row
  -> camera row
  -> visual pre-render update row
  -> render submission
  -> adaptive-resolution sample and decision row
  -> renderer statistics row
  -> commit one immutable frame snapshot
  -> publish Nexus telemetry from committed frame
  -> project HUD from committed frame
  -> expose GameHost proof readback
```

## Fixture must prove

```txt
frame IDs are monotonic
all rows are JSON-safe
pre-render and post-render phases are explicit
render scale before/after is recorded
sampleFrames resets deterministically at 90
smoothedMs transitions are deterministic
no-change decisions are recorded
upscale/downscale decisions include reason and bounds
resize happens only when scale changes
render calls and triangles belong to the same frame
telemetry, HUD, and GameHost reference one committed frame
journal eviction is deterministic
active grass kits are distinguished from legacy inactive grass-detail
compatibility fields remain present
contract violations fail non-zero
```

## Avoid until proof exists

```txt
renderer replacement
terrain or cloud rewrite
camera retuning
balloon visual changes
simulation constant changes
grass art or density retuning
quality thresholds retuning
new route content
legacy source deletion
```

## Done when

```txt
npm run check passes the render-phase fixture and existing smoke
npm run headless:check reports the same proof result
npm run build passes
GameHost exposes bounded additive frame and quality-decision proof
Nexus telemetry, HUD, and GameHost agree on frameId and post-sample scale
browser and fixture proof shapes agree
central ledger points to the implementation timestamp
```

## Next safe ledge

```txt
TheOpenAbove Render Phase Authority Ledger + Adaptive Resolution Fixture Gate
```