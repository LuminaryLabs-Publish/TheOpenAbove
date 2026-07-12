# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-12T09-02-10-04-00`

## Status

```txt
status: parchment-map-spatial-navigation-authority-audited
repository revision reviewed: 4b76ec275102be3a9358d866bcbfd816ac270c04
runtime source changed by this pass: no
branch: main
root .agent state: refreshed
central ledger sync: pending until repo-local completion
central internal change log: pending until repo-local completion
```

## Summary

The active parchment map places route, town and player data on a 2D canvas, but its player-bearing convention is mathematically inverted. Simulation heading is `atan2(wind.x, wind.z)`, the map uses world X and Z as screen X and Y, and the upward-pointing marker is rotated by `-heading`. The rendered marker therefore points opposite the balloon's horizontal travel.

Map scale is derived from the full 10,000-unit world radius. Current routes and towns reach only about 3,061 units from the origin, so navigational content uses about 30.6% of the map disk radius. No explicit mission-fit policy, active-route emphasis, off-map policy, projection result or geometry fixture exists.

## Plan ledger

**Goal:** define one spatial-navigation contract from admitted world/gameplay sources through coordinate conversion, content fit, player bearing, route styling and visible-frame proof.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central and root `.agent` coverage.
- [x] Select only `TheOpenAbove` as the oldest central-ledger entry with newer repo-local map work.
- [x] Review `AGENTS.md`, `index.html`, `src/main.js`, map overlay, world config, simulation, routes, mail data, smoke tests and root `.agent` state.
- [x] Trace map spatial sources, transforms, marker pose and route/town projection.
- [x] Reconcile 60 active source-backed kits and services.
- [x] Define coordinate, bounds, bearing, styling, result and fixture contracts.
- [x] Add timestamped tracker and system audits.
- [x] Refresh root `.agent` routing state and registry.
- [x] Create no branch or pull request.
- [ ] Implement runtime changes and execute browser/Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

TheOpenAbove       central 2026-07-12T07-00-48-04-00; repo-local 2026-07-12T08-50-32-04-00; selected
PrehistoricRush    central 2026-07-12T07-09-49-04-00; newer repo-local work observed
IntoTheMeadow      central 2026-07-12T07-19-47-04-00
PhantomCommand     central 2026-07-12T07-29-32-04-00
HorrorCorridor     central 2026-07-12T07-41-06-04-00
ZombieOrchard      central 2026-07-12T07-51-04-04-00
MyCozyIsland       central 2026-07-12T08-00-16-04-00
TheUnmappedHouse   central 2026-07-12T08-10-36-04-00
AetherVale         central 2026-07-12T08-31-49-04-00
TheCavalryOfRome   excluded
```

## Interaction loop

```txt
boot
  -> construct visual, balloon, airstream, mail and simulation owners
  -> create map overlay from world surface, towns, routes and live getters
  -> start main RAF

map open
  -> resize backing canvas
  -> derive world scale from WORLD.surface.radius
  -> draw all routes
  -> draw all towns and destination label
  -> read live player position/heading
  -> transform player position and rotate marker
  -> draw map title
  -> repeat in map RAF
```

## Source-backed findings

### Marker bearing is reversed

```txt
heading = atan2(vx, vz)
marker local forward = (0, -1)
rotation = -heading
result = (-vx, -vz)
```

For every nonzero horizontal travel vector, the map arrow points in the opposite direction.

### Viewport fit is implicit

The overlay uses `WORLD.surface.radius = 10000` for scale. The farthest current town is approximately 3,061 units from the origin. Current mission content occupies about 30.6% of the disk radius and about 9.4% of its area.

No named world-fit, mission-fit or player-context-fit policy exists.

### Navigation state is incomplete

The overlay receives routes, towns, player state and parcel, but not committed active-route/capture state or the mail domain's `correctAirstreamId`. It highlights the destination town while drawing all routes with the same dashed policy.

### Boundary behavior is undefined

The simulation does not enforce a hard world-radius clamp. The map has no expanded-fit, edge-clamp, off-map badge or typed hidden policy.

### Proof is structural only

The smoke test asserts that map functions and labels exist in source. It does not execute transforms, validate cardinal bearings, inspect route bounds, compare DPR/aspect behavior or probe rendered pixels.

## Domains in use

```txt
browser shell, semantic HTML, game canvas and parchment dialog
runtime admission, startup failure, session and RAF ownership
keyboard/key-state, blur, wheel zoom and variable time
map transition, pause/resume, focus and lifecycle
map coordinate space, world/content bounds, route/town/destination/player projection and bearing
balloon simulation, airstream, steering, clearance and snapshots
mail route, parcel, town, volume, progress and reset
balloon profile, model, geometry, rigging, presentation and camera
quality, dynamic resolution, HDR surfaces and post-processing
terrain, grass, clouds, atmosphere, water, lighting and lens response
telemetry, GameHost, headless inspection and fatal projection
checks, tests, build and deployment
```

## Kit inventory and services

```txt
runtime/gameplay source-backed kits: 15
balloon/object/presentation source-backed kits: 15
visual-environment source-backed kits: 26
UI source-backed kits: 1
tooling/proof source-backed kits: 3
active source-backed total: 60
runtime-implied adapters: 12
inactive/retired legacy kits: 12
planned spatial-navigation kits: 25 including parent
retained pause/input authority kits: 26 including parent
```

Services cover runtime boot, global input, wind flight, airstream routing, mail delivery, balloon construction/presentation, camera response, world and HDR rendering, parchment-map transition and drawing, telemetry, diagnostics, tests, build and Pages deployment. The exact kit-by-kit map is in the latest tracker and `.agent/kit-registry.json`.

## Required parent domain

```txt
open-above-parchment-map-spatial-navigation-authority-domain
```

## Required services

```txt
coordinate-space schema and handedness
world and content bounds derivation
named viewport-fit policy
immutable world/map transform
canonical player bearing and marker pose
active/correct/destination route style resolution
off-map and edge-clamp policy
projection command, revision and typed result
source fingerprint and detached observation
visible-map-frame acknowledgement
cardinal, diagonal, aspect, DPR, off-map, browser and Pages fixtures
```

## Required invariants

```txt
player marker agrees with normalized horizontal velocity
cardinal bearings are exact
one frame uses one immutable projection transform
content fits inside declared padding
DPR changes backing resolution without changing CSS geometry
active and destination routes derive from committed gameplay state
off-map state is visible and typed
stale source/viewport revisions cannot commit
visible frame cites the committed projection result
```

## Retained map authority

The `2026-07-12T08-50-32-04-00` audit remains authoritative for map transition, pause participants, flight-input isolation, focus, dual RAF ownership and lifecycle. This pass does not supersede it.

Documentation only. No runtime source, dependency, gameplay, input, rendering, accessibility or deployment behavior changed.