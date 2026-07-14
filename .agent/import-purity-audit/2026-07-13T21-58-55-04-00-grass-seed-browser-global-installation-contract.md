# Import-Purity Audit: Grass Seed Browser Global Installation Contract

**Timestamp:** `2026-07-13T21-58-55-04-00`

## Plan ledger

**Goal:** make `grass-world-seed-kit.js` a pure deterministic ESM and move legacy global exposure into an explicit, host-owned adapter.

- [x] Confirm Node/headless failure was repaired.
- [x] Confirm browser import still mutates `window`.
- [x] Compare behavior with the retained import-purity rule.
- [x] Define installer and disposal contracts.
- [ ] Implement the adapter and fixtures.

## Current source

```js
if (typeof window !== "undefined") {
  window.OpenAboveGrassWorldSeedKit = {
    id: GRASS_WORLD_SEED_KIT_ID,
    normalizeGrassSeed,
    hashGrassSeed,
    seedFloat
  };
}
```

## Assessment

The environment guard prevents a Node `ReferenceError`. It does not make browser import pure. Module evaluation still performs an ambient write that is unversioned, overwrite-prone and irreversible through the exported API.

## Required pure module

```txt
grass-world-seed-kit.js
  exports GRASS_WORLD_SEED_KIT_ID
  exports normalizeGrassSeed
  exports hashU32
  exports hashGrassSeed
  exports seedFloat
  performs zero global writes
  registers zero callbacks, timers or listeners
```

## Required adapter

```txt
grass-world-seed-compatibility-adapter.js
  inspectTarget(target)
  install(command)
  getPublication(publicationId)
  dispose(publicationId, ownerGeneration)
```

## Global facade

```txt
Object.freeze({
  id,
  apiRevision,
  publicationId,
  normalizeGrassSeed,
  hashGrassSeed,
  seedFloat
})
```

## Collision policy

```txt
vacant namespace
  -> install

same owner, revision and generation
  -> idempotent already-installed result

same owner, older generation
  -> reject unless explicit replacement policy is admitted

foreign or incompatible namespace
  -> preserve existing value and return foreign-collision
```

## Disposal policy

The adapter removes the global only when the live value still carries the publication ID and owner generation created by that adapter. Foreign or replacement values are preserved.

## Fixture gate

```txt
fixture:grass-seed-node-import-purity
fixture:grass-seed-worker-import-purity
fixture:grass-seed-browser-import-purity
fixture:grass-seed-explicit-install
fixture:grass-seed-idempotent-install
fixture:grass-seed-collision-rejection
fixture:grass-seed-stale-generation
fixture:grass-seed-owned-disposal
fixture:grass-seed-foreign-global-preservation
```

## Retained rule

Any compatibility global required by a legacy page is installed by the host after product and runtime admission and removed during disposal. The reusable kit remains side-effect free.