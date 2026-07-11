# Architecture Audit: Meadow Lift Objective Authority DSK Map

**Timestamp:** `2026-07-10T23-20-41-04-00`

## Goal

Map the current DSK/domain graph and define the smallest composed authority needed to turn the declared Meadow Lift campaign into an executable, deterministic mission after runtime admission and lifecycle ownership are solved.

## Current graph

```txt
route shell
  -> static CDN imports
  -> createGame
       -> open-above-visual-domain
       -> open-above-hot-air-balloon-object-kit
       -> open-above-balloon-simulation-kit
       -> open-above-balloon-camera-rig-kit
       -> open-above-balloon-presentation-domain
       -> open-above-balloon-telemetry-kit
  -> requestAnimationFrame
       -> simulation.update
       -> balloon/presentation/camera/visual update
       -> telemetry tick
       -> render
       -> HUD
```

## Campaign source graph

```txt
README / AGENTS.md product contract
  -> Meadow Lift milestone
       -> 3 thermals
       -> 5 wind gates
       -> return to perch
       -> restart/failure
       -> Cloud Basin unlock

campaign.config.js
  -> CAMPAIGN.regions[0].objectives
       -> thermalTarget: 3
       -> gateTarget: 5
       -> returnRadius: 34
       -> timeLimitSeconds: 300
  -> WORLD
       -> gateCount: 5
       -> thermalCount: 3
       -> perch
       -> seed
```

No active runtime edge connects this campaign source graph to simulation, rendering, telemetry, HUD, or GameHost, except copying the first region ID into the aggregate snapshot.

## Existing domain ownership

| Domain | Current owner | Services | Missing authority |
|---|---|---|---|
| Route boot | `src/main.js` | composition and RAF start | typed boot/session result |
| Physical drift | balloon simulation kit | wind, buoyancy, altitude, distance | command/result journal and fixed mission step |
| Presentation | balloon/camera/visual kits | transforms, environment, render | objective descriptors and consumption rows |
| Telemetry | balloon telemetry kit | aggregate balloon/visual resources and tick event | campaign state, progress, results, fingerprints |
| Campaign source | config module | region metadata and numeric targets | schema, validation, source fingerprint, execution |
| Mission objectives | none | none | entities, contacts, progress, phase, result |
| Progression | none | none | unlock transaction and persistence |

## Proposed composed parent domain

```txt
open-above-meadow-lift-domain
```

Owns:

```txt
mission source admission
mission generation
mission phase
objective entity registry
contact admission
progress state
completion/failure policy
restart generation
unlock result
bounded journals
mission snapshot/fingerprint
render projection
```

## Proposed child kits

```txt
open-above-campaign-manifest-kit
  validates region/objective/world source and produces one immutable fingerprint

open-above-route-objective-authority-kit
  composes objective generation, contact admission, progress and phase evaluation

open-above-thermal-volume-kit
  creates stable thermal IDs/transforms and thermal-contact results

open-above-wind-gate-kit
  creates stable ordered gate IDs/transforms and gate-contact results

open-above-perch-return-zone-kit
  creates the return zone and evaluates valid return attempts

open-above-objective-progress-kit
  owns idempotent visited/completed sets and target parity

open-above-mission-phase-kit
  owns ready/active/returning/completed/failed/restarting transitions

open-above-restart-command-kit
  accepts restart and creates a clean generation

open-above-mission-result-journal-kit
  retains bounded command/contact/progress/transition/result rows

open-above-route-render-projection-kit
  emits renderer-neutral thermal/gate/perch/phase descriptors

open-above-campaign-observation-kit
  projects detached mission state through telemetry and GameHost

open-above-meadow-lift-fixture-kit
  executes deterministic same-seed/same-command scenarios in Node
```

## Composition boundary

```txt
input adapter
  -> typed command batch
  -> simulation physical step
  -> objective contact candidates
  -> Meadow Lift authority
       -> admitted contact results
       -> progress update
       -> phase transition
       -> mission result/unlock
  -> committed mission observation
  -> render descriptors / telemetry / HUD / GameHost
```

The visual domain must consume descriptors and publish consumption results. It must not decide objective contact, progress, completion, failure, or unlock.

## State model

```js
{
  missionId,
  sourceFingerprint,
  seed,
  generation,
  phase,
  elapsed,
  timeLimitSeconds,
  thermals: { target, completedIds },
  gates: { target, completedIds, nextGateId },
  perch: { id, center, radius, returnReady, returned },
  unlocks,
  lastCommandResult,
  lastTransition,
  stateFingerprint
}
```

## Required invariants

```txt
configured and generated objective counts match
objective IDs and transforms are stable for a seed
contacts are idempotent
progress never exceeds targets
return cannot complete before prerequisites
one mission generation produces at most one terminal result
restart clears progress and fences stale callbacks
unlock is caused by one valid completion result
all projections reference one committed mission observation
```

## Ordered dependency

This product domain should be implemented only after:

```txt
immutable runtime admission
import-pure reusable modules
single-session RAF/listener/resource ownership
idempotent stop/dispose/restart
```

## Next safe ledge

```txt
TheOpenAbove Meadow Lift Objective Authority
+ Deterministic Route Fixture Gate
```
