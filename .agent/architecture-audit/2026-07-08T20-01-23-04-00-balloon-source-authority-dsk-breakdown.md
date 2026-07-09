# Architecture Audit — Balloon Source Authority DSK Breakdown

**Timestamp:** `2026-07-08T20-01-23-04-00`

## Goal

Turn the current hot-air-balloon drift route into a source-authoritative product without changing visible behavior.

The live `src/main.js` loop already works. The missing architecture layer is a pure source surface that can prove README/package/campaign/runtime/HUD/GameHost agreement.

## Current architecture

```txt
index.html
  -> src/main.js
  -> Three.js CDN
  -> NexusEngine main CDN
  -> CAMPAIGN / WORLD from src/data/campaign.config.js
  -> hot-air-balloon object kit family
  -> inline terrain/world/camera/drift/HUD/GameHost systems
```

## Current DSK/domain split

```txt
TheOpenAbove
├─ static-page-host
├─ vite-static-publish-host
├─ three-render-host
├─ nexus-engine-cdn-runtime
│  └─ open-above-balloon-telemetry-kit
├─ hot-air-balloon-object-domain
│  ├─ open-above-hot-air-balloon-object-kit
│  ├─ open-above-balloon-envelope-panel-kit
│  ├─ open-above-balloon-mouth-kit
│  ├─ open-above-balloon-streamer-fit-kit
│  ├─ open-above-balloon-fabric-seam-kit
│  ├─ open-above-hot-air-balloon-basket-kit
│  ├─ open-above-hot-air-balloon-rigging-kit
│  ├─ open-above-hot-air-balloon-burner-kit
│  └─ open-above-rope-kit
├─ inline-runtime-domain
│  ├─ terrain-height-sampler
│  ├─ moisture-field
│  ├─ terrain-color-resolver
│  ├─ lake-generation
│  ├─ tree-scatter
│  ├─ cloud-scatter
│  ├─ wind-ribbon-rendering
│  ├─ burner-vent-intent
│  ├─ balloon-drift-physics
│  ├─ wind-field
│  ├─ altitude-safety
│  ├─ ceiling-softness
│  ├─ basket-follow-camera
│  ├─ camera-zoom-blend
│  ├─ first-person-visibility-gate
│  ├─ hud-telemetry
│  └─ window-gamehost-debug
└─ planned-source-authority-domain
   ├─ open-above-product-copy-authority-kit
   ├─ open-above-package-description-parity-kit
   ├─ open-above-campaign-current-route-authority-kit
   ├─ open-above-balloon-drift-config-kit
   ├─ open-above-source-manifest-kit
   ├─ open-above-balloon-source-fingerprint-kit
   ├─ open-above-balloon-source-snapshot-kit
   ├─ open-above-source-acceptance-result-kit
   ├─ open-above-source-acceptance-ledger-kit
   ├─ open-above-gamehost-source-readback-kit
   ├─ open-above-source-acceptance-fixture-kit
   ├─ open-above-runtime-constant-parity-kit
   └─ open-above-source-module-consumer-splice-kit
```

## Source-backed services already present

```txt
create realtime game
install telemetry kit
publish balloon snapshot resource
emit balloon ticked event
build hot-air-balloon object
build envelope panels
build balloon mouth
build fitted streamers
build fabric seams
build basket
build rigging
build burner
build rope geometry
animate burner
animate rigging
animate balloon
expose object-kit browser helper
```

## Inline services that should remain stable during the source pass

```txt
seed random
sample terrain height
sample moisture
resolve terrain color
make terrain
make lakes
make trees
make clouds
make wind ribbons
install keyboard input
install wheel zoom
integrate burner/vent/wind/buoyancy/altitude
render basket-follow camera
write HUD
expose GameHost
```

## New source-authority services to add

```txt
load OPEN_ABOVE_PRODUCT
load BALLOON_DRIFT
load ALTITUDE_BANDS
load ROUTE_OBJECTS
load WIND_LANE_HINTS
load SOURCE_MANIFEST
createBalloonSourceFingerprint(sourceBundle)
createBalloonSourceSnapshot(sourceBundle)
createSourceAcceptanceResult(row)
createSourceAcceptanceLedger(rows)
createGameHostSourceReadback(runtimeSnapshot, sourceSnapshot, acceptanceLedger)
runOpenAboveSourceFixture()
assertExistingGameHostShapesPreserved()
```

## Required source module map

```txt
src/source/open-above-product.js
src/source/balloon-drift.config.js
src/source/altitude-bands.js
src/source/route-descriptors.js
src/source/wind-lane-hints.js
src/source/source-manifest.js
src/source/source-fingerprint.js
src/source/source-snapshot.js
src/source/source-acceptance.js
src/source/gamehost-source-readback.js
scripts/open-above-source-fixture.mjs
```

## Main architecture recommendation

Do not split renderer, physics, or camera code first.

First, add pure source authority modules and fixture rows. Then splice the readback into `src/main.js` additively by exposing `window.GameHost.getState().source`, while preserving the existing `local` and `nexusEngine` state shapes.

## Stop condition for next implementation pass

```txt
node scripts/open-above-source-fixture.mjs passes
npm run check includes the source fixture
window.GameHost.getState().local still exists
window.GameHost.getState().nexusEngine still exists
window.GameHost.getState().source exists after browser load
README/package/campaign/source/runtime describe the same Balloon Drift product
```
