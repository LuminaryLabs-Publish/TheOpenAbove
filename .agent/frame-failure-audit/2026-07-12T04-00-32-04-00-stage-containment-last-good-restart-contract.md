# Frame Failure Audit: Stage Containment, Last-Good Frame and Restart Contract

**Timestamp:** `2026-07-12T04:00:32-04:00`

## Authority boundary

```txt
open-above-frame-failure-containment-authority-domain
```

The domain coordinates failure behavior around existing subsystem owners. It does not move flight, mail, camera, rendering or HUD rules out of their current domains.

## Required state

```txt
runtimeSessionId
missionEpoch
frameId
frameAttemptState
currentStageId
completedStageIds
lastKnownGoodFrameId
lastKnownGoodStateFingerprint
lastKnownGoodCanvasRevision
lastKnownGoodHudRevision
failureId
failureClassification
failureLifecycleRevision
capabilityRevision
disposalPlanId
terminalResult
```

## Frame attempt lifecycle

```txt
Admitted
  -> Executing(stage 1..n)
  -> Committed
or
Admitted
  -> Executing(stage k)
  -> Failed
  -> Quarantining
  -> Disposing
  -> Terminal
```

Illegal combinations:

```txt
Failed + successor RAF admitted
Failed + public mutation capability active
Terminal + live subsystem owner exposed
Committed + missing visible-frame acknowledgement
Restarted + predecessor callback accepted
```

## Failure transaction

```txt
catch exception at frame boundary
  -> allocate failureId
  -> record failed frame/stage and completed prefix
  -> stop all later stages
  -> reject successor scheduling
  -> quarantine simulation, mission, camera, presentation and visual mutation
  -> revoke public command capabilities
  -> preserve last-known-good observation
  -> preserve or replace visible output according to renderer safety
  -> project bounded failure overlay
  -> cancel owned listeners and callbacks
  -> run ordered disposal
  -> publish terminal result
```

## Last-known-good rule

A frame becomes last-known-good only after:

```txt
all required state stages succeeded
render submission succeeded
presentation was acknowledged
HUD projection succeeded
committed observation was published
```

A failed frame cannot advance this pointer even when some earlier stage mutations already occurred.

## Recovery policy

```txt
known WebGL context loss
  -> use typed context-recovery path if the resource graph is safe

unknown simulation, mission, camera, presentation, telemetry or HUD failure
  -> terminally retire the session

cold restart
  -> create a new runtimeSessionId
  -> create a new missionEpoch
  -> rebuild all owners
  -> reject predecessor callbacks and capabilities
  -> publish readiness only after the first committed replacement frame
```

## Disposal order

```txt
cancel RAF and input admission
revoke public capabilities
stop telemetry publication
retire mail and airstream visuals
retire balloon presentation and camera listeners
remove and dispose balloon resources
retire terrain/grass/environment resources
retire composer and renderer
clear or version terminal DOM projection
publish disposal results
```

The exact order must follow real ownership dependencies and retain all secondary disposal failures.

## Required fixtures

```txt
fixture:frame-failure-simulation-stage
fixture:frame-failure-mail-stage
fixture:frame-failure-airstream-stage
fixture:frame-failure-balloon-stage
fixture:frame-failure-presentation-stage
fixture:frame-failure-camera-stage
fixture:frame-failure-visual-update-stage
fixture:frame-failure-telemetry-stage
fixture:frame-failure-render-stage
fixture:frame-failure-hud-stage
fixture:frame-failure-no-successor-raf
fixture:frame-failure-capability-revocation
fixture:frame-failure-last-known-good-coherence
fixture:frame-failure-cold-restart
```

## Completion rule

Do not claim frame-failure recovery until every stage can be fault-injected and the browser proves one terminal result, no later-stage mutation, no successor callback, coherent last-known-good output, complete capability revocation and a clean replacement-session first frame.