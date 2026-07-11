# Deploy Audit: Import-Purity and Lifecycle Fixture Gate

**Timestamp:** `2026-07-11T19-28-28-04-00`

## Existing validation surface

```txt
npm run check
  -> node tests/smoke.mjs

npm run build
  -> npm run check
  -> vite build

headless commands
  -> Nexus editor environment wrappers
```

Current source and pure tests do not instrument module-evaluation side effects, browser RAF registrations, scene traversal counts, startup failure cleanup or compatibility disposal.

## Required pure fixture

```txt
import hot-air-balloon-object-kit.js with instrumented globals
assert no requestAnimationFrame call
assert no listener or timer registration
assert no scene mutation
assert no GameHost polling
```

## Required browser fixtures

```txt
fixture:single-active-frame-owner
fixture:no-target-no-compatibility-loop
fixture:failed-startup-zero-live-callbacks
fixture:retry-no-predecessor-callbacks
fixture:compatibility-install-and-dispose
fixture:runtime-generation-stale-callback-rejection
fixture:pages-single-frame-owner
```

## Required evidence

Each browser result must include:

```txt
runtimeSessionId
runtimeGeneration
activeFrameLoopIds
frameLoopOwnerIds
scheduledCallbackCount
cancelledCallbackCount
compatibilityInstallResult
sceneTraversalCount
firstCommittedFrameId
terminalFailureOrDisposeResult
```

## Deployment gate

Pages deployment must not be treated as lifecycle-correct until the deployed route proves one active Air Mail frame owner, zero compatibility scans after a no-target result, and zero predecessor callbacks after failure or disposal.

## Commands not run

```txt
npm install
npm run check
npm run build
npm run headless:check
browser smoke
Pages smoke
```

This audit changes documentation only.