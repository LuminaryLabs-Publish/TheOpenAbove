# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-13T09-40-27-04-00`

## Plan ledger

**Goal:** replace independent live-state rendering with one immutable world/map frame envelope, typed projection results, transition generations, partial-frame recovery and visible acknowledgements.

### Gate 1: revision authoritative state

- [ ] Add monotonic flight-state and mail-state revisions.
- [ ] Add a runtime-session and simulation-generation identity.
- [ ] Capture a detached `DualSurfaceFrameEnvelope` at one admitted boundary.
- [ ] Fingerprint the envelope and prevent renderer mutation.

### Gate 2: admit map visibility transitions

- [ ] Add `SetMapVisibilityCommand` and command IDs.
- [ ] Add expected `MapTransitionGeneration`.
- [ ] Represent Closed, Opening, Open, Closing, Failed and Retired explicitly.
- [ ] Reject stale, duplicate and retired commands with zero DOM or scheduler mutation.

### Gate 3: separate projection from truth

- [ ] Make world and map renderers consume the same envelope.
- [ ] Remove live simulation and parcel getters from map drawing.
- [ ] Return typed `WorldProjectionResult` and `MapProjectionResult`.
- [ ] Record viewport, surface and render generations.

### Gate 4: commit required surfaces

- [ ] Add one `DualSurfaceCommitId`.
- [ ] Require world-only completion while the map is closed.
- [ ] Require matching world and map projections while the map is open.
- [ ] Classify Complete, Partial, Failed, Stale, Superseded and Cancelled.
- [ ] Preserve the last complete frame on partial failure.

### Gate 5: first visible map frame

- [ ] Do not report map-open acceptance from the CSS class alone.
- [ ] Prepare or draw the accepted first map frame before visible success.
- [ ] Add `FirstCoherentMapFrameAck`.
- [ ] Correlate the acknowledgement with frame envelope and transition generation.
- [ ] Preserve current focus and accessibility semantics.

### Gate 6: scheduler and lifecycle fencing

- [ ] Give world and map RAF chains explicit scheduler generations.
- [ ] Reject stale callbacks after rapid open/close transitions.
- [ ] Retire callbacks, observers and listeners exactly once.
- [ ] Integrate terminal host lifecycle and BFCache policy.

### Gate 7: public evidence

- [ ] Publish detached dual-surface receipts through telemetry.
- [ ] Replace raw mutable surface readback with bounded `GameHost` observations.
- [ ] Add a bounded frame journal.
- [ ] Include map marker and world render fingerprints.

### Gate 8: proof

- [ ] Add immutable envelope and duplicate/stale pure-domain fixtures.
- [ ] Add first-map-frame-not-blank browser fixture.
- [ ] Add player and destination marker revision fixtures.
- [ ] Add rapid M/Escape stale-callback fixture.
- [ ] Add resize-generation fixture.
- [ ] Add partial map/world failure recovery fixtures.
- [ ] Add source, dist and Pages parity fixtures.

## Implementation order

```txt
1. flight/mail revisions and immutable frame envelope
2. map transition command and generation
3. projection commands and results
4. required-surface commit policy
5. first coherent map frame acknowledgement
6. scheduler and lifecycle fencing
7. telemetry and GameHost receipts
8. pure/browser/build/Pages fixtures
```

## Recommended file cut

```txt
src/runtime/presentation/
  dual-surface-frame-envelope-kit.js
  map-world-dual-surface-frame-coherence-authority-domain.js
  dual-surface-commit-kit.js
  partial-frame-recovery-kit.js

src/ui/
  parchment-map-overlay.js
  map-open-transition-kit.js
  map-projection-result-kit.js

src/visual/
  world-projection-result-kit.js

src/main.js
  capture and submit one immutable frame envelope

tests/
  dual-surface-frame-domain.mjs
  map-first-frame.browser.mjs
  map-world-parity.browser.mjs
```

## Compatibility constraints

Preserve current controls, map art, pause behavior, Air Mail route, Three.js version, visual quality and telemetry schema during the first authority cut. Do not combine this work with provider admission, delivery progression or persistence implementation.

## Current documentation state

Repo-local documentation is aligned through the `2026-07-13T09-40-27-04-00` map/world dual-surface frame-coherence audit family.