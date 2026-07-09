# Gameplay Audit — Balloon Drift Source Authority Loop

**Timestamp:** `2026-07-09T09-36-24-04-00`

## Current gameplay loop

```txt
player opens route
  -> balloon starts at position [0,105,0]
  -> ambient wind drifts the balloon
  -> Space/W/ArrowUp warms burner
  -> S/ArrowDown/Shift opens vent
  -> wheel moves between third-person and basket-view camera
  -> altitude safety clamps against terrain clearance
  -> soft ceiling reduces climb above high altitude
  -> balloon visual sways, bobs, and animates burner/rigging
  -> HUD reports burner/camera/altitude/wind/distance
```

## Gameplay domains in use

```txt
balloon input map
burner intent
vent intent
wind drift
buoyancy integration
altitude safety
ceiling softness
distance accumulation
basket camera blend
first-person visibility
hot-air-balloon animation
NexusEngine telemetry
HUD telemetry
```

## Gameplay source mismatch

```txt
README controls describe pitch/bank/boost/restart.
package description says standalone free-flight exploration.
campaign config describes thermals, gates, perch return, and Cloud Basin unlock.
current runtime uses burner/vent/wheel drift and no active thermal/gate/perch gameplay loop.
```

## Gameplay proof needed next

```txt
source snapshot identifies current route as balloon-drift.
legacy flight config is marked compatibility-only.
readme/package/campaign consumers are each named in the source consumer manifest.
fixture rows prove which source surfaces match and which are intentionally legacy.
GameHost exposes source diagnostics without changing local/nexusEngine snapshot shape.
```

## Do not do next

```txt
Do not add Cloud Basin.
Do not add mission progression.
Do not restore bird/free-flight controls.
Do not retune balloon drift physics.
Do not change balloon visual composition.
```