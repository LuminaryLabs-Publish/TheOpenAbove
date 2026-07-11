# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-10T21-31-01-04-00`

## Plan ledger

### Goal

Make browser boot reproducible, make reusable balloon modules import-pure, and give one runtime session explicit ownership of every frame, listener and disposable resource.

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
```

## Required proof rows

```txt
immutable sources accepted
mutable required source rejected
missing required capability rejected
import object kit schedules zero frames/listeners
unsupported legacy host schedules zero frames
accepted route owns exactly one primary RAF
stop leaves zero owned RAF handles and listeners
stop/dispose are idempotent
restart creates one new generation
stale generation callbacks admitted: zero
terminal proof contains bounded ownership counts
```

## Validation order

```txt
1. fixture:runtime-admission
2. fixture:runtime-lifecycle
3. npm run check
4. npm run headless:check
5. npm run build
6. browser smoke
7. Pages smoke
```

## Avoid until proof exists

```txt
renderer replacement
terrain/cloud/water/grass rewrite
camera or simulation retuning
balloon visual redesign
new route content
```

## Ordered safe ledges

```txt
1. TheOpenAbove Immutable Runtime Admission + Boot Capability Fixture Gate
2. TheOpenAbove Import-Pure Balloon Object Kit + Frame Ownership Fixture Gate
3. TheOpenAbove Runtime Session Lifecycle + Ordered Disposal/Reboot Fixture Gate
```