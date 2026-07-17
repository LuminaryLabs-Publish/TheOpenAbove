# Interaction Audit: Cloud Membership Command/Result Map

**Timestamp:** `2026-07-17T02-32-08-04-00`

## Current implicit command path

```txt
Visual.update(camera, elapsed)
  -> cloudSplats.update(camera, sunDirection, elapsed)
  -> shouldRebatch()
  -> query field
  -> select LOD
  -> sample splats
  -> sort and truncate
  -> mutate instance buffers
```

The adapter receives mutable camera and weather views and settles no typed admission or projection result.

## Required explicit path

```txt
CloudFieldAdmissionCommand
  inputs:
    worldSurfaceRevision
    weatherLayerRevision
    seedRevision
    qualityRevision
  result:
    CloudFieldAdmissionResult
    CloudFieldRevision
    CloudFieldDigest

CloudSplatBudgetCommand
  inputs:
    CloudFieldRevision
    CameraPoseRevision
    WeatherRevision
    predecessorMembershipRevision
    capacity
  result:
    CloudSplatBudgetResult
    admittedBankQuotas
    droppedCandidateCount

CloudMembershipTransitionCommand
  inputs:
    predecessor membership
    admitted candidate membership
    transition clock
  result:
    CloudLodMembershipResult
    entering / retained / leaving sets
    tier transitions
    transition progress

CloudProjectionCommitCommand
  inputs:
    CloudLodMembershipResult
    renderer generation
  result:
    CloudProjectionResult
    CloudProjectionDigest
    FirstGaussianCloudFrameAck
```

## Rejection rules

- Reject a command whose field revision is retired.
- Reject a rebatch older than the current camera or weather revision.
- Reject duplicate rebatch generations.
- Reject projection when member count exceeds accepted capacity.
- Reject a frame acknowledgement whose membership digest differs from the committed buffer generation.

## Lifecycle rules

Map open, page suspension, context loss, route retirement and disposal must retire pending transition work. Resume must choose an explicit frozen or caught-up transition clock.