# Project Breakdown — TheOpenAbove

**Timestamp:** `2026-07-08T20-10-32-04-00`

## Goal

Compare the current `LuminaryLabs-Publish` repository set against `LuminaryLabs-Dev/LuminaryLabs` central tracking, select one eligible non-Cavalry repository, and refresh repo-local `.agent` documentation plus central ledger state.

## Selection result

`LuminaryLabs-Publish/TheOpenAbove` was selected.

The selection was a fallback/catch-up selection. The checked Publish repos were already represented in central tracking or sampled with root `.agent` state, and `LuminaryLabs-Publish/TheCavalryOfRome` remained excluded. `TheOpenAbove` still has the highest-value stale seam for this pass: repo-local docs had advanced beyond central ledger alignment, while the product/source authority gap is still open.

## Publish repos compared

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / central latest 2026-07-08T18-19-43-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / central latest 2026-07-08T18-58-10-04-00
LuminaryLabs-Publish/TheOpenAbove        selected / central catch-up + source authority gap
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / central latest 2026-07-08T18-41-41-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / central latest 2026-07-08T19-30-31-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / central latest 2026-07-08T19-21-15-04-00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / central latest 2026-07-08T18-09-21-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / central latest 2026-07-08T19-50-20-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / central latest 2026-07-08T18-51-55-04-00
```

## Current product read

`TheOpenAbove` is a standalone Vite / Three.js hot-air-balloon drift experience.

The live browser route already uses balloon drift controls and a procedural hot-air-balloon object, but `README.md`, `package.json`, and `src/data/campaign.config.js` still partially describe the older free-flight bird/glider route.

## Current interaction loop

```txt
index.html
  -> src/main.js
  -> Three.js CDN and NexusEngine main CDN
  -> CAMPAIGN / WORLD from src/data/campaign.config.js
  -> buildHotAirBalloon() from src/hot-air-balloon-object-kit.js
  -> terrain, lakes, trees, clouds, and wind ribbons are built inline
  -> keyboard state maps Space / W / ArrowUp to burner lift
  -> keyboard state maps S / ArrowDown / Shift to vent descent
  -> wheel input changes camera zoom and first-person basket blend
  -> update(dt) integrates burner, vent, wind, buoyancy, vertical velocity, altitude safety, position, and distance
  -> animateHotAirBalloon() updates burner and rigging sub-kits
  -> NexusEngine telemetry kit publishes balloon snapshot/resource and balloon tick event
  -> draw(dt) resolves camera, basket view, first-person visibility, and renderer frame
  -> HUD writes altitude, wind, drift distance, heat, camera mode, and Nexus marker
  -> window.GameHost.getState() exposes local and Nexus balloon telemetry
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
runtime-constant-parity
altitude-band-contract
route-object-descriptor
wind-lane-hint
route-fixture-harness
browser-consumer-fixture
build-script-fixture-gate
```

## Services offered by current and planned kits

```txt
mount canvas / HUD / error panel
seed deterministic world random
sample terrain height
sample moisture
resolve terrain color
create scene / camera / renderer
install resize, keyboard, and wheel handlers
build terrain geometry
build lake discs
scatter trees and cloud groups
build wind ribbon lines
build hot-air-balloon visual object
animate burner and rigging
smooth burner and vent values
sample wind angle and wind speed
compute buoyancy, altitude damping, ceiling softness, terrain clearance, altitude, and distance
integrate velocity and position
compute basket focus and camera positions
blend camera mode
fade first-person rigging visibility
render Three.js frame
write HUD HTML
publish NexusEngine balloon telemetry resource/event
expose window.GameHost local/nexus state
load canonical product copy
load balloon drift config
load source manifest
create source fingerprint and source snapshot
resolve altitude bands, route objects, and wind lane hints
run source acceptance rows and fixture harnesses
project GameHost source readback
preserve existing GameHost local/nexus shapes
wire source fixture into check/build commands
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
open-above-first-person-visibility-kit
open-above-hud-telemetry-kit
open-above-gamehost-debug-kit
```

### Needed next

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
open-above-route-object-config-kit
open-above-wind-lane-hint-kit
open-above-route-fixture-harness-kit
open-above-browser-consumer-fixture-kit
open-above-deploy-build-contract-kit
```

## Main finding

Do not extract the renderer or expand the world next.

The next implementation should close source authority first: product copy, package metadata, campaign text, drift config, source manifest, source fingerprint, source snapshot, acceptance rows, GameHost source readback, and source fixture integration.

## Next safe ledge

```txt
TheOpenAbove Central Ledger Catch-up + Balloon Drift Source Contract Gate
```
