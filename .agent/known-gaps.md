# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-11T19-28-28-04-00`

## Primary ordered gaps

```txt
1. immutable runtime admission
2. import-pure balloon module and explicit compatibility admission
3. single frame-loop registration and owner identity
4. root session/listener/resource ownership
5. ordered teardown and full-runtime restart proof
6. fixed-step clock visibility and sequenced input authority
7. product manifest, selected mode and supersession authority
8. product acceptance and public/runtime parity
9. versioned Air Mail route and correct-current delivery proof
10. complete mission reset transaction and mission epoch
11. committed simulation/render/HUD/telemetry/GameHost correlation
12. terrain source, classification and retained LOD authority
13. bounded terrain builds, atomic replacement and edge continuity
14. grass chunk spatial identity and world-bounds culling
15. truthful CPU/WebGPU backend execution evidence
16. grass visible-frame and long-traversal parity proof
```

## Import-purity gaps

```txt
hot-air-balloon-object-kit schedules RAF at module scope
module import mutates a global compatibility surface
attachWhenReady polls ambient window.GameHost
compatibility behavior has no explicit command
compatibility behavior has no product-mode admission
compatibility target discovery is not one-shot
no-compatible-target result does not exist
no-target path still starts recurring frame work
```

## Frame-ownership gaps

```txt
active Air Mail RAF has no frameLoopId
compatibility RAF has no frameLoopId
callbacks have no runtimeSessionId or runtimeGeneration
callback handles are discarded
frame owners are not observable
callback registration ledger is absent
stale callback rejection is absent
failed-startup callback retirement is absent
retry predecessor fencing is absent
```

## Successful-startup gap

```txt
main frame loop:
  simulation -> delivery -> presentation -> render -> HUD

compatibility frame loop:
  scene.traverse -> find legacy vehicle -> animate or no-op

current product result:
  two independent recursive RAF chains
  one useful active loop
  one hidden no-target scene-traversal loop
```

## Failed-startup gap

```txt
createGame throws before GameHost publication
showFatal updates DOM only
attachWhenReady sees no GameHost
attachWhenReady schedules another frame
fatal state is not quiescent
```

## Compatibility scene-mutation gaps

```txt
legacy target identity is structural and implicit
installer may remove all target children
installer may add another balloon and hidden compatibility controls
installation has no staged/committed result
installation has no rollback result
installation has no duplicate guard beyond target-local flag
installation and animation are not tied to active product mode
```

## Performance gaps

```txt
findVehicle calls scene.traverse every compatibility frame
work is O(scene node count)
no traversal budget
no nodes-visited count
no compatibility frame duration
no no-target backoff or termination
no active frame-loop count
```

## Retained runtime and mission gaps

```txt
NexusEngine imports @main
root RAF handle is not retained
full-runtime restart and mission reset are not distinct
input uses held-key state rather than sequenced commands
simulation uses capped variable dt
correctAirstreamId is not enforced by delivery admission
mail.reset resets parcel fields only
no mission epoch or stale-caller fence
telemetry snapshots before render/HUD completion
GameHost exposes mutable subsystem references
```

## Retained terrain gaps

```txt
retained horizon chunks are not reclassified after camera-center movement
intended and actual LOD are not jointly observable
terrain build work is synchronous and unbudgeted
candidate replacement and stale rejection are absent
near/horizon seam and normal policy is absent
```

## Retained grass gaps

```txt
grass candidates and instance transforms use absolute world space
chunk InstancedMesh objects remain at the global origin
manual culling reads mesh.position instead of chunk bounds
all chunks share one camera-to-origin distance
backend label can claim WebGPU without a GPU pipeline or dispatch
CPU calls increment dispatchedWorkgroups
accepted, visible and rendered counts are not separated
```

## Required import/frame fixtures

```txt
fixture:balloon-kit-import-purity
fixture:no-target-no-compatibility-loop
fixture:single-active-frame-owner
fixture:failed-startup-zero-live-callbacks
fixture:retry-no-predecessor-callbacks
fixture:compatibility-single-install
fixture:compatibility-stale-generation
fixture:compatibility-install-and-dispose
fixture:pages-single-frame-owner
```

## Required guarantees

```txt
importing a reusable kit schedules no recurring work
compatibility installation is explicit and typed
no target means no recurring callback
all callbacks belong to one runtime session and generation
failure, stop and disposal cancel every callback
stale callbacks cannot mutate current state
current Air Mail startup reports one required frame owner
frame and traversal work are observable and bounded
```

Do not treat the visible fatal panel as proof of stopped execution while the import-time GameHost wait loop can continue. Do not treat current Air Mail as single-loop while the compatibility tick remains recursive after a no-target search.