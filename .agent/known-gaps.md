# Known Gaps — TheOpenAbove

**Timestamp:** `2026-07-09T23-51-04-04-00`

## Source authority gaps

```txt
README.md still describes carving, gliding, diving, boosting, thermals, wind gates, and sky perch return.
package.json is now aligned to the cinematic hot-air-balloon wind-drift route.
src/data/campaign.config.js still carries legacy thermal/gate/perch/start-speed/FLIGHT shape for older free-flight goals.
src/main.js is the live route composer for simulation, telemetry, visual-domain, camera-rig, presentation-domain, HUD, and GameHost.
src/runtime/balloon-simulation-kit.js is the live source of truth for burner, vent, wind, buoyancy, altitude, and movement integration.
src/visual/visual-domain.js is the live source of truth for visual-domain composition.
tests/smoke.mjs checks the cinematic visual-domain route but not source parity rows.
```

## Readback gaps

```txt
No source consumer manifest names README, package, campaign config, runtime kits, smoke tests, GameHost, repo-local .agent, and central ledger consumers.
No source fingerprint proves copy/config/runtime/object/visual-domain parity.
No source snapshot can be consumed by fixtures or GameHost diagnostics.
No acceptance ledger records README legacy copy, campaign compatibility, package alignment, simulation defaults, visual-domain subkits, or GameHost source status.
window.GameHost.getState().source does not exist yet.
```

## Runtime proof gaps

```txt
Keyboard intent has no stable accepted/rejected/no-change result row.
Simulation ticks have no before/after result rows.
Ground clamp and ceiling softness have no reason-coded readback rows.
Visual-domain render stats are aggregate only.
Camera rig exposes live state, but no source-owned camera snapshot contract.
Presentation-domain kits are installed, but no fixture-readable presentation snapshot exists.
```

## Validation gaps

```txt
No scripts/open-above-source-fixture.mjs exists yet.
npm run check does not yet run source/readback rows.
No browser consumer fixture proves GameHost source readback.
No central-ledger parity fixture exists.
```

## Do not start next

```txt
renderer extraction
visual-domain rewrite
camera retune
balloon visual changes
simulation constant retune
Cloud Basin content
legacy FLIGHT field removal before compatibility handling exists
```
