# Architecture Audit — Balloon Source Authority DSK Map

**Timestamp:** `2026-07-08T10-10-34-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

## Purpose

Define the next architecture ledge for `TheOpenAbove`: make the live hot-air-balloon drift product source-authoritative before renderer extraction or mission expansion.

## Current route boundary

```txt
index.html
  -> src/main.js
  -> Three.js CDN
  -> NexusEngine main CDN
  -> CAMPAIGN / WORLD
  -> hot-air-balloon object family
  -> inline render, input, wind, physics, camera, HUD, and GameHost loop
```

## Current source-backed DSKs

```txt
open-above-balloon-telemetry-kit
  domain: open-above-balloon-drift
  services: define balloon snapshot resource, define balloon tick event, write snapshot resource, emit tick event, expose engine.openAbove.getState

open-above-hot-air-balloon-object-kit
  domain: balloon visual object composition
  services: compose envelope, basket, rigging, burner, compatibility controls, animation bridge, window debug export

open-above-balloon-envelope-panel-kit
  domain: envelope panel geometry
  services: build segmented balloon envelope panel descriptors / render objects

open-above-balloon-mouth-kit
  domain: open-bottom balloon mouth geometry
  services: build mouth ring / aperture visual geometry

open-above-balloon-streamer-fit-kit
  domain: fitted streamer ribbons
  services: build streamers fitted to envelope profile

open-above-balloon-fabric-seam-kit
  domain: fabric seam geometry
  services: build seam paths / visible stitched panel divisions

open-above-hot-air-balloon-basket-kit
  domain: basket model
  services: build basket body, rim, floor, close-view visual anchor

open-above-hot-air-balloon-rigging-kit
  domain: rigging and rope suspension
  services: build rigging lines, animate rigging motion

open-above-hot-air-balloon-burner-kit
  domain: burner assembly and heat animation
  services: build burner geometry, animate burner flame / warmth state

open-above-rope-kit
  domain: rope geometry primitive
  services: build soft rope paths and rigging primitives
```

## Current inline domains to keep stable during the next pass

```txt
open-above-runtime-host-kit
open-above-three-render-host-kit
open-above-balloon-input-map-kit
open-above-balloon-state-kit
open-above-balloon-drift-physics-kit
open-above-burner-vent-intent-kit
open-above-wind-field-kit
open-above-altitude-safety-kit
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

These can stay inline until product/source parity is green.

## Required next-cut DSKs

```txt
open-above-product-copy-authority-kit
  owns: canonical product id, current route id, product description, route copy, compatibility notes
  outputs: OPEN_ABOVE_PRODUCT

open-above-readme-route-copy-parity-kit
  owns: README language expectations
  outputs: readme parity result

open-above-package-description-parity-kit
  owns: package description expectation
  outputs: package parity result

open-above-balloon-drift-config-kit
  owns: burner, vent, wind, buoyancy, ceiling, clearance, initial state, camera blend constants
  outputs: BALLOON_DRIFT

open-above-balloon-source-fingerprint-kit
  owns: stable fingerprint from product, campaign, config, and runtime markers
  outputs: BalloonSourceFingerprint

open-above-balloon-source-snapshot-kit
  owns: source-readable product/config/runtime state
  outputs: BalloonSourceSnapshot

open-above-source-acceptance-result-kit
  owns: acceptance row envelope shape
  outputs: SourceAcceptanceResult

open-above-source-acceptance-ledger-kit
  owns: acceptance row ordering and pass/fail projection
  outputs: SourceAcceptanceLedger

open-above-altitude-band-contract-kit
  owns: low-clearance, comfort-drift, high-drift, meadow-landing thresholds
  outputs: ALTITUDE_BANDS

open-above-route-object-config-kit
  owns: three lift gates and one landing descriptor
  outputs: ROUTE_OBJECTS

open-above-route-fixture-harness-kit
  owns: DOM-free product/config/source replay
  outputs: fixture result rows

open-above-gamehost-diagnostics-parity-kit
  owns: projection into window.GameHost.getState().source
  outputs: source diagnostics snapshot
```

## Proposed file wire map

```txt
src/data/product-source.js
  -> OPEN_ABOVE_PRODUCT

src/data/campaign.config.js
  -> CAMPAIGN
  -> WORLD
  -> BALLOON_DRIFT
  -> ALTITUDE_BANDS
  -> ROUTE_OBJECTS
  -> WIND_LANE_HINTS
  -> FLIGHT compatibility-only export

src/source/balloon-source-fingerprint.js
  -> createBalloonSourceFingerprint(source)

src/source/balloon-source-snapshot.js
  -> createBalloonSourceSnapshot({ product, campaign, world, drift, runtime })

src/source/source-acceptance-results.js
  -> createSourceAcceptanceResult(row)
  -> createSourceAcceptanceLedger(rows)

src/source/gamehost-source-diagnostics.js
  -> projectGameHostSourceDiagnostics(snapshot)

tests/product-source-acceptance-smoke.mjs
  -> product/config/runtime parity fixture rows
```

## Acceptance order

```txt
1. Correct durable copy to balloon-drift product.
2. Add OPEN_ABOVE_PRODUCT.
3. Add BALLOON_DRIFT and mirror current inline defaults.
4. Keep FLIGHT as compatibility-only until dependency proof is green.
5. Add source fingerprint and source snapshot.
6. Project source diagnostics through GameHost.
7. Add DOM-free product-source acceptance smoke.
8. Add altitude bands, route objects, and wind lane hints after source parity works.
9. Defer renderer extraction, mission reducers, and reusable kit promotion.
```

## Non-goals

```txt
Do not rewrite src/main.js into many modules yet.
Do not remove FLIGHT yet.
Do not change the visible balloon route.
Do not replace the hot-air-balloon object family.
Do not extract reusable ProtoKits before local fixture proof exists.
```

## Stop condition

This ledge is complete when `npm run check` can prove product copy, package metadata, campaign/config, BALLOON_DRIFT, source fingerprint, source snapshot, GameHost source diagnostics, altitude bands, route objects, wind lane hints, and DOM-free fixture rows agree on hot-air-balloon drift.