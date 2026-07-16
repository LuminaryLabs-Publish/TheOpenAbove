# Interaction Audit: Audio Projection Command and Result Map

**Timestamp:** `2026-07-15T22-00-36-04-00`  
**Status:** `game-audio-event-projection-authority-audited`

## Summary

Current input handlers mutate flight, camera, and map state directly. Audio must consume accepted simulation and gameplay results, not treat raw key or wheel activity as proof that a cue should play.

## Plan ledger

**Goal:** define command and result boundaries for browser unlock, semantic cue admission, ambience state, lifecycle settlement, and audible-visible proof.

- [x] Separate raw input from accepted gameplay state.
- [x] Identify stable delivery and map transitions.
- [x] Define audio admission and settlement results.
- [x] Define duplicate and stale rejection.
- [ ] Implement commands and executable fixtures.

## Command map

```txt
AudioUnlockCommand
  source: accepted user gesture
  result: AudioUnlockResult

AudioProjectionAdmissionCommand
  source: accepted flight event state or UI transition
  result: AudioProjectionResult

AudioPreferenceCommand
  source: accepted settings action
  result: AudioPreferenceResult

AudioSessionSettlementCommand
  source: map pause blur visibility pagehide route replacement or disposal
  result: AudioSessionSettlementResult
```

## Admission rules

```txt
raw keydown does not emit a burner cue
accepted burner threshold transition may emit a cue
raw position does not emit a delivery cue
accepted mail-delivered result may emit exactly one cue
RAF snapshots do not replay one-shot cues
map visibility transition may emit one UI cue
muted or suspended generations reject effects with a typed reason
retired callbacks cannot resume loops
```

## Result reasons

```txt
accepted
muted
context-locked
unsupported
stale
duplicate
budget-rejected
suspended
superseded
retired
```

## Proof chain

```txt
source event revision
  -> AudioProjectionResult
  -> browser effect receipt
  -> FirstAudibleCueAck
  -> matching visual frame receipt
  -> FirstAudioVisualConvergenceAck
```

## Validation boundary

This file defines the required interaction contract only. No runtime command or browser effect was added.