# TheOpenAbove Project Breakdown

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Timestamp:** `2026-07-10T19-58-34-04-00`

## Plan ledger

### Goal

Define the immutable runtime-admission boundary that must exist before the Balloon Drift route constructs a visual session, so the deployed commit can prove which Three.js and NexusEngine sources were requested, resolved, accepted, rejected, and exposed through diagnostics.

### Checklist

- [x] Compared the complete accessible `LuminaryLabs-Publish` inventory with the central repository ledger.
- [x] Confirmed all nine eligible non-Cavalry repositories are centrally tracked and have root `.agent` state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected only `LuminaryLabs-Publish/TheOpenAbove` because its central ledger was older than its repo-local audit state and therefore out of sync.
- [x] Read `index.html`, `src/main.js`, `package.json`, `tests/smoke.mjs`, and `tools/headless-editor-environment.mjs`.
- [x] Identified the interaction loop.
- [x] Identified active domains, kits, and their services.
- [x] Identified the mutable NexusEngine source and static-module failure boundary.
- [x] Defined the runtime-admission DSK cut and fixture gate.
- [x] Kept runtime source, dependencies, routes, rendering, and deployment unchanged.
- [x] Created no branch or pull request.
- [x] Pushed documentation only to `main`.
- [x] Synchronized the central repository ledger and internal change log.

## Selection

The accessible organization inventory contained:

```txt
AetherVale
HorrorCorridor
IntoTheMeadow
MyCozyIsland
PhantomCommand
PrehistoricRush
TheCavalryOfRome
TheOpenAbove
TheUnmappedHouse
ZombieOrchard
```

All eligible repositories were tracked. `TheOpenAbove` had a repo-local audit aligned at `2026-07-10T19-18-39-04-00`, while the central ledger still reported `2026-07-10T17-51-35-04-00`. That synchronization gap made it the highest-priority documented repository for this pass.

## Interaction loop

```txt
index.html
  -> browser resolves static ESM graph
       -> pinned Three.js URL
       -> mutable NexusEngine @main URL
       -> local route modules
  -> module graph links and evaluates
  -> createGame()
       -> visual domain and resize listener
       -> balloon object
       -> simulation and keyboard/blur listeners
       -> camera rig and wheel listener
       -> presentation and Nexus telemetry
       -> initial camera, visual, and telemetry state
       -> recursive animation frame
            -> simulation update
            -> balloon transform and presentation
            -> camera update
            -> visual update
            -> telemetry tick
            -> render and adaptive-resolution sample
            -> HUD projection
            -> next frame request
  -> publish live objects and snapshots through window.GameHost
```

The route-level `try/catch` starts only after the static imports have resolved. A CDN resolution, parse, or module-link failure can prevent `showFatal()` and `createGame()` from running at all.

## Domains in use

```txt
browser shell and Vite static publishing
static ESM dependency resolution
Three.js CDN source
NexusEngine CDN source
runtime composition
campaign, world, and legacy-flight configuration
keyboard, blur, and wheel input
wind, buoyancy, damping, ceiling, and terrain-clearance simulation
balloon object, transform, and presentation
camera follow, basket-view blend, clipping fade, and zoom
visual composition and quality-tier selection
dynamic resolution and frame-cost smoothing
physical sky, sun, aerial perspective, weather, and volumetric clouds
terrain surface and chunk streaming
vegetation, deterministic grass, water, and landmarks
HDR composition, neutral grading, and lens response
Nexus telemetry
HUD and GameHost projection
partial listener and resource disposal
static smoke and headless source-text validation
planned immutable source manifest and dependency admission
planned capability preflight, boot transaction, failure projection, and source proof
planned session generation, ownership, disposal, restart, and terminal GameHost proof
```

## Active kits and services

```txt
open-above-route-shell-kit
  canvas, HUD, error panel, module entry and route boot
open-above-importmap-kit
  pinned Three.js bare-specifier mapping
open-above-nexusengine-cdn-adapter-kit
  NexusEngine module consumption and telemetry integration
open-above-runtime-composer-kit
  visual, balloon, simulation, camera, presentation, telemetry, frame and GameHost composition
open-above-balloon-simulation-kit
  wind, buoyancy, damping, terrain clearance, burner/vent input, snapshots and listener disposal
open-above-balloon-telemetry-kit
  Nexus resource/event publication and state readback
open-above-hot-air-balloon-object-kit
  envelope, basket, ropes, burner, materials and transform application
open-above-balloon-camera-rig-kit
  follow camera, basket blend, zoom, FOV, clipping and wheel disposal
open-above-balloon-presentation-domain
  procedural balloon presentation animation
open-above-visual-domain
  scene, renderer, environment, update, render, state and partial disposal
open-above-quality-tier-kit
  hardware quality classification
open-above-dynamic-resolution-kit
  render-scale decisions and frame-cost sampling
open-above-physical-sky-kit / sun-light-kit / aerial-perspective-kit
  sky, lighting and atmospheric projection
open-above-cloud-weather-map-kit / volumetric-cloud-kit
  weather field and volumetric cloud rendering
open-above-terrain-surface-kit / terrain-chunk-streaming-kit
  terrain height, surface and streamed chunks
open-above-vegetation-cluster-kit
  vegetation placement and scene attachment
open-above-grass-world-seed-kit / biome-density-kit / exclusion-mask-kit
  deterministic source seed, density and exclusion policy
open-above-grass-chunk-placement-kit / lod-kit / compute-culling-kit / grass-field-domain
  candidate generation, LOD, culling, instancing, animation, state and disposal
open-above-water-surface-kit / distant-landmark-kit
  water and horizon landmarks
open-above-hdr-composer-kit / neutral-color-grade-kit / lens-response-kit
  composition, grading, lens projection and selected disposal
open-above-hud-projection-kit / gamehost-legacy-readback-kit
  browser status and live runtime readback
open-above-static-smoke-test-kit / headless-editor-environment
  required-file and source-text assertions plus check/build command routing
```

Inactive source-backed kit:

```txt
open-above-grass-detail-kit
```

## Main finding

`src/main.js` pins Three.js to `0.165.0` but imports NexusEngine from `LuminaryLabs-Dev/NexusEngine@main`. The deployed behavior of one `TheOpenAbove` commit can therefore change whenever NexusEngine `main` changes. No manifest records an immutable NexusEngine commit, requested URL, accepted API surface, source fingerprint, or boot result.

The error panel is not a complete admission boundary because static ESM failures happen before the body-level `try/catch`. Existing smoke and headless checks inspect local source text and do not resolve, fingerprint, import, or capability-check the remote runtime graph.

## Required DSK cut

```txt
open-above-runtime-source-manifest-kit
open-above-immutable-module-locator-kit
open-above-module-admission-kit
open-above-runtime-capability-preflight-kit
open-above-boot-transaction-kit
open-above-boot-result-journal-kit
open-above-source-fingerprint-kit
open-above-boot-error-projection-kit
open-above-runtime-admission-fixture-kit
open-above-gamehost-source-proof-kit
```

## Next safe ledge

```txt
TheOpenAbove Immutable Runtime Admission + Boot Capability Fixture Gate
```

Implementation order:

```txt
immutable source manifest
  -> pinned NexusEngine commit URL
  -> dependency resolver/admission result
  -> required API capability preflight
  -> boot transaction and rollback handoff
  -> JSON-safe source and boot proof
  -> GameHost/HUD projection
  -> deterministic Node fixture
  -> Pages browser admission smoke
  -> session generation fence and lifecycle authority
```

## Validation

Documentation only. Runtime source, package scripts, dependencies, route behavior, rendering behavior, and deployment configuration were unchanged. No branch or pull request was created. Existing commands were not run because the required runtime-admission fixture does not exist.