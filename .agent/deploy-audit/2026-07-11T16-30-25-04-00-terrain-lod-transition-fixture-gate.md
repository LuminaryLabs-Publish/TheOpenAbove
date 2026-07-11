# Deploy Audit: Terrain LOD Transition Fixture Gate

**Timestamp:** `2026-07-11T16-30-25-04-00`

## Goal

Define the executable proof required before local, headless, browser or deployed Pages builds can claim current camera-relative terrain LOD and stable replacement behavior.

## Current validation surface

```txt
npm run check
npm run headless:status
npm run headless:inspect
npm run headless:renderer
npm run headless:check
npm run build
browser smoke
Pages smoke
```

None of the current commands proves retained horizon chunks are reclassified when the camera-relative distance band changes.

## Required pure fixtures

```txt
fixture:terrain-lod-classification
fixture:horizon-retained-upgrade
fixture:horizon-retained-downgrade
fixture:terrain-path-independence
fixture:terrain-source-revision
fixture:terrain-quality-revision
fixture:terrain-transition-plan
fixture:terrain-build-budget
fixture:terrain-stale-build-result
fixture:terrain-active-map-fingerprint
```

## Required render/host fixtures

```txt
fixture:terrain-atomic-replacement
fixture:terrain-no-gap-frame
fixture:terrain-edge-continuity
fixture:terrain-first-visible-replacement-frame
fixture:terrain-old-geometry-retirement
fixture:terrain-committed-observation-correlation
```

## Required browser path

```txt
boot at center 0:0
observe horizon chunk 5:0 as 4 segments
move camera until coarse center 2:0
observe intended policy for 5:0 as 10 segments
wait within declared build budget and transition latency
verify committed geometry becomes 10 segments
verify no uncovered frame
reverse movement and verify deterministic downgrade
repeat through a second traversal path
compare active-terrain fingerprints at the same final camera pose
```

## Required deployed evidence

```txt
source commit SHA
terrain source revision
quality revision
LOD policy revision
fixture result fingerprint
browser/WebGL capability fingerprint
Pages deployment URL and commit
active terrain fingerprint at checkpoints
frame-budget observations
```

## Rejection conditions

Deployment readiness must remain false when:

```txt
retained chunk actual LOD differs from intended LOD without a reported deferred transition
candidate geometry was built against a stale terrain or quality revision
replacement creates an uncovered frame
near/horizon edge tolerance fails
build work exceeds the declared budget without a typed result
headless and browser classification fingerprints disagree
Pages source commit differs from the validated commit
```

## Validation state

```txt
runtime implementation: absent
pure fixtures: absent
browser fixtures: absent
Pages fixtures: absent
commands run in this documentation pass: none
```

No deployment-readiness claim is made for terrain LOD transitions.