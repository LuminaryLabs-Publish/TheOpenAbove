# Architecture Audit: Import Purity and Frame Authority

**Timestamp:** `2026-07-10T21-31-01-04-00`

## Current authority map

```txt
src/main.js
  -> imports buildHotAirBalloon and animateHotAirBalloon
  -> creates the active balloon directly
  -> starts the authoritative route RAF

src/hot-air-balloon-object-kit.js
  -> exports reusable construction and animation services
  -> also schedules attachWhenReady during module evaluation
  -> waits for GameHost
  -> attempts legacy vehicle installation
  -> starts a second recursive RAF regardless of installation result
```

## Architectural defect

Construction exports and browser auto-install behavior share one module. Importing a pure object service unexpectedly creates process lifetime, polling and frame authority. The compatibility loop is not registered with the route, has no frame ID, no generation, no typed result and no disposer.

## Required DSK cut

```txt
open-above-balloon-object-kit
  pure build and animate services only
open-above-legacy-balloon-installer-kit
  explicit install(host) command
open-above-compatibility-admission-kit
  decides whether the legacy host shape is supported
open-above-frame-ownership-kit
  registers, labels and cancels RAF handles
open-above-session-generation-fence-kit
  rejects stale callbacks
open-above-runtime-session-authority-kit
  composes start, stop, dispose and terminal proof
open-above-import-purity-fixture-kit
  proves importing a kit schedules zero frames/listeners
```

## Required result shape

```txt
installerId
sessionId
generation
admission: accepted | rejected | unsupported
reason
installedObjectId
frameHandleOwned
listenerCount
resourceCount
terminal
```

## Dependency order

Immutable module admission remains upstream. After accepted source/capability admission, create one session owner, call the compatibility installer explicitly only for supported legacy hosts, and register all frames/listeners/resources before publication.