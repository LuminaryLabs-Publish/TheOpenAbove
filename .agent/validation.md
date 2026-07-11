# Validation: TheOpenAbove

**Last aligned:** `2026-07-11T03-01-38-04-00`

## Scope

Documentation-only reconciliation of the terrain-surface runtime and smoke-test commits that landed after the prior audit. This pass changed no runtime source, package script, dependency, route behavior, rendering behavior or deployment configuration.

## Validation performed

```txt
full Publish inventory reviewed: yes
central ledger timestamps compared: yes
nine eligible repositories tracked with root .agent: yes
TheCavalryOfRome excluded: yes
selected only TheOpenAbove: yes
recent commits reviewed: yes
terrain surface source read: yes
terrain chunk streaming source read: yes
visual-domain terrain consumption read: yes
smoke/package coverage read: yes
terrain vertex and chunk census derived from source: yes
runtime source changed by this pass: no
branch created: no
pull request created: no
push target: main
```

## Reconciled source commits

```txt
5ce61d3a995ab5dfa0d26bd2bd38f4072de91b7b  feat: smooth terrain into Frutiger Aero gradients
aa447b2ccdb06ea43e9940a45f7e5263169b579b  test: lock smooth world-space terrain surface
```

## Existing commands

```txt
npm run check
npm run build
npm run headless:status
npm run headless:inspect
npm run headless:renderer
npm run headless:check
npm run headless:build
```

## Missing commands

```txt
npm run fixture:runtime-admission
npm run fixture:runtime-lifecycle
npm run fixture:clock-parity
npm run fixture:terrain-surface
npm run fixture:terrain-lod-seams
npm run fixture:terrain-rebuild-budget
npm run fixture:meadow-lift-route
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

The GitHub connector environment provided source and commit inspection but not a checked-out runtime workspace. No CI status checks were attached to the current terrain-test commit.

## Source-inspection proof

```txt
terrain color is now derived from world coordinates, height, moisture and slope
random color and normal DataTextures are absent
repeated texture settings and normal map are absent
material uses vertexColors with roughness 0.88
chunk size is 520 meters
high-quality LOD segments are 72 / 40 / 20
chunk slope sampleStep equals chunkSize / segments
terrainColor uses that slope for soft-rock blending
chunk normals are computed independently with computeVertexNormals
camera chunk-center changes synchronously call rebuild
source smoke checks strings and forbidden implementation patterns
```

## Derived workload proof

For quality tier `high` with chunk radius three:

```txt
required chunks at initial center: 37
LOD 0 chunks: 5
LOD 1 chunks: 16
LOD 2 chunks: 16
total vertices across the initial set: 60,597
terrain-height evaluations per vertex for height and finite-difference slope: 5
minimum height-field evaluations for an empty initial set: 302,985
```

This is a source-derived upper-bound census for the synchronous empty-set build, not a measured browser duration.

## Missing numeric proof

```txt
no fixed coordinate sample table for terrainColor
no surface descriptor or fingerprint
no equality proof across LOD slope radii
no shared-edge height/color/normal fixture
no mixed-LOD seam threshold
no initial-load or transition build-duration measurement
no typed chunk build/admission result
no detached GameHost terrain observation
```

## Required proof

```txt
fixed source revision produces stable descriptor and fingerprint
same world coordinate produces equal authoritative slope and color at every LOD
shared chunk edges meet declared height/color/normal tolerances
chunk replacement occurs only after continuity preflight
initial and boundary-transition work remain within a declared budget
terrain observations are bounded, detached and JSON-safe
20/30/60/120 Hz schedules still produce equal authoritative simulation fingerprints
mission elapsed derives from fixed simulation ticks
```

## Push state

```txt
repo-local docs pushed to main: in progress until final repo-local write
central ledger updated: pending
central internal change log added: pending
```