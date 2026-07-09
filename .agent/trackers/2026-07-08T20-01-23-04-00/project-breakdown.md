# Project Breakdown — TheOpenAbove

**Timestamp:** `2026-07-08T20-01-23-04-00`

## Selection

`LuminaryLabs-Publish/TheOpenAbove` was selected for this run.

The accessible `LuminaryLabs-Publish` repository list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger and sampled root `.agent` state. No checked non-Cavalry repo was fully new, absent from the ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`TheOpenAbove` was selected as the oldest high-value fallback by current central alignment. The next unresolved seam is still product/source authority: the live page is a hot-air-balloon drift route, but durable README, package, and campaign source still describe an older free-flight / bird-glider loop.

## Publish repository comparison

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / last sampled 2026-07-08T18-09-21-04-00
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / last sampled 2026-07-08T18-19-43-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / last sampled 2026-07-08T18-58-10-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / last sampled 2026-07-08T19-21-15-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / last sampled 2026-07-08T18-51-55-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / last sampled 2026-07-08T19-40-00-04-00
LuminaryLabs-Publish/TheOpenAbove        selected / source authority fallback / previous alignment 2026-07-08T17-31-22-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / last sampled 2026-07-08T18-41-41-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / last sampled 2026-07-08T19-30-31-04-00
```

## Current route

```txt
index.html
  -> src/main.js
  -> Three.js CDN
  -> NexusEngine main CDN
  -> src/data/campaign.config.js
  -> src/hot-air-balloon-object-kit.js
  -> inline terrain / lake / tree / cloud / wind-ribbon generation
  -> inline balloon drift / camera / HUD / GameHost loop
```

## Current interaction loop

```txt
open index.html
  -> canvas#game and HUD mount
  -> src/main.js imports Three.js, NexusEngine, CAMPAIGN, WORLD, and hot-air-balloon object kit
  -> create seeded terrain, moisture, terrain colors, lakes, trees, clouds, wind ribbons, and balloon object
  -> install keydown, keyup, blur, wheel, resize, and animation-frame handlers
  -> Space / W / ArrowUp raise burner target
  -> S / ArrowDown / Shift raise vent target
  -> wheel changes camera zoom and first-person basket blend
  -> update(dt) integrates burner, vent, wind angle, wind speed, buoyancy, altitude damping, ceiling softness, vertical velocity, position, ground clearance, altitude, and distance
  -> animateHotAirBalloon updates burner and rigging sub-kits
  -> NexusEngine telemetry kit publishes balloon snapshot and balloon tick event
  -> draw(dt) resolves wind-facing camera, ride bob/sway, burner vibration, third-person camera, first-person basket camera, first-person visibility, rope fade, and render frame
  -> HUD writes Balloon Drift title, message, heat, camera mode, altitude, wind speed, drift distance, zoom hint, and Nexus marker
  -> window.GameHost.getState() exposes local and nexusEngine telemetry only
```

## Target source-authority loop

```txt
README/package/campaign source correction
  -> OPEN_ABOVE_PRODUCT
  -> BALLOON_DRIFT config mirrored from current inline runtime constants
  -> ALTITUDE_BANDS / ROUTE_OBJECTS / WIND_LANE_HINTS
  -> SOURCE_MANIFEST
  -> BalloonSourceFingerprint
  -> BalloonSourceSnapshot
  -> SourceAcceptanceResult rows
  -> SourceAcceptanceLedger
  -> GameHost source readback projection
  -> DOM-free source fixture
  -> src/main.js additive source consumer splice
  -> tests/smoke.mjs and npm run check fixture gate
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
campaign-current-route-authority
balloon-drift-config-authority
source-manifest-authority
source-fingerprint
source-snapshot
source-acceptance-ledger
source-consumer-fixture
runtime-constant-parity
altitude-band-contract
route-object-descriptor
wind-lane-hint
mission-snapshot-projector
build-script-fixture-gate
```

## Services offered by current and planned kits

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
build-rope-geometry
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
load-source-manifest
create-balloon-source-fingerprint
create-balloon-source-snapshot
run-source-acceptance-row
run-source-acceptance-ledger
project-gamehost-source-readback
preserve-existing-local-and-nexus-state-shapes
wire-source-fixture-into-check
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

### Inline / candidate kits

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
open-above-first-person-visibility-kit
open-above-hud-telemetry-kit
open-above-gamehost-debug-kit
```

### Next-cut kits

```txt
open-above-product-copy-authority-kit
open-above-readme-route-copy-parity-kit
open-above-package-description-parity-kit
open-above-campaign-current-route-authority-kit
open-above-legacy-flight-compatibility-kit
open-above-balloon-drift-config-kit
open-above-source-manifest-kit
open-above-balloon-source-fingerprint-kit
open-above-balloon-source-snapshot-kit
open-above-source-acceptance-result-kit
open-above-source-acceptance-ledger-kit
open-above-gamehost-source-readback-kit
open-above-source-acceptance-fixture-kit
open-above-source-module-consumer-splice-kit
open-above-runtime-constant-parity-kit
open-above-altitude-band-contract-kit
open-above-altitude-band-resolver-kit
open-above-route-object-config-kit
open-above-route-object-evaluator-kit
open-above-wind-lane-hint-kit
open-above-route-fixture-harness-kit
open-above-browser-consumer-fixture-kit
open-above-deploy-build-contract-kit
open-above-mission-snapshot-projector-kit
```

## Main findings

```txt
README.md still describes free-flight carving, gliding, diving, boosting, thermals, wind gates, and sky-perch return.
package.json still describes the repo as standalone free-flight exploration.
src/data/campaign.config.js still carries a legacy free-flight objective and FLIGHT constants.
src/main.js owns the actual hot-air-balloon drift constants inline.
window.GameHost.getState() exposes local and nexusEngine telemetry but not source/product/config/fixture diagnostics.
tests/smoke.mjs proves route markers and balloon kit markers but not source parity, source fingerprint, source snapshot, or GameHost source readback.
```

## Next safe ledge

```txt
TheOpenAbove Balloon Drift Source Authority Consumer Fixture Gate
```

Build source authority first, not a renderer rewrite.

The next source pass should add `src/source/` modules, fixture rows, source readback projection, and additive `window.GameHost.getState().source` diagnostics before extracting renderer, physics, or route reducer systems.

## Validation status

```txt
runtime source changed: no
local checkout: no
npm install: no
npm run check: no
npm run build: no
browser smoke: no
GitHub Pages check: no
branch created: no
pull request created: no
pushed to main: yes
```
