# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-11T18-01-38-04-00`

## Status

```txt
status: grass-spatial-culling-backend-truth-authority-audited
runtime source changed by this pass: no
branch: main
root .agent state: refreshed
central ledger sync: pending until repo-local documentation head is known
central internal change log: pending until repo-local documentation head is known
```

## Summary

The active grass stack correctly generates deterministic camera-centered chunks. Candidate and instance transforms use absolute world coordinates, but each chunk `InstancedMesh` remains at the default scene origin. The per-frame manual culling pass uses `camera.position.distanceTo(mesh.position)`, so all active chunks share one camera-to-origin distance.

The cull threshold is `520 * 4.2 = 2184 m`. Beyond that camera radius, every newly rebuilt grass chunk can remain invisible even when it surrounds the camera and contains accepted instances. The culling kit also labels capable browsers `webgpu-compute` without creating a GPU pipeline or dispatching work.

## Plan ledger

**Goal:** define one grass spatial-culling authority that keeps camera center, chunk bounds, LOD, backend execution, visible-set commit and rendered-frame observation aligned.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove` under the oldest eligible fallback rule.
- [x] Read current root `.agent` state and retained grass/render audits.
- [x] Read grass seed, biome, exclusion, placement, LOD, culling and field-domain sources.
- [x] Read visual-domain frame order and existing smoke assertions.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Trace camera-centered chunk rebuild and origin-based manual culling.
- [x] Record the backend capability/execution mismatch.
- [x] Define chunk identity, bounds, policy, backend, decision, commit, observation and fixture contracts.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root `.agent` files.
- [ ] Synchronize the central ledger and internal change log after the repo-local head is known.
- [ ] Runtime implementation and executable grass fixtures remain future work.

## Interaction loop

```txt
browser boot
  -> visual domain
  -> terrain surface
  -> grass field domain

first and center-change updates
  -> round camera x/z to 520 m chunk coordinates
  -> classify required offsets by chunk distance and quality
  -> generate deterministic candidates in absolute world space
  -> create one InstancedMesh per chunk
  -> encode absolute transforms in instance matrices
  -> leave each mesh object at global origin

all visual updates
  -> compute camera distance to each mesh.position
  -> every mesh.position is 0,0,0
  -> culling helper returns one origin-based Boolean per chunk
  -> assign mesh.visible
  -> render
  -> expose backend, chunk count and accepted instance count
```

## Domains in use

```txt
browser shell and Vite publishing
mutable CDN and ESM runtime admission
legacy Meadow Lift and active Air Mail product sources
product controls, objectives, acceptance and supersession
keyboard, blur, wheel and variable RAF input/time
balloon simulation, terrain clearance and snapshots
airstream route, field, force, visual and diagnostics
mail parcel, route, town, volume, progress, reset and disposal
mission lifecycle, restart, delivery and epoch authority
camera, balloon presentation, clipping and procedural construction
quality, dynamic resolution, sky, weather, clouds and lighting
terrain source, near/horizon streaming, LOD classification and replacement
vegetation, streamed grass, water and landmarks
grass deterministic placement, LOD, manual culling and aggregate readback
HDR rendering, lens response and renderer diagnostics
Nexus telemetry, HUD, GameHost and headless readback
runtime lifecycle, checks, build and Pages deployment
committed observation, terrain transition and grass spatial-culling authority
```

## Kit inventory

```txt
runtime/gameplay source-backed kits: 15
balloon/presentation source-backed kits: 14
visual environment source-backed kits: 26
tooling source-backed kits: 3
active source-backed total: 58
runtime-implied adapters: 12
inactive legacy kits: 11
```

The complete kit names and service groups are recorded in `.agent/kit-registry.json` and the current timestamped tracker.

## Services offered

```txt
burner, vent, blur and wheel input
balloon buoyancy, wind integration, clearance, state projection and disposal
airstream validation, sampling, blending, force adaptation, visuals and diagnostics
parcel construction, reset, route, town, delivery-volume, progress and one-shot events
procedural balloon geometry, materials, rigging, burner, ropes and animation
camera follow, basket mode, zoom, clipping and disposal
quality selection, dynamic resolution, sky, clouds, lighting and atmosphere
terrain height/color, near chunks, horizon annulus, geometry LOD and disposal
vegetation clustering and deterministic streamed grass placement
grass quality/distance LOD, shader wind, chunk rebuild and manual visibility
water, landmarks, HDR composition, lens response and renderer statistics
Nexus resources/events, HUD, errors, GameHost and headless readback
source checks, pure tests, Vite build and Pages deployment
```

## Main finding

```txt
candidate location:
  absolute world x/y/z

instance transform:
  absolute world position

chunk mesh transform:
  0,0,0

manual distance:
  camera.position.distanceTo(mesh.position)
  same result for every active chunk

maximum distance:
  520 * 4.2 = 2184 m
```

Consequences:

```txt
camera inside origin radius:
  all active chunks pass the same manual distance test

camera outside origin radius:
  all active chunks fail the same test
  camera-centered rebuilds do not restore visibility
```

## Backend finding

```txt
backend label:
  navigator.gpu ? webgpu-compute : cpu-chunk-culling

actual implementation:
  CPU scalar comparison only
  no adapter/device/pipeline/buffers/dispatch
  dispatchedWorkgroups increments for CPU calls
```

The public backend label and workgroup count are therefore not execution evidence.

## Required parent domain

```txt
open-above-grass-spatial-culling-authority-domain
  -> chunk identity and world bounds
  -> camera-center and quality revisions
  -> LOD and cull policy classification
  -> backend capability, selection and execution truth
  -> typed per-chunk cull decisions
  -> stale-result rejection
  -> atomic visible-set commit
  -> detached observation and frame acknowledgement
  -> bounded journal and traversal fixture gate
```

## Required invariant

```txt
for every committed active grass chunk:
  cull distance uses that chunk's committed world bounds
  intended LOD and visibility use the same camera/quality revision
  center-neighborhood visibility is independent of global-origin distance
  reported backend equals the path that executed
  GPU work counts reflect actual dispatches only
  accepted, visible and rendered counts remain distinct and observable
```

## Ordered safe ledges

```txt
1. immutable runtime admission
2. import purity and frame ownership
3. runtime session lifecycle and ordered disposal
4. fixed-step clock and sequenced input
4a. product source and acceptance parity
5. Air Mail route and delivery authority
5a. mission restart transaction and epoch
5b. committed observation frame authority
6. terrain source, LOD transition and horizon continuity authority
6a. bounded terrain build and atomic replacement
7. grass spatial culling and backend truth authority
7a. origin-crossing visible-set and frame fixture gate
```

Documentation only. No runtime source, package, renderer or deployment behavior changed.
