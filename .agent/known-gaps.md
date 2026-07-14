# Known Gaps: TheOpenAbove Route Runtime Resource Retirement

**Last aligned:** `2026-07-14T06-38-49-04-00`  
**Status:** `route-runtime-resource-retirement-authority-audited`

## Summary

The route has useful component-level disposal services but no aggregate lifecycle authority. Gameplay callbacks, browser listeners, observers, subscriptions, public references, scene resources and GPU ownership are not bound to a route generation or terminal retirement result.

## Plan ledger

**Goal:** keep route-retirement gaps dependency ordered and tied to executable browser evidence.

- [ ] Route/session generations.
- [ ] Owned callback, listener, observer and subscription manifests.
- [ ] Named startup stages and rollback.
- [ ] Gameplay-frame admission and stale rejection.
- [ ] Ordered aggregate disposal.
- [ ] Scene and GPU resource retirement receipts.
- [ ] Public `GameHost` retirement.
- [ ] Same-document re-entry proof.
- [ ] Source/build/Pages lifecycle parity.

## Identity and admission gaps

```txt
RouteGeneration: absent
SessionGeneration: absent
StartupAttemptId: absent
OwnedResourceManifest: absent
ActiveRouteRuntimeResult: absent
FrameAdmissionResult: absent
RouteRuntimeRetirementResult: absent
FirstSuccessorRouteFrameAck: absent
```

## Callback and input gaps

```txt
gameplay RAF ID retained: no
gameplay RAF cancellation: absent
map RAF aggregate ownership: absent
stale callback classification: absent
input admission after stop: undefined
input state clear on stop: absent
duplicate listener detection: absent
```

## Rollback gaps

```txt
named startup stages: absent
acquired-resource ledger: absent
partial startup rollback: absent
failed-stage identity: absent
rollback receipts: absent
canvas aria-busy terminal repair: incomplete
predecessor preservation during failed replacement: absent
```

## Disposal gaps

```txt
aggregate dispose command: absent
component disposal call order: absent
engine subscription retirement receipt: absent
camera/presentation retirement receipt: absent
balloon model resource retirement receipt: absent
scene resource count result: absent
render-target retirement result: absent
renderer/context retirement policy: absent
```

## Public-state gaps

```txt
GameHost generation: absent
GameHost status: absent
GameHost terminal snapshot: absent
GameHost predecessor removal: absent
retired method behavior: undefined
successor publication acknowledgement: absent
```

## Browser proof gaps

```txt
normal stop fixture: absent
stop before first frame: absent
failure after engine creation: absent
failure after renderer creation: absent
failure after balloon creation: absent
map-open stop fixture: absent
same-document second boot: absent
stale predecessor RAF fixture: absent
listener/observer count fixture: absent
WebGL resource-count fixture: absent
source/build/Pages parity: absent
```

## Dependency order

```txt
route/session generations
  -> owned resource manifest
  -> staged startup
  -> frame admission
  -> failure rollback
  -> aggregate disposal
  -> GPU/public retirement
  -> successor first-frame acknowledgement
  -> source/build/Pages parity
```

## Retained gaps

Pinned-provider proof, Core World feature registration, foundation adoption, staged generation, map/world coherence, grass publication, Air Mail completion and flight persistence gaps remain open.

## Do not claim

Do not treat local component `dispose()` methods as proof of route retirement. Complete cleanup requires aggregate command admission, stale-callback rejection, per-owner receipts and executable re-entry evidence.