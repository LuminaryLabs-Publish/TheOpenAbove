# Audio Audit: Browser Unlock, Flight Ambience, and Cue Lifecycle

**Timestamp:** `2026-07-15T22-00-36-04-00`  
**Status:** `game-audio-event-projection-authority-audited`

## Summary

The product has no browser-audio owner. A safe implementation needs explicit user-gesture admission, one context generation, result-driven cues, controlled continuous layers, user preferences, bounded voices, and deterministic retirement.

## Plan ledger

**Goal:** define the smallest complete browser-audio contract for TheOpenAbove before any sound assets or synthesis are introduced.

- [x] Confirm no current runtime AudioContext or HTML audio owner.
- [x] Identify accepted cue sources.
- [x] Separate one-shot cues from continuous ambience.
- [x] Define preferences, buses, deduplication, and budgets.
- [x] Define pause, hide, pagehide, and route settlement.
- [ ] Implement and prove the contract.

## Unlock contract

```txt
observe AudioContext capability
  -> wait for an accepted player gesture
  -> create or resume one AudioGeneration
  -> publish AudioUnlockResult
  -> reject stale unlock callbacks
  -> keep gameplay operable when audio is unsupported or declined
```

## Bus model

```txt
master
  -> ambience
  -> flight
  -> world
  -> UI
```

Each bus requires volume, mute, effective gain, and revision readback. Preferences must be bounded and persist independently from simulation state.

## Cue policy

```txt
one-shot:
  airstream entry and exit
  route change
  ground contact transition
  map open and close
  mail delivered

continuous:
  wind
  burner
  vent
  rigging and basket
  airstream bed
```

## Lifecycle policy

```txt
map open: suspend or duck flight layers by declared policy
blur or hidden: suspend context and freeze new cue admission
resume: rebase continuous layers without replaying old one-shots
pagehide or route replacement: stop sources release nodes and retire generation
runtime replacement: ignore callbacks from prior generation
```

## Budget policy

```txt
bounded global voices
bounded per-cue concurrency
priority ordering
oldest or quietest eviction policy
spatial source pooling
no per-frame node creation for continuous layers
```

## Required acknowledgements

```txt
AudioUnlockResult
AudioProjectionResult
AudioSessionSettlementResult
FirstAudibleCueAck
FirstAudioVisualConvergenceAck
```

## Validation boundary

No browser context was created and no sound was generated. This is a source-backed contract audit only.