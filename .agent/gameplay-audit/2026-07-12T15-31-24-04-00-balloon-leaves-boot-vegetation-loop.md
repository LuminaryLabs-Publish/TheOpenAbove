# Gameplay Audit: Balloon Leaves Boot Vegetation Coverage

**Timestamp:** `2026-07-12T15-31-24-04-00`

## Interaction loop

```txt
boot
  -> world surface admits a 10000-unit-radius disk
  -> tree clusters are sampled once near the central terrain extent
  -> balloon starts near world center

flight
  -> wind, airstream and controls integrate horizontal position
  -> only vertical terrain clearance is enforced
  -> camera follows the balloon
  -> terrain, grass and flowers follow camera chunk windows
  -> trees remain at their original boot positions

long traversal
  -> player reaches streamed terrain outside the fixed tree field
  -> the world remains navigable and low flora continues
  -> tree biome coverage is no longer represented by a current gameplay result
```

## Plan ledger

**Goal:** make tree presence a deterministic world-consumer rule rather than an incidental boot artifact.

- [x] Inspect horizontal movement and world-bound behavior.
- [x] Compare world radius with boot vegetation extents.
- [x] Compare tree lifecycle with camera-relative terrain and flora.
- [x] Identify gameplay-visible authority gaps.
- [ ] Define product policy for outside-world flight before runtime implementation.
- [ ] Prove tree coverage and biome continuity during long traversal.

## Source-backed findings

```txt
world radius: 10000
terrainSize: 2400
boot cluster count: 18
local cluster-center extent: 2832
wider cluster-center extent cap: 4200
maximum cluster spread: 340
horizontal balloon boundary: none
camera-relative vegetation update: none
```

The exact farthest generated tree depends on deterministic random centers and spread, but the construction is centrally bounded and materially smaller than the admitted world disk.

## Gameplay authority missing

```txt
world-edge flight policy
vegetation coverage requirements by camera/world cell
biome-to-tree-density result
current tree coverage result
coverage degraded/empty classification
mission route and vegetation compatibility
restart/rebuild vegetation generation
stale vegetation rejection
first visible coverage acknowledgement
```

## Required gameplay outcomes

```txt
Covered
Degraded
NaturallyTreeless
OutsideWorld
BuildDeferred
BuildFailedLastGoodRetained
RejectedStaleWorld
```

A treeless region can be valid only when produced by the world/biome policy. It must not be indistinguishable from the camera leaving a fixed boot mesh.

## Required proof

```txt
same world + same camera cells -> same vegetation coverage
route traversal -> no unintended empty tree corridor
world edge -> explicit membership and vegetation outcome
map open/closed -> no authority drift
restart/world replacement -> predecessor vegetation retired
candidate failure -> last-good coverage remains visible
```

Documentation only. Flight and vegetation behavior were not changed.