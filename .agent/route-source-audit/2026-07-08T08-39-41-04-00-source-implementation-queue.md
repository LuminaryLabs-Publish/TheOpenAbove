# Product Source Authority Implementation Queue — TheOpenAbove

**Timestamp:** `2026-07-08T08:39:41-04:00`

## Purpose

Turn the existing balloon drift acceptance ledger into a concrete source-edit queue.

This is still documentation-only. It defines the exact implementation order needed before changing runtime behavior, route objects, mission reducers, or renderer boundaries.

## Current mismatch

```txt
live runtime:
  hot-air-balloon drift
  burner lift
  vent descent
  procedural wind
  basket-follow / near-basket camera
  Nexus balloon telemetry

README/package/campaign source:
  free-flight exploration
  carving / gliding / diving / boosting
  thermals
  wind gates
  sky-perch return
  legacy FLIGHT config
```

## Required implementation order

### 1. Product copy source

Files:

```txt
README.md
package.json
src/data/campaign.config.js
src/data/product.config.js
```

Add:

```txt
OPEN_ABOVE_PRODUCT.id
OPEN_ABOVE_PRODUCT.title
OPEN_ABOVE_PRODUCT.currentRoute
OPEN_ABOVE_PRODUCT.objectType
OPEN_ABOVE_PRODUCT.controlSummary
OPEN_ABOVE_PRODUCT.publicDescription
OPEN_ABOVE_PRODUCT.compatibilityNotes
```

Acceptance:

```txt
README and package description both say hot-air-balloon drift.
Campaign Meadow Lift says burner / vent / wind drift.
Legacy free-flight copy is either removed or explicitly marked historical / compatibility-only.
```

### 2. Balloon drift config

Files:

```txt
src/data/campaign.config.js
src/main.js
```

Add:

```txt
BALLOON_DRIFT.initialPosition
BALLOON_DRIFT.initialVelocity
BALLOON_DRIFT.initialWind
BALLOON_DRIFT.initialBurner
BALLOON_DRIFT.burnerIdle
BALLOON_DRIFT.burnerLift
BALLOON_DRIFT.ventDescent
BALLOON_DRIFT.altitudeDamping
BALLOON_DRIFT.ceilingY
BALLOON_DRIFT.ceilingSoftness
BALLOON_DRIFT.gravityBias
BALLOON_DRIFT.verticalVelocityClamp
BALLOON_DRIFT.cameraZoomDefault
BALLOON_DRIFT.cameraZoomClamp
BALLOON_DRIFT.firstPersonBlendRange
BALLOON_DRIFT.basketFocusOffset
```

Acceptance:

```txt
src/main.js reads these values instead of duplicating numeric literals.
Behavior remains visually unchanged.
FLIGHT remains exported only as compatibility/historical config until smoke proves it is unused by the live route.
```

### 3. Source fingerprint and snapshot

Files:

```txt
src/data/source-snapshot.js
src/main.js
```

Add:

```txt
createOpenAboveSourceFingerprint({ product, campaign, balloonDrift })
createOpenAboveSourceSnapshot({ product, campaign, balloonDrift, runtimeSnapshot })
```

Acceptance:

```txt
window.GameHost.getState().source exists.
window.GameHost.getState().source.product.currentRoute === "balloon-drift".
window.GameHost.getState().source.objectType === "hot-air-balloon".
window.GameHost.getState().source.fingerprint has stable marker fields.
```

### 4. Altitude bands and route objects

Files:

```txt
src/data/campaign.config.js
src/data/route.config.js
```

Add:

```txt
ALTITUDE_BANDS.lowClearance
ALTITUDE_BANDS.comfortDrift
ALTITUDE_BANDS.highDrift
ALTITUDE_BANDS.landingWindow
ROUTE_OBJECTS.liftGateA
ROUTE_OBJECTS.liftGateB
ROUTE_OBJECTS.liftGateC
ROUTE_OBJECTS.meadowLanding
WIND_LANE_HINTS
```

Acceptance:

```txt
Altitude bands are ordered and non-overlapping.
Route objects have id, kind, position, radius, altitude window, order, and completion text.
No route object mutates state yet.
```

### 5. DOM-free fixtures

Files:

```txt
tests/smoke.mjs
tests/balloon-source-authority.mjs
```

Acceptance rows:

```txt
product_copy_matches_balloon_drift
package_description_matches_balloon_drift
campaign_copy_marks_balloon_drift_current_route
legacy_flight_marked_compatibility_only
balloon_drift_config_matches_inline_runtime_defaults
balloon_drift_config_drives_runtime_defaults
altitude_bands_have_non_overlapping_thresholds
route_objects_define_three_lift_gates_and_one_landing
source_fingerprint_reports_copy_config_runtime_markers
gamehost_reports_balloon_source_snapshot
```

## Defer

```txt
Do not add mission reducer yet.
Do not unlock Cloud Basin yet.
Do not extract renderer/camera/world generation yet.
Do not promote reusable kits to ProtoKits yet.
Do not remove FLIGHT until live-route dependency is proven absent.
```

## Stop condition

This queue is complete when a source-level smoke can prove:

```txt
product copy
+ package description
+ campaign copy
+ BALLOON_DRIFT config
+ source fingerprint
+ GameHost source snapshot
+ route object descriptors
+ altitude bands
```

all agree that the current public product is `The Open Above: Balloon Drift`.
