# Deploy Audit: World Boundary Parity Fixture Gate

**Timestamp:** `2026-07-11T21-08-57-04-00`

## Summary

The existing smoke test confirms that bounded-disk source patterns and grass source patterns exist. It does not execute a boundary traversal or prove that terrain, grass, simulation and GameHost agree on world membership.

## Existing checks

```txt
npm run check
  -> node tests/smoke.mjs
  -> file-existence assertions
  -> regular-expression source assertions
  -> pure airstream/mail tests

npm run build
  -> npm run check
  -> Vite build
```

## Current coverage

```txt
bounded-disk config text exists
pinned disk-world ProtoKit import exists
bounded height and edgeMask calls exist
near and horizon intersectsBounds calls exist
grass UV varying exists
stable cloud jitter source exists
```

## Missing executable proof

```txt
point and bounds classification at exact edge distances
terrain/grass membership parity
no grass outside an absent support surface
correct grass chunk center and bounds culling
balloon boundary response and re-entry
route/town membership validation
surface revision stale-result rejection
first visible boundary frame
Pages boundary traversal
```

## Required pure fixtures

```txt
fixture:surface-point-classification
fixture:surface-bounds-classification
fixture:surface-edge-mask-continuity
fixture:surface-consumer-policy
fixture:surface-revision-stale-result
```

## Required browser fixtures

```txt
fixture:terrain-grass-membership-parity
fixture:no-unsupported-visible-grass
fixture:grass-origin-independent-culling
fixture:balloon-boundary-response
fixture:boundary-reentry
fixture:boundary-visible-frame
```

## Required Pages smoke

```txt
start Air Mail
move or inject camera/balloon positions across radius - blend, radius and radius + blend
capture GameHost membership and consumer parity
assert terrain and grass committed sets match policy
assert selected boundary response is deterministic
assert visible frame acknowledges the same surface revision
```

## Failure classes

```txt
surface-schema-invalid
surface-query-invalid
surface-revision-stale
terrain-grass-membership-mismatch
unsupported-grass-visible
simulation-policy-missing
content-outside-surface
visible-frame-revision-mismatch
```

## Completion boundary

Do not claim bounded-world correctness from source-pattern assertions. The claim requires executed pure classification tests, browser traversal, consumer parity results, deterministic simulation response and a deployed visible-frame receipt.