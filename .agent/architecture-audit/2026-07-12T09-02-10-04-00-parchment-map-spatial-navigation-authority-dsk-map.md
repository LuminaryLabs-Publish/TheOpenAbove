# Architecture Audit: Parchment Map Spatial Navigation Authority

**Timestamp:** `2026-07-12T09-02-10-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

## Plan ledger

**Goal:** move map geometry and navigation meaning out of ad hoc canvas math into one composed domain with explicit coordinate, bounds, orientation, result and proof contracts.

- [x] Trace world, simulation, route, town, parcel, canvas and marker conventions.
- [x] Separate the new spatial-navigation boundary from the retained pause/input authority.
- [x] Identify required domain kits and services.
- [x] Define invariants and fixture order.
- [ ] Implement the domain.
- [ ] Replace direct canvas geometry with admitted projection results.
- [ ] Execute browser and Pages proof.

## Existing ownership

```txt
WORLD.surface
  -> center and 10000-unit radius

airstream-route-kit
  -> route IDs, points, destination town IDs and colors

mail-route-kit
  -> towns, current parcel destination and correct airstream ID

balloon-simulation-kit
  -> position, velocity, wind and heading

parchment-map-overlay-kit
  -> canvas size, worldToMap, route/town/player drawing and marker rotation
```

The overlay currently combines source admission, coordinate policy, viewport fit, navigation policy and drawing in one module.

## Concrete contract mismatch

```txt
simulation heading = atan2(vx, vz)
map axis = (screenX, screenY) = (worldX, worldZ)
marker local forward = (0, -1)
marker rotation = -heading

rendered marker direction = (-vx, -vz)
```

The marker is therefore antiparallel to horizontal travel.

## Required parent domain

```txt
open-above-parchment-map-spatial-navigation-authority-domain
```

## DSK composition

```txt
open-above-map-coordinate-space-schema-kit
  owns world axes, map axes, handedness, north and angle convention

open-above-map-world-bounds-kit
  validates the admitted world surface

open-above-map-content-bounds-kit
  derives bounds from routes, towns, destination and player policy

open-above-map-viewport-fit-policy-kit
  derives scale, padding and aspect-safe viewport fit

open-above-map-projection-transform-kit
  provides immutable world-to-map and map-to-world transforms

open-above-map-heading-convention-kit
  converts simulation heading/velocity into the declared map angle

open-above-map-player-bearing-kit
  derives normalized horizontal bearing with zero-speed policy

open-above-map-player-marker-pose-kit
  produces marker position, angle, visibility and edge state

open-above-map-route-style-policy-kit
  derives normal, active, correct and destination-route styles

open-above-map-destination-route-resolution-kit
  resolves parcel destination to the matching route with typed failure

open-above-map-active-route-projection-kit
  projects captured/current route state

open-above-map-off-map-policy-kit
  declares hide, clamp, edge-arrow or expanded-fit behavior

open-above-map-edge-clamp-kit
  produces bounded edge marker pose when required

open-above-map-compass-orientation-kit
  projects explicit orientation semantics

open-above-map-navigation-revision-kit
  sequences accepted navigation projections

open-above-map-navigation-source-fingerprint-kit
  fingerprints world, routes, towns, parcel, player and viewport sources

open-above-map-projection-result-kit
  returns applied, unchanged or rejected projection results

open-above-map-navigation-observation-kit
  exposes detached projection state

open-above-map-navigation-journal-kit
  retains bounded source/result/frame evidence

open-above-map-heading-fixture-kit
  proves cardinal and diagonal bearings

open-above-map-route-fit-fixture-kit
  proves content padding and aspect parity

open-above-map-off-map-fixture-kit
  proves the selected edge policy

open-above-map-browser-pixel-probe-kit
  checks rendered marker and route pixels against expected geometry

open-above-map-pages-navigation-smoke-kit
  verifies deployed geometry and first-frame provenance
```

## Required transaction

```txt
admit world, route, town, parcel, player and viewport observations
  -> validate coordinate-space schema
  -> derive content bounds and fit policy
  -> construct immutable projection transform
  -> resolve destination and active route styles
  -> derive player bearing from horizontal velocity or canonical heading conversion
  -> apply off-map policy
  -> build MapNavigationProjectionPlan
  -> render one map frame
  -> commit MapProjectionResult
  -> publish MapVisibleFrameAck with matching source fingerprint and revision
```

## Required result

```txt
MapProjectionResult
  projectionRevision
  sourceFingerprint
  coordinateSpaceId
  worldBounds
  contentBounds
  viewport
  fitPolicyId
  scale
  playerMarkerPose
  destinationRouteId
  activeRouteId
  offMapState
  status: applied | unchanged | rejected
  rejectionReason
```

## Required invariants

```txt
marker bearing agrees with normalized horizontal velocity
cardinal directions are exact under the declared map axis convention
route/town/player geometry uses one immutable transform per frame
content bounds fit inside declared padding at every supported aspect ratio
DPR changes physical resolution but not CSS-space geometry
zero-speed bearing follows an explicit last-bearing or heading policy
active and destination routes are source-derived, not draw-time guesses
off-map state remains visible and typed
stale source or viewport revisions cannot commit
visible frame acknowledges the exact projection result
```

## Relationship to retained map pause/input authority

The retained pause/input authority owns transition, input context, pause participants, focus, RAF ownership and lifecycle. This new domain owns spatial truth inside an admitted map frame. Neither domain should absorb the other.

## Validation gate

```txt
fixture:map-heading-cardinals
fixture:map-heading-diagonals
fixture:map-zero-speed-bearing
fixture:map-route-content-bounds
fixture:map-fit-wide-square-portrait
fixture:map-dpr-parity
fixture:map-active-destination-route-style
fixture:map-off-map-policy
fixture:map-source-fingerprint
fixture:map-visible-frame-ack
browser pixel probe
built-output geometry parity
Pages navigation smoke
```

Documentation only. No runtime architecture was implemented.