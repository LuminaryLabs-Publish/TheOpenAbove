# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-11T18-01-38-04-00`

## Plan ledger

**Goal:** preserve the Air Mail experience while establishing authoritative runtime identity, route/restart semantics, committed visible-frame observation, terrain streaming and grass culling whose actual rendered state matches current camera and quality policy.

### Checklist

#### Gate 1: immutable runtime admission
- [ ] Pin NexusEngine instead of importing `@main`.
- [ ] Validate Three.js, NexusEngine and postprocess capabilities before construction.
- [ ] Return typed boot results and module-graph fingerprints.
- [ ] Add `fixture:runtime-admission`.

#### Gate 2: import purity and frame ownership
- [ ] Remove module-scope compatibility RAF behavior.
- [ ] Move compatibility installation behind an explicit installer.
- [ ] Register every callback with one runtime-session owner.
- [ ] Add `fixture:import-purity`.

#### Gate 3: lifecycle and teardown
- [ ] Make `createGame()` return a root runtime-session owner.
- [ ] Retain and cancel RAF IDs.
- [ ] Compose simulation, camera, mail, airstream, presentation, visual, telemetry and GameHost disposal.
- [ ] Distinguish mission reset from full-runtime restart.
- [ ] Add `fixture:runtime-lifecycle`.

#### Gate 4: fixed-step clock and input admission
- [ ] Add a session-owned fixed-step clock.
- [ ] Separate simulation tick IDs from render frame IDs.
- [ ] Convert burner, vent and reset transitions into sequenced commands.
- [ ] Add `fixture:clock-route-parity`.

#### Gate 4a: product and acceptance authority
- [ ] Add one versioned product manifest and supersession policy.
- [ ] Derive control, objective, HUD, README and AGENTS projections from it.
- [ ] Publish product and acceptance fingerprints.
- [ ] Add browser and Pages acceptance fixtures.

#### Gate 5: Air Mail route and delivery authority
- [ ] Version route, parcel, town and airstream identities.
- [ ] Add mission phases and command/result IDs.
- [ ] Require correct-current proof before delivery.
- [ ] Add route, wrong-current and duplicate-delivery fixtures.

#### Gate 5a: mission restart transaction
- [ ] Add mission session, epoch and reset transaction identities.
- [ ] Reset simulation, input, airstream, mail, camera, presentation and telemetry atomically.
- [ ] Fence predecessor commands and delivery proof.
- [ ] Correlate the first post-reset tick and frame.
- [ ] Add reset-inside-destination and stale-result fixtures.

#### Gate 5b: committed observation frame authority
- [ ] Add `RuntimeSessionId`, `MissionEpoch`, `SimulationTickId` and `RenderFrameId`.
- [ ] Return a typed `DeliveryResult` from mail progression.
- [ ] Freeze a `RenderFramePlan` after simulation and delivery commit.
- [ ] Make `visual.render()` return render submission, renderer statistics and effective-quality results.
- [ ] Project HUD from the same immutable frame plan.
- [ ] Delay telemetry publication until render and HUD acknowledgements are available.
- [ ] Replace mutable GameHost subsystem exposure with detached read models.
- [ ] Publish a `CommittedObservation` with state and frame fingerprints.
- [ ] Keep a bounded frame journal.
- [ ] Reject stale, partial and cross-epoch consumer acknowledgements.
- [ ] Add delivery-to-visible-frame, quality-frame and GameHost-detachment fixtures.

#### Gate 6: terrain source and LOD transition authority
- [ ] Add stable near and horizon chunk identities.
- [ ] Add terrain-source, quality-policy and classification revisions.
- [ ] Move segment selection into a pure classifier used for every required key.
- [ ] Store intended and actual LOD/segment identities for every active chunk.
- [ ] Reclassify retained horizon keys on every accepted center revision.
- [ ] Diff committed geometry against current intended classification.
- [ ] Add typed create, release, replacement, deferred and failure results.
- [ ] Add a shared near/horizon edge and stitch policy.
- [ ] Publish intended and actual active-terrain observations.
- [ ] Add path-independence and three-band traversal fixtures.

#### Gate 6a: bounded terrain build and atomic replacement
- [ ] Define per-frame build, vertex, sample, allocation and disposal budgets.
- [ ] Prioritize uncovered terrain and upgrades entering the near-horizon band.
- [ ] Build detached geometry candidates.
- [ ] Reject stale candidates after camera, quality or terrain revision changes.
- [ ] Keep complete old geometry visible while replacement is deferred.
- [ ] Commit complete replacements atomically.
- [ ] Correlate the first visible replacement frame.
- [ ] Retire old geometry after submitted-frame ownership releases it.
- [ ] Add no-gap, edge-continuity, budget and retirement fixtures.

#### Gate 7: grass spatial culling and backend truth
- [ ] Add stable grass chunk IDs from world seed, chunk X and chunk Z.
- [ ] Derive world centers and bounds for every committed grass chunk.
- [ ] Replace camera-to-`mesh.position` distance with camera-to-chunk-bounds distance.
- [ ] Version camera center, quality, LOD and cull policy inputs.
- [ ] Return typed visible, culled, deferred, failed and stale decisions.
- [ ] Split capability, selected backend and executed backend identities.
- [ ] Keep CPU chunk culling as the truthful default implementation.
- [ ] Report GPU dispatch/workgroup counts only after actual GPU dispatch.
- [ ] Atomically commit complete visible sets.
- [ ] Publish accepted, visible and rendered chunk/instance counts separately.
- [ ] Correlate the visible-set revision with the submitted frame.

#### Gate 7a: grass traversal and frame proof
- [ ] Add `fixture:grass-chunk-world-bounds`.
- [ ] Add `fixture:grass-cull-distance`.
- [ ] Add `fixture:grass-origin-radius-crossing`.
- [ ] Add `fixture:grass-camera-centered-retention`.
- [ ] Add `fixture:grass-return-path-parity`.
- [ ] Add `fixture:grass-cpu-backend-truth`.
- [ ] Add `fixture:grass-webgpu-backend-truth` only after a real pipeline exists.
- [ ] Add `fixture:grass-first-visible-frame`.
- [ ] Add `fixture:grass-pages-traversal-parity`.

## Grass culling kit order

```txt
1. open-above-grass-chunk-identity-kit
2. open-above-grass-chunk-world-bounds-kit
3. open-above-grass-camera-center-revision-kit
4. open-above-grass-lod-classification-kit
5. open-above-grass-cull-policy-kit
6. open-above-grass-cull-distance-kit
7. open-above-grass-backend-capability-kit
8. open-above-grass-backend-selection-kit
9. open-above-grass-culling-execution-kit
10. open-above-grass-cull-decision-kit
11. open-above-grass-visible-set-commit-kit
12. open-above-grass-stale-decision-rejection-kit
13. open-above-grass-cull-observation-kit
14. open-above-grass-frame-acknowledgement-kit
15. open-above-grass-culling-journal-kit
16. open-above-grass-traversal-fixture-kit
```

## Required grass fixture cases

```txt
origin neighborhood has individually classified chunks
first center transition retains a visible neighborhood
camera crosses 2184 m origin radius without field disappearance
camera-centered chunk remains visible at long distance
returning to a prior center produces the same visible-set fingerprint
quality change reclassifies LOD and culling under one revision
CPU path reports CPU and zero GPU dispatches
WebGPU label is impossible without successful pipeline execution
accepted, visible and rendered instance counts remain distinguishable
first visible grass frame acknowledges the committed visible set
Pages traversal produces the same deterministic result as local source
```

## Validation order

```txt
fixture:runtime-admission
fixture:import-purity
fixture:runtime-lifecycle
fixture:clock-route-parity
fixture:product-acceptance
fixture:air-mail-route
fixture:air-mail-reset
fixture:observation-order
fixture:delivery-visible-frame
fixture:hud-telemetry-parity
fixture:terrain-lod-classification
fixture:horizon-retained-upgrade
fixture:horizon-retained-downgrade
fixture:terrain-path-independence
fixture:terrain-build-budget
fixture:terrain-atomic-replacement
fixture:terrain-edge-continuity
fixture:grass-chunk-world-bounds
fixture:grass-cull-distance
fixture:grass-origin-radius-crossing
fixture:grass-camera-centered-retention
fixture:grass-return-path-parity
fixture:grass-cpu-backend-truth
fixture:grass-first-visible-frame
fixture:grass-pages-traversal-parity
npm run check
npm run headless:check
npm run build
browser acceptance smoke
Pages acceptance smoke
```

Do not claim camera-centered grass culling from camera-centered chunk membership alone. The committed visible-set observation must prove each chunk was classified against its own world bounds, and backend observations must identify the execution path that actually produced the decision.
