# Terrain Overlap Remediation

**Timestamp:** `2026-07-12T12-17-22-04-00`

## Goal

Make one terrain surface authoritative at every world coordinate without changing balloon controls, mail delivery, airstream behavior, world seed, or the active terrain-height API.

## Completed

- [x] Added one shared camera-relative terrain streaming frame.
- [x] Kept 520-unit near chunks and 1,040-unit horizon chunks.
- [x] Partitioned horizon chunks at exact near-chunk boundaries.
- [x] Removed every horizon cell owned by near terrain.
- [x] Removed the `1.004` horizon geometry expansion.
- [x] Removed the unexplained `-0.08` horizon height offset.
- [x] Reclassified retained horizon chunks by segment band and clip signature.
- [x] Added near and horizon boundary skirts.
- [x] Standardized terrain color slope sampling at 24 world units.
- [x] Narrowed full route terrain preservation to 72 units with a 190-unit outer transition.
- [x] Removed the second transition blend from final height sampling.
- [x] Replaced flat field planes with subdivided terrain-draped geometry.
- [x] Replaced the intersecting road tube with a terrain-draped ribbon.
- [x] Centralized authored lake descriptors and feathered water edges.
- [x] Added disposal for landmark and water geometry.
- [x] Added terrain ownership, route protection, and overlay smoke tests.
- [x] Wired the new tests into `npm run check` and therefore `npm run build`.

## Local validation

```text
terrain ownership / shared anchoring / clipping: passed
horizon retained-key reclassification: passed
narrow route protection: passed
draped field and road source contract: passed
shared lake descriptor and edge fade contract: passed
JavaScript syntax checks for all changed modules: passed
```

## Preserved contracts

```text
balloon simulation: unchanged
camera behavior: unchanged
airstream routes and visuals: unchanged
mail delivery rules: unchanged
world radius and seed: unchanged
terrainHeight consumer API: unchanged
grass and flower budgets: unchanged
```

## Remaining verification

- [ ] Clean GitHub Pages production build result.
- [ ] Deployed browser inspection at low, medium, and high altitude.
- [ ] Screenshot confirmation that no doubled terrain remains during 520/1,040-unit boundary crossings.
