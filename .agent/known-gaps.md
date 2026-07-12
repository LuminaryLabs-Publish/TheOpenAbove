# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-11T22-51-09-04-00`

## Primary ordered gaps

```txt
1. immutable runtime admission
2. import purity and single frame owner
3. balloon model descriptor, profile admission and fingerprint
4. detached initial-level model loading and cancellation
5. cross-component attachment parity
6. model resource inventory, disposal and first-frame proof
7. runtime session/listener/resource ownership
8. fixed-step clock and sequenced input
9. product source and acceptance parity
10. Air Mail route and delivery authority
11. mission reset transaction and epoch
12. committed observation correlation
13. terrain source, LOD and atomic replacement
14. grass spatial identity and backend truth
15. world-surface consumer parity
```

## Balloon descriptor gaps

```txt
no model schema or model version
no modelId or modelRevision
no canonical profile normalization
no deep-frozen admitted profile
no profile fingerprint
no material or attachment fingerprint
mutable nested default profiles remain ambient authority
```

## Assembly parity gaps

```txt
panel profile is the implicit envelope-shape source
shell, seams and mouth consume the envelope profile
basket dimensions are independent
burner-frame coordinates are independent
load-cable anchor and basket coordinates are independent
camera basket focus offset is fixed
no validator proves the complete assembly remains connected
```

## Loading gaps

```txt
production startup calls buildHotAirBalloon synchronously
loadHotAirBalloonModel is not used by src/main.js
load helper only yields one frame before synchronous construction
no command ID, session fence or generation
no cancellation, progress, staged ownership or rollback
no atomic scene-commit result
```

## Resource gaps

```txt
persistentGpuResources is metadata only
no root inventory of geometries, materials and textures
no root dispose service
no idempotent retirement receipt
no stale rope-update fence
no predecessor release after replacement frame
```

## Observation gaps

```txt
modelId
modelRevision
profileFingerprint
attachmentFingerprint
resourceFingerprint
modelLoadResult
modelReadyCommit
dynamicRiggingRevision
renderFrameId
firstVisibleModelFrameId
resourceRetirementResult
```

## Required fixtures

```txt
fixture:balloon-profile-schema
fixture:balloon-custom-envelope-parity
fixture:balloon-custom-gondola-parity
fixture:balloon-attachment-validation
fixture:balloon-finite-geometry
fixture:balloon-initial-setup-load
fixture:balloon-load-cancellation
fixture:balloon-stale-load-rejection
fixture:balloon-resource-inventory
fixture:balloon-double-dispose
fixture:balloon-replacement-retirement
fixture:balloon-first-visible-frame
fixture:pages-balloon-model-parity
```

Do not treat `modelReady = true` as a committed load result, and do not treat `persistentGpuResources = true` as resource ownership or disposal proof.
