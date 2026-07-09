# Architecture Audit — Source Readback Ledger Central Sync DSK Map

**Timestamp:** `2026-07-09T14-58-42-04-00`

## Current architecture

```txt
index.html
  -> src/main.js
     -> Three.js CDN
     -> NexusEngine main CDN
     -> src/data/campaign.config.js
     -> src/hot-air-balloon-object-kit.js
        -> balloon-envelope-panel-kit
        -> balloon-mouth-kit
        -> balloon-streamer-fit-kit
        -> balloon-fabric-seam-kit
        -> hot-air-balloon-basket-kit
        -> hot-air-balloon-rigging-kit
        -> hot-air-balloon-burner-kit
        -> rope-kit
```

## Active domains

```txt
route shell
browser render host
NexusEngine telemetry host
hot-air-balloon visual object
balloon drift runtime
burner/vent input
wind field
terrain/lake/tree/cloud generation
basket camera and first-person visibility
HUD projection
GameHost diagnostics
```

## DSK/service map

```txt
open-above-balloon-telemetry-kit:
  domain: open-above-balloon-drift
  services: publish snapshot, emit tick event, expose engine.openAbove.getState

open-above-hot-air-balloon-object-kit:
  domain: hot-air-balloon-object
  services: build visual object, compose sub-kits, animate burner and rigging, expose object-kit metadata

source/readback next-cut DSKs:
  domain: product/source authority
  services: copy/config parity, source manifest, source fingerprint, source snapshot, source consumer ledger, GameHost source readback, DOM-free fixture
```

## Main architectural gap

`src/main.js` is still the active runtime source, while README/package/campaign config preserve older free-flight intent. The next implementation should not split renderer or physics first; it should add source/readback modules that make current product authority inspectable, fixture-readable, and centrally tracked.

## Required next boundary

```txt
src/source/* owns source/readback records
scripts/open-above-source-fixture.mjs proves them without DOM/WebGL
src/main.js consumes only additive GameHost source diagnostics
LuminaryLabs-Dev/LuminaryLabs ledger points to the same tracker
```
