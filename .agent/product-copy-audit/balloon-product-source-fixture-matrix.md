# Product Copy Audit — Balloon Product Source Fixture Matrix

**Timestamp:** `2026-07-08T05:48:28-04:00`

## Purpose

Define the smallest source-authority fixture gate for the current hot-air-balloon drift product before changing runtime code.

This matrix converts the earlier source-authority finding into concrete rows that can be implemented and tested without a browser renderer.

## Current source conflict

```txt
README.md:
  says free-flight exploration, carving, gliding, diving, boosting, thermals, wind gates, and sky-perch return.

package.json:
  says standalone free-flight exploration.

src/data/campaign.config.js:
  says Meadow Lift is about thermals, gates, return radius, perch, pitch, roll, yaw, boost, thermal lift, and terrain clearance.

src/main.js:
  proves the current product is balloon drift with burner, vent, wind, buoyancy, altitude, distance, basket camera, HUD, Nexus telemetry, and GameHost state.
```

## Required source objects

```txt
PRODUCT_COPY or OPEN_ABOVE_PRODUCT
  owns title, tagline, product description, controls copy, route copy, HUD title, and milestone summary

BALLOON_DRIFT
  owns burner idle value, burner active value, vent active value, burner smooth rate, vent smooth rate, wind angle base, wind angle wave rates, wind speed base, wind speed wave rates, buoyancy base, burner lift, vent drop, altitude damping, ceiling height, ceiling softness, gravity term, vertical clamp, terrain clearance, starting position, starting velocity, camera zoom defaults, and first-person blend thresholds

ALTITUDE_BANDS
  owns low-clearance, lift-gate, high-drift, and landing band thresholds

ROUTE_OBJECTS
  owns three lift gates and a meadow landing target as descriptors, not renderer objects

WIND_LANE_HINTS
  owns readable wind guidance that can drive HUD/camera hints without controlling renderer internals
```

## Fixture rows

| Fixture row | Input | Expected result | Blocks |
| --- | --- | --- | --- |
| `readme_product_copy_is_balloon_drift` | README parsed text | No free-flight/bird/carving/pitch/bank/boost goal copy remains in current milestone copy | README correction |
| `package_description_is_balloon_drift` | `package.json.description` | Description names hot-air-balloon drift or balloon exploration, not free-flight | package correction |
| `campaign_region_copy_is_balloon_drift` | `CAMPAIGN.regions[0].description` | Meadow Lift description uses balloon/burner/wind/landing language | campaign copy correction |
| `legacy_flight_is_compatibility_only` | `FLIGHT` export plus imports | Live route either does not import `FLIGHT`, or exposes it as compatibility-only with reason metadata | config cutover |
| `balloon_drift_config_matches_runtime_defaults` | `BALLOON_DRIFT` and runtime state defaults | Burner idle, vent, wind, velocity, altitude, ceiling, camera zoom, and clamp constants match current behavior | drift config extraction |
| `altitude_bands_cover_ground_lift_high_and_landing` | `ALTITUDE_BANDS` and sample altitudes | Samples classify into stable named bands without overlap ambiguity | altitude authority |
| `route_objects_include_three_lift_gates_and_landing` | `ROUTE_OBJECTS` descriptors | Exactly three lift gates and one meadow landing target exist with ids, order, radius/altitude requirements, and display labels | route authority |
| `gamehost_reports_product_source_snapshot` | `window.GameHost.getState()` after boot | Diagnostic snapshot includes product source id, product copy version, route id, object type, and source config ids | host diagnostics |
| `gamehost_reports_source_fingerprint` | `window.GameHost.getState()` after boot | Fingerprint includes README/package/campaign/drift config markers or explicit unavailable reason fields | parity diagnostics |
| `dom_free_route_fixture_replays_source_snapshot` | fixture harness without DOM/WebGL | Product source, drift config, altitude band samples, route object descriptors, and fixture pass/fail rows can be read without renderer boot | test harness |

## Acceptance contract

```txt
accepted:
  fixture row has stable id
  fixture row has source input
  fixture row has expected output
  fixture row has actual output
  fixture row has pass/fail state
  fixture row has reason when failed or skipped

rejected:
  product copy still describes bird/free-flight as the current route
  package description still describes free-flight as current product
  route config remains inline-only with no source snapshot
  GameHost diagnostics require DOM text scraping to prove source parity
```

## DSK split

```txt
open-above-product-source
├─ product-copy-authority
│  ├─ product-copy-authority-kit
│  ├─ readme-route-copy-parity-kit
│  └─ package-description-parity-kit
├─ balloon-drift-source
│  ├─ balloon-drift-config-kit
│  ├─ altitude-band-contract-kit
│  ├─ route-object-config-kit
│  └─ wind-lane-hint-kit
├─ source-snapshot
│  ├─ source-fingerprint-kit
│  ├─ source-snapshot-kit
│  └─ gamehost-diagnostics-parity-kit
└─ fixture-proof
   ├─ product-source-fixture-harness-kit
   └─ route-replay-parity-kit
```

## Implementation guardrail

Do not change the visible route while building this gate.

The first code pass should be source-backed and fixture-backed:

```txt
copy/config source
  -> source snapshot
  -> GameHost diagnostics
  -> DOM-free fixture
  -> smoke check
```

Only after that should the repo add route event result envelopes, mission reducers, progression unlocks, or renderer/world/camera extraction.