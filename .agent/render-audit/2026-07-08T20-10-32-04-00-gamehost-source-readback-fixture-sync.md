# Render Audit — GameHost Source Readback Fixture Sync

**Timestamp:** `2026-07-08T20-10-32-04-00`

## Render surface

The repo has a visual/render surface.

Current render path:

```txt
src/main.js
  -> WebGLRenderer({ canvas, antialias, powerPreference })
  -> ACES tone mapping
  -> directional + hemisphere light
  -> terrain / lakes / trees / clouds / wind ribbons
  -> hot-air-balloon object kit
  -> camera blend between third-person and basket view
  -> renderer.render(scene, camera)
  -> HUD DOM text
  -> window.GameHost renderer/camera/scene/balloon handles
```

## Current render-readback shape

`window.GameHost` currently exposes direct render handles and `getState()` returns:

```txt
{
  nexusEngine: engine.openAbove?.getState?.(),
  local: snapshot()
}
```

The current local snapshot includes status, region, objectType, elapsed, altitude, burner, vent, windSpeed, distance, cameraZoom, firstPersonBlend, position, velocity, wind, and message.

## Render proof gap

The renderer is visually stable but source-readback poor:

```txt
GameHost does not expose source fingerprint.
GameHost does not expose source snapshot.
GameHost does not expose source manifest ID.
GameHost does not expose product/config/runtime parity.
GameHost does not expose route object/altitude band/wind hint descriptors.
HUD text is hot-air-balloon drift, but source modules do not prove it.
README/package/campaign source still partially point at the older free-flight route.
```

## Additive readback target

Add `window.GameHost.getState().source` after pure source fixtures exist.

Target shape:

```txt
source: {
  product,
  driftConfig,
  sourceManifest,
  fingerprint,
  snapshot,
  acceptanceLedger,
  routeObjects,
  altitudeBands,
  windLaneHints,
  fixtureStatus,
  preservedShapes: {
    hasLocalSnapshot: true,
    hasNexusEngineSnapshot: true
  }
}
```

## Fixture rows

```txt
gamehost_reports_balloon_source_snapshot
existing_local_snapshot_shape_preserved
existing_nexus_snapshot_shape_preserved
source_snapshot_reports_visual_object_kit
source_fingerprint_reports_copy_config_runtime_markers
source_manifest_lists_all_runtime_consumers
```

## Non-goals for the next implementation

```txt
Do not change renderer tone mapping.
Do not retune fog or lights.
Do not rebuild terrain, lakes, trees, clouds, or wind ribbons.
Do not replace the hot-air-balloon object kit.
Do not change camera feel.
Do not move HUD rendering until source readback is fixture-proven.
```

## Decision

The next render-adjacent work should be readback/proof only: expose source authority through GameHost while preserving current visuals and local/nexus telemetry shapes.
