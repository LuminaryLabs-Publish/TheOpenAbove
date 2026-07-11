# Architecture Audit: Import-Purity and Frame Authority DSK Map

**Timestamp:** `2026-07-11T19-28-28-04-00`

## Summary

The active Air Mail composition imports a balloon object kit that starts process-lifetime behavior at module scope. Frame ownership is therefore split before the runtime session exists.

## Current authority split

```txt
src/main.js
  -> imports hot-air-balloon-object-kit.js
  -> owns active Air Mail createGame() and frame()
  -> builds and animates the current balloon

hot-air-balloon-object-kit.js module scope
  -> schedules attachWhenReady()
  -> polls window.GameHost
  -> optionally installs a legacy replacement balloon
  -> starts a second recursive animation loop
```

## Required parent domain

```txt
open-above-import-purity-frame-authority-domain
```

### Command and policy kits

```txt
module-side-effect-policy-kit
compatibility-install-command-kit
compatibility-target-discovery-kit
compatibility-install-result-kit
```

### Frame ownership kits

```txt
frame-loop-registration-kit
frame-loop-identity-kit
runtime-generation-fence-kit
compatibility-loop-disposal-kit
startup-failure-loop-retirement-kit
```

### Work and observation kits

```txt
scene-traversal-budget-kit
compatibility-observation-kit
import-purity-fixture-kit
browser-frame-owner-smoke-kit
```

## Ownership rules

```txt
kit modules
  -> export data and functions only
  -> own no RAF, timer, listener or global mutation

runtime session
  -> owns all frame registrations
  -> assigns frameLoopId and runtimeGeneration
  -> cancels every loop during failure, stop and disposal

compatibility installer
  -> runs only from an explicit command
  -> resolves one target once
  -> returns no-compatible-target without recurring work
  -> registers animation only after a committed installation
```

## Existing domains retained

The balloon object kit continues to own procedural object construction and part animation. The runtime host continues to own the active Air Mail loop. The new authority domain coordinates when compatibility behavior may be installed and which session owns its recurring work; it does not absorb simulation, balloon geometry or rendering responsibilities.

## Required results

```txt
CompatibilityInstallResult
  commandId
  runtimeSessionId
  runtimeGeneration
  status: installed | no-compatible-target | rejected | failed
  targetId
  frameLoopId
  acquiredResources
  failure

FrameLoopRegistration
  frameLoopId
  ownerDomainId
  runtimeSessionId
  runtimeGeneration
  purpose
  active
  scheduledAt
  retiredAt
```

## Implementation order

```txt
1. remove module-scope requestAnimationFrame
2. export explicit compatibility installer
3. make target discovery pure and one-shot
4. return typed no-target result
5. register optional animation through session frame authority
6. fence callbacks by generation
7. retire loops before scene/resource disposal
8. expose bounded observations
9. add import and browser fixtures
```

## Completion gate

Importing `hot-air-balloon-object-kit.js` in a browser or DOM shim must leave the frame queue, listener set, timers, scene and globals unchanged. Successful Air Mail startup must report exactly one required frame owner unless a separately admitted compatibility installation proves a second owner is intentional.