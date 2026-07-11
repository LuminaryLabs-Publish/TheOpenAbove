# Source Provenance and Render Boot Gap

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Timestamp:** `2026-07-10T19-58-34-04-00`

## Render boot path

```txt
static module graph
  -> Three.js module
  -> NexusEngine module
  -> createVisualDomain()
  -> renderer, scene, camera, atmosphere, terrain, grass, water and composer
  -> first visual update
  -> recursive render loop
```

## Findings

```txt
Three.js is pinned to 0.165.0.
NexusEngine is loaded from a mutable @main branch URL.
No route-owned source manifest binds the renderer and telemetry runtime to immutable revisions.
No capability check runs before visual resources are constructed.
The route try/catch cannot classify static module-link failures.
The existing error panel can only handle errors after the module body begins evaluating.
No render boot row states requested source, resolved source, capability result or construction phase.
GameHost exposes renderer and scene handles but no immutable source proof.
The smoke and headless checks inspect local source text rather than loading the remote module graph.
```

## Why this affects rendering

A source change in NexusEngine can alter telemetry integration or exported APIs without a commit in this repository. A missing or incompatible remote module can prevent any frame, HUD, or error projection. Render validation therefore starts too late: it validates local renderer contracts without proving that the browser can admit the runtime dependencies needed to construct them.

## Required render-admission rows

```txt
routeRevision
manifestVersion
three.requestedUrl
three.resolvedCoordinate
three.version
three.capabilityStatus
nexusEngine.requestedUrl
nexusEngine.resolvedCommit
nexusEngine.capabilityStatus
admissionStatus
bootPhase
visualConstructionStatus
firstFrameStatus
failureCode
sourceFingerprint
```

## Required policies

```txt
reject mutable required sources in production manifests
allocate no visual session before required capabilities pass
publish loading and failure state from a bootstrap shell that does not depend on the admitted modules
register every constructed render resource with the later session-lifecycle owner
retain source proof after failure or disposal
keep proof bounded and JSON-safe
```

## Deferred render work

```txt
renderer replacement
cloud, terrain, grass, water or lighting rewrite
camera retuning
post-processing changes
quality threshold changes
new route content
```

## Next safe ledge

```txt
TheOpenAbove Immutable Runtime Admission + Boot Capability Fixture Gate
```