# START HERE: TheOpenAbove

**Last aligned:** `2026-07-12T17-41-25-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Runtime revision reviewed:** `c2b96fa4d0dc44f6f3cf52762834324e712ed7d9`  
**Status:** `flight-world-membership-authority-audited`

## Summary

TheOpenAbove is an Air Mail hot-air-balloon experience with deterministic world generation, airstream routing, parcel delivery, camera-relative terrain and flora, HDR rendering, a parchment map, Nexus telemetry and browser/headless proof surfaces.

The current audit isolates flight/world membership. The world is declared as a 10,000-unit bounded disk, but balloon motion integrates horizontal position without membership admission, swept crossing detection, an authored edge/outside policy, an atomic world-consumer commit or visible-frame acknowledgement.

## Plan ledger

**Goal:** make every balloon movement proposal prove world membership and commit one boundary result before gameplay, streaming, map or rendering consumers accept the successor position.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `TheOpenAbove` by the oldest eligible synchronized ledger timestamp.
- [x] Identify the complete interaction loop and all domains.
- [x] Preserve all 68 active source-backed kits and offered services.
- [x] Add a timestamped tracker, turn ledger and architecture/system audit family.
- [x] Refresh required root `.agent` state and machine registry.
- [x] Create no branch or pull request.
- [ ] Implement the authority and executable source/build/Pages fixtures.

## Read this first

```txt
.agent/trackers/2026-07-12T17-41-25-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-12T17-41-25-04-00-flight-world-membership-dsk-map.md
.agent/render-audit/2026-07-12T17-41-25-04-00-off-world-flight-visible-frame-gap.md
.agent/gameplay-audit/2026-07-12T17-41-25-04-00-unbounded-balloon-traversal-loop.md
.agent/interaction-audit/2026-07-12T17-41-25-04-00-flight-boundary-command-admission-map.md
.agent/flight-boundary-audit/2026-07-12T17-41-25-04-00-membership-policy-consumer-contract.md
.agent/deploy-audit/2026-07-12T17-41-25-04-00-flight-boundary-fixture-gate.md
.agent/turn-ledger/2026-07-12T17-41-25-04-00.md
.agent/kit-registry.json
```

The vegetation coverage audit at `2026-07-12T15-40-04-04-00` remains the immediate predecessor.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

TheOpenAbove       2026-07-12T15-40-04-04-00 selected
IntoTheMeadow      2026-07-12T15-49-09-04-00
PhantomCommand     2026-07-12T16-00-03-04-00
PrehistoricRush    2026-07-12T16-20-55-04-00
HorrorCorridor     2026-07-12T16-39-35-04-00
ZombieOrchard      2026-07-12T16-51-47-04-00
MyCozyIsland       2026-07-12T17-10-31-04-00
TheUnmappedHouse   2026-07-12T17-20-42-04-00
AetherVale         2026-07-12T17-35-48-04-00
TheCavalryOfRome   excluded
```

## Interaction loop

```txt
boot
  -> construct bounded-disk world and camera-relative visual systems
  -> construct balloon simulation at the authored start
  -> publish map, telemetry and public host
  -> schedule RAF

frame
  -> read held keys
  -> sample airstream
  -> integrate horizontal and vertical velocity
  -> add velocity * dt directly to balloon position
  -> enforce terrain floor and soft altitude ceiling
  -> update mail, camera, terrain, vegetation-adjacent flora and HDR
  -> render

boundary crossing
  -> balloon may cross the 10,000-unit bounded-disk radius
  -> no membership admission or crossing result runs
  -> no accept, soft-return, clamp, reject or terminal policy is selected
  -> map and streamed world consumers continue from an unclassified position
  -> no boundary revision or visible-frame acknowledgement is published
```

## Domains in use

```txt
browser shell, canvas, map, fatal projection and public host
runtime boot, session, keyboard/wheel input, RAF and telemetry
balloon motion, steering, burner, vent, altitude and distance
airstream routes, sampling, force, visuals and debug
mail parcel, town, delivery volume and progress
seeded world generation, bounded-disk membership, erosion, climate, biome and flora
terrain near/horizon streaming, ownership, geometry and disposal
vegetation, grass and flower placement, exclusion, LOD, culling and wind
balloon construction, rigging, material, camera and secondary presentation
quality, dynamic resolution, sky, sun, clouds, water, HDR and lens response
parchment-map projection, headless proof, tests, build and Pages
missing flight/world membership admission, boundary policy, commit and proof
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

The complete kit-by-kit inventory and service map are in the latest tracker and `.agent/kit-registry.json`.

## Main finding

`WORLD.surface` declares a bounded disk centered at `(0, 0)` with radius `10000`, edge blend `600`, and an outside floor. `createBalloonSimulation().update(dt)` adds horizontal velocity directly to `state.position` and only applies a terrain floor plus a vertical soft ceiling. It never samples the world surface, classifies inside/edge/outside, detects a high-speed crossing, or returns a boundary result.

The host then uses that unclassified flight state to update mail, camera, terrain, flora, telemetry, the map, and the rendered frame. The repository therefore has a bounded world description but no authoritative rule for whether an outside position is accepted, redirected, clamped, rejected, terminal, or merely visual.

## Required parent domain

```txt
open-above-flight-world-membership-authority-domain
```

## Next safe ledge

```txt
FlightFrameCommand + WorldSurfaceRevision
  -> detached motion proposal
  -> point and swept membership evidence
  -> authored boundary policy
  -> atomic flight and consumer commit
  -> bounded observation/journal
  -> first matching visible-frame acknowledgement
```

## Retained priorities

Runtime admission, session/frame ownership, procedural-world identity, terrain and vegetation atomic adoption, grass/flower coherence, map authority, mission accessibility and deployment parity remain active dependencies. This documentation pass changes no runtime behavior.
