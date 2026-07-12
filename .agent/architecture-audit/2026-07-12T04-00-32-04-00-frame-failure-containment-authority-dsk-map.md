# Architecture Audit: Frame Failure Containment Authority DSK Map

**Timestamp:** `2026-07-12T04:00:32-04:00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

## Summary

The current frame loop is an ordered chain of mutating calls with no enclosing runtime-failure boundary. Startup errors are projected, but post-start frame errors can terminate the RAF after only a prefix of the frame has executed.

## Current ownership graph

```txt
runtime session
  -> RAF callback
     -> simulation owner
     -> mail owner
     -> airstream owner
     -> balloon root/model
     -> balloon presentation owner
     -> camera owner
     -> visual owner
     -> telemetry engine
     -> renderer/composer
     -> HUD DOM
     -> successor RAF scheduling
```

Each owner remains authoritative for its own behavior. The missing boundary is the transaction and terminal policy around one ordered frame attempt.

## Existing execution contract

```txt
frame(now)
  -> calculate dt
  -> mutate simulation
  -> mutate mail
  -> mutate airstream
  -> mutate balloon
  -> mutate presentation
  -> mutate camera
  -> mutate visual state
  -> mutate telemetry
  -> submit render
  -> mutate HUD DOM
  -> schedule next frame
```

There is no frame ID, stage ID, stage result, failure ID, mutation journal, last-known-good frame pointer, failure quarantine, terminal result or restart admission.

## Required parent domain

```txt
open-above-frame-failure-containment-authority-domain
```

## Identity and plan kits

```txt
open-above-frame-id-kit
open-above-frame-stage-schema-kit
open-above-frame-stage-id-kit
open-above-frame-execution-plan-kit
```

Services:

```txt
allocate monotonically ordered frame identity
define the canonical stage order
describe required and optional stages
bind one immutable input snapshot to one frame attempt
```

## Stage and failure kits

```txt
open-above-frame-stage-result-kit
open-above-frame-failure-id-kit
open-above-frame-failure-classification-kit
open-above-frame-failure-admission-kit
open-above-frame-mutation-journal-kit
```

Services:

```txt
return Applied, Skipped or Failed for each stage
classify expected context-loss, recoverable subsystem and terminal failures
record which stages began and completed
admit exactly one failure transition per frame
prevent later stage execution after terminal failure
```

## Containment and projection kits

```txt
open-above-last-known-good-frame-kit
open-above-frame-failure-quarantine-kit
open-above-frame-failure-render-freeze-kit
open-above-frame-failure-capability-revocation-kit
open-above-frame-failure-overlay-kit
```

Services:

```txt
retain the last fully committed frame identity and observation
freeze visible output on the last-known-good canvas when safe
stop simulation, mission, camera, visual and public-command mutation
revoke GameHost capabilities
project one bounded terminal error surface
```

## Disposal, result and restart kits

```txt
open-above-frame-failure-disposal-plan-kit
open-above-frame-failure-result-kit
open-above-frame-failure-observation-kit
open-above-frame-failure-journal-kit
open-above-frame-cold-restart-adapter-kit
```

Services:

```txt
order callback cancellation and subsystem disposal
record disposal failures without losing the primary failure
publish frame, stage, session, mission and last-good identities
retain a bounded failure journal
admit restart only through a fresh runtime session
```

## Proof kits

```txt
open-above-frame-stage-failure-fixture-kit
open-above-render-failure-last-good-frame-fixture-kit
open-above-hud-failure-coherence-fixture-kit
open-above-pages-frame-failure-smoke-kit
```

## Required transaction

```txt
FrameAttempt(frameId, immutableInput)
  -> execute ordered stages
  -> collect typed stage results
  -> if all required stages succeed
       commit observation and visible-frame acknowledgement
       schedule successor
  -> if any stage fails
       admit one failureId
       stop remaining stages
       cancel successor admission
       quarantine mutation and public commands
       retain last-known-good visible state
       publish terminal failure observation
       run ordered disposal
       permit only cold restart into a new session
```

## Dependency order

```txt
runtime session lifecycle
  -> fixed-step simulation and input sequencing
  -> committed observation frame
  -> frame execution plan and stage results
  -> frame failure containment
  -> public capability revocation
  -> ordered disposal and cold restart
  -> browser and Pages failure fixtures
```

## Invariants

```txt
one frame attempt has one immutable input
one failure is admitted at most once
no stage after the failed stage mutates state
no failed frame replaces the committed observation
canvas, HUD and public readback identify the same last-known-good frame
failure revokes all mutation capabilities
all recurring callbacks are retired before terminal publication completes
restart never reuses failed-session owners
```

## Non-ownership rule

The parent domain does not own flight, mail, camera, rendering or HUD rules. It owns frame-stage ordering, typed execution results, failure admission, containment, terminal observation and restart handoff.