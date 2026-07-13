# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-12T21-18-18-04-00`

## Plan ledger

**Goal:** establish an immutable telemetry commit and public readback boundary before diagnostics, editor tooling or future gameplay consumers depend on Nexus resource values as authoritative evidence.

### Gate 1: immutable runtime admission
- [ ] Pin Nexus Engine instead of importing `@main`.
- [ ] Validate module capabilities and publish a module-graph fingerprint.

### Gate 2: session, frame and failure ownership
- [ ] Own RAF, listeners and resources through one runtime session.
- [ ] Add fixed-step clock, sequenced input and stage failure containment.

### Gate 3: telemetry snapshot immutability
- [ ] Add `open-above-telemetry-snapshot-immutability-authority-domain`.
- [ ] Add runtime session, frame, source revision and snapshot identity.
- [ ] Make every provider return a detached projection.
- [ ] Normalize arrays, objects and numeric values into one canonical schema.
- [ ] Derive complete and visual resources from one snapshot candidate.
- [ ] Detect and reject prohibited writable cross-resource aliasing.
- [ ] Calculate a deterministic content fingerprint.
- [ ] Deep-freeze committed resources or enforce explicit clone boundaries.
- [ ] Commit complete and visual resources atomically.
- [ ] Replace raw getters with revisioned immutable readback envelopes.
- [ ] Store detached journal metadata and fingerprints.
- [ ] Add consumer receipts and first-visible-frame acknowledgement.
- [ ] Pass mutation, alias, journal-integrity, browser and Pages fixtures.

### Gate 4: procedural world and flight authority
- [ ] Add `WorldBuildId`, world revision and immutable `WorldGridArtifact`.
- [ ] Admit flight proposals against the bounded world surface.
- [ ] Publish typed world/flight results and consumer receipts.

### Gate 5: terrain, vegetation and flora ownership
- [ ] Build terrain and vegetation candidates outside live scene ownership.
- [ ] Commit near/horizon terrain and vegetation generations atomically.
- [ ] Publish one immutable flora-exclusion artifact.
- [ ] Bind grass and flower chunks to world, vegetation, exclusion and quality revisions.
- [ ] Atomically adopt paired flora candidates or retain the last-good pair.

### Gate 6: HDR and visible-frame coherence
- [ ] Complete HDR attachment/resolution ownership and rollback.
- [ ] Bind telemetry, world, terrain, flora and HDR presentation to one frame identity.
- [ ] Reject false visible acknowledgements after render failure.

### Gate 7: map, accessibility and deployment
- [ ] Bind map projection to the same world, flight and telemetry result.
- [ ] Fix marker bearing, route emphasis, mission semantics and focus behavior.
- [ ] Require source, build and Pages fingerprint parity.

## Telemetry implementation order

```txt
1. snapshot schema and provider contracts
2. runtime session, frame and snapshot IDs
3. detached canonical builder
4. source revision collection
5. alias detection and normalization
6. content fingerprint
7. freeze or copy policy
8. atomic complete/visual resource commit
9. immutable public readback envelope
10. detached journal evidence
11. consumer receipts
12. first visible frame acknowledgement
13. source/build/Pages fixtures
```

## Recommended file cut

```txt
src/runtime/telemetry-snapshot/
  telemetry-snapshot-authority-domain.js
  telemetry-snapshot-builder-kit.js
  telemetry-normalization-kit.js
  telemetry-alias-detector-kit.js
  telemetry-content-fingerprint-kit.js
  telemetry-commit-kit.js
  telemetry-readback-envelope-kit.js
  telemetry-journal-kit.js

src/runtime/balloon-telemetry-kit.js
  adapt provider projections and typed commit result

tests/
  telemetry-snapshot-immutability.mjs
  telemetry-resource-alias.mjs
  telemetry-journal-integrity.mjs
  telemetry-visible-frame.mjs
```

## Compatibility constraint

Keep the current `engine.openAbove.getState()`, `getVisualState()` and `GameHost.getState()` field shapes during the first cut, but return immutable revisioned envelopes or detached compatibility projections. Do not silently change flight, mail, visual or map behavior while establishing ownership.
