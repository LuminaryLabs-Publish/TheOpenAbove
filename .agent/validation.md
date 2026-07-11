# Validation: TheOpenAbove

**Last aligned:** `2026-07-11T16-30-25-04-00`

## Scope

Documentation-only audit of terrain LOD classification, retained horizon chunk behavior, build work, atomic replacement and render observation. This pass inspected checked-in source and did not execute the browser, WebGL renderer, Node tests, build, headless editor or deployed Pages site.

## Plan ledger

**Goal:** distinguish declared terrain LOD policy from the geometry actually retained and rendered, then define the fixture gate required before distance-based terrain LOD or bounded replacement can be claimed.

- [x] Review the complete Publish repository inventory.
- [x] Compare all eligible repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove`.
- [x] Read `src/visual/landscape/terrain-surface-kit.js`.
- [x] Read `src/visual/landscape/terrain-chunk-streaming-kit.js`.
- [x] Read `src/visual/landscape/terrain-horizon-streaming-kit.js`.
- [x] Read `src/visual/visual-domain.js`.
- [x] Read prior terrain and observation audits.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Define terrain classification, transition, budget, edge, replacement and observation fixtures.
- [x] Change no runtime source, dependency, package script or workflow.
- [x] Create no branch or pull request.

## Source-backed behavior

```txt
near required map
  -> stores intended lod per key
  -> compares with mesh.userData.chunk.lod
  -> removes and rebuilds mismatches

horizon required set
  -> stores key only
  -> segment policy runs only inside buildGeometry
  -> existing keys skip createChunk
  -> retained geometry is not reclassified
```

## Source-backed example

```txt
horizon center 0:0
chunk 5:0 distance 5200 m
segmentsForDistance = 4

horizon center 2:0
same chunk distance 3120 m
segmentsForDistance = 10
same key remains required
existing chunk skips creation
actual geometry remains 4 segments
```

This result follows directly from checked-in control flow. It was not executed in a browser during this pass.

## Existing proof

`npm run check` runs `tests/smoke.mjs`. The package also exposes headless status, inspect, renderer, check and build commands. No current fixture proves:

```txt
retained horizon chunk reclassification
current intended versus actual segment parity
far-to-near LOD upgrade
near-to-far LOD downgrade
same-pose traversal-path independence
terrain or quality revision invalidation
bounded geometry-build work
stale build-result rejection
atomic no-gap replacement
edge continuity during replacement
first visible replacement frame
old geometry frame retirement
Pages terrain fingerprint parity
```

## Required pure fixtures

```txt
fixture:terrain-chunk-identity
fixture:terrain-source-revision
fixture:terrain-lod-policy
fixture:terrain-lod-classification
fixture:terrain-transition-plan
fixture:terrain-build-budget
fixture:terrain-build-result
fixture:terrain-stale-build-result
fixture:terrain-active-map-fingerprint
```

## Required host/browser fixtures

```txt
fixture:horizon-retained-upgrade
fixture:horizon-retained-downgrade
fixture:terrain-three-band-traversal
fixture:terrain-path-independence
fixture:terrain-atomic-replacement
fixture:terrain-no-gap-frame
fixture:terrain-edge-continuity
fixture:terrain-first-visible-replacement-frame
fixture:terrain-old-geometry-retirement
fixture:terrain-committed-observation-correlation
fixture:terrain-pages-parity
```

## Commands not run

```txt
npm install
npm run check
npm run build
headless commands
browser smoke
Pages smoke
```

The connector environment provided source and write access, not a checked-out browser/GPU runtime. No command execution is claimed.

## Change-state validation

```txt
runtime JavaScript changed: no
package scripts changed: no
dependencies changed: no
route behavior changed: no
gameplay behavior changed: no
render behavior changed: no
deployment workflow changed: no
branch created: no
pull request created: no
.agent documentation changed: yes
```

## Completion boundary

Do not claim current camera-relative horizon LOD until every required active key reports current intended and actual segment identities, mismatches enter a typed bounded transition, complete geometry remains visible through replacement, and browser/Pages fixtures prove traversal-path-independent active terrain.