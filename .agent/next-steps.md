# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-11T03-01-38-04-00`

## Plan ledger

### Goal

Make browser boot reproducible, make reusable modules import-pure, give one session ownership of every frame/listener/resource, separate fixed simulation ticks from render cadence, then make the new smooth terrain surface versioned, LOD-consistent and bounded before activating Meadow Lift as deterministic mission authority.

### Checklist

#### Gate 1: immutable runtime admission

- [ ] Add a versioned runtime source manifest.
- [ ] Replace NexusEngine `@main` with an immutable coordinate.
- [ ] Validate required NexusEngine and Three.js capabilities.
- [ ] Return typed boot results and source fingerprints.
- [ ] Add `fixture:runtime-admission`.

#### Gate 2: import purity and frame ownership

- [ ] Remove module-scope compatibility RAF scheduling.
- [ ] Move legacy installation into an explicit installer kit.
- [ ] Register every RAF with one session owner.
- [ ] Add session/generation fences.
- [ ] Add import-purity proof.

#### Gate 3: lifecycle and teardown

- [ ] Make `createGame()` return a root session owner.
- [ ] Compose all listener, geometry, material, renderer and composer disposers.
- [ ] Add idempotent `stop()`, `dispose()` and `restart()`.
- [ ] Dispose the shared terrain material and clear cloud-shadow shader references.
- [ ] Publish detached terminal lifecycle proof.
- [ ] Add `fixture:runtime-lifecycle`.

#### Gate 4: fixed-step clock, visibility and input admission

- [ ] Add a session-owned monotonic clock adapter.
- [ ] Separate render-frame IDs from simulation-tick IDs.
- [ ] Use a fixed simulation step, recommended `1/60`, with a bounded accumulator.
- [ ] Declare `maxSubsteps`, overrun behavior and dropped-time reporting.
- [ ] Declare hidden-tab suspend/resume policy.
- [ ] Reset render baseline on visibility resume.
- [ ] Convert key transitions into sequenced input samples targeted to ticks.
- [ ] Commit burner and vent state only at tick boundaries.
- [ ] Keep camera smoothing, quality and rendering on render cadence.
- [ ] Add swept objective-contact support before thin objective volumes.
- [ ] Add `fixture:clock-parity` for 20/30/60/120 Hz, stalls and visibility.

#### Gate 5: terrain surface authority and continuity

- [ ] Define a versioned terrain-surface descriptor containing palette, field frequencies, blend strengths, height/moisture source revisions and material settings.
- [ ] Publish a deterministic terrain-surface fingerprint.
- [ ] Separate authoritative slope sampling from render LOD vertex spacing.
- [ ] Use one fixed world-space slope radius or an analytic/central-gradient service across every LOD.
- [ ] Define an edge-normal policy for equal and mixed LOD neighbors.
- [ ] Preflight height, color and normal edge continuity before replacing an active chunk.
- [ ] Return typed chunk-build results with chunk key, LOD, vertex count, duration and surface revision.
- [ ] Queue and budget chunk generation across frames or move pure geometry generation off the render thread.
- [ ] Publish active chunk/LOD, build journal and seam results through detached GameHost observations.
- [ ] Add `fixture:terrain-surface` for deterministic palette samples and fingerprints.
- [ ] Add `fixture:terrain-lod-seams` for shared-edge height/color/normal parity.
- [ ] Add `fixture:terrain-rebuild-budget` for initial load and camera-boundary transitions.

#### Gate 6: Meadow Lift objective authority

- [ ] Version and validate the mission manifest.
- [ ] Generate three thermals, five gates and one perch zone deterministically.
- [ ] Add ready/active/returning/completed/failed/restarting phases.
- [ ] Evaluate mission time from committed simulation ticks.
- [ ] Make contacts idempotent by stable ID.
- [ ] Commit unlock only after valid completion.
- [ ] Publish renderer-neutral objective descriptors and bounded mission journals.
- [ ] Add `fixture:meadow-lift-route`.

## Recommended terrain DSKs

```txt
open-above-terrain-surface-descriptor-kit
open-above-terrain-palette-kit
open-above-terrain-color-field-kit
open-above-lod-invariant-slope-sampler-kit
open-above-terrain-normal-continuity-kit
open-above-terrain-chunk-build-budget-kit
open-above-terrain-surface-revision-kit
open-above-terrain-surface-observation-kit
open-above-terrain-seam-fixture-kit
open-above-terrain-chunk-rebuild-fixture-kit
```

## Required terrain proof

```txt
same world coordinate produces the same authoritative height, moisture, slope and color at every render LOD
shared chunk edges have equal heights and bounded color/normal deltas
surface descriptor and fingerprint are stable for a fixed source revision
palette and blend outputs remain finite and within normalized RGB bounds
initial radius build and one-chunk camera transitions respect declared work budgets
chunk replacement is atomic after required continuity checks
GameHost reports detached active-LOD, build and seam rows
source smoke remains a secondary guard, not the numeric proof source
```

## Validation order

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