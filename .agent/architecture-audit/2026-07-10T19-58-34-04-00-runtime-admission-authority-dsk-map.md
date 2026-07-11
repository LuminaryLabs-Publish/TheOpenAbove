# Runtime Admission Authority DSK Map

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Timestamp:** `2026-07-10T19-58-34-04-00`

## Current composition

```txt
index.html module entry
  -> static remote Three.js import
  -> static remote NexusEngine @main import
  -> local module graph
  -> createGame()
  -> runtime construction
  -> recursive frame loop
  -> GameHost live-object projection
```

## Current authority problem

The browser module loader decides whether the route can start, but the application has no explicit dependency-admission domain. Three.js is version-pinned, NexusEngine is branch-pinned, and neither source is represented by a runtime manifest or accepted-source record. Static import resolution and linking occur before `createGame()` and its `try/catch`.

## Existing domains

```txt
route-shell
static-esm-resolution
three-cdn-adapter
nexusengine-cdn-adapter
runtime-composition
simulation
camera
presentation
visual-environment
render-policy
telemetry
hud-projection
gamehost-readback
partial-disposal
static-smoke
headless-command-routing
```

## Required parent domain

```txt
open-above-runtime-admission-domain
```

Owns:

```txt
source manifest
immutable source coordinates
requested and resolved source identity
required/optional dependency classification
module load result
capability preflight
boot admission decision
failure reason
source fingerprint
boot journal
GameHost source proof
fixture parity
```

## Required kits

### `open-above-runtime-source-manifest-kit`

Services:

```txt
schema version
route revision
Three.js source coordinate
NexusEngine source coordinate
required export list
optional capability list
source policy
```

### `open-above-immutable-module-locator-kit`

Services:

```txt
commit-pinned GitHub/jsDelivr URL generation
version-pinned package URL generation
URL normalization
mutable-ref rejection
source-coordinate readback
```

### `open-above-module-admission-kit`

Services:

```txt
requested source row
resolved source row
load success/failure
required/optional classification
typed admission result
bounded failure details
```

### `open-above-runtime-capability-preflight-kit`

Services:

```txt
NexusEngine export validation
Three.js constructor validation
telemetry factory compatibility
required API matrix
accepted/degraded/rejected decision
```

### `open-above-boot-transaction-kit`

Services:

```txt
admission-before-construction
ordered construction steps
disposer registration
partial-start rollback handoff
single boot result
session-generation handoff
```

### `open-above-source-fingerprint-kit`

Services:

```txt
manifest fingerprint
source-coordinate fingerprint
resolved capability fingerprint
JSON-safe proof
comparison across browser and fixture
```

### `open-above-boot-result-journal-kit`

Services:

```txt
requested
resolved
accepted
degraded
rejected
construction-started
construction-failed
rollback-completed
running
bounded reason rows
```

### `open-above-boot-error-projection-kit`

Services:

```txt
pre-module bootstrap error surface
loading status
source and capability error projection
non-sensitive diagnostics
retry/reload guidance
```

### `open-above-gamehost-source-proof-kit`

Services:

```txt
active manifest
resolved source coordinates
capability result
boot status
source fingerprint
immutable terminal proof
```

### `open-above-runtime-admission-fixture-kit`

Services:

```txt
manifest validation
mutable-ref rejection
required-export failure
optional-capability degradation
load-failure classification
fingerprint determinism
browser/Node proof-shape parity
non-zero failure exit
```

## Composition order

```txt
source manifest
  -> immutable locators
  -> module admission
  -> capability preflight
  -> boot decision
  -> boot transaction
  -> runtime session authority
  -> frame/listener/resource ownership
  -> GameHost source and lifecycle proof
```

## Boundary with existing lifecycle plan

The session-generation fence is not replaced. It becomes the consumer of an accepted `RuntimeAdmissionResult`. Rejected admission must never allocate an active session or install runtime listeners. Partial construction failures pass registered disposers to the lifecycle rollback path.

## Next safe ledge

```txt
TheOpenAbove Immutable Runtime Admission + Boot Capability Fixture Gate
```