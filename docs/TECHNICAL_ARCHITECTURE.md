# Technical Architecture

## Ownership

```txt
NexusEngine package
  runtime and semantic Domain contracts
  read-only Build planning and isolated artifact production
  MCP discovery, approval, and receipt contracts

The Open Above
  authored campaign and world data
  balloon rules and deterministic flight kernel
  Three.js presentation and browser adapters
  player input, navigation, and image capture
  release diagnostic view

external Build state
  ~/.nexusengine sources, toolchains, stages, artifacts, and receipts
```

Runtime code never imports the Build Domain. Build reads this project, selects
one target entry, writes only to external staging/output roots, and proves the
project fingerprint is unchanged.

## Runtime Composition

```txt
createEngine
  + n:runtime defaults
  + n:runtime:startup
  + n:spatial
  + n:world
  + n:world:foundation
  + n:world:feature
  + landform and atmosphere feature atoms
  + n:world:weather
  + layered weather
  + Open Above telemetry Kit
```

The browser host projects this renderer-neutral state through game-owned
Three.js modules. `window.GameHost` exposes runtime state and release diagnostics
without making the diagnostic dialog part of the normal first-screen workflow.

## Target Fan-Out

```txt
src/main.js
  -> web-live
  -> web-static

src/native/balloon-flight-kernel.js
  -> Android ARM64 OpenXR package
  -> Windows x64 PCVR OpenXR package
```

The shared native entry contains only compiler-supported numeric functions.
Unsupported behavior fails during planning instead of silently changing mode.
