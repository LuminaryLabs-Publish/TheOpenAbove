# Architecture Audit — Source Consumer Ledger Refresh DSK Map

**Timestamp:** `2026-07-09T06-20-00-04-00`

## Repo

```txt
LuminaryLabs-Publish/TheOpenAbove
```

## Architectural read

`TheOpenAbove` currently has two architectural layers:

```txt
browser route layer:
  index.html
  src/main.js
  Three.js CDN
  NexusEngine main CDN
  hot-air-balloon object kit
  inline world, physics, camera, HUD, GameHost state

durable source layer:
  README.md
  package.json
  src/data/campaign.config.js
  tests/smoke.mjs
  .agent docs
  central LuminaryLabs repo ledger
```

The browser route is already coherent. The durable source layer still mixes the old free-flight product with the current Balloon Drift runtime.

## DSK / domain breakdown

```txt
open-above-product-domain
  product-copy-authority-kit
  readme-route-copy-parity-kit
  package-description-parity-kit
  campaign-current-route-authority-kit
  legacy-flight-compatibility-kit

open-above-balloon-route-domain
  balloon-drift-config-kit
  altitude-band-contract-kit
  route-object-config-kit
  wind-lane-hint-kit
  burner-vent-intent-kit
  wind-field-kit
  buoyancy-integration-kit
  altitude-safety-kit

open-above-visual-object-domain
  hot-air-balloon-object-kit
  balloon-envelope-panel-kit
  balloon-mouth-kit
  balloon-streamer-fit-kit
  balloon-fabric-seam-kit
  hot-air-balloon-basket-kit
  hot-air-balloon-rigging-kit
  hot-air-balloon-burner-kit
  rope-kit

open-above-render-domain
  three-render-host-kit
  terrain-sampler-kit
  world-generation-kit
  lake-generation-kit
  tree-scatter-kit
  cloud-scatter-kit
  wind-ribbon-render-kit
  basket-follow-camera-kit
  camera-zoom-blend-kit
  first-person-visibility-kit
  hud-telemetry-kit

open-above-source-readback-domain
  source-consumer-manifest-kit
  source-consumer-record-kit
  source-fingerprint-kit
  source-snapshot-kit
  source-acceptance-result-kit
  source-acceptance-ledger-kit
  source-consumer-ledger-kit
  source-readback-projection-kit
  gamehost-source-readback-kit
  browser-consumer-readback-kit
  dom-free-source-fixture-kit
```

## Current services offered by kits

```txt
open-above-balloon-telemetry-kit:
  publishes current balloon snapshot to NexusEngine world resource
  emits balloon tick event
  installs engine.openAbove.getState()

open-above-hot-air-balloon-object-kit:
  builds balloon visual assembly
  delegates envelope / mouth / streamer / seam / basket / rigging / burner / rope to sub-kits
  attaches compatibility controls for old wing/tail host expectations
  exposes OpenAboveHotAirBalloonObjectKit global

inline browser services:
  generates terrain / lakes / trees / clouds / wind ribbons
  integrates balloon state
  maps controls to burner and vent
  blends camera modes
  projects HUD telemetry
  exposes GameHost state
```

## Architectural gap

There is no module that can answer this question without reading browser code manually:

```txt
Which source record is canonical for the current product route?
```

That answer should become a `SourceConsumerLedger` before visual extraction.

## Recommended next source modules

```txt
src/source/open-above-product.js
src/source/balloon-drift.config.js
src/source/legacy-flight-compatibility.js
src/source/source-consumer-manifest.js
src/source/source-fingerprint.js
src/source/source-snapshot.js
src/source/source-acceptance.js
src/source/source-consumer-ledger.js
src/source/gamehost-source-readback.js
scripts/open-above-source-fixture.mjs
```

## Non-goals

```txt
Do not split renderer yet.
Do not split world generation yet.
Do not change controls or physics constants yet.
Do not change the balloon visual object yet.
Do not remove legacy FLIGHT fields yet.
```
