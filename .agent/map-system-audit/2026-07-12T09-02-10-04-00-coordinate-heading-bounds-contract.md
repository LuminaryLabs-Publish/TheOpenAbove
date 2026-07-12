# Map System Audit: Coordinate, Heading and Bounds Contract

**Timestamp:** `2026-07-12T09-02-10-04-00`

## Plan ledger

**Goal:** declare one mathematical contract for map axes, bearing, bounds, viewport fit and off-map behavior.

- [x] Derive current coordinate and angle conventions from source.
- [x] Prove the marker reversal.
- [x] Inventory world, route and town extents.
- [x] Define a replacement contract.
- [ ] Implement and validate it.

## Current conventions

```txt
world horizontal axes: X and Z
map axes: +X right, +Z down
marker authored forward: screen up
simulation heading: atan2(windX, windZ)
marker rotation: -heading
```

These conventions are individually plausible but incompatible when composed.

## Correct bearing derivation

For the existing map axis convention and an arrow authored upward, the required canvas angle is:

```txt
bearing = atan2(horizontalVelocityX, -horizontalVelocityZ)
```

Equivalent implementations are acceptable only if the coordinate-space schema and marker-forward convention are explicit and covered by cardinal fixtures.

Do not blindly reuse the 3D model yaw. Model-forward correction, world heading and map bearing are separate concepts.

## Bounds contract

Current source extents:

```txt
world center: (0, 0)
world radius: 10000
Brookhaven: (-1900, -2400), radius ~= 3061
Sunvale: (1850, -2200), radius ~= 2874
Cloudmere: (1600, 1800), radius ~= 2408
route endpoints match those towns
```

The map requires an explicit fit choice:

```txt
world-fit
  preserve the complete bounded world disk

mission-fit
  fit all current route points, towns and required margin

player-context-fit
  fit mission content plus player and edge policy
```

The chosen policy must be named, revisioned and observable. Decorative world-disk rendering must not silently determine navigation scale.

## Off-map contract

The simulation does not enforce a hard world-radius clamp. The map must define behavior when the player is outside admitted content or world bounds:

```txt
expanded fit
edge clamp with bearing arrow
explicit off-map badge
or typed hidden state
```

Silent drawing outside the canvas is not an acceptable authority.

## Route-style contract

```txt
normal route
active/captured route
correct parcel route
destination route
completed route
unavailable route
```

Styles must derive from route, airstream and mail state, not from color convention alone.

## Required fixtures

```txt
velocity (0, -1) -> marker up
velocity (1, 0) -> marker right
velocity (0, 1) -> marker down
velocity (-1, 0) -> marker left
all diagonal bearings within declared tolerance
zero velocity follows declared last-bearing policy
all mission content fits within padding
world-fit and mission-fit produce distinct named results
player outside bounds follows declared off-map result
DPR and aspect changes preserve CSS-space world geometry
```

## Completion boundary

The current map is not navigation-authoritative because its marker is reversed and its fit policy is implicit. Documentation does not fix either defect.