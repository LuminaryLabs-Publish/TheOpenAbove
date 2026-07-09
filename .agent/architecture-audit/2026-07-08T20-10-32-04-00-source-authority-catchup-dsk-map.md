# Architecture Audit — Source Authority Catch-up DSK Map

**Timestamp:** `2026-07-08T20-10-32-04-00`

## Architectural read

`TheOpenAbove` has a useful split between the procedural hot-air-balloon visual object kit family and the inline runtime host. The remaining architecture gap is not visual complexity. It is source authority: durable product/config/source records have not caught up to the live balloon-drift route.

## Current route boundary

```txt
index.html
  -> src/main.js
  -> Three.js CDN
  -> NexusEngine main CDN
  -> src/data/campaign.config.js
  -> src/hot-air-balloon-object-kit.js
  -> inline runtime host
```

## Implemented DSK / kit boundaries

```txt
open-above-balloon-telemetry-kit
  domain: nexus telemetry for balloon state
  services: define resource, define event, emit balloon tick, expose engine.openAbove.getState()

open-above-hot-air-balloon-object-kit
  domain: assembled balloon visual object
  services: assemble envelope, rigging, basket, burner, compatibility controls, animation entrypoints

open-above-balloon-envelope-panel-kit
  domain: envelope panels
  services: panel geometry/profile construction

open-above-balloon-mouth-kit
  domain: envelope mouth
  services: mouth geometry/profile construction

open-above-balloon-streamer-fit-kit
  domain: decorative streamer fitting
  services: fitted streamer construction

open-above-balloon-fabric-seam-kit
  domain: envelope seam detail
  services: seam geometry construction

open-above-hot-air-balloon-basket-kit
  domain: basket visual object
  services: basket geometry/profile construction

open-above-hot-air-balloon-rigging-kit
  domain: rigging visual object
  services: rigging construction and rigging animation

open-above-hot-air-balloon-burner-kit
  domain: burner visual object
  services: burner construction and heat animation

open-above-rope-kit
  domain: rope geometry primitives
  services: rope construction for rigging/basket support
```

## Inline domains that should remain stable during next cut

```txt
runtime-host
three-render-host
world-generation
terrain-sampler
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
gamehost-debug
```

These domains should not be fully extracted before source authority is proven.

## Next-cut DSK map

```txt
open-above-product-copy-authority-kit
  owns OPEN_ABOVE_PRODUCT and canonical current route naming

open-above-readme-route-copy-parity-kit
  proves README describes Balloon Drift rather than legacy free flight

open-above-package-description-parity-kit
  proves package description matches the live route

open-above-campaign-current-route-authority-kit
  rewrites campaign region copy around balloon drift and marks old FLIGHT as compatibility-only

open-above-balloon-drift-config-kit
  mirrors current inline runtime constants without visual behavior change

open-above-source-manifest-kit
  binds product, config, route descriptors, runtime consumers, fixture consumers, and GameHost consumers

open-above-source-fingerprint-kit
  emits stable source fingerprints for docs/config/runtime parity

open-above-source-snapshot-kit
  emits a fixture-readable snapshot of product/config/runtime alignment

open-above-source-acceptance-ledger-kit
  owns acceptance row definitions and pass/fail result records

open-above-gamehost-source-readback-kit
  adds additive window.GameHost.getState().source without changing local/nexusEngine state shapes

open-above-source-fixture-kit
  proves source authority without DOM/WebGL

open-above-source-module-consumer-splice-kit
  wires the source modules into src/main.js after pure fixtures pass
```

## Required source order

```txt
README.md / package.json / src/data/campaign.config.js copy alignment
  -> src/source/open-above-product.js
  -> src/source/balloon-drift.config.js
  -> src/source/altitude-bands.js
  -> src/source/route-descriptors.js
  -> src/source/wind-lane-hints.js
  -> src/source/source-manifest.js
  -> src/source/source-fingerprint.js
  -> src/source/source-snapshot.js
  -> src/source/source-acceptance.js
  -> src/source/gamehost-source-readback.js
  -> scripts/open-above-source-fixture.mjs
  -> src/main.js additive source readback import
  -> tests/smoke.mjs / package.json check integration
```

## Architecture decision

The next implementation should be additive and fixture-first. It should not remove `FLIGHT`, retune the balloon, or extract the renderer before the source-manifest gate passes.
