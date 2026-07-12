# Project Breakdown: TheOpenAbove

**Timestamp:** `2026-07-12T09-02-10-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Source revision reviewed:** `4b76ec275102be3a9358d866bcbfd816ac270c04`

## Summary

The active parchment map has a concrete navigation-truth defect. Simulation heading is defined as `atan2(wind.x, wind.z)`, while the map maps world `x` to screen `x`, world `z` to screen `y`, points the marker upward, and rotates it by `-heading`. That produces a marker direction of `(-vx, -vz)`, so the arrow points opposite the balloon's horizontal travel.

The map also scales against the full 10,000-unit world radius even though current routes and towns extend only about 3,061 units from the origin. Current navigational content therefore occupies about 30.6% of the map disk radius, with no content-fit policy, off-map policy, active-route emphasis, projection revision, or geometry fixture.

## Plan ledger

**Goal:** make the parchment map a trustworthy navigation projection whose bounds, orientation, route emphasis, player pose and visible frame all derive from one explicit spatial contract.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have root `.agent` state.
- [x] Select only `TheOpenAbove` as the oldest central-ledger entry with newer repo-local map work pending central synchronization.
- [x] Read repository guidance, page shell, host loop, map overlay, world config, simulation, airstream routes, mail routes and smoke tests.
- [x] Trace the complete interaction loop.
- [x] Identify every active domain.
- [x] Reconcile all 60 active source-backed kits and their services.
- [x] Prove the reversed marker transform from source conventions.
- [x] Quantify the route-content/world-radius fit mismatch.
- [x] Define a composed spatial-navigation authority and fixture gate.
- [x] Change documentation only.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Implement the authority and executable browser/Pages geometry fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9
root .agent entries: 9
new repositories: 0
ledger-missing repositories: 0
root-agent-missing repositories: 0

TheOpenAbove       central 2026-07-12T07-00-48-04-00; repo-local 2026-07-12T08-50-32-04-00; selected
PrehistoricRush    central 2026-07-12T07-09-49-04-00; newer repo-local work observed
IntoTheMeadow      central 2026-07-12T07-19-47-04-00
PhantomCommand     central 2026-07-12T07-29-32-04-00
HorrorCorridor     central 2026-07-12T07-41-06-04-00
ZombieOrchard      central 2026-07-12T07-51-04-04-00
MyCozyIsland       central 2026-07-12T08-00-16-04-00
TheUnmappedHouse   central 2026-07-12T08-10-36-04-00
AetherVale         central 2026-07-12T08-31-49-04-00
TheCavalryOfRome   excluded
```

## Interaction loop

```txt
page
  -> create 3D game canvas
  -> create parchment dialog and 2D map canvas

boot
  -> construct visual, balloon, airstream, mail and simulation owners
  -> pass WORLD.surface, mail towns, airstream routes, live simulation state and parcel into map overlay
  -> start main RAF

map draw
  -> resize to CSS pixels and capped DPR
  -> derive scale from WORLD.surface.radius
  -> draw every route
  -> highlight parcel destination town
  -> read live player position and heading
  -> transform position and rotate player marker
  -> draw title

M/Escape
  -> open or close map
  -> independent map RAF starts or stops
  -> host pauses gameplay updates while map is open
```

## Spatial proof

```txt
worldToMap:
  screenX = centerX + worldX * scale
  screenY = centerY + worldZ * scale

simulation:
  heading = atan2(horizontalVelocityX, horizontalVelocityZ)

marker:
  local forward = (0, -1)
  canvas rotation = -heading

resulting marker direction:
  (-sin(heading), -cos(heading))
  = (-velocityX / speed, -velocityZ / speed)

therefore:
  marker points opposite horizontal travel
```

## Content-fit proof

```txt
WORLD.surface.radius: 10000
farthest current town: Brookhaven ~= 3061 units from origin
content/world radius ratio: ~= 0.306
map disk radius: 0.36 * min(viewport width, viewport height)
maximum current town radius on canvas: ~= 0.110 * min dimension

No route/town/player content-bounds fit policy exists.
```

## Domains in use

```txt
browser shell, import map, semantic HTML, game canvas and parchment dialog
runtime admission, startup failure, session and RAF ownership
keyboard/key-state, blur, wheel zoom and variable frame time
map transition, pause/resume, focus and lifecycle
map coordinate space, bounds, route/town/destination/player projection and marker bearing
balloon simulation, airstream, steering, terrain clearance and snapshots
mail route, parcel, town, delivery volume, progress and reset
balloon profile, model assembly, asynchronous loading and GPU resources
balloon geometry, rigging, animation, presentation and camera
quality, dynamic resolution, HDR surfaces and post-processing
terrain, grass, atmosphere, water, lighting and lens response
telemetry, GameHost and headless inspection
fatal projection, accessibility, checks, build and Pages deployment
```

## All active source-backed kits and offered services

### Runtime and gameplay: 15

```txt
open-above-balloon-simulation-kit -> keyboard state, wind/buoyancy/steering integration, pose and snapshot
open-above-balloon-telemetry-kit -> Nexus telemetry tick and readback
open-above-airstream-domain -> composed route-field-visual-debug ownership
open-above-airstream-route-kit -> immutable route descriptors and defaults
open-above-airstream-sampler-kit -> route-segment sampling
open-above-airstream-field-kit -> aggregate airstream field queries
open-above-airstream-balloon-force-kit -> sampled flow application to balloon state
open-above-airstream-visual-kit -> route-current scene projection
open-above-airstream-debug-kit -> route/sample diagnostics
open-above-mail-delivery-domain -> parcel/town/progress composition, update, snapshot and reset
open-above-mail-parcel-kit -> parcel construction and reset
open-above-mail-route-kit -> town, destination and correct-current source data
open-above-delivery-volume-kit -> delivery-volume admission
open-above-delivery-progress-kit -> delivery-state transition and event production
open-above-mail-town-kit -> town scene construction and active-destination update
```

### Balloon object and presentation: 15

```txt
open-above-hot-air-balloon-object-kit -> full balloon assembly, async load and animation entry
open-above-balloon-envelope-profile-kit -> shared envelope profile/radius/point/normal sampling
open-above-balloon-envelope-panel-kit -> unified gore shell construction
open-above-balloon-mouth-kit -> mouth/scoop geometry
open-above-balloon-streamer-fit-kit -> integrated streamer-fit descriptors
open-above-balloon-fabric-seam-kit -> load-tape and seam geometry
open-above-hot-air-balloon-basket-kit -> tapered basket and propane-cylinder construction
open-above-hot-air-balloon-rigging-kit -> frame, posts, crossbars and rig lines
open-above-hot-air-balloon-burner-kit -> twin burner, hose and flame animation
open-above-rope-kit -> persistent dynamic rope geometry
open-above-balloon-presentation-domain -> envelope/gondola inertia and material response
open-above-envelope-fabric-material-kit -> envelope fabric material
open-above-basket-material-kit -> basket material
open-above-balloon-camera-rig-kit -> follow, zoom, mode and steering-look camera response
open-above-clipping-fade-kit -> camera-near clipping fade
```

### Visual environment: 26

```txt
open-above-visual-domain -> renderer/scene/camera/world composition, update, render and disposal
open-above-quality-tier-kit -> quality descriptor selection
open-above-dynamic-resolution-kit -> render-scale adaptation
open-above-physical-sky-kit -> physical sky projection
open-above-sun-light-kit -> sun lighting
open-above-aerial-perspective-kit -> distance atmosphere
open-above-cloud-weather-map-kit -> cloud field source
open-above-volumetric-cloud-kit -> volumetric cloud rendering
open-above-cloud-lod-kit -> cloud LOD policy
open-above-cloud-lighting-kit -> cloud illumination
open-above-terrain-surface-kit -> bounded world surface and terrain-height queries
open-above-terrain-chunk-streaming-kit -> near terrain chunk streaming
open-above-terrain-horizon-streaming-kit -> horizon terrain streaming
open-above-vegetation-cluster-kit -> vegetation placement/rendering
open-above-grass-world-seed-kit -> deterministic grass seed
open-above-grass-biome-density-kit -> biome density policy
open-above-grass-exclusion-mask-kit -> grass placement exclusions
open-above-grass-chunk-placement-kit -> deterministic grass instances
open-above-grass-lod-kit -> grass LOD classification
open-above-grass-compute-culling-kit -> culling policy/backend label
open-above-grass-field-domain -> grass chunk lifecycle and rendering
open-above-water-surface-kit -> water projection
open-above-distant-landmark-kit -> distant landmark projection
open-above-hdr-composer-kit -> HDR attachments and composition
open-above-color-grade-kit -> color transform
open-above-lens-response-kit -> lens/final response
```

### UI: 1

```txt
open-above-parchment-map-overlay-kit -> toggle, resize, world-to-map transform, route/town/player drawing, map RAF, snapshot and disposal
```

### Tooling and proof: 3

```txt
open-above-headless-editor-environment -> project inspection, renderer validation, check and build adapters
open-above-static-smoke-test-kit -> file/source-pattern checks
open-above-airstream-mail-test-kit -> route, field and delivery proof
```

## Runtime-implied adapters: 12

```txt
open-above-route-shell-kit
open-above-importmap-kit
open-above-runtime-composer-kit
open-above-keyboard-input-kit
open-above-wheel-zoom-input-kit
open-above-parchment-map-shell-kit
open-above-error-panel-kit
open-above-gamehost-legacy-readback-kit
open-above-nexusengine-cdn-adapter-kit
open-above-campaign-source-kit
open-above-raf-clock-adapter-kit
open-above-pages-deploy-kit
```

## Main findings

```txt
player marker bearing is exactly reversed relative to horizontal travel
map scale is based on the 10000-unit world disk rather than current route/town content bounds
current route content occupies only about 30.6% of map radius
no active/correct route emphasis is projected
no off-map or edge-clamp policy exists
no compass/orientation convention is declared
no projection result, revision, source fingerprint or visible-frame receipt exists
smoke tests check function names and labels, not geometric correctness
```

## Required parent domain

```txt
open-above-parchment-map-spatial-navigation-authority-domain
```

## Candidate coordinating kits

```txt
open-above-map-coordinate-space-schema-kit
open-above-map-world-bounds-kit
open-above-map-content-bounds-kit
open-above-map-viewport-fit-policy-kit
open-above-map-projection-transform-kit
open-above-map-heading-convention-kit
open-above-map-player-bearing-kit
open-above-map-player-marker-pose-kit
open-above-map-route-style-policy-kit
open-above-map-destination-route-resolution-kit
open-above-map-active-route-projection-kit
open-above-map-off-map-policy-kit
open-above-map-edge-clamp-kit
open-above-map-compass-orientation-kit
open-above-map-navigation-revision-kit
open-above-map-navigation-source-fingerprint-kit
open-above-map-projection-result-kit
open-above-map-navigation-observation-kit
open-above-map-navigation-journal-kit
open-above-map-heading-fixture-kit
open-above-map-route-fit-fixture-kit
open-above-map-off-map-fixture-kit
open-above-map-browser-pixel-probe-kit
open-above-map-pages-navigation-smoke-kit
```

## Required invariants

```txt
player marker forward agrees with normalized horizontal velocity
world-to-map handedness and north convention are explicit
content-fit bounds include every visible route, town and required player margin
viewport/DPR changes preserve the same world projection
active and destination routes are derived from admitted route/mail state
out-of-bounds players remain observable through a typed edge policy
projection changes publish a new revision and fingerprint
first visible map frame acknowledges the committed projection result
```

## Validation boundary

Documentation only. Existing smoke tests were inspected but not run. No runtime, HTML, package, dependency, rendering, gameplay, input or deployment behavior changed.