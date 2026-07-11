# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-10T23-20-41-04-00`

## Plan ledger

### Goal

Make browser boot reproducible, make reusable balloon modules import-pure, give one runtime session explicit ownership of every frame/listener/resource, then activate the authored Meadow Lift mission as deterministic domain authority rather than presentation-only configuration.

### Checklist

#### Gate 1: immutable runtime admission

- [ ] Add a versioned runtime source manifest.
- [ ] Replace NexusEngine `@main` with an immutable commit or release coordinate.
- [ ] Keep Three.js pinned to an exact version.
- [ ] Validate required NexusEngine and Three.js capabilities before construction.
- [ ] Return typed accepted, degraded, rejected and failed boot results.
- [ ] Record requested/resolved source coordinates and deterministic fingerprints.
- [ ] Expose additive `GameHost.source` and `GameHost.boot` readback.
- [ ] Add `fixture:runtime-admission`.

#### Gate 2: import-pure balloon object and frame ownership

- [ ] Remove module-scope `requestAnimationFrame(attachWhenReady)` from `hot-air-balloon-object-kit.js`.
- [ ] Keep build and animate exports side-effect free.
- [ ] Move legacy auto-install behavior into an explicit installer kit.
- [ ] Add host-shape preflight and typed accepted/unsupported/rejected results.
- [ ] Do not schedule a compatibility frame for unsupported hosts.
- [ ] Register every RAF handle with one session frame-owner ledger.
- [ ] Add sessionId and generation to all scheduled callbacks.
- [ ] Add `fixture:import-purity` or fold the proof into `fixture:runtime-lifecycle`.

#### Gate 3: lifecycle and ordered teardown

- [ ] Make `createGame()` return a root session owner.
- [ ] Compose simulation, camera and visual disposers.
- [ ] Add balloon geometry/material disposal.
- [ ] Add renderer/composer/resource disposal coverage.
- [ ] Add idempotent `stop()`, `dispose()` and `restart()`.
- [ ] Remove or replace live GameHost handles during teardown.
- [ ] Publish one detached terminal lifecycle result.
- [ ] Add `fixture:runtime-lifecycle`.

#### Gate 4: Meadow Lift objective authority

- [ ] Convert the first campaign region into a versioned immutable mission manifest.
- [ ] Define explicit mission phases: `ready`, `active`, `returning`, `completed`, `failed`, `restarting`.
- [ ] Generate three deterministic thermal volumes from the world seed.
- [ ] Generate five deterministic wind-gate volumes from the world seed.
- [ ] Create a return-perch zone from `WORLD.perch` and the region return radius.
- [ ] Define typed input/command/result rows for burner, vent and restart admission.
- [ ] Count each thermal and gate at most once by stable ID.
- [ ] Evaluate time limit, return readiness, completion and failure inside fixed mission authority.
- [ ] Commit Cloud Basin unlock only after a valid completed mission result.
- [ ] Project thermals, gates, perch and mission phase through render descriptors rather than draw-only mutation.
- [ ] Publish bounded mission progress/result journals through telemetry and GameHost.
- [ ] Add `fixture:meadow-lift-route` proving same-seed/same-command determinism.

## Recommended DSKs

```txt
open-above-runtime-source-manifest-kit
open-above-module-admission-kit
open-above-runtime-capability-preflight-kit
open-above-boot-transaction-kit
open-above-source-fingerprint-kit
open-above-legacy-balloon-installer-kit
open-above-compatibility-admission-kit
open-above-frame-ownership-kit
open-above-session-generation-fence-kit
open-above-runtime-session-authority-kit
open-above-listener-ownership-ledger-kit
open-above-resource-ownership-ledger-kit
open-above-ordered-teardown-kit
open-above-terminal-gamehost-lifecycle-kit
open-above-import-purity-fixture-kit
open-above-runtime-lifecycle-fixture-kit
open-above-campaign-manifest-kit
open-above-route-objective-authority-kit
open-above-thermal-volume-kit
open-above-wind-gate-kit
open-above-perch-return-zone-kit
open-above-objective-progress-kit
open-above-mission-phase-kit
open-above-restart-command-kit
open-above-mission-result-journal-kit
open-above-route-render-projection-kit
open-above-campaign-observation-kit
open-above-meadow-lift-fixture-kit
```

## Required campaign proof rows

```txt
same seed creates identical thermal, gate and perch IDs/transforms
mission starts in ready and enters active through one admitted command
thermal and gate contacts are idempotent
progress cannot exceed configured target counts
return is rejected before prerequisites are complete
completion requires all targets plus valid perch return
failure is committed once when the time limit expires
restart produces a clean new generation and zero stale progress
Cloud Basin unlock follows exactly one completed result
render consumption rows reference the same mission frame and objective IDs
GameHost exposes detached JSON-safe mission state and bounded journals
```

## Validation order

```txt
1. fixture:runtime-admission
2. fixture:runtime-lifecycle
3. fixture:meadow-lift-route
4. npm run check
5. npm run headless:check
6. npm run build
7. browser smoke
8. Pages smoke
```

## Avoid until proof exists

```txt
renderer replacement
terrain/cloud/water/grass rewrite
camera or simulation retuning
balloon visual redesign
Cloud Basin content production
additional routes or regions
```

## Ordered safe ledges

```txt
1. TheOpenAbove Immutable Runtime Admission + Boot Capability Fixture Gate
2. TheOpenAbove Import-Pure Balloon Object Kit + Frame Ownership Fixture Gate
3. TheOpenAbove Runtime Session Lifecycle + Ordered Disposal/Reboot Fixture Gate
4. TheOpenAbove Meadow Lift Objective Authority + Deterministic Route Fixture Gate
```
