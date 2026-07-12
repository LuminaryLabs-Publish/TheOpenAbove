# Gameplay Audit: Flight Streaming and World Query Loop

**Timestamp:** `2026-07-12T11-01-59-04-00`

## Interaction loop

```txt
boot
  -> build world synchronously
  -> preserve legacy terrain around routes and towns
  -> create terrain, vegetation, grass, flowers and map
  -> start balloon at [0, 105, 0]

flight frame
  -> integrate balloon position and heading
  -> update mail and airstream
  -> move camera
  -> update terrain/horizon chunks around camera
  -> update grass/flower chunk windows around camera
  -> sample world height, moisture and flora for new candidates
  -> render

map
  -> pause gameplay update
  -> repeatedly draw cached world background plus live navigation data
```

## Gameplay-facing findings

### Query history leaks into snapshot state

The world descriptor exposes `cachedFeatureCells`. Flight, chunk generation and map construction can populate that cache. Two runs with the same gameplay state can therefore report different world descriptors because one camera or map queried more cells.

### World membership is not a gameplay rule

The balloon simulation has no hard world-radius admission. Terrain applies a disk edge mask, while grass and flower streamers follow camera chunks independently. No gameplay result states whether a balloon, parcel, town, flora candidate or rendered chunk is inside the admitted world.

### Protected anchors are build inputs without identity

Routes and towns influence terrain protection during world construction, but the resulting world descriptor does not contain an anchor fingerprint. A changed route/town set can produce a different protected surface under the same visible seed and radius.

## Missing gameplay authority

```txt
world build ID and revision
seed/config/anchor fingerprint
inside/outside/edge membership result
world-query sequence or pure-query guarantee
consumer adoption receipt
stale chunk/query rejection
mission/world compatibility result
world reset/rebuild transaction
visible world-frame receipt
```

## Required gameplay proof

```txt
same mission inputs + same world inputs
  -> same world artifact fingerprint
  -> same protected route/town terrain
  -> same flora membership
  -> same map background fingerprint

flight at disk edge
  -> typed membership result
  -> terrain/grass/flower/map agree

map open/closed
  -> no change to authoritative world descriptor

restart or rebuild
  -> old chunks and cache retired
  -> new revision adopted atomically
```

This audit does not change flight behavior. It defines the gameplay/world contract needed before the generated world can be treated as authoritative progression space.