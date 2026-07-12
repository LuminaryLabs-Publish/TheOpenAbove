# Validation: TheOpenAbove

**Last aligned:** `2026-07-12T09-02-10-04-00`

## Scope

Documentation-only audit of parchment-map coordinate space, player bearing, content bounds, viewport fit, route styling, off-map policy and visible-frame provenance through source revision `4b76ec275102be3a9358d866bcbfd816ac270c04`.

## Plan ledger

**Goal:** distinguish source-backed map drawing from executable proof that the map points in the correct direction, fits mission content and projects one attributable navigation frame.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove`.
- [x] Read guidance, page shell, host, map overlay, world config, simulation, routes, mail domain, smoke tests and root `.agent` state.
- [x] Confirm map axes are world X to screen X and world Z to screen Y.
- [x] Confirm simulation heading is `atan2(wind.x, wind.z)`.
- [x] Confirm the upward marker is rotated by `-heading`.
- [x] Derive the resulting opposite-travel marker vector.
- [x] Confirm map scale uses the 10,000-unit world radius.
- [x] Measure the farthest current route/town extent at about 3,061 units.
- [x] Confirm no active-route, off-map, projection-result or geometry fixture exists.
- [x] Reconcile 60 active source-backed kits and services.
- [x] Define pure, browser, build and Pages proof requirements.
- [x] Change no runtime source, HTML, dependency, script or workflow.
- [x] Create no branch or pull request.

## Source-backed behavior

```txt
world surface center and radius are captured when the overlay is created
worldToMap maps world X to screen X and world Z to screen Y
scale is 0.72 * min CSS dimension / (2 * world radius)
all routes are drawn with one dashed policy
parcel destination town is highlighted
player position and heading are read live per map frame
player marker local forward points upward
player marker rotates by negative simulation heading
canvas backing resolution follows capped DPR
```

## Source-backed defect proof

```txt
heading = atan2(vx, vz)
arrowForward = (0, -1)
rotation = -heading
rotatedArrow = (-sin heading, -cos heading)
rotatedArrow = (-vx/speed, -vz/speed)
```

The player marker is exactly antiparallel to horizontal travel for every nonzero vector.

## Source-backed fit evidence

```txt
world radius: 10000
Brookhaven radius: sqrt(1900^2 + 2400^2) ~= 3061
Sunvale radius: sqrt(1850^2 + 2200^2) ~= 2874
Cloudmere radius: sqrt(1600^2 + 1800^2) ~= 2408
maximum content/world ratio: ~= 0.306
```

## Source-backed gaps

```txt
no coordinate-space schema
no canonical map-bearing service
no zero-speed bearing policy
no content-bounds derivation
no named viewport-fit policy
no content padding result
no active/correct route style
no off-map policy
no navigation projection revision
no source fingerprint
no typed projection result
no visible-frame acknowledgement
no executable geometry fixture
```

## Required static fixtures

```txt
fixture:map-spatial-authority-present
fixture:direct-negative-heading-rotation-removed
fixture:named-fit-policy-present
fixture:off-map-policy-present
fixture:projection-result-present
fixture:visible-map-frame-ack-present
```

## Required pure fixtures

```txt
fixture:map-heading-cardinals
fixture:map-heading-diagonals
fixture:map-zero-speed-bearing
fixture:map-coordinate-roundtrip
fixture:map-route-content-bounds
fixture:map-fit-wide-square-portrait
fixture:map-dpr-css-geometry-parity
fixture:map-active-route-style
fixture:map-correct-destination-route-style
fixture:map-off-map-policy
fixture:map-source-fingerprint
fixture:map-stale-projection-rejection
```

## Required browser fixtures

```txt
boot actual page and open map
place or drive balloon through known cardinal and diagonal states
sample marker tip/body pixels and compare with expected bearing
verify all required route/town content lies inside declared padding
resize to portrait, square and wide surfaces
change DPR across supported values
verify CSS-space projection parity
verify active, correct and destination route styles
move player beyond admitted bounds and verify edge policy
capture MapProjectionResult and matching MapVisibleFrameAck
```

## Required built-output checks

```txt
dist contains spatial-navigation authority and fixtures
built imports resolve under project base path
source and built projection fingerprints match
built map no longer derives navigation geometry through unversioned draw-time guesses
```

## Required Pages smoke

```txt
load deployed route for an exact commit
open map
prove player marker bearing against known movement
prove mission-content fit and route styling
prove portrait/wide and DPR parity
prove off-map policy
capture screenshot and matching visible-frame acknowledgement
```

## Commands not run

```txt
npm install
npm run check
npm run headless:check
npm run build
browser map geometry matrix
Pages map navigation smoke
```

The connector environment supplied source and write access, not a checked-out browser runtime. No executable map geometry or rendering correctness claim is made.

## Change-state validation

```txt
runtime JavaScript changed: no
HTML changed: no
package scripts changed: no
dependencies changed: no
gameplay changed: no
input behavior changed: no
render behavior changed: no
accessibility behavior changed: no
deployment workflow changed: no
branch created: no
pull request created: no
.agent documentation changed: yes
```

## Completion boundary

Do not claim the parchment map is navigation-authoritative until executable proof shows correct cardinal/diagonal bearing, declared fit policy, aspect/DPR parity, route-style parity, off-map behavior, stale-result rejection and visible-frame provenance.