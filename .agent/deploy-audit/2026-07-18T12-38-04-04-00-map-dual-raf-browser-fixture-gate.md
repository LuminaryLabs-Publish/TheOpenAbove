# Deploy Audit: Map Dual-RAF Browser Fixture Gate

**Timestamp:** `2026-07-18T12-38-04-04-00`  
**Status:** `map-open-dual-surface-render-work-budget-authority-audited`

## Summary

Current static checks can confirm source markers, but the map-open finding requires a real browser because RAF scheduling, Canvas2D work, CSS transitions, device pixel ratio, ResizeObserver behavior and Three.js presentation are browser-owned.

## Required browser fixture

```txt
1. load source route
2. wait for first stable flight frame
3. instrument Journey RAF callbacks
4. instrument map RAF callbacks
5. instrument Experience.render calls
6. instrument parchment draw calls and redraw reasons
7. open map with M
8. hold unchanged state through the transition and steady-open window
9. resize while open
10. close with Escape
11. rapidly open/close/open
12. dispose and verify zero further callbacks
13. repeat against Vite artifact
14. repeat against deployed Pages origin
```

## Required assertions

- one Journey RAF lease exists before map open;
- map open creates only the admitted map presentation lease;
- background render cadence matches `MapSurfacePlanResult`;
- map redraw cadence matches dirty-state policy;
- unchanged steady-open state does not exceed the admitted redraw budget;
- resize produces one accepted viewport settlement;
- repeated toggles do not accumulate callbacks;
- stale callbacks do not draw after close or disposal;
- player, world and capture revisions match `MapSurfaceDigest`;
- first matching frame publishes `FirstMapBoundFrameAck`;
- source, artifact and Pages outcomes agree.

## Evidence to retain

```txt
source commit SHA
provider revision
artifact digest
Pages URL and fetch time
viewport and DPR
MapOpenGeneration
MapSurfacePlanResult
MapRenderWorkBudgetResult
MapSurfaceDigest
FirstMapBoundFrameAck
RAF callback trace
Experience render count
map draw count and reasons
screenshots for open transition and steady-open state
```

## Failure classification

- `BLOCKER`: duplicate unretired RAF leases, stale drawing after disposal, map cannot close, or deployed source/artifact divergence.
- `ERROR`: published cadence/result disagrees with observed callback or draw counts.
- `WARNING`: policy is internally consistent but exceeds an accepted measured budget.
- `INFO`: source arithmetic differs from browser scheduling without contract violation.

## Current validation state

```txt
static source inspection: completed
browser dual-RAF fixture: absent
map dirty-redraw fixture: absent
resize/toggle fixture: absent
artifact fixture: not run
Pages fixture: not run
```

## Claim boundary

No deployment parity, callback count, browser timing, frame-time improvement or production readiness is claimed until this gate executes.