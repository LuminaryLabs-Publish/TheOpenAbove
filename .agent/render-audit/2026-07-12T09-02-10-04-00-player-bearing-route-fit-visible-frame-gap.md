# Render Audit: Player Bearing, Route Fit and Visible-Frame Gap

**Timestamp:** `2026-07-12T09-02-10-04-00`

## Plan ledger

**Goal:** make the map canvas render a projection that is geometrically correct, viewport-fitted and attributable to one source revision.

- [x] Inspect CSS-space and device-pixel sizing.
- [x] Trace route, town and player drawing.
- [x] Compare map axes with simulation heading.
- [x] Quantify current content fit.
- [x] Inspect existing smoke coverage.
- [ ] Implement projection results and rendered-pixel fixtures.

## Current render path

```txt
ResizeObserver
  -> read CSS bounds
  -> cap DPR at 2
  -> resize backing canvas
  -> set CSS-space transform

map RAF
  -> clear
  -> draw parchment texture marks
  -> draw world disk
  -> draw every route
  -> draw every town and destination label
  -> draw player marker
  -> draw title
```

## Reversed marker

The player arrow is authored with its tip at negative local Y. The overlay rotates it by `-heading`. Because simulation heading is `atan2(vx, vz)` and screen axes are `(worldX, worldZ)`, the marker points to `(-vx, -vz)`.

```txt
northbound travel: marker points south
eastbound travel: marker points west
southbound travel: marker points north
westbound travel: marker points east
```

## Route-fit gap

```txt
world map radius source: 10000
farthest route/town content: about 3061
content radius utilization: about 30.6%
content area utilization relative to disk: about 9.4%
```

The map intentionally draws the full world disk, but it has no policy selecting between world-fit, mission-fit, route-fit or player-context fit. The current Air Mail route is consequently concentrated near the center of a large decorative disk.

## Additional render gaps

```txt
no declared compass or north orientation
no active-route style
no correct-route style
no out-of-bounds marker or edge arrow
no content padding contract
no fit behavior for portrait, square and wide canvases
no zero-horizontal-speed bearing policy
no projection revision
no source fingerprint
no first visible map-frame acknowledgement
```

## Existing test weakness

The smoke test checks that `drawRoute`, `drawTown`, `drawPlayer`, destination text and `ResizeObserver` appear in source. It does not execute the coordinate transform or compare expected marker pixels, route bounds, padding, DPR behavior or aspect-ratio parity.

## Required render proof

```txt
cardinal velocity vectors -> exact cardinal marker pixels
diagonal velocity vectors -> bounded angular error
route and town bounds -> inside declared viewport padding
portrait/square/wide -> identical world geometry under declared fit policy
DPR 1/1.5/2 -> identical CSS-space geometry
player outside bounds -> typed and visible edge policy
active/destination route -> expected style result
projection result -> matching visible-frame acknowledgement
```

## Completion boundary

Do not treat a visible map, correct town labels, a passing source-pattern smoke test or a successful build as proof of navigation correctness. The current player marker direction is source-provably reversed.