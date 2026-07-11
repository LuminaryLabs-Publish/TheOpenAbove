# Deploy Audit: Grass Traversal Culling Fixture Gate

**Timestamp:** `2026-07-11T18-01-38-04-00`

## Summary

The existing smoke test proves source presence and string patterns. It does not execute grass chunk placement, camera-centered rebuild, culling, backend selection or a long-distance browser traversal. The deployed route can therefore pass current checks while all grass disappears beyond the global-origin cull radius.

## Existing package surface

```txt
npm run check
  -> node tests/smoke.mjs

npm run build
  -> npm run check
  -> vite build

headless:status
headless:inspect
headless:renderer
headless:check
headless:build
```

## Existing grass assertions

The smoke test confirms:

```txt
grass source files exist
visual domain imports and updates grass field
grass domain uses InstancedMesh
placement uses deterministic seed helpers
LOD constants exist
WGSL compute source exists
navigator.gpu and backend labels exist
```

It does not prove behavior.

## Missing pure fixtures

```txt
fixture:grass-chunk-center
fixture:grass-chunk-world-bounds
fixture:grass-bounds-distance
fixture:grass-cull-policy
fixture:grass-visible-set-commit
fixture:grass-backend-selection
fixture:grass-backend-execution-truth
fixture:grass-state-fingerprint
```

## Missing host fixtures

```txt
fixture:grass-origin-neighborhood
fixture:grass-first-center-transition
fixture:grass-origin-radius-crossing
fixture:grass-camera-centered-retention
fixture:grass-return-path-parity
fixture:grass-quality-lod-transition
fixture:grass-first-visible-frame
fixture:grass-cpu-backend-observation
fixture:grass-webgpu-backend-observation
```

## Required browser traversal

```txt
1. Boot at the initial camera position.
2. Capture camera center, required chunks, visible chunks and visible instances.
3. Move the camera across multiple 520 m center boundaries.
4. Cross 2184 m camera distance from the world origin.
5. Confirm the current center chunk and neighborhood remain visible.
6. Confirm every cull decision references its own chunk bounds.
7. Return to a previous center and compare fingerprints.
8. Correlate the visible set with the submitted frame.
```

## Required Pages parity

```txt
source commit SHA
module graph fingerprint
quality tier
camera path fixture ID
camera-center revisions
visible-set fingerprints
backend selection and execution evidence
render-frame acknowledgements
```

Local and deployed results must match for the same selected quality and deterministic camera path.

## Required backend proof

### CPU

```txt
selected backend = cpu-chunk-culling
executed backend = cpu-chunk-culling
GPU dispatch count = 0
GPU workgroup count = 0
```

### WebGPU

```txt
adapter acquired
device acquired
pipeline created
buffers bound
dispatch submitted
workgroup count observed
result read and committed
fallback and failure paths typed
```

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

## Completion boundary

Do not claim camera-centered grass culling or WebGPU compute culling until the origin-crossing browser fixture proves the current camera neighborhood remains visible and backend observations prove the execution path that produced the committed visible set.
