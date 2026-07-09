# Gameplay Audit — Balloon Drift Source Authority Loop

**Timestamp:** `2026-07-09T15-09-09-04-00`

## Active gameplay loop

```txt
player opens route
  -> balloon starts drifting over meadow terrain
  -> Space / W / ArrowUp increases burner heat
  -> S / ArrowDown / Shift opens vent descent
  -> wheel moves between third-person and basket view
  -> wind direction and speed change over time
  -> buoyancy, damping, ceiling softness, and ground clearance update altitude
  -> balloon motion accumulates drift distance
  -> HUD reports current message, burner/coasting state, camera mode, altitude, wind, drift, and NexusEngine telemetry
```

## Current gameplay authority

The real gameplay is Balloon Drift.

```txt
src/main.js owns:
  burner input
  vent input
  wind angle and speed
  buoyancy integration
  altitude floor and soft ceiling
  drift distance
  camera zoom and first-person blend
  HUD route copy
  local snapshot
```

## Stale gameplay source

```txt
README.md owns old free-flight controls and mission copy.
src/data/campaign.config.js owns thermal/gate/perch/free-flight fields.
package.json owns old free-flight description.
```

## Gameplay domains

```txt
burner-vent-intent
wind-field
buoyancy-integration
altitude-safety
ceiling-softness
drift-distance
basket-camera-mode
hud-telemetry
legacy-flight-compatibility
source-authority-projection
```

## Gameplay kits

```txt
implemented gameplay-adjacent:
  open-above-balloon-telemetry-kit
  open-above-hot-air-balloon-object-kit
  open-above-hot-air-balloon-burner-kit
  open-above-hot-air-balloon-rigging-kit

next gameplay proof kits:
  open-above-balloon-drift-config-kit
  open-above-legacy-flight-compatibility-kit
  open-above-runtime-constant-parity-kit
  open-above-altitude-band-contract-kit
  open-above-source-snapshot-kit
  open-above-source-acceptance-ledger-kit
```

## Main gameplay finding

Do not add route progression, Cloud Basin, landing objectives, checkpoints, or new wind gates until current Balloon Drift authority is explicit.

The safe gameplay improvement is proof-oriented: source records should tell agents which route, controls, and movement constants are current versus compatibility-only.
