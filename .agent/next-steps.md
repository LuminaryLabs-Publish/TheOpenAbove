# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-10T17-51-35-04-00`

## Plan ledger

### Goal

Create one runtime-session authority that owns startup, frame scheduling, listener/resource registration, stop, disposal, rollback, restart, and lifecycle proof without changing the visible Balloon Drift experience.

### Full checklist

- [ ] Add a monotonic `sessionId` allocated before runtime construction.
- [ ] Add explicit lifecycle state: `created`, `starting`, `running`, `stopping`, `stopped`, `disposing`, `disposed`, `restarting`, `failed`.
- [ ] Make `createGame()` return a session authority object.
- [ ] Retain every `requestAnimationFrame` ID and cancel it during stop/dispose.
- [ ] Prevent a stopped/disposed session from queuing another frame.
- [ ] Register simulation, camera, visual, telemetry, presentation, HUD, and GameHost owners in construction order.
- [ ] Register every global listener with session ownership.
- [ ] Register every disposable resource with owner kit and teardown order.
- [ ] Call `simulation.dispose()` during teardown.
- [ ] Call `cameraRig.dispose()` during teardown.
- [ ] Call `visual.dispose()` during teardown.
- [ ] Classify renderer, balloon geometry/materials, vegetation, landmarks, weather, sun, sky, clouds, aerial, water, and lens resources as disposed, retained, unsupported, or skipped.
- [ ] Add reverse-order rollback when startup fails after partial construction.
- [ ] Make stop and dispose idempotent.
- [ ] Add explicit soft-restart versus hard-destroy policy for renderer/canvas ownership.
- [ ] Add bounded JSON-safe lifecycle transition, listener, frame, and resource journals.
- [ ] Add additive `GameHost.lifecycle` state and commands while preserving current fields.
- [ ] Clear or terminally classify stale GameHost references after disposal.
- [ ] Add pagehide/HMR integration only after the core lifecycle contract is deterministic.
- [ ] Scope the existing planned `frameId` under `sessionId`.
- [ ] Add a DOM-light lifecycle fixture with injected frame/listener/resource hosts.
- [ ] Prove exactly one frame chain is active.
- [ ] Prove stop freezes simulation, camera, telemetry, render, and HUD state.
- [ ] Prove dispose removes every owned listener.
- [ ] Prove every registered resource reaches a terminal result.
- [ ] Prove a second dispose is an idempotent no-op.
- [ ] Prove restart creates a new session ID and old callbacks cannot mutate it.
- [ ] Inject partial startup failure and prove reverse-order rollback.
- [ ] Add `lifecycle:fixture` to package scripts.
- [ ] Make `npm run check` execute lifecycle fixture before current smoke assertions.
- [ ] Make headless `project.check` report the same result.
- [ ] Run `npm run check`.
- [ ] Run `npm run headless:check`.
- [ ] Run `npm run build` after checks pass.
- [ ] Run browser smoke with stop/dispose/restart readback.
- [ ] Update repo-local and central ledgers after implementation.

## Recommended files

```txt
src/runtime-session/runtime-session-authority.js
src/runtime-session/lifecycle-state.js
src/runtime-session/owned-animation-frame.js
src/runtime-session/listener-ownership-ledger.js
src/runtime-session/resource-ownership-ledger.js
src/runtime-session/startup-transaction.js
src/runtime-session/ordered-teardown.js
src/runtime-session/lifecycle-proof.js
scripts/open-above-lifecycle-fixture.mjs
```

## Required startup flow

```txt
allocate sessionId
  -> mark starting
  -> construct one component
  -> register its disposer immediately
  -> install owned listeners
  -> publish GameHost only after minimum contract is valid
  -> queue first frame
  -> mark running
```

## Required teardown flow

```txt
mark stopping
  -> block new work
  -> cancel queued frame
  -> dispose camera input
  -> dispose simulation input
  -> stop/dispose telemetry and presentation when supported
  -> dispose visual resources in reverse order
  -> classify renderer/canvas policy
  -> clear or terminally classify GameHost live references
  -> publish stopped/disposed snapshot
```

## Fixture must prove

```txt
session IDs are monotonic
lifecycle transitions are valid
one session owns the canvas
one recursive frame chain is active
listener ownership count is deterministic
stop prevents all state mutation
dispose is idempotent
resources receive terminal teardown rows
partial startup rollback is reverse-order and complete
restart creates a new sessionId
stale callbacks/listeners cannot affect the new session
proof journals evict deterministically
all proof is JSON-safe
contract violations fail non-zero
```

## Companion frame-phase work

After lifecycle authority exists:

```txt
sessionId
  -> frameId
     -> input range
     -> simulation/camera/visual/render results
     -> adaptive-resolution decision
     -> telemetry/HUD/GameHost projection
```

Do not implement unscoped frame IDs that become ambiguous after restart.

## Avoid until proof exists

```txt
renderer replacement
terrain or cloud rewrite
camera retuning
balloon visual changes
simulation constant changes
grass art or density retuning
quality threshold retuning
new route content
legacy source deletion
```

## Done when

```txt
npm run check passes lifecycle fixture and existing smoke
npm run headless:check reports the same proof result
npm run build passes
GameHost exposes additive lifecycle proof and commands
stop/dispose/restart behavior is deterministic
browser and fixture proof shapes agree
no old session state changes after stop/dispose
central ledger points to the implementation timestamp
```

## Next safe ledge

```txt
TheOpenAbove Runtime Session Lifecycle Authority + Dispose/Reboot Fixture Gate
```
