# Architecture Audit: Source Ledger Central Refresh DSK Map

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Timestamp:** `2026-07-09T19-21-19-04-00`

## DSK map

```txt
static shell
  -> Balloon Drift browser route
  -> Three.js render host
  -> NexusEngine telemetry kit
  -> hot-air-balloon object kit family
  -> inline world/input/physics/camera/HUD consumers
  -> GameHost local and Nexus readback
```

## Current domains

```txt
source-backed:
  static-browser-shell
  vite-static-publish
  three-render-host
  nexusengine-realtime-telemetry
  hot-air-balloon-object
  envelope-panel
  balloon-mouth
  streamer-fit
  fabric-seam
  basket
  rigging
  burner
  rope

inline runtime:
  terrain-height-sampling
  terrain-coloring
  moisture-map
  lake-placement
  tree-scatter
  cloud-scatter
  wind-ribbon-rendering
  balloon-input-map
  burner-vent-intent
  wind-field
  buoyancy-integration
  altitude-safety
  ceiling-softness
  camera-zoom-blend
  basket-first-person-camera
  first-person-visibility
  hud-telemetry
  gamehost-debug-state

proof next:
  product-copy-authority
  package-description-parity
  campaign-current-route-authority
  legacy-flight-compatibility
  balloon-drift-config
  source-consumer-manifest
  source-fingerprint
  source-snapshot
  source-acceptance-ledger
  source-consumer-ledger
  gamehost-source-readback
  browser-consumer-fixture
  central-ledger-parity
```

## Main seam

`src/main.js` is the live runtime authority, but `README.md`, `package.json`, and `src/data/campaign.config.js` still preserve older free-flight surfaces. This makes the repo hard for agents to safely extend because current product identity and compatibility-only legacy fields are not explicitly recorded.

## Next architecture ledge

Add pure source/readback modules first. Do not extract renderer, terrain, camera, HUD, or balloon visuals until source ownership and `GameHost.getState().source` are fixture-proven.