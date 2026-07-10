# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-10T19-18-39-04-00`

## Plan ledger

### Goal

Create one restart-safe runtime-session authority that invalidates stale callbacks before teardown, owns frame/listener/resource lifecycles, publishes terminal GameHost proof, and preserves the visible Balloon Drift experience.

### Full checklist

- [ ] Add monotonic `sessionId` allocation.
- [ ] Add monotonic `generation` invalidation per session lifecycle.
- [ ] Add lifecycle states: `created`, `starting`, `running`, `stopping`, `stopped`, `disposing`, `disposed`, `restarting`, `failed`.
- [ ] Make route construction return one session authority.
- [ ] Retain every `requestAnimationFrame` ID.
- [ ] Check `{sessionId, generation}` before simulation, presentation, camera, visual, telemetry, render, HUD, and frame requeue.
- [ ] Invalidate generation before cancelling frames or removing listeners.
- [ ] Prevent stale callbacks from mutating state or queuing new work.
- [ ] Register simulation, camera, visual, telemetry, presentation, HUD, and GameHost owners in construction order.
- [ ] Register every global listener with owner and generation.
- [ ] Register every disposable resource with owner and reverse teardown order.
- [ ] Invoke `simulation.dispose()`, `cameraRig.dispose()`, and `visual.dispose()` from the root owner.
- [ ] Classify renderer, balloon, vegetation, landmarks, weather, lighting, clouds, water, lens, terrain, grass, and composer resources terminally.
- [ ] Add reverse-order rollback for partial startup failure.
- [ ] Make stop and dispose idempotent.
- [ ] Define soft restart versus hard renderer/canvas destroy policy.
- [ ] Add bounded JSON-safe lifecycle, listener, resource, frame, and rejection journals.
- [ ] Preserve current GameHost fields additively while active.
- [ ] Add `GameHost.lifecycle` commands and readback.
- [ ] Replace disposed live authority with an immutable terminal snapshot.
- [ ] Classify old GameHost handles as cleared, retained-for-inspection, unsupported, or stale.
- [ ] Clear held keyboard state during stop/restart.
- [ ] Add a DOM-light injected frame/event/resource fixture.
- [ ] Prove one active session and one frame chain per canvas.
- [ ] Prove stop freezes elapsed, distance, camera, telemetry, render, and HUD state.
- [ ] Prove stale frame and input callbacks return `stale-session` without mutation.
- [ ] Prove listener count returns to zero.
- [ ] Prove every resource reaches a terminal row.
- [ ] Prove second dispose is an idempotent no-op.
- [ ] Prove restart creates a new identity and independent state.
- [ ] Inject startup failure and prove reverse-order rollback.
- [ ] Add `lifecycle:fixture` to package scripts.
- [ ] Make `npm run check` execute the fixture before existing smoke assertions.
- [ ] Make headless `project.check` report the same fixture summary.
- [ ] Run `npm run check`.
- [ ] Run `npm run headless:check`.
- [ ] Run `npm run build`.
- [ ] Run browser stop/dispose/restart smoke.
- [ ] Update repo-local and central ledgers after implementation.

## Recommended files

```txt
src/runtime-session/runtime-session-authority.js
src/runtime-session/session-identity.js
src/runtime-session/session-generation-fence.js
src/runtime-session/owned-animation-frame.js
src/runtime-session/listener-ownership-ledger.js
src/runtime-session/resource-ownership-ledger.js
src/runtime-session/startup-transaction.js
src/runtime-session/ordered-teardown.js
src/runtime-session/terminal-gamehost-projection.js
scripts/open-above-session-generation-fixture.mjs
```

## Required startup flow

```txt
allocate sessionId and generation
  -> mark starting
  -> construct one owner
  -> register disposer immediately
  -> install generation-scoped listeners
  -> publish active GameHost only after minimum contract is valid
  -> queue first owned frame
  -> mark running
```

## Required stop/dispose flow

```txt
invalidate generation
  -> block commands and callbacks
  -> cancel queued frame
  -> remove listeners
  -> dispose owners in reverse construction order
  -> classify resource terminal rows
  -> freeze final snapshots
  -> publish terminal GameHost projection
```

## Fixture must prove

```txt
monotonic session IDs and generations
valid lifecycle transitions
one session per canvas
one frame chain per session
stale callback and input rejection
state freeze after stop
idempotent dispose
zero owned listeners after teardown
terminal resource classification
reverse-order startup rollback
new identity and cleared input on restart
old GameHost authority cannot command new session
bounded JSON-safe proof rows
non-zero failure on contract violations
```

## Avoid until proof exists

```txt
renderer replacement
terrain, cloud, water, grass, lighting or postprocess rewrite
camera retuning
balloon visual changes
simulation constant changes
quality threshold retuning
new route content
legacy grass deletion
unscoped frame IDs
```

## Next safe ledge

```txt
TheOpenAbove Session Generation Fence + Terminal GameHost Fixture Gate
```
