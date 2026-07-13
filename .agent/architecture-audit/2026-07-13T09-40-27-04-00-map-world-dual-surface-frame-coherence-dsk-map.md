# Architecture Audit: Map and World Dual-Surface Frame Coherence

## Summary

The product has two presentation schedulers but no shared presentation authority. The world canvas and parchment-map canvas can publish different logical instants, and map-open visibility can precede the first matching map draw.

## Plan ledger

**Goal:** place state capture, projection admission, surface commit, partial recovery and visible acknowledgement inside one bounded DSK.

- [x] Identify current producers and consumers.
- [x] Separate simulation truth from projection and browser scheduling.
- [x] Define command, envelope, result and acknowledgement boundaries.
- [x] Preserve Three.js and Canvas2D as adapters.
- [ ] Implement the authority and fixtures.

## Current ownership

```txt
src/main.js
  owns world RAF, simulation update, mail update, visual update and WebGL submission

parchment-map-overlay.js
  owns map RAF, map visibility, Canvas2D projection and key listener

simulation.state and mail.parcel
  mutable sources read directly by both host and map getters

GameHost.getState()
  captures a fresh aggregate without a committed surface pair
```

## Proposed bounded domain

```txt
open-above-map-world-dual-surface-frame-coherence-authority-domain
  owns frame-envelope identity
  owns flight/mail state revisions
  owns map transition generation
  owns required-surface policy
  owns world/map projection admission
  owns dual-surface commit result
  owns partial-frame recovery
  owns visible-frame acknowledgements
  owns bounded frame journal/readback
```

## DSK decomposition

```txt
state evidence
  open-above-flight-state-revision-kit
  open-above-mail-state-revision-kit
  open-above-dual-surface-frame-envelope-kit

transition admission
  open-above-map-open-transition-kit
  open-above-world-projection-command-kit
  open-above-map-projection-command-kit

projection results
  open-above-world-projection-result-kit
  open-above-map-projection-result-kit
  open-above-dual-surface-commit-kit

recovery and evidence
  open-above-partial-frame-recovery-kit
  open-above-map-first-frame-ack-kit
  open-above-world-map-readback-kit
  open-above-dual-surface-frame-journal-kit
  open-above-dual-surface-fixture-gate-kit
```

## Required invariants

```txt
one FrameEnvelopeId cites exactly one flight revision and mail revision
map opening does not become Accepted until its first matching map frame is visible
world and map projections cite the same envelope whenever both are required
stale map callbacks cannot commit after a newer transition generation
partial commits preserve or restore the last complete surface pair
GameHost exposes detached receipts, not mutable render owners
renderer adapters cannot create authoritative state
```

## Adapter boundary

Three.js, Canvas2D, `requestAnimationFrame`, DOM classes, `ResizeObserver` and browser key events remain adapters. They consume admitted plans and return typed results; they do not own frame truth.