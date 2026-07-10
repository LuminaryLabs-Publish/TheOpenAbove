# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-10T01-20-47-04-00`

## Primary gap

The current blocker is source/readback proof, not render quality or gameplay feel.

## Gaps

```txt
README still carries older free-flight wording and controls.
src/data/campaign.config.js still carries legacy thermal, gate, perch, start speed, and FLIGHT-style fields.
src/main.js is the actual Balloon Drift route composer, but no source manifest records that relationship.
window.GameHost.getState() returns local and nexusEngine snapshots, but no .source block.
No source fingerprint records prove which product, campaign, and runtime records were consumed.
No source snapshot records serialize the current route source state.
No source acceptance ledger records accepted, legacy-compatible, ignored, or deferred fields.
No DOM-free source fixture proves source/readback rows before browser rendering.
npm run check does not yet include a source fixture.
```

## Non-gaps for the next pass

```txt
The visual route is already useful.
The runtime is already split into simulation, telemetry, visual-domain, camera-rig, presentation-domain, and object kits.
The package description is aligned to the current hot-air-balloon wind drift route.
The browser route has a GameHost readback surface, though it needs additive source proof.
```

## Do not prioritize next

```txt
renderer extraction
visual-domain rewrite
camera retune
balloon object visual changes
simulation constant retune
route expansion
legacy campaign field deletion
README-only cleanup
```

## Required proof rows next

```txt
route_copy_current
readme_copy_legacy_compatible
package_description_current
campaign_world_current
campaign_flight_legacy_compatible
runtime_imports_current
simulation_config_current
visual_domain_config_current
gamehost_source_readback_current
source_fixture_rows_current
```

## Next safe ledge

```txt
TheOpenAbove Source Consumer GameHost Readback Catch-up + Browser Fixture Gate
```
