# Architecture Audit: Source Fixture Consumer Ledger DSK Map

Timestamp: 2026-07-10T10-29-57-04-00
Repo: LuminaryLabs-Publish/TheOpenAbove

## Architecture read

The route is a Vite-hosted cinematic Balloon Drift route. Runtime boundaries are already useful across visual, object, simulation, camera, presentation, telemetry, smoke-test, and headless editor surfaces.

The missing architecture layer is source proof that can be consumed by GameHost and headless fixtures.

## Current route map

```txt
index.html
  -> Three.js 0.165.0 importmap
  -> src/main.js
  -> NexusEngine main CDN
  -> CAMPAIGN/WORLD config
  -> visual domain
  -> hot air balloon object
  -> balloon simulation
  -> camera rig
  -> balloon presentation domain
  -> balloon telemetry engine
  -> frame loop
  -> HUD projection
  -> window.GameHost.getState()
  -> headless editor static inspection
```

## DSK/service families

```txt
route-shell
vite-static-publish
three-importmap-runtime
nexusengine-cdn-runtime
campaign-config
legacy-flight-config
world-config
balloon-drift-simulation
keyboard-input
burner-intent
vent-intent
wind-field
buoyancy-integration
altitude-safety
ground-clearance
hot-air-balloon-object
visual-domain
quality-tier
dynamic-resolution
physical-sky
sun-light
aerial-perspective
cloud-weather-map
volumetric-clouds
streamed-terrain-surface
terrain-chunk-streaming
vegetation-clusters
grass-detail
water-surfaces
distant-landmarks
hdr-composer
neutral-color-grade
lens-response
camera-rig
basket-view-camera
clipping-fade
balloon-presentation
hud-telemetry
gamehost-readback
smoke-test-contract
headless-renderer-contract
```

## Proof gap

`window.GameHost.getState()` returns `nexusEngine` and `local` only. It does not expose source manifest, source fingerprint, source snapshot, acceptance rows, consumer rows, fixture version, or headless source status.

## Needed source-proof architecture

```txt
open-above-product-copy-authority-kit
open-above-readme-route-copy-parity-kit
open-above-campaign-current-route-authority-kit
open-above-legacy-flight-compatibility-kit
open-above-balloon-drift-config-kit
open-above-source-consumer-manifest-kit
open-above-source-fingerprint-kit
open-above-source-snapshot-kit
open-above-source-acceptance-ledger-kit
open-above-source-consumer-ledger-kit
open-above-gamehost-source-readback-kit
open-above-headless-source-fixture-kit
open-above-browser-consumer-fixture-kit
```

## Boundary rule

Add source proof additively. Do not delete legacy campaign fields or rewrite visible systems until source rows explain current versus legacy inputs.
