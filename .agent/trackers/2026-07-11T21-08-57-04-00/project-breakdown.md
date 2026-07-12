# Project Breakdown: TheOpenAbove

**Timestamp:** `2026-07-11T21-08-57-04-00`

## Summary

Recent runtime commits added a pinned bounded-disk world surface to terrain streaming, corrected first-frame timing, wrapped airstream visual progress, repaired the grass shader UV varying, and softened cloud sampling. The new world boundary is only authoritative for near and horizon terrain. Grass streaming and balloon simulation do not admit or report world-surface membership, so the renderer, simulation and diagnostics can disagree at the disk edge.

## Plan ledger

**Goal:** define one world-surface membership authority shared by simulation, terrain, grass, route content, diagnostics and visible-frame proof.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Prioritize `TheOpenAbove` because seven runtime/test commits landed after its previous audit.
- [x] Trace the bounded surface descriptor, terrain sampling, near/horizon admission, grass streaming, balloon movement and telemetry.
- [x] Identify the interaction loop, all domains, all kits and offered services.
- [x] Define world membership, consumer admission, boundary policy, typed result and fixture contracts.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root `.agent` files and kit registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable boundary fixtures remain future work.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

TheOpenAbove       previous central audit 2026-07-11T19-28-28-04-00
                   seven substantive runtime/test commits after audit
                   selected as recently changed and undocumented
HorrorCorridor     2026-07-11T19-38-14-04-00
PhantomCommand     2026-07-11T19-48-09-04-00
ZombieOrchard      2026-07-11T20-03-22-04-00
TheUnmappedHouse   2026-07-11T20-11-26-04-00
AetherVale         2026-07-11T20-30-33-04-00
IntoTheMeadow      2026-07-11T20-38-07-04-00
MyCozyIsland       2026-07-11T20-51-14-04-00
PrehistoricRush    2026-07-11T21-00-00-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/TheOpenAbove` is changed in the Publish organization.

## Interaction loop

```txt
startup
  -> load mutable NexusEngine @main and pinned disk-world ProtoKit
  -> create bounded-disk descriptor: radius 10000, edge blend 600, floor -120
  -> create terrain sampler and near/horizon streamers
  -> create vegetation, grass, water, atmosphere and HDR renderer
  -> create balloon, airstream, mail, camera and telemetry
  -> publish GameHost

frame
  -> clamp wall-clock frame delta
  -> advance balloon simulation and unrestricted horizontal drift
  -> sample bounded terrain height for clearance
  -> update mail and airstream
  -> update camera
  -> terrain streamers admit chunks through worldSurface.intersectsBounds
  -> grass rebuilds a camera-centered 7x7 chunk set without world-surface admission
  -> grass culling compares camera distance to each mesh's default origin
  -> render and publish HUD/readback
```

## Main findings

1. `WORLD.surface` is a versionless descriptor with no consumer revision or policy identity.
2. `createTerrainSurface()` blends height to `edgeFloor` through `worldSurface.edgeMask()` and gives the surface to both terrain streamers.
3. Near and horizon streamers reject chunks whose bounds do not intersect the disk.
4. `createGrassFieldDomain()` receives terrain but never reads `terrain.worldSurface`; it admits every camera-centered chunk selected by LOD.
5. Grass candidate positions are absolute world coordinates, while each `InstancedMesh` remains at scene origin. Manual culling therefore uses camera-to-origin distance for every chunk.
6. Outside the disk, grass can still be generated at the bounded height floor while terrain chunks are absent.
7. Balloon simulation has no inside/outside admission, edge response, recovery policy or distance-to-boundary state. It can drift beyond the visual world indefinitely.
8. GameHost reports the surface descriptor but not current membership, consumer parity, boundary violations or a visible-frame receipt.
9. `tests/smoke.mjs` proves source patterns independently; it does not traverse the boundary or compare terrain, grass, simulation and telemetry results.

## Domains in use

```txt
browser shell, Vite and Pages
mutable NexusEngine and pinned ProtoKit admission
runtime session and frame ownership
campaign/world descriptor source
bounded-disk world surface and edge field
balloon simulation, terrain clearance and snapshots
airstream routing, force, visuals and diagnostics
mail route, parcel, towns and delivery
camera and balloon presentation
terrain source, near chunks, horizon chunks and LOD
vegetation and grass placement, LOD and culling
water, sky, clouds, weather and lighting
HDR composition, dynamic resolution and lens response
HUD, Nexus telemetry, GameHost and headless readback
source-pattern checks, pure tests, build and deployment
```

## Kit inventory

```txt
active source-backed kits: 58
runtime-implied adapters: 12
inactive legacy kits: 11
```

### Runtime and gameplay services

```txt
balloon buoyancy, input, wind, terrain clearance, transform and snapshot
airstream route construction, sampling, blending, force and visual projection
mail parcel, route, town, delivery volume, progress, reset and event publication
Nexus resources, events and telemetry
```

### Presentation and environment services

```txt
procedural balloon geometry, rigging, rope, materials and animation
camera follow, zoom, clipping and basket blend
bounded terrain height, color, near/horizon streaming and cloud shadow
vegetation, deterministic grass placement, grass LOD and CPU chunk culling
sky, sun, clouds, aerial perspective, water, landmarks and HDR composition
dynamic resolution, renderer statistics, HUD and GameHost projection
```

### Tooling services

```txt
source-pattern smoke checks
airstream/mail pure checks
headless editor inspection/check/build adapters
Vite build and Pages deployment
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
  -> simulation-boundary-admission-kit
  -> boundary-response-result-kit
  -> surface-consumer-parity-result-kit
  -> stale-surface-result-rejection-kit
  -> world-surface-observation-kit
  -> visible-surface-frame-ack-kit
  -> boundary-parity-fixture-kit
  -> browser-boundary-traversal-smoke-kit
```

## Required transaction

```txt
committed world surface descriptor and revision
  -> normalize point or chunk bounds
  -> classify inside, edge blend, intersecting or outside
  -> apply one versioned consumer policy
  -> return typed admission/result for terrain, grass and simulation
  -> reject stale surface revisions
  -> commit matching consumer sets atomically
  -> render one frame
  -> publish membership and consumer-parity acknowledgement
```

## Next safe ledge

```txt
TheOpenAbove World Surface Membership Authority
+ Terrain/Grass/Simulation Consumer Parity
+ Boundary Traversal and First-Visible-Frame Fixture Gate
```

## Validation boundary

Documentation only. Runtime source, package scripts, dependencies and deployment are unchanged by this audit. No browser boundary traversal, terrain/grass parity, out-of-bounds recovery or visible-frame fixture was executed.