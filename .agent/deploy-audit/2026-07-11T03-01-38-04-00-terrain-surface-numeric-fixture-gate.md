# Deploy Audit: Terrain Surface Numeric Fixture Gate

**Timestamp:** `2026-07-11T03-01-38-04-00`

## Current validation surface

```txt
npm run check             node tests/smoke.mjs
npm run build             npm run check && vite build
npm run headless:check    headless project.check
npm run headless:build    headless project.build
```

The updated smoke test verifies that the terrain source contains the new world-field helpers and no longer contains repeated texture or normal-map code. This is useful source-shape protection but does not execute the terrain algorithms numerically.

## Missing gate

The deploy pipeline cannot currently prove:

```txt
fixed-coordinate color outputs
finite and normalized RGB values
stable terrain surface fingerprint
LOD-invariant slope and color
shared-edge height/color/normal continuity
mixed-LOD seam tolerance
initial build workload
camera-boundary rebuild budget
atomic replacement behavior
GameHost terrain readback
```

## Required fixture scripts

```txt
npm run fixture:terrain-surface
npm run fixture:terrain-lod-seams
npm run fixture:terrain-rebuild-budget
```

### `fixture:terrain-surface`

```txt
load pure renderer-neutral surface functions
validate descriptor schema and revision
sample fixed world coordinates
assert expected height/moisture/slope/RGB rows
assert finite normalized outputs
assert deterministic fingerprint
```

### `fixture:terrain-lod-seams`

```txt
build deterministic sample grids for every LOD
compare the same world coordinates
compare shared X and Z boundaries
compare same-LOD and mixed-LOD neighbors
assert explicit height/color/normal tolerances
assert stale surface revisions are rejected
```

### `fixture:terrain-rebuild-budget`

```txt
plan empty initial radius set
plan one-axis center transition
plan diagonal center transition
plan rapid focus supersession
record chunk and vertex work
assert per-frame budget and queue behavior
assert old committed chunks remain until replacements commit
```

## Headless requirements

The headless environment should expose:

```txt
terrain.inspectSurface
terrain.sampleSurface
terrain.planFocus
terrain.validateSeams
terrain.inspectBuildJournal
terrain.resetFixture
```

Results must be bounded JSON and must not require WebGL for the pure surface and planning fixtures.

## Browser smoke requirements

```txt
boot current Pages artifact
capture initial terrain observation
cross one chunk boundary slowly
cross one boundary diagonally
verify no fatal error
verify one focus revision per accepted center
verify build journal is bounded
verify active chunks cite current surface revision
verify seam results pass
capture frame-cost observation
```

## Required deployment order

```txt
fixture:runtime-admission
fixture:runtime-lifecycle
fixture:clock-parity
fixture:terrain-surface
fixture:terrain-lod-seams
fixture:terrain-rebuild-budget
fixture:meadow-lift-route
npm run check
npm run headless:check
npm run build
browser smoke
Pages smoke
```

## Current result

```txt
source-text terrain smoke: present
numeric terrain surface fixture: absent
LOD seam fixture: absent
rebuild budget fixture: absent
browser transition smoke: not run
Pages transition smoke: not run
```

## Gate decision

Do not treat the terrain surface as continuity-proven solely because the source smoke passes. The next terrain implementation should not be complete until numeric surface, LOD seam and rebuild-budget fixtures pass before Pages deployment.