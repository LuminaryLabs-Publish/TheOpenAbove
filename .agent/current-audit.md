# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-12T17-41-25-04-00`  
**Status:** `flight-world-membership-authority-audited`  
**Runtime revision reviewed:** `c2b96fa4d0dc44f6f3cf52762834324e712ed7d9`

## Summary

The repository defines a bounded-disk world but does not admit balloon movement against it. `simulation.update(dt)` commits horizontal position before any inside/edge/outside classification, and the host immediately passes the successor state to mail, airstream, camera, streamed world systems, map telemetry and rendering.

## Plan ledger

**Goal:** define one flight/world membership authority from movement proposal through atomic world-consumer adoption and visible-frame proof.

- [x] Compare the current Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove` by the oldest eligible synchronized ledger timestamp.
- [x] Inspect world configuration, balloon integration, host frame sequencing and map projection.
- [x] Identify complete interaction loops, domains, 68 source-backed kits and services.
- [x] Define command, proposal, swept membership, policy, result, commit, observation and fixture contracts.
- [x] Add a complete timestamped audit family and refresh required root files.
- [ ] Runtime implementation and executable fixtures remain future work.

## Selection result

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

## Complete interaction loop

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

## Source-backed findings

### The world is explicitly bounded

```txt
kind: bounded-disk
center: x=0, z=0
radius: 10000
edgeBlendWidth: 600
edgeFloor: -120
```

### Flight integration does not consult the world

```txt
state.position.addScaledVector(state.velocity, dt)
terrain floor response: yes
vertical soft ceiling: yes
horizontal radius admission: no
point membership sample: no
swept crossing sample: no
boundary result: no
```

### World consumers accept the unclassified position

The same mutable state is used by mail, airstream, camera, terrain, grass, flowers, telemetry, map and HDR presentation. There is no common world-surface revision, boundary-policy revision, consumer receipt set or visible-frame acknowledgement.

## Reachable failure classes

```txt
slow drift leaves the authored disk
large dt or high velocity tunnels across the edge band
map and world presentation disagree about off-map meaning
terrain/flora stream around an outside position
mail or airstream logic accepts an unadmitted position
different consumers invent incompatible fallback behavior
stale boundary work commits after session or world replacement
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

## Implemented kit census

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

## Offered services

```txt
runtime/gameplay:
  flight input and integration
  airstream route, field, force, visual and debug
  mail parcel, town, volume, progress and reset
  telemetry and snapshots

balloon/object/presentation:
  envelope profile and panel construction
  mouth, seams, basket, rigging, burner and rope
  deferred model loading
  secondary motion, materials, camera and clipping

world/environment:
  seeded grid, protected anchors, erosion and flow
  climate, biome, flora, disk membership and map colors
  shared camera-relative terrain frame and near/horizon geometry
  boot vegetation, grass/flower chunks, atlases, LOD, culling, wind and exclusions
  sky, sun, aerial perspective, clouds, water, HDR, color grade and lens response

UI/tooling:
  parchment-map lifecycle and projection
  headless inspection
  source validation, game/world/flora fixtures
  build and Pages adaptation
```

The complete names for every active, implied and retired kit are preserved in `.agent/trackers/2026-07-12T17-41-25-04-00/project-breakdown.md` and `.agent/kit-registry.json`.

## Required parent domain

```txt
open-above-flight-world-membership-authority-domain
```

## Candidate coordinating kits

```txt
open-above-flight-world-membership-authority-domain
open-above-flight-command-id-kit
open-above-flight-frame-id-kit
open-above-world-surface-revision-kit
open-above-flight-state-revision-kit
open-above-flight-position-proposal-kit
open-above-world-membership-sample-kit
open-above-flight-boundary-band-kit
open-above-flight-boundary-policy-kit
open-above-flight-edge-return-force-kit
open-above-flight-outside-rejection-kit
open-above-flight-boundary-result-kit
open-above-flight-world-consumer-receipt-kit
open-above-flight-world-frame-commit-kit
open-above-stale-flight-frame-rejection-kit
open-above-flight-boundary-observation-kit
open-above-flight-boundary-journal-kit
open-above-flight-boundary-visible-frame-ack-kit
open-above-flight-center-membership-fixture-kit
open-above-flight-edge-transition-fixture-kit
open-above-flight-outside-rejection-fixture-kit
open-above-flight-high-speed-crossing-fixture-kit
open-above-flight-map-world-parity-fixture-kit
open-above-flight-pages-boundary-smoke-kit
```

## Required transaction

```txt
FlightFrameCommand
  -> validate runtime session, frame sequence and predecessor flight revision
  -> bind the current WorldSurfaceRevision
  -> construct a detached position/velocity proposal
  -> sample start and proposed positions against bounded-disk membership
  -> detect center, edge-band, outside and swept high-speed crossings
  -> apply one authored Accept, SoftReturn, Clamp, Reject or Terminal policy
  -> construct one immutable FlightBoundaryResult
  -> atomically commit flight state and world-consumer frame evidence
  -> reject stale frame results
  -> publish bounded observations and journal entry
  -> acknowledge the first terrain/flora/map/HDR frame citing the committed result
```

## Required invariants

```txt
every committed flight position cites one world surface revision
swept crossings cannot tunnel through the edge band
policy outcome is explicit and configuration-backed
Rejected, Failed and Stale perform zero mutation
all world consumers cite the same committed result
world/session replacement fences predecessor results
visible acknowledgement follows successful commit
```

## Validation boundary

Documentation only. Runtime source, HTML, package scripts, dependencies, gameplay, rendering and deployment were not changed. No source, browser, built-output or Pages flight-boundary fixture was run.
