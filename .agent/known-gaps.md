# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-11T21-08-57-04-00`

## Primary ordered gaps

```txt
1. immutable runtime admission
2. import-pure balloon module and explicit compatibility admission
3. single frame-loop registration and owner identity
4. root session/listener/resource ownership
5. ordered teardown and full-runtime restart proof
6. fixed-step clock, visibility and sequenced input authority
7. product manifest, selected mode and acceptance parity
8. versioned Air Mail route and correct-current delivery proof
9. complete mission reset transaction and mission epoch
10. committed simulation/render/HUD/telemetry/GameHost correlation
11. terrain source, classification and retained LOD authority
12. bounded terrain builds, atomic replacement and edge continuity
13. grass chunk spatial identity and world-bounds culling
14. truthful CPU/WebGPU backend execution evidence
15. world surface membership and consumer parity
16. boundary response, recovery and visible-frame proof
```

## New world-surface gaps

```txt
WORLD.surface has no schema version
WORLD.surface has no revision or fingerprint
edgeMask results have no query/result identity
intersectsBounds results have no query/result identity
consumer policy IDs are absent
surface changes cannot stale-reject prior work
current balloon/camera membership is not published
```

## Consumer parity gaps

```txt
near terrain uses surface bounds admission
horizon terrain uses surface bounds admission
grass required set has no surface admission
grass culling has no surface admission
balloon horizontal movement has no surface admission
airstream route content has no surface validation
mail town/delivery content has no surface validation
vegetation, water and landmarks have no declared surface policy
```

## Boundary render gap

```txt
outside disk:
  bounded terrain sample reaches edgeFloor
  near/horizon chunks can be absent
  grass chunks can still be created at edgeFloor
  visible support-surface parity is unproven
```

## Boundary gameplay gap

```txt
balloon horizontal drift is unrestricted
edgeFloor only affects vertical clearance
inside/edge/outside state is absent
out-of-bounds response policy is absent
re-entry or recovery result is absent
mission phase does not encode boundary state
```

## Retained grass gaps

```txt
grass candidates and instance transforms use absolute world space
chunk InstancedMesh objects remain at global origin
manual culling reads mesh.position instead of chunk bounds
all chunks share one camera-to-origin distance
backend label can claim WebGPU without a GPU pipeline or dispatch
CPU calls increment dispatchedWorkgroups
accepted, visible and rendered counts are not separated
```

## Retained terrain gaps

```txt
retained horizon chunks are not reclassified after camera-center movement
intended and actual LOD are not jointly observable
terrain build work is synchronous and unbudgeted
candidate replacement and stale rejection are absent
near/horizon seam and normal policy is absent
```

## Retained runtime and mission gaps

```txt
NexusEngine imports @main
module-scope compatibility RAF remains
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

## Missing observations

```txt
surfaceId and surfaceRevision
surfaceFingerprint
balloon/camera membership
signed distance to boundary
terrain required/committed/visible chunk IDs
grass required/committed/visible chunk IDs
unsupported visible grass chunk IDs
surface consumer acknowledgement set
consumer mismatch reasons
boundary response result
visible-frame surface revision
```

## Required world-surface fixtures

```txt
fixture:surface-point-classification
fixture:surface-bounds-classification
fixture:surface-edge-mask-continuity
fixture:terrain-grass-membership-parity
fixture:no-unsupported-visible-grass
fixture:grass-origin-independent-culling
fixture:balloon-boundary-response
fixture:boundary-reentry
fixture:route-content-surface-validation
fixture:surface-revision-stale-result
fixture:surface-visible-frame-parity
fixture:pages-boundary-traversal
```

## Required guarantees

```txt
one surface revision drives all required consumers
terrain and grass cannot disagree silently
outside grass requires an explicit support-surface policy
simulation outside behavior is explicit and deterministic
route and destination content is surface-valid
stale membership results mutate nothing
GameHost explains consumer parity and mismatch reasons
rendered frames acknowledge the surface revision they show
```

Do not treat bounded terrain height as bounded gameplay, and do not treat terrain chunk rejection as proof that every visual consumer obeys the same world edge.