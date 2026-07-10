# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-10T13-21-23-04-00`

## Primary gap

The current blocker is source result authority and GameHost/headless readback proof, not render quality, camera feel, or gameplay expansion.

## Gaps

```txt
src/data/campaign.config.js still carries legacy thermal, gate, perch, start speed, and FLIGHT-style fields.
src/main.js is the actual Balloon Drift route composer, but no source result authority ledger records that relationship.
keyboard input mutates a Set without accepted/rejected/no-change result rows.
wheel input mutates camera zoom without accepted/clamped/no-change result rows.
window.GameHost.getState() returns local and nexusEngine snapshots, but no .source block.
No source fingerprint proves which product, campaign, runtime, smoke, headless, and GameHost rows were consumed.
No source snapshot serializes the current route source state.
No source acceptance ledger records accepted, legacy-compatible, ignored, missing, or deferred fields.
No source consumer ledger identifies runtime, smoke, headless, HUD, simulation, visual, telemetry, and GameHost consumers.
The headless editor environment validates renderer/build contracts, but not source/readback rows.
The smoke test validates renderer and source-file contracts, but not source authority or GameHost source projection.
No DOM-free source fixture proves source/readback rows before browser rendering.
npm run check does not yet include a source fixture.
```

## Non-gaps for the next pass

```txt
The visual route is already useful.
The runtime is split into simulation, telemetry, visual-domain, camera-rig, presentation-domain, and object kits.
The package description is aligned to the current hot-air-balloon wind drift route.
The browser route has a GameHost readback surface, though it needs additive source proof.
The repo has headless editor commands ready to host a stronger source fixture gate.
The smoke test already checks neutral lighting, streamed terrain, water fog, and renderer safety contracts.
```

## Do not prioritize next

```txt
renderer extraction
terrain extraction
visual-domain rewrite
camera retune
balloon object visual changes
simulation constant retune
route expansion
legacy campaign field deletion
README-only cleanup
headless-only build plumbing without source rows
```

## Required proof rows next

```txt
route_copy_current
package_description_current
campaign_world_current
campaign_flight_legacy_compatible
runtime_imports_current
simulation_config_current
keyboard_input_result_missing
wheel_zoom_result_missing
visual_domain_config_current
telemetry_consumer_current
hud_consumer_current
smoke_contract_current
headless_environment_current
gamehost_source_readback_missing
source_fixture_rows_missing
```

## Next safe ledge

```txt
TheOpenAbove Source Result Readback Ledger Refresh + GameHost Headless Fixture Gate
```
