# Architecture Audit: Parchment Map Pause and Input Authority DSK Map

**Timestamp:** `2026-07-12T08-50-32-04-00`  
**Repository revision:** `a5dd665a80cfe594ebaf05085633d4006e012b32`

## Summary

The map cutover introduced a new UI owner but did not introduce a domain that coordinates map state, gameplay pause, input context, focus, frame production, observation and lifecycle. The host currently infers pause by reading `mapOverlay.isOpen()` inside the main RAF.

## Plan ledger

**Goal:** establish a parent domain that admits map transitions and atomically coordinates every affected participant.

- [x] Trace current owner creation and callback registration.
- [x] Identify pause and input participants.
- [x] Identify projection, focus and lifecycle participants.
- [x] Define command, result, revision and acknowledgement contracts.
- [ ] Implement and validate the domain.

## Current ownership graph

```txt
src/main.js
  -> visual domain
  -> balloon model
  -> airstream domain
  -> mail-delivery domain
  -> balloon simulation
       -> global keydown/keyup/blur
       -> mutable keys Set
  -> parchment-map overlay
       -> global keydown
       -> ResizeObserver
       -> map RAF
       -> open Boolean
  -> camera rig
  -> presentation domain
  -> telemetry engine
  -> main RAF
```

The map is not a registered participant of a runtime-session, input-context or pause coordinator.

## Required parent domain

```txt
open-above-parchment-map-pause-input-authority-domain
```

## DSK composition

```txt
open-above-parchment-map-pause-input-authority-domain
  identity
    open-above-map-transition-id-kit
    open-above-map-generation-kit
    open-above-map-projection-revision-kit

  command and admission
    open-above-map-transition-command-kit
    open-above-map-transition-admission-kit
    open-above-map-open-close-result-kit

  pause transaction
    open-above-map-pause-participant-kit
    open-above-map-pause-barrier-kit
    open-above-map-pause-result-kit

  input isolation
    open-above-map-input-context-kit
    open-above-map-keyboard-scope-kit
    open-above-flight-input-suspension-kit
    open-above-flight-key-state-retirement-kit

  focus and semantics
    open-above-map-focus-lease-kit
    open-above-map-focus-result-kit

  projection and frame ownership
    open-above-map-frame-plan-kit
    open-above-map-world-source-fingerprint-kit
    open-above-map-render-loop-ownership-kit
    open-above-map-visible-frame-ack-kit

  observation and proof
    open-above-map-observation-kit
    open-above-map-journal-kit
    open-above-map-input-isolation-fixture-kit
    open-above-map-cadence-parity-fixture-kit
    open-above-map-focus-lifecycle-fixture-kit
    open-above-map-pages-smoke-kit
```

## Participant set

```txt
flight input
balloon simulation
mail progress
current sampling and visual update
balloon transform/animation
balloon presentation
camera rig
visual world update
Nexus telemetry
3D renderer
map renderer
focus/keyboard scope
runtime session lifecycle
public observation
```

## Open transaction

```txt
MapTransitionCommand
  requestedState: OPEN
  transitionId
  runtimeSessionId
  runtimeGeneration
  expectedMapGeneration
  expectedInputGeneration
  expectedSimulationRevision

admission
  -> reject duplicate transition by transitionId
  -> reject stale session/generation/revision
  -> validate map surface and content sources

prepare
  -> capture predecessor focus
  -> allocate map input context
  -> suspend gameplay command admission
  -> retire or explicitly preserve held-flight state by policy
  -> prepare immutable map frame plan
  -> collect pause-ready results from all participants

commit
  -> publish one pause revision
  -> publish one map generation and projection revision
  -> transfer focus
  -> start one map frame owner
  -> render first map frame
  -> publish MapOpenResult and frame acknowledgement
```

## Close transaction

```txt
MapTransitionCommand
  requestedState: CLOSED
  -> stop and retire map frame owner
  -> revoke map keyboard and focus leases
  -> reject map-generation input after close
  -> allocate a fresh gameplay input generation
  -> collect resume-ready results
  -> resume all participants at one revision
  -> render first resumed flight frame
  -> restore focus by policy
  -> publish MapCloseResult and frame acknowledgement
```

## Result schema

```txt
MapTransitionResult
  transitionId
  accepted
  previousState
  currentState
  runtimeSessionId
  runtimeGeneration
  mapGeneration
  pauseRevision
  inputGenerationBefore
  inputGenerationAfter
  projectionRevision
  focusResult
  participantResults[]
  firstVisibleFrameId
  rejectionReason
```

## Required invariants

```txt
map open/close is exactly once per transition ID
all participants observe the same pause revision
no gameplay input from the map input generation reaches flight
held-key policy is explicit and testable
only one map frame producer exists
map and resumed flight frames cite the committed transition
focus transfer is deterministic
replacement sessions reject predecessor callbacks
failed prepare leaves the prior state intact
failed commit produces a typed degraded result and no mixed state
```

## Dependency order

```txt
runtime session authority
  -> fixed-step/sequenced input authority
  -> parchment map pause/input authority
  -> committed observation/public host authority
  -> visible frame acknowledgement
```

The map domain must reuse the retained runtime-session, input, observation and frame-failure boundaries rather than duplicating them.