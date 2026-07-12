# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-12T15-40-04-04-00`

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
- [ ] Return typed revisioned samples and membership results.
- [ ] Add build budgets, cancellation, replacement and consumer receipts.

#### Gate 4: terrain streaming ownership authority
- [ ] Add terrain stream/session/frame/chunk identities.
- [ ] Build near and horizon candidates outside live scene groups.
- [ ] Validate aggregate ownership and parity.
- [ ] Commit both consumers atomically or preserve last-good terrain.
- [ ] Retire predecessor resources exactly once.
- [ ] Publish `TerrainStreamCommitResult` and `TerrainVisibleFrameAck`.

#### Gate 5: vegetation spatial coverage authority
- [ ] Add `open-above-vegetation-spatial-coverage-authority-domain`.
- [ ] Extract current tree generation into a pure chunk-addressed candidate service.
- [ ] Add vegetation session, frame, chunk and render-generation identities.
- [ ] Bind plans to world, quality, schema and configuration fingerprints.
- [ ] Derive camera-relative near/transition/distant coverage requirements.
- [ ] Intersect requirements with explicit inside/edge/outside world membership.
- [ ] Derive stable per-chunk seeds independent of query order.
- [ ] Apply terrain, biome, route, town, lake and spacing exclusions.
- [ ] Enforce candidate, instance, memory and transition budgets.
- [ ] Build candidates and render resources outside live ownership.
- [ ] Atomically adopt complete required chunk sets.
- [ ] Preserve last-good chunks after candidate or adoption failure.
- [ ] Retire obsolete buffers, geometry, materials and registry entries exactly once.
- [ ] Publish a revisioned vegetation exclusion artifact for grass and flowers.
- [ ] Add coverage observations, bounded journal and `VegetationVisibleFrameAck`.

#### Gate 6: world-consumer coherence
- [ ] Bind terrain, vegetation, landmarks, grass, flowers and map to one world artifact.
- [ ] Attach world revision and fingerprint to every chunk and projection.
- [ ] Collect typed consumer adoption receipts.
- [ ] Reject stale consumers after world replacement.

#### Gate 7: grass and flower contract
- [ ] Make grass/flower exclusions consume the current vegetation registry.
- [ ] Name composition between world flora density and legacy biome density.
- [ ] Add chunk plan/result IDs and outside-world rejection counts.
- [ ] Validate center, edge and outside chunks.
- [ ] Add cold-build versus map-prewarmed parity.

#### Gate 8: map, accessibility and deployment
- [ ] Preserve map pause/input/focus/lifecycle authority.
- [ ] Fix player-marker bearing and declare coordinate conventions.
- [ ] Add route emphasis, content fit and off-map policy.
- [ ] Restore event-driven semantic mission status.
- [ ] Add fatal alert/focus transaction.
- [ ] Require source, built output and Pages world/terrain/vegetation parity.

## Vegetation implementation order

```txt
1. VegetationFrameId and canonical input fingerprint
2. stable chunk IDs and per-chunk seeds
3. pure detached candidate generation
4. world and exclusion admission
5. camera-relative coverage plan
6. work/instance/memory budget result
7. detached render-resource construction
8. atomic adoption or last-good preservation
9. exactly-once retirement and disposal
10. revisioned grass/flower exclusion registry
11. observations and bounded journal
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
fixture:vegetation-grass-flower-exclusion-generation-parity
fixture:vegetation-transition-budget
fixture:vegetation-visible-frame-ack
npm run check
npm run headless:check
npm run build
browser long-traversal matrix
built-output fingerprint parity
Pages vegetation traversal smoke
```