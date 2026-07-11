# Validation: TheOpenAbove

**Last aligned:** `2026-07-11T18-01-38-04-00`

## Scope

Documentation-only audit of grass chunk spatial identity, camera-centered membership, manual culling distance, backend execution truth, visible-set commit and render observation. This pass inspected checked-in source and did not execute the browser, WebGL renderer, WebGPU compute, Node tests, build, headless editor or deployed Pages site.

## Plan ledger

**Goal:** distinguish generated grass membership from the grass actually visible and rendered, then define the fixture gate required before camera-centered or WebGPU grass culling can be claimed.

- [x] Review the complete Publish repository inventory.
- [x] Compare all eligible repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove`.
- [x] Read `src/visual/grass-field/grass-world-seed-kit.js` through the current registry and prior audits.
- [x] Read `src/visual/grass-field/grass-chunk-placement-kit.js`.
- [x] Read `src/visual/grass-field/grass-lod-kit.js`.
- [x] Read `src/visual/grass-field/grass-compute-culling-kit.js`.
- [x] Read `src/visual/grass-field/grass-field-domain.js`.
- [x] Read `src/visual/visual-domain.js`.
- [x] Read `tests/smoke.mjs`.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Define chunk identity, bounds, cull policy, backend truth, visible-set and frame fixtures.
- [x] Change no runtime source, dependency, package script or workflow.
- [x] Create no branch or pull request.

## Source-backed behavior

```txt
chunk membership
  -> camera position rounded to 520 m chunk coordinates
  -> required offsets classified by quality and distance

placement
  -> candidate x/z derived from chunk coordinate and chunk size
  -> candidate transforms are absolute world-space values

mesh construction
  -> candidate transforms encoded in instance matrices
  -> InstancedMesh object remains at default origin

manual culling
  -> distance = camera.position.distanceTo(mesh.position)
  -> maxDistance = 520 * 4.2 = 2184 m
  -> every active mesh uses the same origin-based distance
```

## Source-backed result

```txt
camera within 2184 m of origin
  -> all active chunks receive the same passing range result

camera beyond 2184 m of origin
  -> all active chunks receive the same failing range result
  -> newly generated center chunks remain invisible
```

This result follows directly from checked-in control flow. It was not executed in a browser during this pass.

## Backend source result

```txt
navigator.gpu exists
  -> backend = webgpu-compute

cullChunk execution
  -> CPU distance comparison
  -> dispatchedWorkgroups increments

missing
  -> adapter
  -> device
  -> pipeline
  -> buffers
  -> encoder
  -> dispatchWorkgroups
```

The current backend label and workgroup counter are not valid GPU execution proof.

## Existing proof

`npm run check` runs `tests/smoke.mjs`. Current grass assertions verify source files, names, imports, constants, WGSL text and backend labels. No current fixture proves:

```txt
chunk world center or bounds
per-chunk cull distance
camera-centered visibility
origin-radius crossing
long-distance grass retention
return-path visible-set parity
selected-versus-executed backend truth
actual GPU dispatch
accepted-versus-visible counts
visible-set atomic commit
first visible grass frame
Pages traversal parity
```

## Required pure fixtures

```txt
fixture:grass-chunk-identity
fixture:grass-chunk-center
fixture:grass-chunk-world-bounds
fixture:grass-bounds-distance
fixture:grass-lod-classification
fixture:grass-cull-policy
fixture:grass-backend-selection
fixture:grass-backend-execution-truth
fixture:grass-visible-set-commit
fixture:grass-state-fingerprint
```

## Required host/browser fixtures

```txt
fixture:grass-origin-neighborhood
fixture:grass-first-center-transition
fixture:grass-origin-radius-crossing
fixture:grass-camera-centered-retention
fixture:grass-return-path-parity
fixture:grass-quality-lod-transition
fixture:grass-cpu-backend-observation
fixture:grass-webgpu-backend-observation
fixture:grass-first-visible-frame
fixture:grass-pages-traversal-parity
```

## Required CPU proof

```txt
selected backend = cpu-chunk-culling
executed backend = cpu-chunk-culling
GPU dispatch count = 0
GPU workgroup count = 0
per-chunk decisions use committed world bounds
```

## Required WebGPU proof

```txt
adapter and device acquired
pipeline and buffers constructed
dispatch submitted
workgroup count observed from actual dispatch
results read and committed
failure and fallback results typed
```

WGSL source and `navigator.gpu` presence are insufficient.

## Commands not run

```txt
npm install
npm run check
npm run build
headless commands
browser smoke
WebGPU smoke
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

Do not claim camera-centered grass visibility until the origin-crossing browser fixture proves the current camera neighborhood remains visible and every committed decision references its own chunk bounds. Do not claim WebGPU compute culling until backend observations prove an actual pipeline and dispatch produced the committed visible set.
