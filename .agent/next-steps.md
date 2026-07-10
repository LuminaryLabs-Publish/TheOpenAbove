# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-10T01-20-47-04-00`

## Next safe ledge

```txt
TheOpenAbove Source Consumer GameHost Readback Catch-up + Browser Fixture Gate
```

## Goal

Add source/readback proof without changing the visible route.

## Implementation order

```txt
1. Add canonical product and route source modules.
2. Add legacy campaign compatibility classification.
3. Add source manifest, fingerprint, snapshot, and acceptance ledger modules.
4. Add additive GameHost source readback.
5. Add DOM-free source fixture.
6. Wire the fixture into npm run check.
7. Run npm run check.
8. Run npm run build if check passes.
```

## Files to add

```txt
src/source/open-above-product.js
src/source/balloon-drift.config.js
src/source/legacy-flight-compatibility.js
src/source/source-consumer-manifest.js
src/source/source-fingerprint.js
src/source/source-snapshot.js
src/source/source-acceptance.js
src/source/source-consumer-ledger.js
src/source/gamehost-source-readback.js
scripts/open-above-source-fixture.mjs
```

## Fixture must prove

```txt
canonical Balloon Drift route source can load without DOM
legacy FLIGHT/campaign fields are classified explicitly
source fingerprints are stable
source snapshots are serializable
source acceptance rows are emitted
GameHost source projection has expected shape
fixture exits non-zero on missing required rows
```

## GameHost rule

Add source readback additively.

Do not remove or rename existing `local` or `nexusEngine` readback fields.

Expected future shape:

```txt
window.GameHost.getState()
  -> local
  -> nexusEngine
  -> source
       -> manifest
       -> fingerprint
       -> snapshot
       -> acceptanceRows
       -> fixtureVersion
```

## Avoid until proof exists

```txt
renderer extraction
visual-domain rewrite
camera retune
balloon visual changes
simulation constant retune
route expansion
legacy campaign field deletion
README-only rewrite
```

## Done when

```txt
npm run check includes source fixture
source fixture passes
GameHost exposes .source additively
central ledger points to the source fixture pass
root .agent docs point to the implementation timestamp
```
