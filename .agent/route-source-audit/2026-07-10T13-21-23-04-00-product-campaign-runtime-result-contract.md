# Route Source Audit: Product Campaign Runtime Result Contract

Timestamp: `2026-07-10T13-21-23-04-00`

## Current route source

```txt
package.json description: cinematic hot air balloon wind-drift experience
index.html title: The Open Above: Balloon Drift
src/main.js: live route composer
src/data/campaign.config.js: CAMPAIGN, WORLD, and legacy FLIGHT exports
```

## Contract problem

The product and runtime now identify as Balloon Drift, but campaign config still contains older bird/free-flight vocabulary and fields.

Those fields should not be deleted blindly. They need explicit result rows:

```txt
accepted_current_route
accepted_current_world
legacy_compatible
ignored_legacy
missing_required_current
scheduled_for_removal_after_fixture
```

## Required modules

```txt
src/source/open-above-product.js
src/source/balloon-drift.config.js
src/source/legacy-flight-compatibility.js
src/source/source-authority-ledger.js
src/source/source-acceptance.js
src/source/source-consumer-ledger.js
```

## Next proof

The DOM-free source fixture should load product/campaign/runtime source rows, classify legacy rows, emit acceptance rows, and fail if a required current Balloon Drift row is missing.
