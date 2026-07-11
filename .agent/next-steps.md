# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-11T16-30-25-04-00`

## Plan ledger

**Goal:** preserve the Air Mail experience while establishing authoritative runtime identity, route/restart semantics, committed visible-frame observation and terrain streaming whose actual geometry matches current LOD policy.

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

## Terrain LOD kit order

```txt
1. open-above-terrain-chunk-identity-kit
2. open-above-terrain-source-revision-kit
3. open-above-terrain-lod-policy-kit
4. open-above-terrain-lod-classification-kit
5. open-above-terrain-lod-transition-plan-kit
6. open-above-terrain-geometry-build-request-kit
7. open-above-terrain-build-budget-kit
8. open-above-terrain-geometry-build-result-kit
9. open-above-terrain-edge-stitch-policy-kit
10. open-above-terrain-atomic-replacement-kit
11. open-above-terrain-chunk-observation-kit
12. open-above-terrain-lod-journal-kit
13. open-above-terrain-lod-fixture-kit
```

## Required terrain fixture cases

```txt
retained horizon chunk upgrades 4 -> 6 -> 10 segments
retained horizon chunk downgrades 10 -> 6 -> 4 segments
same final camera pose produces the same active-terrain fingerprint after different paths
terrain-source revision invalidates old geometry
quality revision invalidates old classification
budget exhaustion retains complete previous geometry
stale build candidates cannot commit
replacement creates no uncovered frame
near/horizon edges remain inside positional and normal tolerances
first visible replacement frame matches the committed observation
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
npm run check
npm run headless:check
npm run build
browser acceptance smoke
Pages acceptance smoke
```

Do not claim distance-based terrain LOD from policy alone. The committed active chunk observation must prove the geometry actually rendered matches the current classification or carries an explicit, bounded deferred transition.