# Next Steps: TheOpenAbove Game-Audio Event Projection

**Last aligned:** `2026-07-15T22-00-36-04-00`  
**Status:** `game-audio-event-projection-authority-audited`

## Summary

The next work should add one browser-audio authority downstream of accepted flight and Air Mail results. Unlock, context ownership, cues, ambience, preferences, deduplication, budgets, lifecycle settlement, and audible-visible proof must land together as one bounded system.

## Plan ledger

**Goal:** add audible feedback and ambience without changing flight equations, delivery eligibility, camera behavior, map suspension, rendering, Core World composition, or deployment.

### Completed understanding

- [x] Confirm accepted state and one-shot delivery events already exist.
- [x] Confirm no runtime AudioContext, HTML audio owner, or imported audio provider.
- [x] Separate continuous flight layers from one-shot gameplay cues.
- [x] Define 22 planned audio authority surfaces.
- [x] Preserve the 101-surface architecture and service inventory.

### Gate 1: capability and identity

- [ ] Add `AudioCapabilityRevision`, `AudioPolicyRevision`, and `AudioGeneration`.
- [ ] Observe browser support without failing gameplay when audio is unavailable.
- [ ] Admit one context only after an accepted user gesture.
- [ ] Reject stale unlock callbacks and duplicate context creation.

### Gate 2: semantic events and descriptors

- [ ] Define stable semantic event IDs for burner, vent, airstream, map, contact, and delivery transitions.
- [ ] Define immutable cue and continuous-layer descriptors.
- [ ] Drive delivery only from the accepted `mail-delivered` result.
- [ ] Prevent RAF snapshots from replaying one-shot cues.

### Gate 3: continuous flight layers

- [ ] Add wind, burner, vent, rigging, basket, and airstream layers.
- [ ] Smooth parameters from accepted velocity, intensity, altitude, and route influence.
- [ ] Reuse nodes and sources instead of allocating per frame.
- [ ] Define map-open ducking or suspension policy.

### Gate 4: listener and spatial projection

- [ ] Bind listener position and orientation to accepted camera state.
- [ ] Bind world sources to revisioned source transforms.
- [ ] Clamp distance, rolloff, cone, and update rates.
- [ ] Preserve non-spatial UI and accessibility cues.

### Gate 5: preferences, buses, and budgets

- [ ] Add master, ambience, flight, world, and UI buses.
- [ ] Add bounded volume and mute preferences.
- [ ] Add cue deduplication and per-cue concurrency.
- [ ] Add global voice budget, priority, and eviction policy.

### Gate 6: lifecycle settlement

- [ ] Suspend or duck on map open according to policy.
- [ ] Suspend on blur or hidden state without replaying old cues on resume.
- [ ] Stop sources and retire nodes on pagehide, route replacement, runtime replacement, and disposal.
- [ ] Prove no loop or callback survives a retired generation.

### Gate 7: results and fixtures

- [ ] Publish `AudioUnlockResult`, `AudioProjectionResult`, and `AudioSessionSettlementResult`.
- [ ] Publish `FirstAudibleCueAck` and `FirstAudioVisualConvergenceAck`.
- [ ] Run local browser, build, artifact, and Pages fixture rows.
- [ ] Prove mute, unlock, cue-once, lifecycle, deduplication, and budget behavior.

## Recommended file cut

```txt
src/audio/
  game-audio-event-projection-authority-domain.js
  browser-audio-capability-observation-kit.js
  audio-gesture-admission-kit.js
  audio-context-lifecycle-kit.js
  semantic-audio-event-kit.js
  audio-cue-descriptor-registry-kit.js
  burner-vent-audio-cue-kit.js
  airstream-transition-audio-cue-kit.js
  mail-delivery-audio-cue-kit.js
  map-ui-audio-cue-kit.js
  flight-ambience-lifecycle-kit.js
  audio-listener-pose-projection-kit.js
  audio-spatial-source-projection-kit.js
  audio-preference-kit.js
  audio-bus-mixer-kit.js
  audio-cue-deduplication-kit.js
  audio-voice-pool-budget-kit.js
  audio-session-settlement-kit.js
  audio-projection-result-kit.js

tests/game-audio-browser-fixture.mjs
```

## Compatibility constraints

Preserve Three.js `0.165.0`, current balloon forces and smoothing, current keyboard bindings, camera bounds, map behavior, public `GameHost`, Core World composition, dynamic resolution, clouds, HDR, and Pages deployment.

## Retained next steps

Device-control action coverage, host-clock fixed steps, HDR depth-size coherence, cloud relative depth, ground-contact delivery eligibility, provider/build identity, route retirement, world adoption, terrain/vegetation proof, Air Mail history, and flight persistence remain open.

## Do not claim

Do not claim audible gameplay, unlock reliability, cue correctness, spatial correctness, lifecycle safety, artifact parity, deployed parity, or production readiness until the full fixture matrix passes.