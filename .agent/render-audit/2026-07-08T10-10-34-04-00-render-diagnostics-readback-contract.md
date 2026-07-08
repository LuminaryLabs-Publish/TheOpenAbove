# Render Audit — Render Diagnostics Readback Contract

**Timestamp:** `2026-07-08T10-10-34-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

## Summary

The live render surface is coherent and should be preserved. The problem is not visual priority; it is that render/source diagnostics are not yet fixture-readable outside the browser.

## Current render route

```txt
index.html
  -> canvas#game
  -> src/main.js
  -> Three.js WebGLRenderer
  -> terrain plane with vertex colors
  -> lake discs
  -> scattered tree groups
  -> cloud puff groups
  -> wind ribbon lines
  -> procedural hot-air-balloon object
  -> basket-follow / near-basket camera blend
  -> HUD DOM telemetry
  -> window.GameHost exposes renderer, camera, scene, balloon, and getState
```

## Render domains in use

```txt
three-render-host
renderer-size-and-pixel-ratio
shadow-map-policy
tone-mapping-policy
fog-and-sky-background
sun-and-hemisphere-lighting
terrain-geometry-rendering
terrain-vertex-coloring
lake-disc-rendering
tree-scatter-rendering
cloud-scatter-rendering
wind-ribbon-rendering
hot-air-balloon-object-rendering
balloon-rigging-opacity-gate
basket-follow-camera
near-basket-camera
camera-zoom-blend
hud-telemetry-rendering
error-panel-rendering
window-gamehost-render-debug
```

## Render services

```txt
create-scene
create-camera
create-renderer
set-pixel-ratio
set-shadow-map
set-tone-mapping
install-resize-handler
build-terrain-geometry
write-terrain-vertex-colors
build-lake-discs
scatter-tree-groups
build-cloud-groups
build-wind-ribbon-lines
build-hot-air-balloon
animate-hot-air-balloon
set-first-person-visibility
compute-basket-focus
compute-third-person-camera-position
compute-first-person-camera-position
blend-camera-position
render-scene-camera
write-hud-html
show-fatal-runtime-error
project-render-debug-state
```

## Render readback gap

```txt
The renderer is accessible through window.GameHost.renderer.
The camera is accessible through window.GameHost.camera.
The balloon object is accessible through window.GameHost.balloon.
The live state is accessible through window.GameHost.getState().local and .nexusEngine.
There is no dedicated render diagnostics snapshot.
There is no source/render parity result.
There is no fixture-readable camera frame record.
There is no fixture-readable HUD source record.
There is no readback proving the product source, drift config, and live HUD are aligned.
```

## Required diagnostic contract

```txt
RenderDiagnosticsSnapshot
  routeId
  productId
  objectType
  renderer
    type
    pixelRatioCap
    toneMapping
    toneMappingExposure
    shadowMapEnabled
  scene
    terrainSize
    terrainSegments
    treeCount
    cloudCount
    windRibbonCount
  camera
    mode
    zoom
    firstPersonBlend
    position
    lookTarget
  balloon
    objectKit
    subdomains
    burner
    vent
    altitude
    distance
  hud
    title
    statusLine
    telemetryFields
  source
    fingerprint
    snapshotVersion
    acceptanceStatus
```

## Integration rule

Do not make render diagnostics own gameplay truth.

The diagnostics should only report what the current render frame consumed from product source, drift state, camera state, and HUD projection.

## Next source files

```txt
src/source/render-diagnostics-snapshot.js
src/source/gamehost-source-diagnostics.js
src/main.js
```

## Fixture rows

```txt
render_diagnostics_reports_balloon_object_type
render_diagnostics_reports_camera_blend
render_diagnostics_reports_hud_product_title
render_diagnostics_reports_source_fingerprint
render_diagnostics_does_not_require_webgl_in_dom_free_fixture
```

## Stop condition

This render ledge is complete when a browser route still renders the same scene and a DOM-free fixture can inspect a stable diagnostics shape without creating a WebGLRenderer.