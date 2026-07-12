# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-12T17-41-25-04-00`

## Plan ledger

**Goal:** implement flight/world membership before extending world-edge content, while preserving existing runtime, world, terrain, vegetation, map and deployment dependency order.

### Gate 1: immutable runtime admission
- [ ] Pin Nexus Engine instead of importing `@main`.
- [ ] Validate module capabilities and publish a module-graph fingerprint.

### Gate 2: session, frame and failure ownership
- [ ] Own RAF, listeners and resources through one runtime session.
- [ ] Add fixed-step clock, sequenced input and stage failure containment.

### Gate 3: procedural world authority
- [ ] Add `WorldBuildId`, world revision and immutable `WorldGridArtifact`.
- [ ] Return typed samples and membership evidence with world fingerprints.

### Gate 4: flight/world membership authority
- [ ] Add `open-above-flight-world-membership-authority-domain`.
- [ ] Add command, frame, flight-state, world-surface and policy revisions.
- [ ] Construct detached motion proposals instead of mutating position first.
- [ ] Sample start and proposed points plus the swept segment.
- [ ] Author Accept, SoftReturn, Clamp, Reject and Terminal outcomes.
- [ ] Enforce finite vectors, dt limits and monotonic frame admission.
- [ ] Atomically commit accepted flight state and consumer frame evidence.
- [ ] Preserve predecessor state for Rejected, Failed and Stale.
- [ ] Collect receipts from mail, airstream, camera, terrain, vegetation, flora, map and HDR.
- [ ] Publish bounded observations, journal entries and `FlightBoundaryVisibleFrameAck`.
- [ ] Pass center, edge, outside, high-speed, stale and parity fixtures.

### Gate 5: terrain and vegetation ownership
- [ ] Build near/horizon and vegetation candidates outside live scene ownership.
- [ ] Commit complete generations atomically or preserve last-good state.
- [ ] Retire predecessor resources exactly once.

### Gate 6: world-consumer coherence
- [ ] Bind terrain, vegetation, grass, flowers, landmarks and map to one world artifact.
- [ ] Reject stale consumers after world replacement.

### Gate 7: map, accessibility and deployment
- [ ] Declare off-map behavior from the flight boundary result.
- [ ] Fix player-marker bearing and route emphasis.
- [ ] Restore semantic mission status and fatal focus.
- [ ] Require source, build and Pages boundary parity.

## Flight implementation order

```txt
1. pure world-surface revision and membership sample
2. detached flight position proposal
3. swept segment crossing evidence
4. configuration-backed boundary policy
5. typed FlightBoundaryResult
6. atomic flight/world-consumer commit
7. stale-result rejection
8. observations and bounded journal
9. visible-frame acknowledgement
10. source/build/Pages fixtures
```

## Recommended file cut

```txt
src/runtime/flight-world-membership-domain/
  index.js
  flight-frame-command-kit.js
  flight-position-proposal-kit.js
  flight-boundary-policy-kit.js
  flight-boundary-result-kit.js
  flight-world-frame-commit-kit.js
  flight-boundary-observation-kit.js

tests/
  flight-world-membership.mjs
  flight-boundary-high-speed.mjs
  flight-boundary-consumer-parity.mjs
```

## Compatibility constraint

Keep current controls, airstream forces, mail loop, camera behavior and map surface during the first cut. The first change should add explicit admission and results, not redesign flight feel.
