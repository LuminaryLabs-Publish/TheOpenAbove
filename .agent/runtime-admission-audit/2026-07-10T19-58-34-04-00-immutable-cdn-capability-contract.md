# Immutable CDN and Capability Contract

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Timestamp:** `2026-07-10T19-58-34-04-00`

## Current sources

```txt
Three.js
  https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js
  policy: version-pinned

NexusEngine
  https://cdn.jsdelivr.net/gh/LuminaryLabs-Dev/NexusEngine@main/src/index.js
  policy: mutable branch reference
```

## Contract problem

A repository commit does not currently identify the exact NexusEngine bytes or commit used by a browser session. Source availability and API compatibility are implicit. Existing local validation can pass while the deployed runtime later resolves different NexusEngine code or fails during static module resolution.

## Required manifest shape

```txt
schemaVersion
routeRevision
mode: development | production
dependencies[]
  id
  required
  provider
  repository/package
  immutableRevision
  modulePath
  requestedUrl
  expectedExports[]
  optionalExports[]
  policy
manifestFingerprint
```

## Production admission policy

```txt
Three.js must use an exact package version.
NexusEngine must use an immutable commit SHA or immutable release tag.
Mutable branch names such as main are rejected for required production sources.
Every required export must be present before runtime construction.
Optional capability loss must be explicitly classified as degraded or rejected.
No boot result may claim running without an accepted manifest and capability result.
```

## Capability matrix

Minimum NexusEngine checks should cover only APIs consumed by `createBalloonTelemetryEngine`, not broad engine availability. The matrix must name each required export, expected type, and compatibility policy.

Minimum Three.js checks should cover constructors and constants required by the active source-backed visual kits.

## Boot result

```txt
bootId
requestedAt
resolvedAt
manifestFingerprint
sources[]
capabilities[]
status: accepted | degraded | rejected
reasonCode
constructionStatus
sessionId
```

## Error boundary requirement

A minimal local bootstrap module must own loading and error projection. It cannot depend on the remote modules it is responsible for admitting. It dynamically resolves the declared sources, validates capabilities, and only then imports or invokes the runtime composition root.

## Lifecycle handoff

```txt
accepted RuntimeAdmissionResult
  -> allocate sessionId/generation
  -> construct owners
  -> register disposers
  -> start frame chain
```

Rejected admission allocates no runtime session and installs no simulation, camera, visual, or frame callbacks.

## Next safe ledge

```txt
TheOpenAbove Immutable Runtime Admission + Boot Capability Fixture Gate
```