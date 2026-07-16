# Architecture Audit: Game-Audio Event Projection DSK Map

**Timestamp:** `2026-07-15T22-00-36-04-00`  
**Status:** `game-audio-event-projection-authority-audited`

## Summary

The current composition owns accepted flight, airstream, map, delivery, camera, world, and render state but has no domain that converts accepted semantic results into lifecycle-safe browser audio.

## Plan ledger

**Goal:** place audio downstream of accepted domain results and upstream of browser effects while keeping simulation, rendering, and UI authority unchanged.

- [x] Preserve all 101 implemented surfaces.
- [x] Keep balloon simulation authoritative for flight state.
- [x] Keep Air Mail authoritative for delivery settlement.
- [x] Keep camera and map domains authoritative for listener and suspension context.
- [x] Define one audio parent domain and 21 child/support surfaces.
- [ ] Implement command, result, lifecycle, and proof contracts.

## Existing domain flow

```txt
keyboard input
  -> balloon simulation
  -> airstream and terrain contact
  -> Air Mail delivery settlement
  -> camera and map state
  -> visual domain and telemetry
```

## Required composition

```txt
accepted simulation and gameplay results
  -> open-above-game-audio-event-projection-authority-domain
     -> capability and gesture admission
     -> context lifecycle
     -> semantic event normalization
     -> cue descriptor resolution
     -> listener and source projection
     -> buses preferences deduplication and budgets
     -> browser audio effects
     -> typed results and frame acknowledgements
```

## Parent contract

```txt
AudioProjectionAdmissionCommand {
  documentRevision
  runtimeRevision
  flightRevision
  eventRevision
  cameraRevision
  mapRevision
  audioPolicyRevision
}

AudioProjectionResult {
  commandId
  audioGeneration
  acceptedCueIds
  rejectedCueIds
  ambienceState
  contextState
  reason
}
```

## Planned surfaces

```txt
open-above-game-audio-event-projection-authority-domain
open-above-browser-audio-capability-observation-kit
open-above-audio-gesture-admission-kit
open-above-audio-context-lifecycle-kit
open-above-semantic-audio-event-kit
open-above-audio-cue-descriptor-registry-kit
open-above-burner-vent-audio-cue-kit
open-above-airstream-transition-audio-cue-kit
open-above-mail-delivery-audio-cue-kit
open-above-map-ui-audio-cue-kit
open-above-flight-ambience-lifecycle-kit
open-above-audio-listener-pose-projection-kit
open-above-audio-spatial-source-projection-kit
open-above-audio-preference-kit
open-above-audio-bus-mixer-kit
open-above-audio-cue-deduplication-kit
open-above-audio-voice-pool-budget-kit
open-above-audio-session-settlement-kit
open-above-audio-projection-result-kit
open-above-first-audible-cue-ack-kit
open-above-first-audiovisual-convergence-ack-kit
open-above-game-audio-browser-fixture-kit
```

## Ownership rules

```txt
raw key state does not imply audible success
burner and vent cues read accepted simulation levels
route cues read accepted airstream transition results
mail delivery cue reads the one-shot mail-delivered result
map cues read accepted map transitions
ambience reads accepted flight and lifecycle state
render callbacks may update listener transforms but may not invent gameplay cues
```

## Validation boundary

This is a documentation-only architecture map. No audio domain, runtime effect, or executable proof was implemented.