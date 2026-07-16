# Architecture Audit: Page-Lifecycle Suspension and Resume DSK Map

**Timestamp:** `2026-07-16T07-58-10-04-00`  
**Status:** `page-lifecycle-flight-suspension-resume-authority-audited`

## Summary

Lifecycle evidence currently enters through browser scheduling behavior rather than a domain command. The required architecture keeps browser events in adapters and settles suspension, resume and retirement through typed results consumed by the existing owners.

## Plan ledger

**Goal:** define the smallest DSK boundary that coordinates lifecycle meaning without absorbing flight, Air Mail, world, input or rendering authority.

- [x] Identify existing owners and service boundaries.
- [x] Identify browser evidence that currently has no product result.
- [x] Define lifecycle generations, commands, results and acknowledgements.
- [x] Map adoption into existing domains.
- [ ] Implement and validate the DSK family.

## Current owner map

```txt
browser callbacks
  -> RAF timing: src/main.js
  -> keyboard and blur: balloon-simulation-kit
  -> map RAF and key listener: parchment-map-overlay-kit
  -> resize: visual and map owners

product domains
  -> flight truth: balloon-simulation-kit
  -> delivery truth: mail-delivery-domain
  -> wind truth: airstream-domain
  -> world work: world-generation-kit and visual world kits
  -> camera truth: balloon-camera-rig-kit
  -> visible presentation: visual-domain, cloud kit and HDR composer
  -> diagnostics: telemetry and GameHost
```

## Required parent domain

`open-above-page-lifecycle-flight-suspension-resume-authority-domain`

The parent owns only lifecycle transition identity, admission, settlement and cross-domain acknowledgements.

## Planned DSK map

| Planned surface | Required service |
|---|---|
| `open-above-page-lifecycle-flight-suspension-resume-authority-domain` | compose lifecycle observation, policy, adoption, result and proof |
| `open-above-document-lifecycle-observation-kit` | observe visibility, pagehide/pageshow and freeze/resume evidence |
| `open-above-lifecycle-generation-identity-kit` | issue document, route, suspension and resume revisions |
| `open-above-lifecycle-transition-normalization-kit` | normalize browser evidence into suspend, resume or retire candidates |
| `open-above-suspension-reason-policy-kit` | resolve hidden, pagehide, frozen, map, failure and retirement reasons |
| `open-above-flight-simulation-suspension-kit` | settle flight update and elapsed-time policy |
| `open-above-held-input-cancellation-kit` | clear accepted actions and publish cancellation receipt |
| `open-above-air-mail-suspension-kit` | settle delivery progress and timestamp policy |
| `open-above-airstream-suspension-kit` | settle route/field update policy |
| `open-above-world-generation-suspension-kit` | pause and resume staged work budgets |
| `open-above-render-scheduler-suspension-kit` | own flight RAF cancellation and restart |
| `open-above-map-overlay-suspension-kit` | own map RAF cancellation, visibility and restore policy |
| `open-above-camera-transition-suspension-kit` | settle camera interpolation during suspension |
| `open-above-resume-clock-rebase-kit` | rebase host wall time and simulation clock on accepted resume |
| `open-above-bfcache-restoration-admission-kit` | classify persisted pageshow and revalidate live resources |
| `open-above-stale-lifecycle-generation-rejection-kit` | reject late events and callbacks from retired generations |
| `open-above-page-lifecycle-result-kit` | publish typed suspend, resume, retire and failure outcomes |
| `open-above-lifecycle-fallback-projection-kit` | expose actionable failure outside invalid presentation paths |
| `open-above-first-resumed-frame-ack-kit` | bind first accepted resumed frame to lifecycle and clock revisions |
| `open-above-page-lifecycle-browser-fixture-kit` | execute visibility, BFCache and freeze/resume proof rows |

## Command and result contract

```txt
PageLifecycleTransitionCommand
  documentGeneration
  routeGeneration
  sessionRevision
  evidenceType
  evidenceRevision
  visibilityState
  persisted
  observedAt
  expectedLifecycleRevision

PageLifecycleResult
  lifecycleRevision
  outcome: suspended | resumed | retired | rejected | failed
  reason
  suspensionRevision
  resumeRevision
  inputSettlementRevision
  simulationRevision
  mailRevision
  worldGenerationRevision
  renderSchedulerRevision
  mapRevision
  clockRevision
  fallback
```

## Adoption order

```txt
observe and normalize lifecycle evidence
  -> reject stale or duplicate generation
  -> classify suspend, resume or retire
  -> cancel held actions
  -> settle simulation and gameplay policy
  -> settle world and camera policy
  -> cancel or restart flight and map schedulers
  -> rebase clock on resume
  -> revalidate renderer, viewport and provider identity
  -> publish PageLifecycleResult
  -> present one resumed frame
  -> publish FirstResumedFrameAck
```

## Domain boundaries

```txt
browser adapter owns evidence only
lifecycle authority owns transition meaning and revisions
flight domain retains movement and elapsed-time truth
Air Mail retains delivery truth
airstream retains field and route truth
Core World and world-generation kits retain world truth
camera retains camera state
visual domain retains presentation
diagnostics consume immutable lifecycle snapshots
```

## Rejection rules

```txt
reject duplicate evidence revision
reject events from retired document or route generations
reject resume without an accepted suspension unless policy explicitly permits recovery
reject callbacks carrying pre-suspension scheduler generation
reject BFCache restoration when renderer/provider identity cannot be revalidated
reject FirstResumedFrameAck when clock, simulation and visible frame revisions disagree
```

## Validation boundary

Architecture documentation only. No lifecycle DSK, browser listener, scheduler behavior or runtime result was implemented.