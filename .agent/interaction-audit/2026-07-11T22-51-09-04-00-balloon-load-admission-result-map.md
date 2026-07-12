# Interaction Audit: Balloon Load Admission and Result Map

**Timestamp:** `2026-07-11T22-51-09-04-00`

## Plan ledger

**Goal:** replace implicit synchronous construction with a typed model-load command and result that can participate in level startup.

- [x] Trace production startup.
- [x] Trace the new `loadHotAirBalloonModel()` helper.
- [x] Compare helper behavior with `src/main.js`.
- [x] Define command, admission and result states.
- [ ] Wire the production runtime.

## Current behavior

```txt
src/main.js
  -> buildHotAirBalloon()
  -> add immediately to live scene
  -> construct simulation/camera/presentation
```

```txt
loadHotAirBalloonModel()
  -> optionally yield one animation frame
  -> synchronously buildHotAirBalloon()
  -> set loadedDuringLevelSetup
  -> return model
```

The helper is not used by `src/main.js`. It has no command ID, cancellation token, progress, staged ownership, failure result or scene commit.

## Required command

```txt
BalloonLoadCommand
  commandId
  runtimeSessionId
  runtimeGeneration
  levelSetupId
  modelDescriptor
  expectedProfileFingerprint
```

## Required results

```txt
accepted
rejected-invalid-profile
rejected-stale-session
cancelled
build-failed
resource-validation-failed
committed
duplicate
disposed
```

A committed result must include the model identity, admitted profile, resource inventory, scene commit revision and first-visible-frame receipt.
