# Known Gaps — TheOpenAbove

**Timestamp:** `2026-07-09T06-20-00-04-00`

## Product / source authority gaps

```txt
README.md still describes free-flight carving, gliding, diving, boosting, thermals, wind gates, and sky-perch return.
package.json still describes standalone free-flight exploration.
src/data/campaign.config.js still carries legacy CAMPAIGN/WORLD/FLIGHT shape for bird/free-flight style goals.
index.html already names the visible Balloon Drift product.
src/main.js is the live source of truth for burner, vent, wind, buoyancy, altitude, camera blend, HUD, and GameHost state.
```

## Runtime authority gaps

```txt
Balloon Drift constants are inline in src/main.js.
There is no source consumer manifest that names each durable source consumer and owner.
There is no source fingerprint proving README/package/campaign/runtime/object-kit parity.
There is no source snapshot that can be consumed by fixtures or GameHost diagnostics.
There is no source acceptance ledger for copy/config/runtime mismatch rows.
There is no source consumer ledger that binds repo-local .agent, browser runtime, smoke checks, and central ledger state.
```

## GameHost gaps

```txt
window.GameHost.getState().local exists.
window.GameHost.getState().nexusEngine exists.
window.GameHost.getState().source does not exist yet.
GameHost does not expose product route, source mismatch status, source fingerprint, acceptance rows, object-kit source metadata, source consumer ledger rows, or fixture-consumer status.
```

## Validation gaps

```txt
tests/smoke.mjs checks the current hot-air-balloon route and object kits.
tests/smoke.mjs does not yet run source/readback fixture rows.
package.json npm run check only runs tests/smoke.mjs.
No DOM-free source fixture exists yet.
No browser consumer fixture exists yet.
```

## Non-blocking visual gaps

```txt
The terrain, trees, lakes, clouds, and wind ribbons are inline and not yet DSK-split.
The camera blend is inline and not yet described as a source contract.
The HUD is inline and not yet a projection contract.
These are intentionally deferred until source authority is fixed.
```

## Current blocker

```txt
Source authority is not frozen enough for implementation agents to safely decide whether README, package metadata, campaign config, runtime constants, object-kit metadata, GameHost diagnostics, smoke checks, repo-local .agent docs, or central tracking are the canonical product surface.
```
