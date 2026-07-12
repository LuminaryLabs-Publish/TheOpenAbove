# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-11T21-08-57-04-00`

## Status

```txt
status: world-surface-membership-consumer-parity-authority-audited
runtime source changed by this pass: no
branch: main
root .agent state: refreshed
central ledger sync: pending until repo-local completion
central internal change log: pending until repo-local completion
```

## Summary

The active Air Mail runtime now imports a pinned disk-world surface and exposes a bounded terrain height. Near and horizon terrain use `worldSurface.intersectsBounds()` to decide which chunks exist. Grass streaming never queries the surface, and balloon simulation has no horizontal boundary policy. The world is therefore bounded for some render consumers but unbounded for simulation and other visual consumers.

## Plan ledger

**Goal:** define one versioned surface membership authority shared by point sampling, chunk admission, movement, authored content, diagnostics and the visible frame.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove` because newer runtime/test commits postdated its audit.
- [x] Read `AGENTS.md`, root `.agent` state and retained grass/terrain audits.
- [x] Compare the prior documentation head with current runtime head.
- [x] Inspect world config, terrain surface, both terrain streamers, grass domain, culling, simulation, GameHost and smoke checks.
- [x] Identify interaction loop, domains, kits and service families.
- [x] Define membership, boundary response, consumer parity and visible-frame contracts.
- [x] Add timestamped tracker and system audits.
- [x] Refresh root `.agent` state and kit registry.
- [ ] Implement runtime changes and execute fixtures.

## Recent source changes reviewed

```txt
bounded-disk WORLD.surface descriptor
pinned disk-world ProtoKit import
bounded terrain height through edgeMask
near/horizon chunk intersection checks
first-frame delta guard
wrapped airstream visual progress
stable cloud jitter and lower high-frequency detail
grass shader UV varying repair
source-pattern smoke updates
```

## Interaction loop

```txt
import and startup
  -> mutable NexusEngine @main
  -> pinned disk-world ProtoKit
  -> WORLD.surface descriptor
  -> bounded terrain sampler and terrain streamers
  -> vegetation, grass, water, atmosphere and HDR
  -> balloon, simulation, airstream, mail, camera and telemetry
  -> GameHost

active frame
  -> clamp wall-clock delta
  -> update unrestricted balloon position
  -> sample bounded height for vertical clearance
  -> update mail, airstream, camera and presentation
  -> terrain streamers query world bounds
  -> grass selects camera-centered chunks without world bounds
  -> grass visibility uses camera-to-mesh-origin distance
  -> render, HUD and readback
```

## Source-backed findings

```txt
WORLD.surface:
  kind bounded-disk
  radius 10000
  edgeBlendWidth 600
  edgeFloor -120
  schema/revision/fingerprint absent

terrain height:
  lerp edgeFloor to procedural terrain by edgeMask

near/horizon terrain:
  skip nonintersecting chunk bounds

grass:
  no worldSurface query
  absolute-world instance transforms
  chunk mesh at global origin
  manual culling from mesh.position

simulation:
  vertical clearance from bounded height
  horizontal position unrestricted
  no inside/edge/outside state

readback:
  static surface descriptor only
  no current membership or consumer parity
```

## Consequences

```txt
terrain can disappear while grass still exists at edgeFloor
all grass chunks can toggle from one origin-based distance
balloon can drift beyond the supported visual world indefinitely
route and destination content have no surface-validity proof
surface changes cannot stale-reject prior consumer results
GameHost cannot explain boundary mismatches
source-pattern checks can pass without end-to-end parity
```

## Domains in use

```txt
browser shell, DOM, Vite and Pages
mutable CDN/runtime admission
module import, runtime session and frame ownership
legacy Meadow Lift and active Air Mail product sources
campaign/world descriptor and bounded-disk surface
keyboard, blur, wheel and variable RAF time
balloon simulation, terrain clearance and snapshots
airstream route, sampler, field, force, visual and debug
mail parcel, route, town, volume, progress, reset and disposal
mission lifecycle, restart and epoch
balloon geometry, materials, rigging, burner, rope and animation
camera follow, basket blend, clipping and zoom
quality, resolution, sky, weather, clouds and lighting
terrain source, near/horizon streaming, LOD and edge policy
vegetation, deterministic grass, culling, water and landmarks
HDR rendering, lens response and renderer diagnostics
Nexus telemetry, HUD, GameHost and headless readback
checks, pure tests, build and deployment
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

## Services offered

```txt
boot, fatal projection and global host publication
burner, vent, blur and wheel input
balloon buoyancy, wind integration, clearance, transforms, snapshots and disposal
airstream validation, sampling, force adaptation, visuals and diagnostics
parcel construction, route/town volumes, progress, reset and events
procedural balloon geometry, materials, rigging, rope and animation
camera follow, blend, zoom, clipping and disposal
bounded terrain sampling, near/horizon streaming and cloud shadow
vegetation, grass placement, LOD and chunk culling
sky, clouds, weather, water, lighting, HDR and renderer statistics
Nexus resources/events, telemetry, HUD, GameHost and headless readback
source checks, pure tests, Vite build and Pages deployment
legacy compatibility target discovery, replacement and animation
```

## Required parent domain

```txt
open-above-world-surface-membership-authority-domain
  -> world-surface-descriptor-kit
  -> world-surface-revision-kit
  -> world-membership-query-kit
  -> world-edge-distance-kit
  -> world-boundary-policy-kit
  -> surface-consumer-capability-kit
  -> terrain-chunk-membership-kit
  -> grass-chunk-membership-kit
  -> route-content-membership-kit
  -> simulation-boundary-admission-kit
  -> boundary-response-result-kit
  -> surface-consumer-parity-result-kit
  -> stale-surface-result-rejection-kit
  -> world-surface-observation-kit
  -> visible-surface-frame-ack-kit
  -> boundary-parity-fixture-kit
  -> browser-boundary-traversal-smoke-kit
```

## Required invariants

```txt
one committed surface revision drives all spatial consumers
terrain and grass required sets cannot disagree silently
visible grass requires an admitted support-surface policy
simulation outside behavior is explicit and deterministic
route/town content is validated against the surface
stale membership results mutate nothing
GameHost reports membership, acknowledgements and mismatch reasons
visible-frame proof references the rendered surface revision
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
6. terrain source and LOD transition authority
6a. bounded terrain build and atomic replacement
7. grass spatial identity and backend truth
7a. world surface membership and consumer parity
```

Documentation only. No runtime source, package, rendering or deployment behavior changed.