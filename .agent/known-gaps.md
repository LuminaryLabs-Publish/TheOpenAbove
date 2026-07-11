# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-11T18-01-38-04-00`

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
16. grass chunk spatial identity and world bounds
17. per-chunk grass cull distance and visible-set authority
18. truthful CPU/WebGPU culling backend execution evidence
19. grass visible-frame and long-traversal parity proof
```

## Grass spatial identity gaps

```txt
grass candidate transforms use absolute world positions
grass instance matrices use absolute world positions
chunk InstancedMesh objects remain at the global origin
chunk center exists only as x/z metadata
typed chunk world bounds do not exist
manual culling reads mesh.position instead of chunk metadata or bounds
all active chunks therefore share one camera-to-origin distance
```

## Grass visibility gaps

```txt
manual cull radius is 520 * 4.2 = 2184 m
inside the origin radius all active chunks share one visible result
outside the origin radius all active chunks share one culled result
camera-centered rebuild does not restore visibility
the center chunk can be hidden while accepted instance count is nonzero
accepted, visible and rendered chunk counts are not distinguished
accepted, visible and rendered instance counts are not distinguished
no visible-set revision
no first-visible-grass frame acknowledgement
```

## Grass backend-truth gaps

```txt
backend label derives from navigator.gpu presence only
no adapter or device admission
no compute pipeline
no storage or uniform buffer setup
no command encoder
no dispatchWorkgroups call
cullChunk executes a CPU Boolean comparison
dispatchedWorkgroups increments for CPU helper calls
backend and workgroup observations can therefore be false
```

## Grass decision and lifecycle gaps

```txt
no cull decision ID
no camera-center revision
no grass quality or LOD revision
no cull policy revision
no selected-versus-executed backend distinction
no typed visible, culled, deferred, failed or stale result
no stale decision rejection after center or quality changes
no atomic visible-set commit
no culling journal
no traversal-path fingerprint
```

## Retained terrain LOD classification gaps

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

## Retained terrain transition gaps

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

## Retained terrain workload gaps

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

## Retained near/horizon continuity gaps

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
grass getState reports accepted chunks/instances but not visible or rendered counts
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

## Required grass fixture gaps

```txt
fixture:grass-chunk-identity
fixture:grass-chunk-world-bounds
fixture:grass-cull-distance
fixture:grass-visible-set-commit
fixture:grass-origin-neighborhood
fixture:grass-first-center-transition
fixture:grass-origin-radius-crossing
fixture:grass-camera-centered-retention
fixture:grass-return-path-parity
fixture:grass-quality-lod-transition
fixture:grass-cpu-backend-truth
fixture:grass-webgpu-backend-truth
fixture:grass-no-false-workgroup-count
fixture:grass-first-visible-frame
fixture:grass-pages-traversal-parity
```

## Required grass guarantees

```txt
all active chunks have stable IDs, centers and world bounds
cull distance is measured against each chunk's own bounds
camera-centered required chunks do not disappear because of global-origin distance
LOD and culling use one accepted camera and quality revision
backend label equals executed backend
GPU dispatch counts represent actual GPU dispatches only
accepted, visible and rendered counts are separately observable
visible-set commit is atomic and stale decisions cannot mutate newer frames
render and external observations identify the visible set actually submitted
```

Do not treat camera-centered chunk generation as proof of camera-centered grass visibility while the manual culling pass still measures every chunk from the global origin.
