# Import-Purity Audit: Explicit Compatibility Installer Contract

**Timestamp:** `2026-07-11T19-28-28-04-00`

## Current impurity

```js
window.OpenAboveHotAirBalloonObjectKit = { ... };
requestAnimationFrame(attachWhenReady);
```

Importing the object kit both mutates a global and starts recurring browser work. This happens before runtime admission and is not reversible through the current exported API.

## Required import contract

Importing any reusable kit must:

```txt
register no RAF callbacks
register no timers
register no event listeners
mutate no scene
publish no global runtime object
read no ambient GameHost as an installation trigger
```

## Required explicit API

```txt
createHotAirBalloonObject(profile)
createCompatibilityInstaller(policy)
installer.inspectTarget(scene, expectedGeneration)
installer.install(command)
installer.dispose(resultId)
```

## Install result

```txt
CompatibilityInstallResult
  commandId
  runtimeSessionId
  runtimeGeneration
  status
  targetId
  installedObjectId
  frameLoopId
  disposed
  error
```

Allowed status values:

```txt
installed
no-compatible-target
already-installed
stale-generation
session-not-running
rejected-product-mode
failed
```

## No-target rule

`no-compatible-target` is a terminal success result for the inspection command. It must not start polling or recurring scene traversal.

## Global exposure rule

Any compatibility global required for legacy pages must be installed by the host after product and session admission, and removed during disposal. The reusable module itself remains side-effect free.

## Fixture gate

```txt
fixture:balloon-kit-import-purity
fixture:compatibility-no-target-no-work
fixture:compatibility-single-install
fixture:compatibility-stale-generation
fixture:compatibility-disposal
fixture:failed-startup-zero-callbacks
```