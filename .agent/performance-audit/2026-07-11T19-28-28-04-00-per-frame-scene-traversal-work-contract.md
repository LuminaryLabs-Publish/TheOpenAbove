# Performance Audit: Per-Frame Compatibility Scene Traversal Work

**Timestamp:** `2026-07-11T19-28-28-04-00`

## Current recurring work

The compatibility tick calls `findVehicle(host.scene)` every frame. `findVehicle()` invokes `scene.traverse()` and checks nodes until a legacy marker shape is found. The current Air Mail scene does not use that target contract, so the scan repeats without producing useful work.

## Work characteristics

```txt
frequency: browser frame cadence
complexity: O(scene node count) per compatibility frame
budget: absent
owner: absent
visible metric: absent
cancellation: absent
no-target backoff: absent
```

The active terrain, grass, cloud, town, balloon and post-processing scene can change node count over time. The hidden compatibility cost therefore scales with scene complexity.

## Required work policy

```txt
target discovery occurs once per explicit install command
no-target result performs zero later traversal
scene-generation change requires a new explicit command
optional compatibility animation consumes a known frame budget
frame observations separate simulation, render and compatibility work
budget overrun returns a typed deferred or failed result
```

## Required observations

```txt
compatibilityInstallAttempts
compatibilityTargetScans
compatibilityNodesVisited
compatibilityFrameCallbacks
compatibilityFrameMs
activeFrameLoopCount
frameLoopOwners
```

## Fixture gate

A current Air Mail browser fixture must run a bounded frame sample and prove:

```txt
active required frame loops = 1
compatibility target scans after no-target result = 0
compatibility nodes visited after no-target result = 0
failed startup live callbacks after rollback = 0
```