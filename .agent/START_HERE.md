# START HERE: TheOpenAbove

**Last aligned:** `2026-07-12T15-31-24-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Runtime revision reviewed:** `c2b96fa4d0dc44f6f3cf52762834324e712ed7d9`

## Summary

TheOpenAbove is an Air Mail hot-air-balloon experience with a deterministic procedural world, streamed terrain, grass and flowers, authored routes and towns, procedural balloon presentation, HDR rendering, a parchment map, Nexus telemetry and headless proof surfaces.

The current audit isolates vegetation spatial coverage. Trees are generated once at boot as two global instanced meshes inside a central cluster field. Terrain, grass and flowers follow the moving camera, while vegetation has no update, camera-relative requirements, chunk identity, adoption result, disposal service, coverage observation or visible-frame acknowledgement.

## Plan ledger

**Goal:** retain deterministic tree placement while making vegetation a world-bound, camera-relative, budgeted and transactionally adopted consumer of the procedural world.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `TheOpenAbove` by the oldest eligible central timestamp.
- [x] Identify the interaction loop, domains, all 68 active source-backed kits and offered services.
- [x] Trace world, flight, camera, vegetation, terrain, grass, flower and render ownership.
- [x] Define vegetation spatial-coverage authority and fixture gates.
- [x] Add timestamped architecture and system audits.
- [x] Refresh root `.agent` state and central tracking.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Implement camera-relative vegetation chunks, atomic adoption, disposal and browser/Pages proof.

## Read this first

```txt
.agent/trackers/2026-07-12T15-31-24-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-12T15-31-24-04-00-vegetation-spatial-coverage-authority-dsk-map.md
.agent/render-audit/2026-07-12T15-31-24-04-00-static-tree-field-streamed-world-gap.md
.agent/gameplay-audit/2026-07-12T15-31-24-04-00-balloon-leaves-boot-vegetation-loop.md
.agent/interaction-audit/2026-07-12T15-31-24-04-00-camera-vegetation-frame-admission-map.md
.agent/vegetation-system-audit/2026-07-12T15-31-24-04-00-chunked-deterministic-coverage-contract.md
.agent/deploy-audit/2026-07-12T15-31-24-04-00-vegetation-spatial-browser-fixture-gate.md
.agent/turn-ledger/2026-07-12T15-31-24-04-00.md
.agent/kit-registry.json
```

## Interaction loop

```txt
boot
  -> build seeded world
  -> create camera-relative terrain
  -> create boot-only tree clusters
  -> create camera-relative grass and flowers
  -> create balloon, mail, airstream, camera, map and renderer
  -> start RAF

frame
  -> integrate horizontal and vertical flight
  -> update mail and airstream
  -> move camera
  -> update terrain, grass and flowers around camera
  -> leave tree instance field unchanged
  -> render HDR frame

long traversal
  -> balloon/camera can leave the initial tree field
  -> streamed ground and low flora continue
  -> no typed vegetation coverage result explains the visible tree state
```

## Domains in use

```txt
browser shell, canvas, map and fatal projection
runtime boot, session, input, RAF and public host
balloon simulation, steering, airstream and mail
seeded world generation, membership and authored anchors
terrain streaming classification and near/horizon ownership
boot-time vegetation clusters and tree instancing
grass and flower chunks, LOD, culling and wind
balloon model, materials, rigging and presentation
quality, dynamic resolution, sky, clouds, water, HDR and lens response
map projection, telemetry, headless proof, tests, build and Pages
```

## Kits and services

```txt
runtime/gameplay: 15
balloon/object/presentation: 15
visual/world/environment: 33
UI: 1
tooling/proof: 4
active source-backed total: 68
runtime-implied adapters: 12
inactive/retired legacy: 12
```

The complete kit-by-kit service map is in the latest tracker and `.agent/kit-registry.json`.

## Main finding

```txt
world radius: 10000
terrainSize: 2400
vegetation clusters: 18
vegetation creation: once during visual-domain construction
vegetation update in RAF: none
vegetation chunk/frame identity: none
vegetation coverage result: none
vegetation disposal service: none
horizontal flight boundary: none
```

Current cluster-center extents derive from `terrainSize * 1.18` and a wider cap of `min(worldRadius * 0.42, localExtent * 1.9)`, materially smaller than the admitted world disk. This establishes a source-level ownership mismatch, not a measured screenshot defect.

## Required parent domain

```txt
open-above-vegetation-spatial-coverage-authority-domain
```

## Next safe ledge

```txt
VegetationFrameId + world/config fingerprint
  -> deterministic camera-relative coverage plan
  -> stable chunk IDs and seeds
  -> detached candidate generation
  -> exclusion and budget admission
  -> atomic adoption or last-good preservation
  -> exactly-once retirement
  -> revisioned grass/flower exclusion artifact
  -> first visible vegetation-frame acknowledgement
```

## Retained priorities

Runtime admission, session/frame ownership, procedural-world identity, terrain atomic adoption, map authority, mission accessibility and deployment parity remain active dependencies. This documentation pass changes no runtime behavior.