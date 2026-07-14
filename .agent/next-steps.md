# Next Steps: TheOpenAbove Route Runtime Resource Retirement

**Last aligned:** `2026-07-14T06-38-49-04-00`  
**Status:** `route-runtime-resource-retirement-authority-audited`

## Plan ledger

**Goal:** implement complete route ownership from startup through failure rollback, stop, disposal and verified successor re-entry.

### Gate 1: route and session generations

- [ ] Add immutable `RouteGeneration` and `SessionGeneration` identifiers.
- [ ] Make every gameplay frame cite both generations.
- [ ] Reject stale or superseded callbacks before mutation.

### Gate 2: owned resource manifest

- [ ] Register every gameplay/map RAF.
- [ ] Register input and resize listeners.
- [ ] Register ResizeObserver and world-generation subscriptions.
- [ ] Register public `GameHost` ownership.
- [ ] Register scene, render-target, composer and renderer resources.

### Gate 3: aggregate start and rollback

- [ ] Split bootstrap into named preparation stages.
- [ ] Record acquired ownership after every successful stage.
- [ ] Roll back all candidate resources after any failure.
- [ ] Restore terminal canvas and error accessibility state.
- [ ] Publish `RouteRuntimeStartResult` or `RouteRuntimeFailureResult`.

### Gate 4: stop and dispose transaction

- [ ] Stop frame admission before component disposal.
- [ ] Cancel gameplay and map RAFs.
- [ ] Clear input state and reject new commands.
- [ ] Dispose map, simulation, mail, airstream, presentation and visual owners in dependency order.
- [ ] Retire scene/model geometry, materials, targets, composer and renderer according to explicit ownership.
- [ ] Retire engine subscriptions.
- [ ] Remove or replace predecessor `window.GameHost`.
- [ ] Publish per-owner receipts and one `RouteRuntimeRetirementResult`.

### Gate 5: re-entry proof

- [ ] Start a second route in the same document.
- [ ] Prove no predecessor RAF can commit.
- [ ] Prove listener and observer counts do not increase unexpectedly.
- [ ] Prove predecessor GPU resource counts retire.
- [ ] Publish `FirstSuccessorRouteFrameAck`.

### Gate 6: artifact parity

- [ ] Add source-browser stop/re-entry fixture.
- [ ] Add built-browser stop/re-entry fixture.
- [ ] Add Pages stop/re-entry fixture.
- [ ] Compare route generations, receipts and resource counts.
- [ ] Exercise failure after engine, renderer, balloon and map creation.

## Recommended file cut

```txt
src/runtime/route-lifecycle/
  route-runtime-resource-retirement-authority-domain.js
  route-generation-kit.js
  owned-resource-manifest-kit.js
  gameplay-frame-admission-kit.js
  route-runtime-start-result-kit.js
  route-runtime-retirement-result-kit.js
  startup-failure-rollback-kit.js

browser fixtures/
  route-stop-reentry.mjs
  route-startup-failure-rollback.mjs
  route-webgl-retirement.mjs
```

## Compatibility constraints

Preserve current Core World composition, provider pin, balloon handling, airstream behavior, Air Mail behavior, map behavior, world generation, visual quality, telemetry and public diagnostic needs. Add parent coordination rather than merging existing semantic domains.

## Retained next steps

Real-provider contract proof, atomic feature registration, world/foundation revision adoption, first-world-frame provenance, grass publication, Air Mail authority and persistence work remain open.

## Do not claim

Do not claim safe route teardown, failure rollback, complete GPU retirement, stale-callback isolation, same-document re-entry or source/build/Pages lifecycle parity until the full matrix passes on `main`.