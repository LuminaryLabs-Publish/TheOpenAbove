# Architecture Audit: Runtime Session Lifecycle Authority

**Timestamp:** `2026-07-10T17-51-35-04-00`

## Current composition

```txt
createGame()
  -> createVisualDomain()
       -> scene/camera/renderer
       -> terrain/vegetation/grass/landmarks
       -> weather/sun/sky/clouds/aerial/water/lens
       -> composer/dynamic resolution
       -> resize listener
  -> buildHotAirBalloon()
  -> createBalloonSimulation()
       -> keydown/keyup/blur listeners
  -> createBalloonCameraRig()
       -> wheel listener
  -> createBalloonPresentationDomain()
  -> createBalloonTelemetryEngine()
  -> initial camera/visual/telemetry publication
  -> recursive requestAnimationFrame(frame)
  -> window.GameHost live-object projection
```

## Authority split

No object owns the complete runtime session.

```txt
src/main.js owns creation and frame recursion
simulation owns keyboard listener removal
camera rig owns wheel listener removal
visual domain owns resize listener removal and partial visual cleanup
composer owns render-target cleanup
GameHost owns only references, not lifecycle
showFatal owns presentation of failure, not rollback
```

Because `createGame()` returns nothing, these owners cannot be coordinated by the caller.

## Domain map

### Existing domains

```txt
route boot
runtime composition
simulation
presentation
camera
visual scene
render policy
telemetry
HUD
GameHost
static validation
headless editor
```

### Missing lifecycle domains

```txt
runtime session identity
session lifecycle state
animation-frame ownership
listener ownership
resource ownership
startup transaction
partial-start rollback
ordered teardown
restart admission
teardown result journal
GameHost lifecycle readback
lifecycle fixture
```

## Service map

### Existing services

```txt
construct runtime parts
install global listeners
start recursive frames
update/render/project state
remove selected listeners at kit level
dispose grass, terrain, and composer at visual level
```

### Required services

```txt
createSession(options) -> session result
startSession() -> started/already-running/rejected
stopSession(reason) -> stopped/already-stopped/failed
disposeSession(reason) -> ordered bounded teardown
restartSession(options) -> dispose then create with new sessionId
registerOwnedListener(target, type, handler, options)
registerOwnedResource(resource, disposer, order)
registerAnimationFrame(id)
cancelOwnedFrames()
rollbackPartialStart(error)
getLifecycleSnapshot()
getLifecycleJournal()
```

## DSK map

### Source-backed active kits

The runtime already composes simulation, telemetry, balloon object, camera, clipping, presentation, visual, quality, atmosphere, terrain, grass, water, landmarks, composer, grading, lens, static smoke, and headless editor kits.

### Lifecycle-capable but uncoordinated kits

```txt
open-above-balloon-simulation-kit
  service: dispose keyboard listeners

open-above-balloon-camera-rig-kit
  service: dispose wheel listener

open-above-visual-domain
  service: remove resize listener and dispose selected visual owners

open-above-hdr-composer-kit
  service: dispose depth textures, render target, and composer

open-above-grass-field-domain
  service: dispose grass resources

terrain surface/streaming kits
  service: optional dispose path
```

### Next-cut kits

```txt
open-above-runtime-session-authority-kit
open-above-runtime-lifecycle-state-kit
open-above-runtime-start-transaction-kit
open-above-animation-frame-ownership-kit
open-above-listener-ownership-ledger-kit
open-above-resource-ownership-ledger-kit
open-above-partial-start-rollback-kit
open-above-ordered-teardown-kit
open-above-session-result-journal-kit
open-above-gamehost-lifecycle-proof-kit
open-above-lifecycle-restart-fixture-kit
```

## Required lifecycle state

```txt
created
starting
running
stopping
stopped
disposing
disposed
failed
```

Every transition should include:

```txt
sessionId
transitionId
from
to
reason
startedAt
completedAt
ownedFrameCount
ownedListenerCount
ownedResourceCount
results[]
error
```

## Ordered teardown proposal

```txt
1. mark session stopping
2. reject new frame work
3. cancel outstanding animation frame
4. dispose camera input listener
5. dispose simulation input listeners
6. stop/dispose telemetry owner when supported
7. dispose presentation owner when supported
8. dispose visual subdomains in reverse construction order
9. dispose renderer and force context loss only when explicitly requested
10. clear or replace GameHost references
11. publish immutable stopped/disposed snapshot
```

## Compatibility constraints

```txt
preserve current route boot
preserve GameHost fields additively
preserve visible Balloon Drift behavior
preserve current simulation/camera/visual APIs
keep lifecycle journal bounded and JSON-safe
allow repeated dispose calls to be idempotent
never create parallel frame loops for one session
```

## Main finding

The architecture already contains several local disposal capabilities, but no composed DSK owns the session that created them. The missing abstraction is not another renderer or gameplay kit; it is a root lifecycle authority that turns construction, frame recursion, listener installation, resource registration, failure rollback, teardown, and restart into one deterministic service boundary.
