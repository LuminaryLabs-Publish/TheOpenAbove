# Interaction Audit: Module Import, GameHost Publication and Frame Ownership

**Timestamp:** `2026-07-11T19-28-28-04-00`

## Interaction map

```txt
ES module loader
  -> evaluates hot-air-balloon-object-kit.js
  -> schedules attachWhenReady without an explicit user/runtime command

attachWhenReady
  -> reads global window.GameHost
  -> if absent, schedules another callback
  -> if present, mutates compatibility target when found
  -> starts a recurring compatibility tick unconditionally

createGame
  -> creates active product state
  -> publishes mutable subsystem handles on window.GameHost
  -> schedules active frame loop
```

## Authority gap

The compatibility module treats global host appearance as implicit permission to install and run. There is no command ID, target ID, product mode, runtime session, generation, install result, frame registration or rejection result.

## Required interaction sequence

```txt
runtime commits product mode and session
  -> issue CompatibilityInstallCommand only when legacy support is required
  -> discover target once against the committed scene generation
  -> return no-compatible-target without side effects when absent
  -> stage installation when present
  -> commit installation result
  -> register recurring work through session frame authority
  -> include frameLoopId in observations
  -> cancel registration during stop/failure/disposal
```

## Required stale protections

```txt
reject command for old runtime generation
reject target found in predecessor scene
reject delayed install after session stop
reject callback after loop retirement
reject duplicate install command
```

## Public interaction rule

`window.GameHost` must expose detached observations or typed commands, not serve as an ambient trigger for import-time modules.