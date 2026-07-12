# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-11T21-08-57-04-00`

## Plan ledger

**Goal:** preserve Air Mail while moving module, session, simulation, mission, terrain, grass and world-boundary behavior behind explicit authorities and executable fixture gates.

### Checklist

#### Gate 1: immutable runtime admission
- [ ] Pin NexusEngine instead of importing `@main`.
- [ ] Validate Three.js, NexusEngine, ProtoKit and postprocess capabilities before construction.
- [ ] Return typed boot results and module-graph fingerprints.
- [ ] Add `fixture:runtime-admission`.

#### Gate 2: import purity and frame ownership
- [ ] Remove module-scope RAF and ambient GameHost polling from the balloon object kit.
- [ ] Export an explicit compatibility installer.
- [ ] Return `no-compatible-target` without recurring work.
- [ ] Register all RAF callbacks through one runtime-session frame authority.
- [ ] Fence callbacks after stop, failure, retry and disposal.
- [ ] Add import-purity, no-target, single-owner and failed-startup fixtures.

#### Gate 3: lifecycle and teardown
- [ ] Make `createGame()` return a root runtime-session owner.
- [ ] Retain and cancel every frame handle and listener.
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

#### Gate 7: grass spatial identity and backend truth
- [ ] Add stable grass chunk IDs, centers and world bounds.
- [ ] Cull against each chunk's committed bounds.
- [ ] Split capability, selected backend and executed backend identities.
- [ ] Keep CPU culling as the truthful default until a real GPU path exists.
- [ ] Publish accepted, visible and rendered counts separately.
- [ ] Add origin-crossing, return-path, backend-truth and first-visible-frame fixtures.

#### Gate 7a: world surface membership and consumer parity
- [ ] Version and fingerprint `WORLD.surface`.
- [ ] Add pure point and bounds membership queries.
- [ ] Return inside, edge, intersecting, outside and stale classifications.
- [ ] Route near and horizon admission through typed membership results.
- [ ] Route grass required-set construction through the same surface revision.
- [ ] Reject unsupported grass chunks before geometry creation.
- [ ] Add simulation boundary admission and one explicit response policy.
- [ ] Validate airstream routes, towns and delivery volumes against the surface.
- [ ] Publish per-consumer acknowledgements and mismatch reasons.
- [ ] Correlate the committed surface revision with the visible frame.
- [ ] Add pure classification, browser traversal and Pages parity fixtures.

## World-surface kit order

```txt
1. open-above-world-surface-descriptor-kit
2. open-above-world-surface-revision-kit
3. open-above-world-membership-query-kit
4. open-above-world-edge-distance-kit
5. open-above-world-boundary-policy-kit
6. open-above-surface-consumer-capability-kit
7. open-above-terrain-chunk-membership-kit
8. open-above-grass-chunk-membership-kit
9. open-above-route-content-membership-kit
10. open-above-simulation-boundary-admission-kit
11. open-above-boundary-response-result-kit
12. open-above-surface-consumer-parity-result-kit
13. open-above-stale-surface-result-rejection-kit
14. open-above-world-surface-observation-kit
15. open-above-visible-surface-frame-ack-kit
16. open-above-boundary-parity-fixture-kit
17. open-above-browser-boundary-traversal-smoke-kit
```

## Validation order

```txt
fixture:runtime-admission
fixture:balloon-kit-import-purity
fixture:single-active-frame-owner
fixture:runtime-lifecycle
fixture:clock-route-parity
fixture:product-acceptance
fixture:air-mail-route
fixture:air-mail-reset
fixture:observation-order
fixture:terrain-lod-classification
fixture:terrain-build-budget
fixture:grass-chunk-world-bounds
fixture:grass-cpu-backend-truth
fixture:surface-point-classification
fixture:surface-bounds-classification
fixture:terrain-grass-membership-parity
fixture:no-unsupported-visible-grass
fixture:balloon-boundary-response
fixture:surface-visible-frame-parity
npm run check
npm run headless:check
npm run build
browser acceptance smoke
Pages acceptance and boundary smoke
```

Do not claim a bounded world until simulation, terrain, grass and readback acknowledge the same committed surface revision and a browser traversal proves the selected boundary policy.