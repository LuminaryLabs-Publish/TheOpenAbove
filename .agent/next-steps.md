# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-12T15-31-24-04-00`

## Plan ledger

**Goal:** move runtime, world, terrain, vegetation, flora, presentation and deployment behind explicit identities, typed results and visible proof while preserving deterministic authored behavior.

### Checklist

#### Gate 1: immutable runtime admission
- [ ] Pin Nexus Engine instead of importing `@main`.
- [ ] Validate module capabilities before construction.
- [ ] Return typed boot results and a module-graph fingerprint.

#### Gate 2: session, frame and failure ownership
- [ ] Own RAF callbacks, listeners and resources through one runtime session.
- [ ] Add fixed-step clock, sequenced input and frame-stage failure containment.
- [ ] Revoke capabilities after failure, stop or replacement.

#### Gate 3: procedural world authority
- [ ] Add `WorldBuildId`, world revision and canonical input fingerprint.
- [ ] Commit an immutable `WorldGridArtifact`.
- [ ] Return typed revisioned world samples and membership results.
- [ ] Add build budgets, cancellation, replacement and consumer receipts.

#### Gate 4: terrain streaming ownership authority
- [ ] Add typed terrain stream/session/frame/chunk identities.
- [ ] Build near and horizon candidates outside live scene groups.
- [ ] Validate aggregate ownership/parity.
- [ ] Commit both consumers atomically or preserve last-good terrain.
- [ ] Retire predecessor resources exactly once.
- [ ] Publish `TerrainStreamCommitResult` and `TerrainVisibleFrameAck`.

#### Gate 5: vegetation spatial coverage authority
- [ ] Add `open-above-vegetation-spatial-coverage-authority-domain`.
- [ ] Extract the current tree candidate generator into a pure chunk-addressed service.
- [ ] Add vegetation session, frame and chunk IDs.
- [ ] Bind every plan to `WorldBuildId`, world fingerprint, quality revision and vegetation config fingerprint.
- [ ] Derive camera-relative near/transition coverage requirements.
- [ ] Intersect requirements with explicit inside/edge/outside world membership.
- [ ] Derive stable per-chunk seeds independent of query order.
- [ ] Apply terrain, route, town, lake, biome and spacing exclusions.
- [ ] Build candidate tree records and render resources outside live ownership.
- [ ] Enforce instance, allocation and transition budgets.
- [ ] Atomically adopt complete required chunk sets.
- [ ] Preserve last-good chunks on candidate failure.
- [ ] Retire obsolete buffers, geometry, materials and exclusion records exactly once.
- [ ] Publish a revisioned vegetation exclusion artifact for grass and flowers.
- [ ] Add coverage observations, journal and `VegetationVisibleFrameAck`.

#### Gate 6: terrain and vegetation transition performance
- [ ] Define per-frame planning and construction budgets.
- [ ] Record created, reused, retired, rejected and failed counts.
- [ ] Split heavy construction across admitted work slices or workers where required.
- [ ] Add low/medium/high quality budget fixtures.

#### Gate 7: world-consumer coherence
- [ ] Bind terrain, vegetation, landmarks, grass, flowers and map to one world artifact.
- [ ] Attach world revision and fingerprint to every chunk/projection.
- [ ] Collect typed consumer adoption receipts.
- [ ] Reject stale consumers after world replacement.

#### Gate 8: grass and flower contract
- [ ] Make grass/flower exclusions consume the current vegetation exclusion artifact.
- [ ] Name composition between world flora density and legacy biome density.
- [ ] Add chunk plan/result IDs and outside-world rejection counts.
- [ ] Validate center, edge and outside chunks.
- [ ] Add cold-build versus map-prewarmed parity.

#### Gate 9: parchment map authority
- [ ] Preserve pause/input/focus/lifecycle work.
- [ ] Fix player-marker bearing and declare coordinate conventions.
- [ ] Add content fit, route emphasis and off-map policy.
- [ ] Make map background cite the active world revision.

#### Gate 10: accessibility and deployment
- [ ] Restore event-driven semantic mission status.
- [ ] Add fatal alert/focus transaction.
- [ ] Require source, built output and Pages world/terrain/vegetation parity.

## Vegetation implementation order

```txt
1. VegetationFrameId and canonical input fingerprint
2. stable world-space chunk IDs and per-chunk seeds
3. pure detached candidate generation
4. explicit world and exclusion admission
5. camera-relative coverage plan
6. instance and transition budget result
7. detached render-resource construction
8. atomic chunk adoption or last-good preservation
9. exactly-once retirement and disposal
10. revisioned grass/flower exclusion artifact
11. vegetation observations and journal
12. first visible vegetation-frame acknowledgement
```

## Validation order

```txt
fixture:vegetation-chunk-id-determinism
fixture:vegetation-query-order-independence
fixture:vegetation-world-membership
fixture:vegetation-route-town-lake-exclusion
fixture:vegetation-adjacent-cell-continuity
fixture:vegetation-biome-treeless-classification
fixture:vegetation-candidate-complete-before-adoption
fixture:vegetation-build-failure-preserves-last-good
fixture:vegetation-retirement-exactly-once
fixture:vegetation-grass-exclusion-generation-parity
fixture:vegetation-transition-budget
fixture:vegetation-visible-frame-ack
npm run check
npm run headless:check
npm run build
browser long-traversal matrix
built-output fingerprint parity
Pages vegetation traversal smoke
```