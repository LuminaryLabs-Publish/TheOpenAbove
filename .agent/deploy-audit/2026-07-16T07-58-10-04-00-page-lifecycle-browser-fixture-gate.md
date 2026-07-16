# Deploy Audit: Page-Lifecycle Browser Fixture Gate

**Timestamp:** `2026-07-16T07-58-10-04-00`

## Summary

Static source checks and headless world checks do not prove browser visibility, page lifecycle, BFCache or first-resumed-frame behavior. Release confidence requires the same fixture matrix against source, built artifact and deployed Pages output.

## Plan ledger

**Goal:** define the minimum executable gate before lifecycle-support or deployment-parity claims.

- [x] Identify current package checks and build path.
- [x] Identify lifecycle behavior not covered by current tests.
- [x] Define source/build/artifact/Pages fixture rows.
- [ ] Implement and run the fixtures.

## Current validation surface

```txt
npm run check
  -> static smoke
  -> world feature foundation
  -> world domain composition
  -> terrain streaming
  -> route protection
  -> terrain overlays

npm run build
  -> npm run check
  -> Vite build
```

No current script opens a real browser or controls document visibility and navigation lifecycle.

## Required fixture rows

| Row | Expected evidence |
|---|---|
| hide before first frame | accepted suspension or deferred startup; no stale first frame |
| restore before first frame | one clock rebase and one first frame |
| hide during steady flight | no simulation update after suspension result |
| hide with burner held | held-input cancellation receipt |
| hide with vent/steering held | no action survives resume without fresh evidence |
| hide while map open | map RAF stops; semantic open state follows policy |
| hide during world generation | work budget pauses and resumes from accepted phase |
| hide inside delivery volume | Air Mail state follows declared suspension policy |
| pagehide persisted=false | final retirement and no resume |
| pagehide/pageshow persisted=true | BFCache restoration without duplicate listeners |
| freeze/resume | one lifecycle generation and one scheduler restart |
| rapid hide/show | stale/duplicate events rejected |
| stale RAF callback | retired scheduler generation rejected |
| restoration failure | actionable fallback result |
| first resumed frame | lifecycle, clock, simulation and frame revisions agree |

## Execution matrix

```txt
source Vite development origin
local production dist
workflow-produced Pages artifact
public GitHub Pages origin
```

## Required receipts

```txt
browser and version
source commit
artifact digest
Pages deployment identity
DocumentGeneration
LifecycleRevision
SuspensionRevision
ResumeRevision
ClockRevision
FlightSchedulerGeneration
MapSchedulerGeneration
PageLifecycleResult
FirstResumedFrameAck
screenshots or structured frame snapshots
```

## Pass conditions

```txt
no duplicate listeners after BFCache restore
no held input survives suspension
no stale scheduler callback mutates state
one clock rebase per accepted resume
one flight RAF and at most one map RAF after resume
one FirstResumedFrameAck per resume revision
source, artifact and Pages produce equivalent lifecycle results
```

## Current status

```txt
fixture implemented: no
source browser run: no
dist browser run: no
artifact run: no
Pages run: no
```

No deployment or production-readiness claim is made.