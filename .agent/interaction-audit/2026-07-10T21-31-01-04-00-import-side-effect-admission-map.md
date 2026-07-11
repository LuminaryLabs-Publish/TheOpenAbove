# Interaction Audit: Import Side-Effect Admission

**Timestamp:** `2026-07-10T21-31-01-04-00`

## Interaction sources

```txt
keyboard keydown/up
  -> burner and vent intent
blur
  -> clear held keys
wheel
  -> camera zoom
module evaluation
  -> hidden attachWhenReady scheduling
```

The first three are user/browser interactions owned by explicit kit constructors. The fourth is an implicit process interaction with no caller intent, admission decision or lifecycle result.

## Current asymmetry

`createBalloonSimulation()` and `createBalloonCameraRig()` install listeners and return disposers. `hot-air-balloon-object-kit.js` installs a RAF chain at module scope and returns no handle. The route can theoretically dispose keyboard and wheel interactions but cannot stop the compatibility interaction.

## Required admission map

```txt
import object kit
  -> no side effects
explicit installLegacyBalloon(host, session)
  -> preflight host shape
  -> accepted: install object and optionally register owned animation callback
  -> unsupported: return typed no-op result
  -> rejected: return reason and own nothing
```

## Proof rows

```txt
import_only / scheduledFrames=0
active_route_direct_balloon / legacyAdmission=unsupported / scheduledFrames=0
legacy_host_supported / installed=true / frameOwner=session
stop / inputListeners=0 / wheelListeners=0 / compatibilityFrames=0
restart / staleGenerationCallbacks=0
```