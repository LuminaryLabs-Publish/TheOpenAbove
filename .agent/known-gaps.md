# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-11T16-30-25-04-00`

## Primary ordered gaps

```txt
1. immutable runtime admission
2. import-pure balloon module and compatibility admission
3. root session/frame/listener/resource ownership
4. ordered teardown and full-runtime restart proof
5. fixed-step clock visibility and sequenced input authority
6. product manifest, selected mode and supersession authority
7. product acceptance and public/runtime parity
8. versioned Air Mail route and parcel source
9. correct-current delivery admission and route proof
10. complete mission reset transaction and mission epoch
11. committed simulation/render/HUD/telemetry/GameHost correlation
12. terrain source and classification revision authority
13. retained horizon chunk LOD reclassification
14. bounded terrain builds and atomic replacement
15. near/horizon edge and normal continuity
```

## Terrain LOD classification gaps

```txt
horizon segment policy is evaluated only during geometry creation
required horizon membership stores keys only
horizon mesh metadata stores x and z only
retained horizon chunks are not reclassified after camera-center movement
actual segment count is not observable
intended and actual LOD cannot be compared
active horizon geometry is traversal-history dependent
same camera pose can produce different geometry after different paths
```

## Terrain transition gaps

```txt
no terrain source revision
no quality-policy revision
no classification revision
no transition plan
no create/release/replacement result schema
no stale candidate rejection
no atomic replacement state
no first-visible-replacement frame receipt
no old-geometry frame-retirement proof
no active-terrain fingerprint
no bounded LOD transition journal
```

## Terrain workload gaps

```txt
all missing geometry is built synchronously
correctly reclassifying retained horizon chunks could add burst rebuild work
no per-frame build count budget
no vertex or terrain-height sample budget
no allocation or disposal budget
no transition latency target
no priority policy
no cancellation policy
no measured initial or transition cost
```

## Near/horizon continuity gaps

```txt
near and horizon grids use different chunk sizes and center thresholds
near and horizon slope sampling differs
near and horizon normals are computed independently
horizon geometry is scaled by 1.004 and lowered by 0.08 without a typed seam policy
LOD changes can alter edge density without stitch or skirt authority
no overlap, gap, height, color or normal fixture
```

## Retained committed observation gaps

```txt
telemetry snapshots before visual.render
renderer drawCalls and triangles update after telemetry publication
dynamic resolution samples after telemetry publication
HUD projects after telemetry publication
no simulationTickId to browser RAF mapping
no renderFrameId
no deliveryResultId
no render submission result
no HUD acknowledgement
no telemetry publication barrier
no required-consumer acknowledgement set
no state or frame fingerprint
no bounded committed-frame journal
```

## Retained external readback gaps

```txt
GameHost exposes scene, renderer, camera, balloon, visual, simulation, airstream, mail and cameraRig
external callers can retain mutable subsystem references
getState returns no session, mission, tick, frame or observation revision
Nexus telemetry and local snapshot are not correlated by a shared receipt
old readback callers cannot be fenced after reset or restart
headless tools cannot prove they observed a committed visible frame
```

## Retained product acceptance gaps

```txt
README and AGENTS still describe Meadow Lift bird flight
runtime is Air Mail hot-air-balloon delivery
R restart is documented but has no consumer
no product or acceptance fingerprint
no deployed parity evidence
```

## Retained lifecycle and restart gaps

```txt
root RAF id is not retained
full-runtime restart and mission reset are not distinct
mail.reset clears parcel fields only
simulation, airstream, camera and presentation expose no composed reset
no mission epoch or stale-caller fence
```

## Required terrain fixture gaps

```txt
fixture:terrain-lod-classification
fixture:horizon-retained-upgrade
fixture:horizon-retained-downgrade
fixture:terrain-three-band-traversal
fixture:terrain-path-independence
fixture:terrain-source-revision
fixture:terrain-quality-revision
fixture:terrain-transition-plan
fixture:terrain-build-budget
fixture:terrain-stale-build-result
fixture:terrain-atomic-replacement
fixture:terrain-no-gap-frame
fixture:terrain-edge-continuity
fixture:terrain-old-geometry-retirement
fixture:terrain-active-map-fingerprint
fixture:terrain-pages-parity
```

## Required terrain guarantees

```txt
all required keys are classified, including retained keys
actual geometry identity is observable
actual LOD equals current intended LOD or a typed deferred transition explains the mismatch
classification depends on current camera, quality and terrain revisions, not traversal history
complete old geometry remains visible until complete replacement commits
replacement work stays within declared budgets
stale geometry candidates cannot commit
near/horizon edges remain inside declared tolerances
render and external observations identify the geometry actually submitted
```

Do not treat a distance-to-segments function as proof of distance-based LOD while retained horizon geometry is not reclassified.