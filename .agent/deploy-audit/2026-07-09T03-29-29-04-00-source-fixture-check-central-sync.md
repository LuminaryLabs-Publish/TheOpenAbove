# Deploy Audit — Source Fixture Check Central Sync

**Timestamp:** `2026-07-09T03-29-29-04-00`

## Current deploy/check shape

```txt
package.json
  -> npm run check: node tests/smoke.mjs
  -> npm run build: npm run check && vite build

tests/smoke.mjs
  -> asserts index.html, src/main.js, balloon object-kit files, Vite base, and current hot-air-balloon smoke markers
```

## Missing deploy proof

```txt
scripts/open-above-source-fixture.mjs does not exist yet.
tests/smoke.mjs does not call a source fixture.
npm run check does not prove source manifest or GameHost source readback rows.
central ledger parity is not part of any fixture.
```

## Required next deploy gate

```txt
node scripts/open-above-source-fixture.mjs
npm run check
npm run build
```

## Fixture requirements

The source fixture must run without:

```txt
DOM
canvas
WebGL
window
requestAnimationFrame
Three.js renderer construction
```

## Central sync requirement

After source fixture implementation, `LuminaryLabs-Dev/LuminaryLabs/repo-ledger/LuminaryLabs-Publish/TheOpenAbove.md` must point at the same latest tracker and turn ledger as repo-local `.agent/kit-registry.json`.

## Validation in this pass

```txt
runtime source changed: no
npm install: no
npm run check: no
npm run build: no
browser smoke: no
GitHub Pages smoke: no
branch created: no
pull request created: no
pushed to main: yes
```
