# Architecture Audit: Fixed-Step Clock Authority DSK Map

**Timestamp:** `2026-07-11T00-49-45-04-00`

## Goal

Define the smallest composed clock and input boundary that separates authoritative simulation from browser render cadence before Meadow Lift objective authority is implemented.

## Current graph

```txt
requestAnimationFrame(now)
  -> frameMs = min(80, now - last)
  -> dt = min(1/30, frameMs / 1000)
  -> simulation.update(dt)
       -> poll private key Set
       -> elapsed += dt
       -> mutate wind/buoyancy/position/distance
  -> camera/visual/telemetry update once
  -> render and HUD once
```

## Current ownership

| Domain | Current owner | Service | Missing authority |
|---|---|---|---|
| Browser time | `src/main.js` | `performance.now()` delta | policy, suspension, overrun result |
| Simulation step | `src/main.js` | one clamped step per RAF | fixed ticks, accumulator, max substeps |
| Input state | simulation kit | mutable key Set | sequence, target tick, result |
| Physics | simulation kit | wind, buoyancy, movement | deterministic tick identity |
| Camera/render | camera and visual kits | smoothing and rendering | interpolation from committed ticks |
| Telemetry | telemetry kit | aggregate snapshot/event | render/tick/session correlation |
| Mission time | none | configured 300-second limit | committed mission clock |

## Proposed parent domain

```txt
open-above-runtime-clock-authority
```

Owns:

```txt
session clock identity
render-frame sequence
fixed simulation tick sequence
accumulator and fixed step
max substeps
overrun and dropped-backlog policy
visibility suspend/resume policy
input sample admission
committed simulation observation
bounded clock/input/tick journals
```

## Proposed child kits

```txt
open-above-runtime-clock-authority-kit
open-above-monotonic-time-adapter-kit
open-above-fixed-step-accumulator-kit
open-above-simulation-tick-kit
open-above-render-frame-kit
open-above-input-sample-buffer-kit
open-above-visibility-suspension-policy-kit
open-above-clock-overrun-result-kit
open-above-clock-observation-kit
open-above-clock-parity-fixture-kit
open-above-swept-objective-contact-kit
```

## Required composition

```txt
browser input event
  -> sequenced input sample
  -> next admissible simulation tick
  -> fixed tick reducer
  -> committed physical state
  -> clock/tick observation
  -> camera/render interpolation
  -> telemetry/HUD/GameHost projection
```

## Invariants

```txt
render cadence cannot change committed simulation results
each input sample is admitted at most once
simulation ticks are monotonic within a generation
renderFrameId and simulationTickId are distinct
hidden-tab behavior is explicit
dropped backlog is observable
mission elapsed advances only from committed ticks
restart creates a fresh clock generation
stale input and callbacks cannot cross generations
```

## Dependency order

```txt
immutable source admission
  -> import-pure modules
  -> root session lifecycle
  -> fixed-step clock authority
  -> Meadow Lift objective authority
```
