# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-12T23-50-01-04-00`  
**Status:** `air-mail-session-persistence-authority-audited`  
**Runtime revision reviewed:** `c2b96fa4d0dc44f6f3cf52762834324e712ed7d9`

## Summary

TheOpenAbove currently has no executable persistence domain. Browser boot constructs a new default mail parcel and a new balloon simulation, gameplay mutates those objects in memory, and reload or navigation discards all flight and delivery progress. The source exposes snapshot/reset services for some participants, but it has no coordinated save, durable verification, restore, migration, quarantine, conflict or visible restored-frame result.

## Plan ledger

**Goal:** document one atomic and durable authority for session progress before the mail objective is treated as recoverable gameplay state.

- [x] Compare the full Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `TheOpenAbove` by the oldest eligible central timestamp.
- [x] Inspect boot composition, balloon state, mail state and current proof scripts.
- [x] Preserve the full interaction loop, domains, kit census and services.
- [x] Define save, restore, reset, storage, migration, conflict and visible-frame contracts.
- [x] Add a timestamped tracker and complete persistence audit family.
- [ ] Runtime implementation and executable persistence fixtures remain future work.

## Selection result

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
selected repository: LuminaryLabs-Publish/TheOpenAbove
selection basis: oldest eligible central update
excluded repository: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
browser boot
  -> create default routes
  -> create visual world and balloon
  -> create fresh mail domain and parcel
  -> create fresh balloon simulation at [0, 105, 0]
  -> create map, camera, presentation and telemetry
  -> publish GameHost and start RAF

running frame
  -> mutate balloon position, velocity, elapsed and distance
  -> mutate selected current and parcel delivery state
  -> update world presentation and telemetry
  -> render

browser lifecycle end
  -> no save command
  -> no durable write or verification
  -> no pagehide/visibility flush result

next boot
  -> default route, parcel and flight state are recreated
  -> no restore, migration, quarantine or restored-frame receipt
```

## Source-backed findings

### Boot always creates defaults

`src/main.js` calls `createDefaultMailRoute()`, constructs the mail domain from that route and constructs the balloon simulation with `startPosition: [0, 105, 0]`.

### Flight state is memory-only

The balloon simulation owns mutable vectors and scalar fields for position, velocity, wind, altitude, burner, vent, heading, elapsed and distance. It exposes update, snapshot and dispose, but no load or restore transaction.

### Mail state is memory-only

`createMailParcel()` initializes an in-transit, undelivered parcel. Delivery progress mutates `selectedAirstreamId`, `status`, `delivered`, `deliveredAt` and `message` directly. The mail domain exposes snapshot and reset, but no persistence adapter.

### No durable boundary is installed

The browser composition imports no persistence domain and registers no storage or page-lifecycle save path. `package.json` declares no persistence test.

### No restored visible proof exists

The renderer and telemetry have no persistence generation or restore commit ID. A future sequential restore could project mixed participant generations without detection.

## Reachable failure classes

```txt
progress loss
  -> deliver or fly for an extended session
  -> refresh or navigate
  -> default state returns

false save claim risk
  -> future host marks captured before durable verification
  -> storage failure remains invisible

partial restore risk
  -> install mail and balloon sequentially
  -> frame renders mixed generations

stale overwrite risk
  -> two tabs save from one predecessor
  -> later writer silently replaces newer progress

corrupt record risk
  -> parse untrusted bytes without schema/fingerprint/quarantine
  -> invalid state enters runtime
```

## Domains in use

```txt
browser shell, canvas, map, fatal projection and GameHost
runtime boot, session, input, RAF and telemetry
Nexus resource, event and journal storage
balloon motion, steering, burner, vent, altitude and distance
airstream routes, samples, force, visuals and debug
mail parcel, towns, delivery volumes, progress and reset
seeded world generation, erosion, climate, biome and flora
terrain near/horizon streaming and disposal
vegetation, grass and flowers, exclusions, chunks, LOD, culling and wind
balloon geometry, materials, rigging, camera and presentation
quality, dynamic resolution, illumination, clouds, water, HDR and lens
map projection, headless proof, tests, build and Pages
missing persistence identity, durable commit, restore, migration, conflict and proof
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
planned persistence authority including parent: 22
```

## Offered services

```txt
runtime/gameplay:
  flight input/integration, telemetry publication,
  airstream route/field/force/visual/debug,
  mail parcel/town/volume/progress/reset

balloon/object/presentation:
  procedural envelope/basket/rigging/burner/rope construction,
  materials, deferred loading, secondary motion, camera and clipping

world/environment:
  seeded world, erosion, biome, terrain streaming, vegetation,
  grass/flowers, quality, dynamic resolution, sky, clouds, water, HDR and lens

UI/tooling:
  parchment map, headless inspection, source/static checks,
  route/mail and world/flora proof, build and Pages adaptation
```

All kit names and per-kit services are preserved in the current tracker and `.agent/kit-registry.json`.

## Required parent domain

```txt
open-above-flight-session-persistence-authority-domain
```

## Required transaction

```txt
SaveSessionCommand
  -> validate runtime, world, route and participant predecessors
  -> collect detached participant snapshots
  -> canonicalize and fingerprint
  -> stage and readback-verify bytes
  -> compare writer and active predecessor
  -> atomically promote a verified generation
  -> publish SaveCommitResult

RestoreSessionCommand
  -> verify active or backup generation
  -> migrate supported schemas or quarantine invalid data
  -> prepare every participant candidate
  -> atomically install one restored generation
  -> publish RestoreCommitResult
  -> acknowledge the first visible restored frame
```

## Required invariants

```txt
accepted save means durable readback verification succeeded
reload restores matching balloon and mail revisions
failed or stale saves preserve the verified predecessor
partial restore never reaches live presentation
reset and durable storage converge
corrupt or incompatible records are quarantined
multi-tab conflicts return typed results
visible restored frames cite the installed persistence generation
```

## Validation boundary

Documentation only. Runtime source, HTML, package scripts, dependencies, gameplay, rendering and deployment were not changed. No browser-storage, migration, corruption, multi-tab, page-lifecycle, build or Pages persistence fixture was run.