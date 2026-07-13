# Gameplay Audit: Mountain Height and Collision Adoption Loop

**Timestamp:** `2026-07-13T18-40-52-04-00`

## Summary

Balloon clearance and world interaction use `terrainHeight`, so the resolved elevation can affect gameplay. However, gameplay receives no typed collision-channel artifact or foundation revision. A visible mountain and the collision sampler may agree by implementation today, but their agreement is not an admitted or inspectable contract.

## Plan ledger

**Goal:** ensure the mountain’s physical shape, collision behavior, route safety, and visible terrain share one accepted foundation revision.

- [x] Trace mountain elevation into `terrainHeight`.
- [x] Trace `terrainHeight` into balloon simulation and mail placement.
- [x] Inspect the compiled collision channel.
- [x] Identify missing revision and route-membership proof.
- [ ] Add collision adoption receipts and fixtures.

## Current loop

```txt
mountain feature
  -> foundation elevation sampler
  -> world.sampleHeight
  -> terrain.terrainHeight
  -> balloon simulation terrain clearance
  -> vegetation and delivery placement queries
```

The compiler emits a `foundation-heightfield` collision channel, but the product does not read or publish it. Collision behavior is inferred from the same composed height function.

## Risks

```txt
feature or lifecycle changes do not invalidate the compiled global cell
collision users cannot cite a foundation revision
route/town protection is owned by the base generator, not revalidated against the mountain
no fixture proves the mountain does not intersect required Air Mail corridors or towns
no fixture correlates visual slope with balloon clearance
```

## Required result

```txt
FoundationCollisionAdoptionResult
  -> feature and foundation revisions
  -> collision channel fingerprint
  -> accepted route/town exclusion report
  -> terrainHeight adapter revision
  -> gameplay consumer receipts
  -> first matching visible terrain frame
```
