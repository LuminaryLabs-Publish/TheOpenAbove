# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-12T09-02-10-04-00`

## Primary ordered gaps

```txt
1. immutable runtime admission
2. import purity and single frame owner
3. balloon profile and model authority
4. runtime session/listener/resource ownership
5. fixed-step clock and sequenced input
6. product source and acceptance parity
7. Air Mail route, delivery and mission reset
8. committed observation and public host capabilities
9. frame-stage failure containment
10. terrain source, LOD and atomic replacement
11. grass spatial identity and world-surface parity
12. balloon steering and presentation coherence
13. HDR attachment and render-surface resolution authority
14. parchment map pause and input authority
15. parchment map spatial-navigation authority
16. semantic mission status and fatal accessibility authority
```

## Parchment map spatial-navigation gaps

```txt
player marker points opposite horizontal travel
no explicit coordinate-space schema
no declared north or handedness convention
no canonical map-bearing conversion
no zero-horizontal-speed bearing policy
no world-fit versus mission-fit policy
no route/town/player content-bounds authority
no content padding contract
no portrait/square/wide fit parity
no DPR geometry parity proof
no active-route style
no correct parcel-route style
no destination-route result
no off-map or edge-clamp policy
no projection command or projection result
no navigation revision
no source fingerprint
no visible-map-frame acknowledgement
no pure geometry fixtures
no browser pixel probe
no deployed Pages navigation smoke
```

## Concrete marker defect

```txt
simulation heading = atan2(vx, vz)
map local arrow forward = (0, -1)
map rotation = -heading
map axes = (worldX, worldZ)

rendered arrow = (-vx, -vz)
```

Cardinal result:

```txt
travel north -> arrow south
travel east  -> arrow west
travel south -> arrow north
travel west  -> arrow east
```

## Concrete fit gap

```txt
WORLD.surface.radius: 10000
farthest current route/town radius: about 3061
content radius use: about 30.6%
content area use relative to map disk: about 9.4%
```

The map does not declare whether this is intentional world-fit behavior or an accidental result of using the terrain world surface as the navigation viewport.

## Retained map pause/input gaps

```txt
map state is one mutable open Boolean
no transition command, phase or generation
no pause participant barrier
simulation and map own independent global keyboard listeners
flight key Set remains mutable while map is open
main and map RAF loops remain independently owned
no deterministic focus transfer or restoration
map dispose is not invoked through host lifecycle
no first visible map or resumed-flight frame receipt
```

## Accessibility and product-feedback gaps

```txt
semantic mission status was not reintroduced after HUD removal
ordinary control hints are no longer visible
current parcel message is not visible outside diagnostics
map canvas has no semantic route/player equivalent
fatal <pre> lacks alert role and focus transaction
```

## Retained HDR, frame-failure, host and lifecycle gaps

```txt
color/depth surface sizing paths remain inconsistent
attachment ownership and rollback remain unimplemented
post-start RAF stages lack complete failure containment
last-known-good frame and failed-session capability revocation remain unimplemented
window.GameHost exposes raw mutable owners
runtime session does not own all callbacks/listeners/resources
balloon model/profile load lacks complete identity and generation fences
mission reset is not one atomic cross-owner transaction
```

## Required spatial-navigation fixtures

```txt
fixture:map-heading-cardinals
fixture:map-heading-diagonals
fixture:map-zero-speed-bearing
fixture:map-route-content-bounds
fixture:map-fit-wide-square-portrait
fixture:map-dpr-parity
fixture:map-active-route-style
fixture:map-correct-destination-route-style
fixture:map-off-map-policy
fixture:map-source-fingerprint
fixture:map-stale-projection-rejection
fixture:map-visible-frame-ack
fixture:browser-map-pixel-probe
fixture:pages-map-navigation-parity
```

Do not treat a visible parchment map, correct town labels, a passing source-pattern test, a successful build or the absence of console errors as proof that the map points, fits or guides correctly.