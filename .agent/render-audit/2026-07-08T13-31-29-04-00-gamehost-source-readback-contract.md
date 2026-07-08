# Render Audit — GameHost Source Readback Contract

**Timestamp:** `2026-07-08T13-31-29-04-00`

## Render surface

`TheOpenAbove` has a visual/render surface.

The active render route is:

```txt
index.html canvas#game
  -> src/main.js
  -> THREE.WebGLRenderer
  -> scene background/fog/lights
  -> procedural terrain mesh
  -> lake discs
  -> scatter tree groups
  -> cloud groups
  -> wind ribbon lines
  -> procedural hot-air-balloon object kit family
  -> basket-follow / first-person blend camera
  -> HUD DOM overlay
```

## Current readback

`window.GameHost.getState()` currently returns:

```txt
nexusEngine: engine.openAbove?.getState?.()
local: snapshot()
```

The local snapshot includes status, region, object type, elapsed, altitude, burner, vent, wind speed, distance, camera zoom, first-person blend, position, velocity, wind, and message.

## Missing render/source parity

The renderer proves that the balloon route runs, but it does not yet prove that the source route is authoritative.

Missing readbacks:

```txt
source.product.id
source.product.routeKind
source.product.objectType
source.copy.readmeMarker
source.copy.packageMarker
source.config.activeConfigId
source.config.compatibilityFlightMode
source.fingerprint.value
source.snapshot.routeTitle
source.snapshot.objectKitId
source.snapshot.burnerDefaults
source.snapshot.windDefaults
source.snapshot.cameraDefaults
source.acceptanceLedger.rows
source.routeObjects
source.altitudeBands
source.windLaneHints
source.fixtureStatus
```

## Required additive readback

The next implementation should extend, not replace, GameHost:

```js
window.GameHost.getState() -> {
  nexusEngine,
  local,
  source: {
    product,
    config,
    fingerprint,
    snapshot,
    acceptanceLedger,
    routeObjects,
    altitudeBands,
    windLaneHints,
    fixtureStatus
  }
}
```

## Frame-sensitive constants to preserve

The cutover must keep the current visible behavior stable while moving constants into source modules.

```txt
initial position: [0, 105, 0]
initial velocity: [8, 0, -10]
initial wind: [8, 0, -10]
initial burner: 0.22
initial vent: 0
camera zoom default: 44
camera zoom clamp: 0..92
first-person blend smoothstep: 4..24
terrain clearance: terrainHeight + 30
ceiling soft boundary: y > 270
vertical velocity clamp: -8..8
wind angle base: -0.86
wind speed base: 9.4
burner gain: 3.7
vent gain: 3.2
altitude damping: 0.74
baseline gravity term: 0.92
```

## Render acceptance rows

```txt
gamehost_reports_source_object
source_snapshot_reports_balloon_drift_route
source_snapshot_reports_hot_air_balloon_object
source_snapshot_reports_camera_zoom_defaults
source_snapshot_reports_burner_vent_defaults
source_snapshot_reports_wind_defaults
source_snapshot_reports_route_descriptors
source_snapshot_reports_altitude_bands
source_snapshot_reports_wind_lane_hints
existing_local_snapshot_shape_preserved
existing_nexus_snapshot_shape_preserved
```

## Stop line

Do not modify camera math, terrain shape, tree/cloud density, balloon visuals, or HUD layout in the source-readback pass.

Only add source diagnostics and fixture-readable mirrors.