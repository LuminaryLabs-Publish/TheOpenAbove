# Render Audit — GameHost Source Projection Readback

**Timestamp:** `2026-07-09T03-20-01-04-00`

## Visual/render surface

`TheOpenAbove` has a visual surface. The active render path is browser-only Three.js through `src/main.js`.

```txt
canvas#game
  -> THREE.WebGLRenderer
  -> scene background/fog/light
  -> terrain mesh vertex colors
  -> lake meshes
  -> procedural tree groups
  -> cloud groups
  -> wind ribbon lines
  -> hot-air-balloon object group
  -> perspective camera
  -> renderer.render(scene, camera)
```

## Render domains in use

```txt
three-render-host
scene-lighting
terrain-height-render
terrain-color-render
lake-surface-render
tree-scatter-render
cloud-scatter-render
wind-ribbon-render
hot-air-balloon-render
burner-animation-render
rigging-animation-render
camera-projection
first-person-visibility
hud-html-render
error-panel-render
gamehost-debug-projection
```

## Render readback gap

The current `GameHost.getState()` reports:

```txt
nexusEngine
local
```

It does not report:

```txt
source
source.fingerprint
source.acceptanceRows
source.objectKit
source.renderConsumers
source.browserReadback
source.compatibilityStatus
```

## Why this matters

The renderer itself does not need extraction yet. The missing proof is that the browser route can consume and expose the same source authority records that the DOM-free fixture uses.

## Next render-safe contract

```txt
SourceReadbackLedger
  -> GameHostSourceReadback
  -> window.GameHost.getState().source
  -> browser readback fixture
```

## Render non-goals

```txt
Do not change terrain geometry.
Do not change cloud meshes.
Do not retune camera values.
Do not alter rope fade or basket-view blend.
Do not change renderer pixel ratio, lighting, fog, or tone mapping.
```

## Acceptance rows

```txt
gamehost_source_exists
gamehost_source_reports_balloon_drift
gamehost_source_reports_object_kit
gamehost_source_reports_legacy_compatibility
gamehost_source_reports_acceptance_rows
gamehost_local_shape_preserved
gamehost_nexus_shape_preserved
```
