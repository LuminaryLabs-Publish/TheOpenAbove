# Known Gaps — TheOpenAbove

**Timestamp:** `2026-07-09T15-09-09-04-00`

## Product / source authority gaps

```txt
README.md still describes carving, gliding, diving, boosting, thermals, wind gates, and sky perch return.
package.json still describes standalone free-flight exploration.
src/data/campaign.config.js still carries legacy thermal/gate/perch/start/FLIGHT shape for older bird/free-flight goals.
index.html already names the visible Balloon Drift product.
src/main.js is the live source of truth for burner, vent, wind, buoyancy, altitude, camera blend, HUD, and GameHost state.
src/hot-air-balloon-object-kit.js is the live source of truth for the balloon object and sub-kit metadata.
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

## Central ledger gaps

```txt
Repo-local and central docs can drift when scheduled passes land close together.
TheOpenAbove repo-local .agent had advanced to 2026-07-09T14-58-42-04-00 while the central ledger still pointed to 2026-07-09T14-50-21-04-00.
The next source fixture must keep central ledger, repo-local kit registry, and latest tracker aligned after implementation.
```

## Validation gaps

```txt
tests/smoke.mjs checks the current hot-air-balloon route and object kits.
tests/smoke.mjs does not yet run source/readback fixture rows.
package.json npm run check only runs tests/smoke.mjs.
No DOM-free source fixture exists yet.
No browser consumer fixture exists yet.
No central-ledger parity fixture exists yet.
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
