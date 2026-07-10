# Architecture Audit: Source Readback Headless Fixture DSK Map

Timestamp: 2026-07-10T07-41-42-04-00
Repo: LuminaryLabs-Publish/TheOpenAbove

## Current DSK shape

```txt
browser shell
  -> src/main.js route composer
  -> campaign/world config
  -> visual-domain
  -> hot-air-balloon object kit
  -> simulation kit
  -> camera rig kit
  -> presentation domain
  -> telemetry kit
  -> HUD and GameHost
  -> smoke/headless validation
```

## Source domains

- README product copy.
- Package description.
- Campaign config.
- World config.
- Legacy FLIGHT config.
- Live Balloon Drift runtime imports.
- Live simulation setup.
- Live visual-domain setup.
- Live GameHost projection.
- Static smoke assertions.
- Headless editor command assertions.

## Runtime domains

- Balloon drift simulation.
- Wind field.
- Burner and vent intent.
- Buoyancy integration.
- Altitude and ground clearance.
- Balloon pose application.
- Camera rig and basket-view camera.
- Balloon presentation.
- HUD telemetry.
- Nexus telemetry.

## Visual domains

- Visual domain.
- Quality tier.
- Dynamic resolution.
- Physical sky.
- Sun light.
- Aerial perspective.
- Cloud weather map.
- Volumetric clouds.
- Streamed terrain.
- Vegetation clusters.
- Grass detail.
- Water surfaces.
- HDR composer.
- Neutral color grade.
- Lens response.

## Gap

Architecture is now separated enough that a visual rewrite is not the next step. The missing boundary is source authority.

There is no source manifest that explains which product, README, campaign, runtime, simulation, visual, headless, smoke, and GameHost rows are current, legacy-compatible, ignored, or deferred.

## Required next boundary

```txt
source manifest
  -> source fingerprint
  -> source snapshot
  -> source acceptance rows
  -> source consumer ledger
  -> GameHost .source readback
  -> headless source fixture
```

## Next safe ledge

```txt
TheOpenAbove Source Readback Ledger Catch-up + Headless Fixture Gate
```
