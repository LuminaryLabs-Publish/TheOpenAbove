# Route Source Audit — Balloon Source Authority Gap

**Timestamp:** `2026-07-08T04:31:06-04:00`

## Summary

The live `TheOpenAbove` route is a hot-air-balloon drift game, but durable source authority still says free-flight/bird in several places.

This is now the primary source-authority seam to fix before expanding route goals, mission reducers, or reusable kit promotion.

## Evidence

```txt
README.md:
  describes carving, gliding, diving, boosting, thermals, wind gates, and sky-perch return.

package.json:
  describes a standalone free-flight exploration game.

src/data/campaign.config.js:
  exports CAMPAIGN/WORLD/FLIGHT with Meadow Lift, thermals, gates, perch, pitch/roll/yaw, boost, thermal lift, and terrain clearance.

src/main.js:
  imports only CAMPAIGN and WORLD.
  seeds the runtime with `${WORLD.seed}-balloon-drift`.
  builds hot-air-balloon visual object kits.
  integrates burner, vent, wind, buoyancy, vertical velocity, position, altitude, camera blend, HUD, and GameHost snapshots inline.
```

## Current authority conflict

```txt
source-copy authority:
  free-flight / bird / carving / boost / thermals / gates / sky perch

live-route authority:
  hot-air balloon / burner / vent / wind drift / basket camera / balloon telemetry

source-config authority:
  CAMPAIGN + WORLD + FLIGHT

runtime-config authority:
  inline constants in src/main.js
```

## Required authority cutover

```txt
product source
  -> canonical balloon drift copy
  -> README/package alignment

runtime source
  -> BALLOON_DRIFT config
  -> ALTITUDE_BANDS
  -> ROUTE_OBJECTS
  -> WIND_LANE_HINTS

route source
  -> RouteObject descriptors
  -> RouteEventResult envelopes
  -> rejection reason catalog
  -> route event journal

mission source
  -> Meadow Lift mission reducer
  -> mission snapshot projector
  -> Cloud Basin unlock progression

proof source
  -> source fingerprint
  -> source snapshot
  -> DOM-free route fixture harness
  -> smoke markers for docs/config/runtime parity
```

## DSK composition map

```txt
open-above-app
├─ product-authority
│  ├─ product-copy-authority-kit
│  ├─ package-description-parity-kit
│  └─ readme-route-copy-parity-kit
├─ balloon-route-authority
│  ├─ balloon-drift-config-kit
│  ├─ altitude-band-contract-kit
│  ├─ route-object-config-kit
│  ├─ wind-lane-hint-kit
│  └─ source-fingerprint-kit
├─ balloon-simulation-authority
│  ├─ input-map-kit
│  ├─ burner-vent-intent-kit
│  ├─ wind-field-kit
│  ├─ buoyancy-integrator-kit
│  ├─ altitude-safety-kit
│  └─ balloon-state-snapshot-kit
├─ mission-authority
│  ├─ route-event-result-kit
│  ├─ route-event-journal-kit
│  ├─ meadow-lift-mission-reducer-kit
│  ├─ region-unlock-progression-kit
│  └─ mission-snapshot-projector-kit
├─ renderer-handoff
│  ├─ terrain-descriptor-consumer
│  ├─ balloon-object-descriptor-consumer
│  ├─ basket-camera-descriptor-consumer
│  └─ hud-telemetry-consumer
└─ fixture-proof
   ├─ dom-free-route-fixture-harness-kit
   ├─ route-replay-parity-kit
   └─ gamehost-diagnostics-parity-kit
```

## Do first

```txt
1. Update README/package copy to balloon drift.
2. Add PRODUCT_COPY and BALLOON_DRIFT source exports.
3. Preserve FLIGHT as compatibility-only until removed by proof.
4. Move inline drift constants into BALLOON_DRIFT without changing public behavior.
5. Expose source fingerprint and source snapshot through GameHost.
6. Add a DOM-free fixture that can replay route input and assert source parity.
```

## Do not do first

```txt
Do not redesign the balloon.
Do not rewrite terrain/cloud rendering.
Do not expand Cloud Basin.
Do not promote reusable kits before local source authority is proven.
```
