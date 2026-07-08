# TheOpenAbove Balloon Route Result Boundary

**Timestamp:** `2026-07-08T15-09-42-04-00`

## Current gameplay loop

```txt
open app
  -> balloon starts above meadow
  -> player holds Space / W / ArrowUp for burner lift
  -> player holds S / ArrowDown / Shift for vent descent
  -> wheel changes camera zoom and near-basket blend
  -> wind moves the balloon horizontally
  -> buoyancy and vent update vertical velocity
  -> altitude is clamped above terrain clearance
  -> distance accumulates from horizontal movement
  -> HUD reports heat, camera mode, altitude, wind, drift distance, and Nexus marker
  -> GameHost exposes local and Nexus balloon telemetry
```

## Current gameplay authority

`src/main.js` owns gameplay authority inline:

```txt
keyboard input state
burnerPressed / ventPressed intent
burner smoothing
vent smoothing
wind angle and wind speed sampling
buoyancy calculation
altitude damping
ceiling softness
vertical velocity integration
wind velocity blend
position integration
terrain clearance clamp
altitude calculation
distance accumulation
camera blend
HUD projection
local snapshot
Nexus balloon telemetry tick
```

## Gameplay finding

The immediate missing gameplay layer is not a new mission system.

The missing layer is a route-result boundary that lets the current balloon route describe its own source, route objects, altitude bands, and wind lane hints before mission/progression reducers are added.

## Source-first route records

Add records in this order:

```txt
OPEN_ABOVE_PRODUCT
BALLOON_DRIFT
BalloonSourceFingerprint
BalloonSourceSnapshot
AltitudeBand
RouteObject
WindLaneHint
SourceAcceptanceResult
SourceAcceptanceLedger
GameHostSourceReadback
```

## Route result boundary after source proof

Only after source fixtures pass, add route result records:

```txt
RouteEventEnvelope
RouteEventResult
RouteEventRejectionReason
RouteEventJournal
RouteStateSnapshot
MissionSnapshot
ProgressionSnapshot
```

## First route objects to describe

```txt
lift-gate-01: low meadow lift lane
lift-gate-02: mid altitude wind lane
lift-gate-03: high drift lane
meadow-landing: low-speed safe landing zone
```

## First altitude bands to describe

```txt
low-clearance
comfort-drift
high-drift
ceiling-softness
meadow-landing
```

## First wind lane hints

```txt
burner to hold comfort band
vent to settle toward meadow landing
follow wind ribbon direction
avoid ceiling softness by venting before high drift
```

## Do not do yet

```txt
Do not add full route scoring yet.
Do not add Cloud Basin progression yet.
Do not add route reducer until source acceptance rows pass.
Do not remove legacy FLIGHT until source dependency proof exists.
Do not retune wind, buoyancy, burner, vent, clearance, ceiling, or camera values during this proof pass.
```