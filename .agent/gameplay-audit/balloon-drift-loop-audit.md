# Gameplay Audit — Balloon Drift Loop

**Timestamp:** `2026-07-08T03:21:22-04:00`

## Current player loop

```txt
start in balloon
  -> read HUD
  -> hold burner input to rise
  -> hold vent input to descend
  -> wind pushes balloon across valley
  -> manage altitude above terrain
  -> use camera wheel to shift view
  -> keep drifting while telemetry updates
```

## Current input map

```txt
Space / W / ArrowUp       burner lift
S / ArrowDown / Shift     vent descent
Mouse wheel               camera zoom / near-basket blend
Blur                      clears active keys
```

## Current state fields

```txt
position
velocity
wind
verticalVelocity
altitude
burner
vent
elapsed
distance
message
```

## Current gameplay authority location

Most gameplay authority lives inline in `src/main.js`.

The current runtime directly smooths burner/vent state, samples wind, integrates velocity/position, clamps terrain clearance, updates camera, writes HUD, and produces snapshots.

## Missing gameplay contracts

```txt
BalloonInputFrame
BalloonDriftConfig
AltitudeBand
RouteObject
RouteEventResult
RouteEventJournal
RouteState
MissionSnapshot
ProgressionSnapshot
FixtureReplaySnapshot
```

## Target loop

```txt
browser / fixture input
  -> BalloonInputFrame
  -> balloon drift reducer
  -> altitude band resolver
  -> route object evaluator
  -> RouteEventResult journal
  -> mission reducer
  -> progression reducer
  -> mission snapshot
  -> GameHost diagnostics
  -> renderer/HUD consume projections
```

## Acceptance criteria for next gameplay pass

```txt
game remains visually unchanged
burner and vent still feel the same
route object descriptors exist
altitude band descriptors exist
route event results are accepted/rejected with stable reasons
mission snapshot is visible through GameHost
DOM-free route fixture can replay a short balloon path
smoke proves docs/config/runtime markers agree on balloon-drift authority
```
