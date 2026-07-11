# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-11T19-28-28-04-00`

## Plan ledger

**Goal:** preserve the Air Mail experience while moving all module, callback, session, simulation, mission, render, terrain and grass behavior behind explicit authorities and executable fixture gates.

### Checklist

#### Gate 1: immutable runtime admission
- [ ] Pin NexusEngine instead of importing `@main`.
- [ ] Validate Three.js, NexusEngine and postprocess capabilities before construction.
- [ ] Return typed boot results and module-graph fingerprints.
- [ ] Add `fixture:runtime-admission`.

#### Gate 2: import purity and frame ownership
- [ ] Remove module-scope `requestAnimationFrame(attachWhenReady)` from `hot-air-balloon-object-kit.js`.
- [ ] Remove module-owned ambient `window.GameHost` polling.
- [ ] Export an explicit compatibility installer.
- [ ] Make compatibility target discovery one-shot and pure.
- [ ] Return `no-compatible-target` without recurring work.
- [ ] Register all RAF callbacks through one runtime-session frame authority.
- [ ] Assign frame-loop IDs, owner IDs and runtime generations.
- [ ] Fence callbacks after stop, failure, retry and disposal.
- [ ] Retire compatibility work before scene/resource disposal.
- [ ] Publish active frame-loop and scene-traversal observations.
- [ ] Add `fixture:balloon-kit-import-purity`.
- [ ] Add `fixture:single-active-frame-owner`.
- [ ] Add `fixture:no-target-no-compatibility-loop`.
- [ ] Add `fixture:failed-startup-zero-live-callbacks`.
- [ ] Add `fixture:compatibility-install-and-dispose`.

#### Gate 3: lifecycle and teardown
- [ ] Make `createGame()` return a root runtime-session owner.
- [ ] Retain and cancel every frame handle.
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
- [ ] Derive controls, objective, HUD, README and AGENTS projections from it.
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
- [ ] Add runtime session, mission epoch, simulation tick and render frame IDs.
- [ ] Freeze a render-frame plan after simulation and delivery commit.
- [ ] Return typed render and HUD acknowledgement results.
- [ ] Delay telemetry until required consumer acknowledgements exist.
- [ ] Replace mutable GameHost subsystem exposure with detached read models.
- [ ] Add delivery-to-visible-frame and readback-detachment fixtures.

#### Gate 6: terrain source and LOD transition authority
- [ ] Add stable near and horizon chunk identities.
- [ ] Add terrain-source, quality-policy and classification revisions.
- [ ] Reclassify retained horizon keys against current camera policy.
- [ ] Add typed create, release, replacement, deferred and failure results.
- [ ] Add path-independence and three-band traversal fixtures.

#### Gate 6a: bounded terrain build and atomic replacement
- [ ] Define build, vertex, sample, allocation and disposal budgets.
- [ ] Build detached geometry candidates.
- [ ] Reject stale candidates.
- [ ] Commit complete replacements atomically.
- [ ] Retire old geometry after submitted-frame ownership releases it.
- [ ] Add no-gap, edge-continuity, budget and retirement fixtures.

#### Gate 7: grass spatial culling and backend truth
- [ ] Add stable grass chunk IDs, centers and world bounds.
- [ ] Cull against each chunk's committed bounds.
- [ ] Split capability, selected backend and executed backend identities.
- [ ] Keep CPU culling as the truthful default until a real GPU path exists.
- [ ] Atomically commit complete visible sets.
- [ ] Publish accepted, visible and rendered counts separately.
- [ ] Add origin-crossing, return-path, backend-truth and first-visible-frame fixtures.

## Import-purity kit order

```txt
1. open-above-module-side-effect-policy-kit
2. open-above-compatibility-install-command-kit
3. open-above-compatibility-target-discovery-kit
4. open-above-compatibility-install-result-kit
5. open-above-frame-loop-registration-kit
6. open-above-frame-loop-identity-kit
7. open-above-runtime-generation-fence-kit
8. open-above-compatibility-loop-disposal-kit
9. open-above-scene-traversal-budget-kit
10. open-above-startup-failure-loop-retirement-kit
11. open-above-compatibility-observation-kit
12. open-above-import-purity-fixture-kit
13. open-above-browser-frame-owner-smoke-kit
```

## Validation order

```txt
fixture:balloon-kit-import-purity
fixture:no-target-no-compatibility-loop
fixture:single-active-frame-owner
fixture:failed-startup-zero-live-callbacks
fixture:retry-no-predecessor-callbacks
fixture:compatibility-install-and-dispose
fixture:runtime-lifecycle
fixture:clock-route-parity
fixture:product-acceptance
fixture:air-mail-route
fixture:air-mail-reset
fixture:observation-order
fixture:terrain-lod-classification
fixture:terrain-build-budget
fixture:grass-chunk-world-bounds
fixture:grass-origin-radius-crossing
fixture:grass-cpu-backend-truth
fixture:grass-first-visible-frame
npm run check
npm run headless:check
npm run build
browser acceptance smoke
Pages acceptance smoke
```

Do not claim a single frame owner while importing the active balloon kit still schedules a compatibility RAF, and do not treat a fatal panel as a stopped runtime while `attachWhenReady` can continue polling.