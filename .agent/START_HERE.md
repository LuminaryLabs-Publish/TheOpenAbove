# START HERE: TheOpenAbove

**Last aligned:** `2026-07-12T09-02-10-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`

## Summary

The current parchment map is not navigation-authoritative. The player marker points exactly opposite the balloon's horizontal travel because simulation heading, map axes, marker-forward orientation and canvas rotation use incompatible conventions.

The map also scales against the full 10,000-unit world radius while current mission routes and towns extend only about 3,061 units from the origin. No named world-fit/mission-fit policy, active-route emphasis, off-map policy, projection revision or geometric fixture exists.

## Plan ledger

**Goal:** make the map a trustworthy navigation projection whose coordinate space, content bounds, bearing, route emphasis, viewport fit and visible frame derive from one committed contract.

- [x] Compare the complete Publish repository inventory with central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `TheOpenAbove` as the oldest central-ledger entry with newer repo-local map work pending central synchronization.
- [x] Trace page, host, map, world, simulation, airstream, mail and validation behavior.
- [x] Identify the interaction loop, all domains, all 60 active source-backed kits and offered services.
- [x] Prove the marker-bearing inversion and quantify the content-fit mismatch.
- [x] Define the missing spatial-navigation authority.
- [x] Add timestamped tracker, turn ledger and system audits.
- [x] Refresh root `.agent` state and machine registry.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Implement the authority and executable browser/Pages geometry fixtures.

## Read this first

```txt
.agent/trackers/2026-07-12T09-02-10-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-12T09-02-10-04-00-parchment-map-spatial-navigation-authority-dsk-map.md
.agent/render-audit/2026-07-12T09-02-10-04-00-player-bearing-route-fit-visible-frame-gap.md
.agent/gameplay-audit/2026-07-12T09-02-10-04-00-flight-state-map-navigation-loop.md
.agent/interaction-audit/2026-07-12T09-02-10-04-00-map-source-projection-result-map.md
.agent/map-system-audit/2026-07-12T09-02-10-04-00-coordinate-heading-bounds-contract.md
.agent/deploy-audit/2026-07-12T09-02-10-04-00-map-navigation-geometry-fixture-gate.md
.agent/turn-ledger/2026-07-12T09-02-10-04-00.md
.agent/kit-registry.json
```

Retain the `2026-07-12T08-50-32-04-00` parchment-map pause/input audit. It owns transition, input context, pause participants, focus, dual RAF ownership and lifecycle. The new audit owns spatial geometry and navigation truth.

## Interaction loop

```txt
boot
  -> create visual, balloon, airstream, mail and simulation owners
  -> create map with world surface, towns, routes, live player state and parcel
  -> start main RAF

map draw
  -> derive scale from WORLD.surface.radius
  -> draw routes and towns
  -> highlight parcel destination town
  -> transform player position
  -> rotate marker from simulation heading
  -> present map frame

M/Escape
  -> open/close map
  -> pause/resume gameplay updates through host Boolean
```

## Domains in use

```txt
browser shell, import map, semantic HTML, game canvas and parchment dialog
runtime admission, startup failure, session and RAF ownership
keyboard/key-state, blur, wheel zoom and variable frame time
map transition, pause/resume, focus and lifecycle
map coordinate space, bounds, route/town/destination/player projection and bearing
balloon simulation, airstream, steering, clearance and snapshots
mail route, parcel, town, delivery volume, progress and reset
balloon profile, model, geometry, rigging, animation, presentation and camera
quality, dynamic resolution, HDR surfaces and post-processing
terrain, grass, atmosphere, water, lighting and lens response
telemetry, GameHost, headless inspection, fatal projection and accessibility
checks, tests, build and Pages deployment
```

## Kits and services

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

The complete kit-by-kit service map is in the latest tracker and `.agent/kit-registry.json`.

## Main finding

```txt
simulation heading = atan2(vx, vz)
map axes = (worldX, worldZ)
marker local forward = screen up
marker rotation = -heading
rendered marker direction = (-vx, -vz)
```

The player marker is antiparallel to travel.

```txt
world radius: 10000
farthest current mission content: about 3061
content radius use: about 30.6%
fit policy: implicit world-fit only
active/correct route style: absent
off-map policy: absent
geometry proof: absent
```

## Required parent domain

```txt
open-above-parchment-map-spatial-navigation-authority-domain
  -> coordinate-space schema
  -> world/content bounds
  -> viewport-fit policy
  -> immutable projection transform
  -> heading convention and player bearing
  -> route/destination/active styling
  -> off-map and edge policy
  -> projection result, observation and journal
  -> visible-frame acknowledgement
  -> pure, browser and Pages geometry fixtures
```

## Ordered implementation queue

```txt
1. immutable runtime admission
2. import purity and single frame ownership
3. balloon profile/model authority
4. runtime lifecycle, fixed-step clock and sequenced input
5. product source, Air Mail route and mission reset
6. committed observation, public host and frame-failure containment
7. terrain, grass and world-surface authorities
8. steering and HDR render-surface coherence
9. parchment map pause/input authority
10. parchment map spatial-navigation authority
11. semantic mission status and fatal accessibility authority
```

## Next safe ledge

```txt
Parchment Map Spatial Navigation Authority
+ Coordinate Space and Bearing Contract
+ Content Bounds and Viewport Fit
+ Active/Destination Route Projection
+ Off-Map Policy
+ Projection Result and Visible-Frame Receipt
+ Cardinal, Aspect, DPR and Pages Fixtures
```
