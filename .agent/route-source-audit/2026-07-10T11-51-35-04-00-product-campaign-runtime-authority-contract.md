# Route source audit: product/campaign/runtime authority contract

Timestamp: `2026-07-10T11-51-35-04-00`

## Current route authority

```txt
index.html
  -> title and meta say Balloon Drift
  -> src/main.js is live entry

package.json
  -> describes cinematic hot air balloon wind-drift experience
  -> check/build/headless scripts exist

src/main.js
  -> composes the actual runtime
  -> imports CAMPAIGN/WORLD
  -> does not import FLIGHT
  -> exposes GameHost local/Nexus aggregate state only

src/data/campaign.config.js
  -> CAMPAIGN still includes older carve/thermal/gate/perch language
  -> WORLD still includes gate/thermal/perch/start speed fields
  -> FLIGHT still carries older free-flight constants
```

## Contract problem

There is no explicit source authority row distinguishing current Balloon Drift source from legacy-compatible free-flight source.

## Required row states

```txt
current
legacy_compatible
ignored
unsupported
missing
deferred
consumed_by_runtime
consumed_by_smoke
consumed_by_headless
consumed_by_gamehost
```

## Required fixture assertions

```txt
source manifest includes package/index/main/campaign/simulation/visual/headless/smoke/GameHost rows
source fingerprint is stable
source snapshot is JSON-safe
legacy FLIGHT rows are classified, not silently deleted
GameHost source readback is additive
headless runtime.getState can return source proof rows
```
