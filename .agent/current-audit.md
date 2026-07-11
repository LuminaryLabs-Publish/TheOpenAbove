# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-11T16-30-25-04-00`

## Status

```txt
status: terrain-lod-transition-authority-audited
runtime source changed by this pass: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central internal change log: complete
```

## Summary

The near terrain streamer records each mesh LOD and rebuilds retained keys whose required LOD changes. The horizon streamer computes a 10, 6 or 4 segment geometry only when a key is first created, stores no segment or LOD identity, and never reclassifies retained keys after camera-center movement.

A horizon chunk can therefore keep obsolete geometry after moving into another distance band. The same camera pose can render different horizon density after different traversal paths, and correcting the mismatch naively would add unbounded synchronous geometry work.

## Plan ledger

**Goal:** define one terrain LOD transition authority that keeps current classification, built geometry, edge policy, work budget, replacement state and visible-frame observation aligned.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove` under the oldest eligible fallback rule.
- [x] Read the current root `.agent` state and retained terrain audits.
- [x] Read terrain surface, near streaming, horizon streaming and visual-domain sources.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Trace near and horizon retained-chunk behavior.
- [x] Record the horizon LOD staleness path and path-dependence.
- [x] Define classification, transition, budget, edge, replacement, observation and fixture contracts.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root `.agent` files.
- [x] Synchronize the central ledger and internal change log.
- [ ] Runtime implementation and executable terrain fixtures remain future work.

## Interaction loop

```txt
browser boot
  -> visual domain
  -> terrain surface
  -> near and horizon streamers

each RAF
  -> simulation, camera and visual update
  -> near center update at 520 m grid
  -> near required map includes intended LOD
  -> horizon center update at 1040 m grid
  -> horizon required set includes keys only
  -> retained horizon keys bypass geometry classification
  -> HDR render consumes current terrain groups
```

## Domains in use

```txt
browser shell and Vite publishing
mutable CDN/ESM runtime admission
legacy Meadow Lift and active Air Mail product sources
product controls, objectives, acceptance and supersession
keyboard, blur, wheel and variable RAF input/time
balloon simulation, clearance and snapshots
airstream route, field, force, visual and diagnostics
mail parcel, route, town, volume, progress and reset
mission lifecycle, restart, delivery and epoch authority
camera, presentation, clipping and procedural balloon construction
quality, dynamic resolution, sky, weather, clouds and lighting
terrain source, near/horizon streaming, LOD classification and replacement
vegetation, grass, water and landmarks
HDR rendering, lens response and renderer diagnostics
Nexus telemetry, HUD, GameHost and headless readback
runtime lifecycle, checks, build and Pages deployment
committed observation and terrain transition authority
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

The complete kit names and service groups remain in `.agent/kit-registry.json` and the timestamped tracker.

## Services offered

```txt
burner, vent, blur and wheel input
balloon buoyancy, wind integration, clearance, state projection and disposal
airstream validation, sampling, blending, force adaptation, visuals and diagnostics
parcel construction, route, town, delivery-volume, progress, event and reset services
procedural balloon geometry, materials, rigging, burner, ropes and animation
camera follow, basket mode, zoom, clipping and disposal
quality selection, dynamic resolution, sky, clouds, lighting and atmosphere
terrain height/color, near chunks, horizon annulus, geometry LOD and disposal
vegetation, grass placement/culling/LOD, water and landmark projection
HDR composition, lens response, frame submission and renderer statistics
Nexus resources/events, HUD, errors, GameHost and headless readback
source checks, pure tests, Vite build and Pages deployment
```

## Main finding

```txt
near required record: key + intended lod
near mesh record: x + z + actual lod
near retained mismatch: removed and rebuilt

horizon required record: key only
horizon mesh record: x + z only
horizon intended segments: calculated only during buildGeometry
horizon retained mismatch: not detectable
```

Concrete path:

```txt
chunk 5:0 from center 0:0
  5200 m -> 4 segments

same retained key from center 2:0
  3120 m -> policy requires 10 segments
  actual remains 4 segments
```

The reverse over-detail path is also reachable.

## Required parent domain

```txt
open-above-terrain-lod-transition-authority-domain
  -> chunk identity and terrain-source revision
  -> LOD policy and classification
  -> transition planning and work admission
  -> geometry build results
  -> edge/stitch validation
  -> atomic replacement and frame retirement
  -> intended/actual chunk observations
  -> bounded journal and fixture gate
```

## Required invariant

```txt
for every committed active terrain key:
  actual terrain revision = current terrain revision
  actual geometry LOD = current intended LOD

or

  a typed budget-deferred transition explicitly reports the mismatch
  while complete prior geometry remains visible
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
```

Documentation only. No runtime source, package, renderer or deployment behavior changed.