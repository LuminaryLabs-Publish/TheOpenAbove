# Gameplay Audit — Balloon Drift Source Authority Loop

**Timestamp:** `2026-07-09T09-29-24-04-00`

## Current gameplay identity

```txt
TheOpenAbove = hot-air-balloon Balloon Drift route
```

The visible loop is not the old bird/free-flight loop implied by some source fields. It is a slow balloon drift experience with burner lift, vent descent, wind-driven movement, altitude safety, and scrollable basket camera blend.

## Current interaction loop

```txt
open app
  -> route loads hot-air-balloon object
  -> hold Space / W / ArrowUp for burner lift
  -> hold S / ArrowDown / Shift for vent descent
  -> scroll wheel changes camera zoom and basket-view blend
  -> wind field changes direction and speed over time
  -> buoyancy and damping integrate vertical movement
  -> ceiling softness reduces high altitude climb
  -> terrain clearance prevents ground penetration
  -> distance accumulates from horizontal drift
  -> HUD reports burner mode, camera mode, altitude, wind, and drift distance
```

## Gameplay domains

```txt
input-command-map
burner-intent
vent-intent
wind-field
balloon-drift-state
buoyancy-integration
altitude-safety
terrain-clearance
camera-zoom-blend
basket-camera-mode
hud-telemetry
nexus-telemetry
local-snapshot-readback
```

## Gameplay services

```txt
keydown/keyup/blur handlers maintain active key set.
wheel handler maps scroll to camera.userData.zoom.
update(dt) converts input state to burner and vent values.
update(dt) evolves wind angle and speed.
update(dt) integrates verticalVelocity and velocity.
update(dt) clamps altitude against terrain clearance.
draw(dt) projects third-person and first-person basket camera states.
updateHud() projects readable player feedback.
snapshot() returns gameplay state for GameHost and Nexus telemetry.
```

## Gameplay kits identified

```txt
implemented:
  open-above-balloon-telemetry-kit
  open-above-hot-air-balloon-object-kit

inline candidates:
  open-above-balloon-input-map-kit
  open-above-burner-vent-intent-kit
  open-above-wind-field-kit
  open-above-balloon-drift-physics-kit
  open-above-altitude-safety-kit
  open-above-terrain-clearance-kit
  open-above-camera-zoom-blend-kit
  open-above-basket-camera-kit
  open-above-hud-telemetry-kit

next-cut proof kits:
  open-above-balloon-drift-config-kit
  open-above-runtime-constant-parity-kit
  open-above-altitude-band-contract-kit
  open-above-source-snapshot-kit
  open-above-gamehost-source-readback-kit
  open-above-dom-free-source-fixture-kit
```

## Source authority problem

Gameplay facts exist in `src/main.js`, but durable source still appears in multiple places:

```txt
package.json description says free-flight exploration.
src/data/campaign.config.js includes thermal, gate, perch, and FLIGHT fields.
index.html and HUD expose the Balloon Drift route.
src/main.js owns actual drift constants and camera behavior.
```

## Gameplay finding

Do not add objectives, gates, thermals, Cloud Basin, fail states, landing states, or new progression before the current Balloon Drift constants and source identity have a DOM-free fixture and GameHost source readback.
