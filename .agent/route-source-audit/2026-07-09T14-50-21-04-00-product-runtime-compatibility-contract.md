# Route Source Audit — Product Runtime Compatibility Contract

**Timestamp:** `2026-07-09T14-50-21-04-00`

## Source surfaces

```txt
README.md
package.json
index.html
src/data/campaign.config.js
src/main.js
src/hot-air-balloon-object-kit.js
tests/smoke.mjs
.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs repo ledger
```

## Current authority map

```txt
index.html:
  already presents The Open Above: Balloon Drift

src/main.js:
  authoritative runtime for burner, vent, wind, buoyancy, altitude, camera blend, HUD, and GameHost

src/hot-air-balloon-object-kit.js:
  authoritative visual object kit and sub-kit metadata

README.md:
  stale legacy free-flight product copy

package.json:
  stale legacy free-flight description

src/data/campaign.config.js:
  mixed current route id/title with legacy thermals/gates/perch/FLIGHT fields

tests/smoke.mjs:
  proves current visual route markers but not source/readback ledger rows
```

## Compatibility contract needed

```txt
legacyFlightCompatibility.status = "compatibility-only"
legacyFlightCompatibility.sources = ["README.md", "package.json", "src/data/campaign.config.js"]
legacyFlightCompatibility.blockingReason = "Balloon Drift is current route, old free-flight values remain until source/readback fixture lands."
```

## Source readback rows needed

```txt
product_copy_current_route
package_description_current_route
readme_controls_current_route
campaign_marks_balloon_drift
legacy_flight_marked_compatibility_only
runtime_constants_named
object_kit_metadata_named
smoke_includes_source_fixture
gamehost_source_projection_exists
central_ledger_matches_repo_local_tracker
```

## Fixture expectation

`node scripts/open-above-source-fixture.mjs` should run without DOM, canvas, WebGL, or browser globals.

It should fail on mismatched source rows before `npm run check` and `npm run build` can pass.

## Main route-source finding

The next implementation should make source ownership explicit before removing or rewriting legacy copy/config fields.
