# Architecture Audit — Source Module Consumer DSK Map

**Timestamp:** `2026-07-08T15-11-18-04-00`

## Intent

Map the current `TheOpenAbove` runtime into DSK/domain boundaries and define the exact source-module consumer cut needed before route reducers or renderer extraction.

## Current architecture

```txt
index.html
  -> src/main.js
    -> Three.js CDN
    -> NexusEngine main CDN
    -> CAMPAIGN / WORLD from src/data/campaign.config.js
    -> hot-air-balloon object kit family
    -> inline terrain / lake / tree / cloud / wind-ribbon generation
    -> inline burner / vent / wind / buoyancy / altitude integration
    -> inline basket-follow and first-person camera blend
    -> inline HUD projection
    -> inline window.GameHost projection
```

## DSK / domain breakdown

### Host and publish domains

```txt
static-page-host
  owns: index.html, canvas mount, HUD mount, error panel mount
  service: mount-route-shell

vite-static-publish-host
  owns: Vite dev/build surface and Pages-compatible static output
  service: serve-and-build-route

third-party-cdn-runtime
  owns: Three.js and NexusEngine main CDN imports
  service: load-runtime-dependencies
```

### Runtime and telemetry domains

```txt
nexus-engine-cdn-runtime
  owns: createRealtimeGame, defineRuntimeKit, defineResource, defineEvent
  service: install-runtime-kit

open-above-balloon-telemetry-kit
  owns: BalloonSnapshot resource and BalloonTicked event
  services:
    - define-balloon-snapshot-resource
    - emit-balloon-ticked-event
    - expose-engine-openAbove-getState
```

### Visual object domains

```txt
open-above-hot-air-balloon-object-kit
  owns: full balloon visual assembly
  services:
    - build-hot-air-balloon
    - animate-hot-air-balloon
    - install-hot-air-balloon-visual

open-above-balloon-envelope-panel-kit
open-above-balloon-mouth-kit
open-above-balloon-streamer-fit-kit
open-above-balloon-fabric-seam-kit
open-above-hot-air-balloon-basket-kit
open-above-hot-air-balloon-rigging-kit
open-above-hot-air-balloon-burner-kit
open-above-rope-kit
  own: object subdomains and component assembly
```

### Inline world domains

```txt
procedural-terrain
terrain-height-sampler
moisture-field
terrain-color-resolver
lake-generation
tree-scatter
cloud-scatter
wind-ribbon-rendering
```

These domains are still embedded in `src/main.js`. They should not be extracted before source authority exists.

### Inline route domains

```txt
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
```

These domains are playable, but their source/config authority is not yet fixture-readable.

## Source authority domains to add next

```txt
product-copy-authority
  kit: open-above-product-copy-authority-kit
  owns: OPEN_ABOVE_PRODUCT canonical route metadata

readme-route-copy-parity
  kit: open-above-readme-route-copy-parity-kit
  owns: README current-product claims

package-description-parity
  kit: open-above-package-description-parity-kit
  owns: package description parity row

balloon-drift-config-authority
  kit: open-above-balloon-drift-config-kit
  owns: burner, vent, wind, buoyancy, ceiling, clearance, camera, and HUD constants mirrored from current runtime

source-fingerprint
  kit: open-above-balloon-source-fingerprint-kit
  owns: compact hashable markers for product, package, campaign, config, runtime, and GameHost

source-snapshot
  kit: open-above-balloon-source-snapshot-kit
  owns: canonical runtime-independent route source snapshot

source-acceptance-ledger
  kit: open-above-source-acceptance-ledger-kit
  owns: row-by-row product/config/runtime proof

gamehost-source-readback
  kit: open-above-gamehost-source-readback-kit
  owns: additive window.GameHost.getState().source projection

source-module-consumer-splice
  kit: open-above-source-module-consumer-splice-kit
  owns: exact import/consume order in src/main.js
```

## Required source-module order

```txt
src/source/open-above-product.js
  -> exports OPEN_ABOVE_PRODUCT

src/source/balloon-drift.config.js
  -> exports BALLOON_DRIFT
  -> exports ALTITUDE_BANDS
  -> exports ROUTE_OBJECTS
  -> exports WIND_LANE_HINTS

src/source/source-fingerprint.js
  -> exports createOpenAboveSourceFingerprint(input)

src/source/source-snapshot.js
  -> exports createOpenAboveSourceSnapshot(input)

src/source/source-acceptance.js
  -> exports createSourceAcceptanceLedger(input)

src/source/gamehost-source-readback.js
  -> exports createGameHostSourceReadback(input)

src/main.js
  -> imports source modules
  -> keeps current runtime behavior
  -> uses BALLOON_DRIFT values instead of duplicated inline constants only after parity is proven
  -> projects source readback through window.GameHost.getState().source
```

## What not to extract yet

```txt
renderer construction
terrain geometry
tree scatter
cloud scatter
wind ribbon meshes
camera tuning
route reducer
mission progression
Cloud Basin unlock
FLIGHT removal
```

## Architectural stop condition

Stop the next implementation when the route can prove:

```txt
source modules loaded
source fingerprint stable
source snapshot stable
acceptance ledger rows present
window.GameHost.getState().source present
existing window.GameHost.getState().local shape preserved
existing window.GameHost.getState().nexusEngine shape preserved
npm run check passes
npm run build passes
```
