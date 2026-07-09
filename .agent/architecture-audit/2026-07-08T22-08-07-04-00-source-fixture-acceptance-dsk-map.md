# Architecture Audit — Source Fixture Acceptance DSK Map

**Timestamp:** `2026-07-08T22-08-07-04-00`

## Scope

This audit maps the current `TheOpenAbove` architecture into source-backed, inline, and next-cut DSKs. It keeps implementation focused on the source fixture acceptance and browser consumer readback gate.

## Current composition

```txt
index.html
  -> src/main.js
  -> src/data/campaign.config.js
  -> src/hot-air-balloon-object-kit.js
  -> NexusEngine main CDN
  -> Three.js CDN
```

## Source-backed DSKs

```txt
open-above-balloon-telemetry-kit
  owns: Nexus resource/event publication for balloon snapshot telemetry
  service: define resource, define event, install runtime kit, publish snapshot every tick

open-above-hot-air-balloon-object-kit
  owns: composed visual balloon object
  service: build one balloon object with envelope, mouth, basket, rigging, burner, seams, streamers, and rope descriptors

open-above-balloon-envelope-panel-kit
  owns: envelope panel geometry/material sections
  service: produce panel meshes for the balloon envelope

open-above-balloon-mouth-kit
  owns: balloon mouth and lower opening form
  service: produce mouth geometry and material descriptors

open-above-balloon-streamer-fit-kit
  owns: streamer attachments and swayable fabric descriptors
  service: produce fitted streamer meshes

open-above-balloon-fabric-seam-kit
  owns: seam lines and panel separations
  service: produce seam geometry over the envelope

open-above-hot-air-balloon-basket-kit
  owns: basket mesh and basket material cluster
  service: produce rider basket object

open-above-hot-air-balloon-rigging-kit
  owns: rigging line groups between basket and envelope
  service: produce rigging geometry and visibility/fade candidates

open-above-hot-air-balloon-burner-kit
  owns: burner object and animation target
  service: produce burner visual element and burner heat input target

open-above-rope-kit
  owns: rope primitive geometry used by rigging
  service: produce line/rope descriptors
```

## Inline domains that should remain stable during the next pass

```txt
runtime-host
three-render-host
terrain-height-sampler
moisture-field
terrain-color-resolver
lake-generation
tree-scatter
cloud-scatter
wind-ribbon-rendering
keyboard-input-map
wheel-camera-zoom
balloon-vehicle-state
balloon-drift-physics
wind-field
altitude-safety
ceiling-softness
camera-zoom-blend
basket-follow-camera
first-person-visibility-gate
hud-telemetry
window-gamehost-debug
```

These domains currently live mainly in `src/main.js`. Do not extract them during the source acceptance pass.

## Next-cut source authority DSKs

```txt
open-above-product-copy-authority-kit
  owns: OPEN_ABOVE_PRODUCT canonical product record
  service: report current product id, route id, controls, and visible product copy

open-above-readme-route-copy-parity-kit
  owns: README route language parity
  service: verify README no longer describes the obsolete free-flight route

open-above-package-description-parity-kit
  owns: package metadata parity
  service: verify package description matches Balloon Drift

open-above-campaign-current-route-authority-kit
  owns: CAMPAIGN current route copy
  service: prove Meadow Lift describes balloon drift, burner, vent, wind guidance, and landing

open-above-balloon-drift-config-kit
  owns: BALLOON_DRIFT config mirrored from current inline defaults
  service: expose initial state, controls, buoyancy, wind, clearance, ceiling, damping, and camera constants

open-above-source-manifest-kit
  owns: source-to-consumer manifest
  service: list docs, package, campaign, runtime, host, fixture, and build-script consumers

open-above-balloon-source-fingerprint-kit
  owns: product/config/runtime fingerprint
  service: produce deterministic markers for product copy, config values, route objects, and live runtime consumers

open-above-balloon-source-snapshot-kit
  owns: fixture-readable source snapshot
  service: project product, route, controls, visual object kit, drift config, altitude bands, route objects, and wind hints

open-above-source-acceptance-ledger-kit
  owns: acceptance row results
  service: run named rows and report pass/fail/reason/evidence

open-above-gamehost-source-readback-kit
  owns: window.GameHost source diagnostics
  service: create additive source readback without changing existing local/nexusEngine shapes

open-above-source-module-consumer-splice-kit
  owns: src/main.js additive source import plan
  service: wire source records into GameHost without moving renderer/physics ownership

open-above-browser-consumer-fixture-kit
  owns: browser adapter fixture expectations
  service: prove source diagnostics can be read by browser consumer code after runtime boot
```

## Target dependency order

```txt
README/package/campaign copy correction
  -> OPEN_ABOVE_PRODUCT
  -> BALLOON_DRIFT
  -> ALTITUDE_BANDS / ROUTE_OBJECTS / WIND_LANE_HINTS
  -> SOURCE_MANIFEST
  -> source fingerprint
  -> source snapshot
  -> SourceAcceptanceLedger
  -> DOM-free fixture rows
  -> GameHost source readback
  -> src/main.js additive consumer splice
  -> npm run check integration
```

## Boundary rule

The next pass should not alter visual constants, camera tuning, world generation, balloon object construction, or Nexus telemetry semantics. It should only make the current product source, config, fixtures, and browser readback authoritative.
