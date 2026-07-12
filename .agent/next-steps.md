# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-12T19-31-06-04-00`

## Plan ledger

**Goal:** implement one revisioned flora-exclusion artifact before vegetation streaming or world replacement can invalidate grass and flower placement.

### Gate 1: immutable runtime admission
- [ ] Pin Nexus Engine instead of importing `@main`.
- [ ] Validate module capabilities and publish a module-graph fingerprint.

### Gate 2: session, frame and failure ownership
- [ ] Own RAF, listeners and resources through one runtime session.
- [ ] Add fixed-step clock, sequenced input and stage failure containment.

### Gate 3: procedural world and flight authority
- [ ] Add `WorldBuildId`, world revision and immutable `WorldGridArtifact`.
- [ ] Admit flight proposals against the bounded world surface.
- [ ] Publish typed world/flight results and consumer receipts.

### Gate 4: vegetation ownership
- [ ] Replace boot-only global vegetation with generation-bound candidate sets.
- [ ] Build vegetation outside live scene ownership.
- [ ] Commit complete vegetation generations atomically or retain last-good state.
- [ ] Retire predecessor tree resources exactly once.

### Gate 5: flora-exclusion artifact authority
- [ ] Add `open-above-flora-exclusion-artifact-authority-domain`.
- [ ] Add vegetation generation, exclusion revision and policy fingerprints.
- [ ] Normalize tree records and cluster-proximity data into one immutable artifact.
- [ ] Make grass and flower adapters consume that artifact rather than private copies.
- [ ] Put grass and flower clearance differences in authored configuration.
- [ ] Bind every flora chunk to world, vegetation, exclusion and quality revisions.
- [ ] Generate grass and flower candidates outside live groups.
- [ ] Validate paired candidate results before adoption.
- [ ] Atomically adopt both consumers or preserve the complete last-good pair.
- [ ] Reject stale artifact and predecessor-generation results.
- [ ] Publish bounded observations, journal entries and `FloraExclusionVisibleFrameAck`.
- [ ] Pass overlap, removal, stale, rollback, browser and Pages fixtures.

### Gate 6: terrain and HDR coherence
- [ ] Commit near/horizon terrain and flora against one frame identity.
- [ ] Require HDR presentation to acknowledge the committed world/vegetation/flora set.

### Gate 7: map, accessibility and deployment
- [ ] Bind map projection to the same world and flight result.
- [ ] Fix marker bearing, route emphasis, mission semantics and focus behavior.
- [ ] Require source, build and Pages fingerprint parity.

## Flora implementation order

```txt
1. vegetation generation identity
2. authored exclusion policy
3. immutable tree/cluster spatial artifact
4. artifact fingerprint and revision
5. grass and flower consumer adapters
6. chunk input fingerprint
7. detached paired candidate results
8. atomic paired adoption and rollback
9. stale-result rejection and retirement receipts
10. visible-frame acknowledgement
11. source/build/Pages fixtures
```

## Recommended file cut

```txt
src/visual/flora-exclusion/
  flora-exclusion-artifact-domain.js
  flora-exclusion-policy-kit.js
  flora-exclusion-artifact-kit.js
  flora-exclusion-admission-kit.js
  flora-paired-adoption-kit.js
  flora-exclusion-observation-kit.js

src/visual/grass-field/
  grass-exclusion-adapter-kit.js

src/visual/flower-field/
  flower-exclusion-adapter-kit.js

tests/
  flora-exclusion-artifact.mjs
  flora-exclusion-replacement.mjs
  flora-exclusion-consumer-parity.mjs
```

## Compatibility constraint

Keep current seed behavior, grass species, flower types, density shaping, cull distances and visible style during the first cut. The first implementation should centralize identity, policy and adoption without redesigning flora art direction.