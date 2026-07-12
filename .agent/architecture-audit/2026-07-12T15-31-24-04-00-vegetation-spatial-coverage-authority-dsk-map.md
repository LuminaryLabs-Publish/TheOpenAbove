# Architecture Audit: Vegetation Spatial Coverage Authority DSK Map

**Timestamp:** `2026-07-12T15-31-24-04-00`

## Summary

`open-above-vegetation-cluster-kit` is currently a deterministic object-construction kit, not a complete spatial-consumer domain. It creates fixed tree instances during visual-domain construction and offers no frame update, chunk requirement, adoption result, rollback, retirement or observation contract.

## Plan ledger

**Goal:** place tree coverage behind one domain authority that composes existing world, terrain, quality and renderer services without moving vegetation meaning into generic graphics or terrain kits.

- [x] Preserve `open-above-vegetation-cluster-kit` as the current source-backed placement implementation.
- [x] Keep world generation authoritative for terrain, moisture, flora and membership queries.
- [x] Keep terrain authoritative for committed surface-height consumption.
- [x] Keep Core Graphics-style rendering concerns separate from vegetation placement meaning.
- [x] Define a parent vegetation spatial-coverage domain.
- [x] Define identities, plans, results, budgets, lifecycle and proof kits.
- [ ] Implement the authority and migrate the visual domain to consume it.

## Current composition

```txt
visual-domain
  -> world-generation-kit
  -> terrain-surface-kit
  -> vegetation-cluster-kit
      -> boot seed
      -> 18 fixed cluster centers
      -> fixed trunk/crown instance matrices
      -> static treePositions exclusion list
  -> grass-field-domain
  -> flower-field-domain
```

## Required composition

```txt
open-above-vegetation-spatial-coverage-authority-domain
  identity
    -> vegetation-stream-session-id-kit
    -> vegetation-frame-id-kit
    -> vegetation-chunk-id-kit

  source binding
    -> vegetation-world-artifact-binding-kit
    -> vegetation-input-fingerprint-kit
    -> vegetation-seed-derivation-kit

  planning
    -> vegetation-coverage-plan-kit
    -> vegetation-chunk-requirements-kit
    -> vegetation-exclusion-policy-kit
    -> vegetation-budget-policy-kit

  candidate production
    -> vegetation-placement-kit
    -> vegetation-candidate-set-kit

  admission and lifecycle
    -> vegetation-admission-result-kit
    -> vegetation-chunk-adoption-kit
    -> vegetation-retirement-kit

  observation and proof
    -> vegetation-observation-kit
    -> vegetation-journal-kit
    -> vegetation-visible-frame-ack-kit
    -> vegetation-spatial-fixture-kit
    -> vegetation-browser-pages-fixture-kit
```

## Ownership boundaries

### Vegetation spatial coverage owns

```txt
where and when tree coverage is required
stable vegetation chunk identity
world-bound deterministic candidate production
route/town/lake/spacing exclusions
tree instance budgets and transition budgets
candidate adoption and predecessor retirement
active coverage and tree-position publication
vegetation-frame observations and visible acknowledgements
```

### World generation owns

```txt
world artifact identity
height, moisture, biome and flora samples
inside/edge/outside membership
canonical seed/config/anchor fingerprint
```

### Terrain owns

```txt
committed terrain surface revision
height and normal consumption contract
near/horizon presentation ownership
```

### Grass and flowers own

```txt
their own camera-relative chunk plans and rendering
consumption of the committed vegetation exclusion artifact
rejection of stale vegetation generations
```

### Rendering owns

```txt
instanced buffer allocation and draw submission
material/program generations
frustum and distance visibility execution
first frame acknowledgement after admitted vegetation adoption
```

## Required invariants

```txt
same world artifact + same vegetation inputs + same chunk ID -> same tree candidates
no candidate outside the admitted world becomes current
all current chunks cite one vegetation frame and world fingerprint
candidate failure preserves the last-good committed coverage
predecessor resources retire exactly once after successor adoption
grass and flower exclusion data cite the same vegetation generation
visible acknowledgement follows successful adoption, never candidate construction
```

## Migration ledge

```txt
extract current tree candidate generation
  -> parameterize by stable chunk ID and seed
  -> return detached candidate records
  -> construct candidate instance buffers outside live ownership
  -> atomically install required chunk groups
  -> publish active tree exclusion artifact
  -> retire old chunks and acknowledge the visible frame
```

This audit defines architecture only. It does not change runtime composition.