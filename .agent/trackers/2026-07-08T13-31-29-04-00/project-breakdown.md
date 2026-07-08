# Project Breakdown — TheOpenAbove

**Timestamp:** `2026-07-08T13-31-29-04-00`

## Plan Ledger

**Goal:** Refresh the repo-local `.agent` operating memory for `LuminaryLabs-Publish/TheOpenAbove`, compare the full accessible `LuminaryLabs-Publish` repository list against central tracking, and turn the current balloon-drift source-authority gap into a concrete fixture cutover map.

**Checklist**

- [x] Use `LuminaryLabs-Publish/TheOpenAbove` only for repo-local docs.
- [x] Use `main` only.
- [x] Create no branch.
- [x] Create no pull request.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare accessible `LuminaryLabs-Publish` repos against `LuminaryLabs-Dev/LuminaryLabs` central ledger state.
- [x] Confirm checked non-Cavalry repos are tracked and root-agented.
- [x] Select exactly one repo: `LuminaryLabs-Publish/TheOpenAbove`.
- [x] Identify the interaction loop.
- [x] Identify domains in use.
- [x] Identify services offered by current and planned kits.
- [x] Identify implemented, inline-candidate, and next-cut kits.
- [x] Add timestamped architecture audit.
- [x] Add timestamped render audit.
- [x] Add timestamped gameplay audit.
- [x] Add timestamped route-source audit.
- [x] Add timestamped turn-ledger entry.
- [x] Update root `.agent` docs and `kit-registry.json`.
- [x] Log the change centrally in `LuminaryLabs-Dev/LuminaryLabs`.
- [ ] Runtime source was not changed.
- [ ] `npm install` was not run.
- [ ] `npm run check` was not run.
- [ ] `npm run build` was not run.
- [ ] Browser/GitHub Pages validation was not run.

## Publish repo comparison

```txt
LuminaryLabs-Publish/AetherVale          tracked / root .agent observed
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent observed
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent observed
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent observed / recent central update observed
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent observed
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent observed / recent central update observed
LuminaryLabs-Publish/TheCavalryOfRome    excluded by standing rule
LuminaryLabs-Publish/TheOpenAbove        selected follow-up
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent observed
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent observed
```

No checked non-Cavalry Publish repo was fully new, absent from central tracking, missing root `.agent/START_HERE.md`, or otherwise undocumented.

`TheOpenAbove` was selected as the oldest observed eligible fallback because its central ledger had not been refreshed since `2026-07-08T11-49-04-04-00`, while its public route still has a user-visible source-authority mismatch: `index.html` is already Balloon Drift, but durable README/package/campaign source still describes the older free-flight/bird route.

## Current product read

`TheOpenAbove` is a standalone Vite / Three.js hot-air-balloon wind-drift experience.

The active route is:

```txt
index.html
  -> ./src/main.js
  -> Three.js CDN
  -> NexusEngine main CDN
  -> CAMPAIGN / WORLD from src/data/campaign.config.js
  -> procedural hot-air-balloon object kit family
  -> inline terrain / drift / camera / HUD / GameHost loop
```

The active product route is already confirmed by `index.html` title and meta copy as `The Open Above: Balloon Drift` / cozy hot-air-balloon wind-drift.

The durable source drift remains:

```txt
README.md     -> free-flight, carving, gliding, diving, boosting, thermals, wind gates, sky perch
package.json  -> standalone free-flight exploration game
campaign.config.js -> Meadow Lift free-flight objective language plus legacy FLIGHT constants
src/main.js   -> actual balloon drift runtime with burner, vent, wind, buoyancy, terrain clearance, basket camera, HUD, GameHost telemetry
```

## Current interaction loop

```txt
open static route
  -> mount canvas, HUD, and error panel
  -> src/main.js imports Three.js CDN and NexusEngine main CDN
  -> load CAMPAIGN and WORLD from campaign.config.js
  -> build terrain, lakes, trees, clouds, wind ribbons
  -> build hot-air-balloon object from object-kit subdomains
  -> attach keydown/keyup/blur/wheel input
  -> keyboard maps Space/W/ArrowUp to burner and S/ArrowDown/Shift to vent
  -> wheel maps to camera zoom and near-basket blend
  -> update loop samples wind, buoyancy, damping, ceiling softness, vertical velocity, position, altitude, distance
  -> balloon animation and wind ribbon offsets update
  -> Nexus telemetry kit writes balloon snapshot and emits balloonTicked
  -> draw loop computes third-person and first-person basket camera blend
  -> renderer draws Three.js scene
  -> HUD writes heat, camera mode, altitude, wind, drift distance, and Nexus marker
  -> window.GameHost.getState() returns local and Nexus balloon telemetry
```

## Target authority loop

```txt
canonical README/package/campaign copy
  -> OPEN_ABOVE_PRODUCT
  -> BALLOON_DRIFT config copied from current inline constants
  -> BalloonSourceFingerprint
  -> BalloonSourceSnapshot
  -> SourceAcceptanceResult rows
  -> SourceAcceptanceLedger
  -> GameHost source readback
  -> route descriptors / altitude bands / wind lane hints
  -> DOM-free source fixture
  -> later route event result and mission snapshot reducer
```

## Domains in use

```txt
static-page-host
vite-static-publish-host
third-party-cdn-runtime
three-render-host
nexus-engine-cdn-runtime
nexus-telemetry-kit
hot-air-balloon-object
balloon-envelope-panel
balloon-mouth
balloon-streamer-fit
balloon-fabric-seam
balloon-basket
balloon-rigging
balloon-burner
rope-geometry
procedural-terrain
terrain-height-sampler
moisture-field
terrain-color-resolver
lake-generation
tree-scatter
cloud-scatter
wind-ribbon-rendering
balloon-input-map
burner-vent-intent
balloon-vehicle-state
balloon-drift-physics
wind-field
altitude-safety
ceiling-softness
basket-follow-camera
camera-zoom-blend
first-person-visibility-gate
hud-telemetry
window-gamehost-debug
campaign-config
legacy-flight-compatibility
product-copy-authority
package-description-parity
readme-route-copy-parity
balloon-drift-config-authority
source-fingerprint
source-snapshot
source-acceptance-ledger
route-object-descriptor
altitude-band-contract
wind-lane-hint
route-fixture-harness
mission-snapshot-projector
```

## Services the kits offer

```txt
mount-canvas
mount-hud
mount-error-panel
show-fatal-runtime-error
seed-random
sample-terrain-height
sample-moisture
resolve-terrain-color
create-scene
create-camera
create-renderer
install-resize-handler
install-keyboard-input-handler
install-wheel-zoom-handler
build-terrain-geometry
build-lake-discs
scatter-trees
build-cloud-groups
build-wind-ribbon-lines
build-hot-air-balloon
build-envelope-panels
build-balloon-mouth
build-fitted-streamers
build-fabric-seams
build-basket
build-rigging
build-burner
build-rope-segments
animate-hot-air-balloon
animate-burner
animate-rigging
smooth-burner-value
smooth-vent-value
sample-wind-angle
sample-wind-speed
write-wind-vector
compute-buoyancy
compute-altitude-damping
compute-ceiling-softness
integrate-vertical-velocity
blend-velocity-toward-wind
integrate-position
clamp-above-terrain-clearance
compute-altitude
accumulate-horizontal-distance
compute-basket-focus
compute-third-person-camera-position
compute-first-person-camera-position
blend-camera-mode
set-first-person-visibility
render-frame
write-hud-html
define-balloon-telemetry-resource
emit-balloon-ticked-event
expose-window-gamehost
load-canonical-product-copy
load-balloon-drift-config
create-balloon-source-fingerprint
create-balloon-source-snapshot
run-source-acceptance-row
project-gamehost-source-readback
resolve-altitude-band
project-route-objects
project-wind-lane-hints
run-dom-free-source-fixture
```

## Kits identified

### Implemented / source-backed

```txt
open-above-balloon-telemetry-kit
open-above-hot-air-balloon-object-kit
open-above-balloon-envelope-panel-kit
open-above-balloon-mouth-kit
open-above-balloon-streamer-fit-kit
open-above-balloon-fabric-seam-kit
open-above-hot-air-balloon-basket-kit
open-above-hot-air-balloon-rigging-kit
open-above-hot-air-balloon-burner-kit
open-above-rope-kit
```

### Inline / candidate

```txt
open-above-runtime-host-kit
open-above-vite-static-publish-kit
open-above-three-render-host-kit
open-above-campaign-config-kit
open-above-legacy-flight-compatibility-kit
open-above-balloon-input-map-kit
open-above-balloon-state-kit
open-above-balloon-drift-physics-kit
open-above-burner-vent-intent-kit
open-above-wind-field-kit
open-above-altitude-safety-kit
open-above-ceiling-softness-kit
open-above-terrain-sampler-kit
open-above-world-generation-kit
open-above-lake-generation-kit
open-above-tree-scatter-kit
open-above-cloud-scatter-kit
open-above-wind-ribbon-render-kit
open-above-basket-follow-camera-kit
open-above-camera-zoom-blend-kit
open-above-hud-telemetry-kit
open-above-gamehost-debug-kit
```

### Next-cut kits

```txt
open-above-product-copy-authority-kit
open-above-readme-route-copy-parity-kit
open-above-package-description-parity-kit
open-above-balloon-drift-config-kit
open-above-balloon-source-fingerprint-kit
open-above-balloon-source-snapshot-kit
open-above-source-acceptance-result-kit
open-above-source-acceptance-ledger-kit
open-above-gamehost-source-readback-kit
open-above-source-acceptance-fixture-kit
open-above-altitude-band-contract-kit
open-above-altitude-band-resolver-kit
open-above-route-object-config-kit
open-above-route-object-evaluator-kit
open-above-wind-lane-hint-kit
open-above-route-fixture-harness-kit
open-above-mission-snapshot-projector-kit
```

## Main finding

The next source implementation should not start with renderer extraction, world expansion, mission content, or camera retuning.

The first safe source edit is a source-authority cutover that preserves the visible balloon route while making product copy, config, source fingerprint, GameHost diagnostics, route descriptors, and DOM-free fixtures agree that the current canonical product is Balloon Drift.

## Next safe ledge

```txt
TheOpenAbove Balloon Source Fixture Cutover Map
```

## Validation

Docs-only update. No runtime source files were changed and no local/browser validation was run.