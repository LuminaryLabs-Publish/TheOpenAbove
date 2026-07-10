# Render Audit: Renderer Resource Disposal Coverage Gap

**Timestamp:** `2026-07-10T17-51-35-04-00`

## Current render ownership

`createVisualDomain()` constructs the scene, camera, renderer, terrain, vegetation, grass, landmarks, weather, sun, sky, clouds, aerial perspective, water, lens response, HDR composer, and dynamic-resolution controller.

The exposed `visual.dispose()` currently performs:

```txt
remove resize listener
grass.dispose()
terrain.dispose?.()
composer.dispose()
```

The composer then disposes its depth textures, initial render target, and internal composer when supported.

## Coverage gap

No route-level owner calls `visual.dispose()`. Even if it did, the visual domain does not explicitly coordinate disposal for every constructed subsystem.

Not explicitly disposed by the visual-domain teardown path:

```txt
THREE.WebGLRenderer
balloon object geometry/material tree
vegetation clusters
landmarks
weather map resources
sun/sky resources
volumetric cloud resources
aerial perspective resources
water resources
lens resources
dynamic-resolution controller state
scene graph references
```

Some of these may be lightweight, internally shared, or have no disposal method. The gap is that the route has no authoritative inventory proving which resources require disposal, which are intentionally retained, and which were actually released.

## Failure scenarios

```txt
route recreated during HMR
createGame called twice in one page
browser test mounts and unmounts repeatedly
startup throws after renderer/composer creation
page navigation occurs while frame callback remains queued
restart reuses canvas while prior WebGL context/resources remain live
```

## Required render-resource rows

```txt
resource-created
resource-registered
resource-retained
resource-dispose-requested
resource-disposed
resource-dispose-skipped
resource-dispose-unsupported
resource-dispose-failed
renderer-context-retained
renderer-context-lost
scene-detached
```

Each row should include:

```txt
sessionId
resourceId
ownerKit
resourceType
disposeOrder
status
reason
error
```

## Renderer policy

Default teardown should dispose renderer-owned GPU resources without forcing context loss unless the session is permanently destroyed. Restart on the same canvas needs a documented policy:

```txt
soft restart:
  cancel loop
  detach listeners
  dispose session-owned scene resources
  preserve canvas
  recreate renderer or explicitly reuse a proven-clean renderer

hard destroy:
  dispose renderer
  optionally force context loss
  clear GameHost references
```

## Fixture requirements

```txt
create one session
record baseline listener/frame/resource counts
dispose once
prove no queued frame advances state
dispose again
prove idempotent no-op result
create second session on the same host
prove exactly one active frame loop
prove old session state no longer changes
prove resource journal contains terminal result for every registered resource
```

## Main finding

The renderer is not the only disposal problem. The visual domain is a composition root for many GPU and scene resources, but it has no complete resource registry and its partial `dispose()` is never called by `src/main.js`. Render-resource lifecycle must be made observable before restart, HMR resilience, or repeated browser-fixture mounting can be trusted.
