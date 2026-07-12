# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-12T13-29-56-04-00`

## Plan ledger

**Goal:** preserve the resolved terrain ownership partition while moving runtime, world, streaming, presentation and deployment behind explicit identities, typed results and proof gates.

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
- [ ] Add `open-above-terrain-streaming-ownership-authority-domain`.
- [ ] Allocate typed stream-session, frame and chunk-generation identities.
- [ ] Fingerprint world, quality, chunk, LOD, geometry and material inputs.
- [ ] Preserve the shared camera-relative near/horizon ownership plan.
- [ ] Build near and horizon candidate chunks outside live scene groups.
- [ ] Return typed per-chunk build results.
- [ ] Validate one aggregate ownership/parity result.
- [ ] Commit both consumer sets atomically.
- [ ] Preserve last-good terrain and roll back failed candidates.
- [ ] Retire predecessor geometry exactly once with receipts.
- [ ] Publish `TerrainStreamCommitResult` and `TerrainVisibleFrameAck`.

#### Gate 5: terrain transition performance
- [ ] Define per-frame planning and construction budgets.
- [ ] Record created, reused, retired, rejected and failed counts.
- [ ] Split heavy geometry construction across admitted work slices or workers if required.
- [ ] Add low/medium/high quality budget fixtures.

#### Gate 6: world-consumer coherence
- [ ] Bind terrain, vegetation, landmarks, grass, flowers and map to one world artifact.
- [ ] Attach world revision and fingerprint to every chunk/projection.
- [ ] Collect typed consumer adoption receipts.
- [ ] Reject stale chunks and map pixels after world replacement.

#### Gate 7: grass and flower contract
- [ ] Name composition between world flora density and legacy biome density.
- [ ] Add chunk plan/result IDs and outside-world rejection counts.
- [ ] Validate center, edge and outside chunks.
- [ ] Add cold-build versus map-prewarmed parity.

#### Gate 8: parchment map authority
- [ ] Preserve pause/input/focus/lifecycle work.
- [ ] Fix player-marker bearing and declare coordinate conventions.
- [ ] Add content fit, route emphasis and off-map policy.
- [ ] Make map background cite the active world revision.

#### Gate 9: accessibility and deployment
- [ ] Restore event-driven semantic mission status.
- [ ] Add fatal alert/focus transaction.
- [ ] Require source, built output and Pages terrain/world-frame parity.

## Terrain implementation order

```txt
1. TerrainStreamFrameId and input fingerprint
2. immutable near/horizon ownership plan
3. detached candidate chunk builder
4. per-chunk typed build results
5. aggregate parity admission
6. atomic near/horizon adoption
7. last-good rollback
8. exactly-once predecessor retirement
9. terrain commit observation and journal
10. first visible frame acknowledgement
```

## Validation order

```txt
fixture:terrain-frame-input-fingerprint
fixture:terrain-near-horizon-disjoint-ownership
fixture:terrain-candidate-complete-before-adoption
fixture:terrain-build-failure-preserves-last-good
fixture:terrain-aggregate-parity
fixture:terrain-retirement-exactly-once
fixture:terrain-boundary-transition-budget
fixture:terrain-visible-frame-ack
npm run check
npm run headless:check
npm run build
browser boundary matrix
built-output fingerprint parity
Pages terrain boundary smoke
```