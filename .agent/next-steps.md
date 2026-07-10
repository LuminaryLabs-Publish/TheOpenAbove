# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-10T06-08-36-04-00`

## Next safe ledge

```txt
TheOpenAbove Source Fixture Ledger Refresh + GameHost Headless Gate
```

## Goal

Add source/readback proof without changing the visible route.

Use the existing smoke test and headless editor surface as validation callers after the source fixture exists.

## Implementation order

```txt
1. Add canonical product and route source modules.
2. Add legacy campaign/free-flight compatibility classification.
3. Add source manifest, fingerprint, snapshot, acceptance ledger, and consumer ledger modules.
4. Add additive GameHost source readback.
5. Add DOM-free source fixture.
6. Extend project.check/headless runtime.getState so headless checks prove source rows too.
7. Wire the source fixture into npm run check before the existing smoke test.
8. Run npm run check.
9. Run npm run headless:check.
10. Run npm run build if check passes.
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
legacy README/campaign/FLIGHT fields are classified explicitly
source fingerprints are stable
source snapshots are serializable
source acceptance rows are emitted
source consumer rows identify src/main.js, simulation, visual-domain, smoke, and headless consumers
GameHost source projection has expected shape
headless project.check includes source rows
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
       -> consumerRows
       -> fixtureVersion
       -> headlessStatus
```

## Avoid until proof exists

```txt
renderer extraction
terrain extraction
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
npm run headless:check includes source fixture output
source fixture passes
GameHost exposes .source additively
central ledger points to the source fixture pass
root .agent docs point to the implementation timestamp
```
