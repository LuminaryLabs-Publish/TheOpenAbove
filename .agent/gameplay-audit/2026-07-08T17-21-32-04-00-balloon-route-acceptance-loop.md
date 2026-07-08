# Gameplay Audit — Balloon Route Acceptance Loop

**Timestamp:** `2026-07-08T17-21-32-04-00`

## Current interaction loop

```txt
open route
  -> canvas and HUD mount
  -> src/main.js imports CAMPAIGN, WORLD, Three.js, NexusEngine, and hot-air-balloon object kit
  -> terrain, lakes, trees, clouds, wind ribbons, and balloon object are built
  -> keyboard input maps Space / W / ArrowUp to burner
  -> keyboard input maps S / ArrowDown / Shift to vent
  -> wheel input changes camera zoom and first-person blend
  -> update(dt) integrates burner, vent, wind, buoyancy, altitude, velocity, position, and distance
  -> draw(dt) updates camera and renders
  -> HUD writes telemetry
  -> GameHost exposes local and Nexus snapshots
```

## Current gameplay domains

```txt
balloon-input-map
burner-vent-intent
balloon-vehicle-state
balloon-drift-physics
wind-field
altitude-safety
ceiling-softness
camera-zoom-blend
first-person-visibility-gate
hud-telemetry
nexus-telemetry-kit
```

## Missing route authority

The route behaves like a game, but it does not yet expose source-owned route acceptance.

Missing source artifacts:

```txt
RouteObjectDescriptor
RouteObjectEvaluation
AltitudeBand
WindLaneHint
RouteAcceptanceResult
RouteAcceptanceLedger
MissionSnapshot
ProgressionSnapshot
```

## Recommended next loop

```txt
ActionFrame / current snapshot
  -> resolve altitude band
  -> evaluate route objects
  -> evaluate wind lane hints
  -> create RouteAcceptanceResult
  -> append SourceAcceptanceLedger row
  -> project GameHost source diagnostics
  -> preserve visible runtime behavior
```

## First route objects

```txt
lift_gate_01
lift_gate_02
lift_gate_03
meadow_landing
```

## First altitude bands

```txt
low_clearance
comfort_drift
high_drift
meadow_landing
```

## First wind-lane hints

```txt
follow_valley_wind
burner_to_climb_over_canopy
vent_to_descend_toward_meadow
scroll_to_basket_view
```

## Acceptance rules

```txt
Do not tune the balloon physics during the source acceptance pass.
Do not introduce win/lose states until route objects are source-owned.
Do not add Cloud Basin progression until MissionSnapshot exists.
Do not change the controls while adding fixture rows.
```

## Main finding

The active gameplay loop is the balloon drift route, not the old free-flight thermal/gate route. The next useful gameplay work is to make the balloon route fixture-readable with route objects, altitude bands, wind hints, and acceptance rows before adding new objectives.
