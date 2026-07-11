# START HERE: TheOpenAbove

**Last aligned:** `2026-07-11T14-50-59-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Summary

`TheOpenAbove` advances simulation, delivery, airstream, camera and visual state in one RAF callback, then publishes Nexus telemetry before the renderer and HUD consume that frame. The published telemetry can therefore carry the current simulation and delivery state while retaining the previous rendered draw-call, triangle and dynamic-resolution observations.

`window.GameHost` also exposes mutable subsystem objects directly and offers no committed frame ID, snapshot revision, delivery-event correlation or consumer acknowledgement. The next safe ledge is one immutable observation transaction spanning simulation, delivery, render, HUD, telemetry and external readback.

## Current ledge

```txt
TheOpenAbove Committed Observation Frame Authority
+ Delivery / Render / HUD / Telemetry / GameHost Correlation Fixture Gate
```

## Plan ledger

**Goal:** publish one immutable frame observation only after every required consumer has processed the same admitted simulation tick and delivery result.

- [x] Compare the full Publish repository inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `TheOpenAbove` under the oldest eligible fallback rule.
- [x] Trace the current RAF ordering through simulation, delivery, airstream, camera, visual update, telemetry, render, HUD and GameHost.
- [x] Identify all active domains, kits and offered services.
- [x] Record the telemetry-before-render and mutable-readback gaps.
- [x] Define tick, frame, observation, consumer-acknowledgement and correlation kits.
- [x] Add timestamped architecture and system-specific audits.
- [x] Change no runtime or deployment behavior.
- [x] Push directly to `main`; create no branch or pull request.

## Read first

```txt
.agent/trackers/2026-07-11T14-50-59-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T14-50-59-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-11T14-50-59-04-00-committed-observation-frame-authority-dsk-map.md
.agent/render-audit/2026-07-11T14-50-59-04-00-telemetry-render-hud-gamehost-ordering-gap.md
.agent/gameplay-audit/2026-07-11T14-50-59-04-00-delivery-event-to-visible-frame-loop.md
.agent/interaction-audit/2026-07-11T14-50-59-04-00-gamehost-readback-frame-admission-map.md
.agent/observation-authority-audit/2026-07-11T14-50-59-04-00-committed-snapshot-consumer-ack-contract.md
.agent/deploy-audit/2026-07-11T14-50-59-04-00-observation-frame-correlation-fixture-gate.md
```

## Current frame order

```txt
simulation.update
  -> mail.update
  -> airstream.update
  -> balloon/camera/presentation update
  -> visual.update
  -> telemetry engine.tick and snapshot publication
  -> visual.render and dynamic-resolution sample
  -> HUD mutation
  -> next RAF
```

`visual.render()` is where renderer statistics and the next dynamic-resolution sample are committed. Telemetry snapshots earlier, so `snapshot.visual.drawCalls`, `triangles` and `renderScale` are not proven to describe the visible frame that follows.

## Required authority flow

```txt
SimulationTickReceipt
  -> DeliveryResult
  -> RenderFramePlan
  -> render world
  -> commit renderer and resolution observations
  -> project HUD
  -> collect required consumer acknowledgements
  -> publish immutable CommittedObservation
  -> expose detached GameHost/headless read models
```

## Priority order

```txt
1. Immutable Runtime Admission
2. Import Purity and Frame Ownership
3. Runtime Session Lifecycle and Ordered Disposal
4. Fixed-Step Clock and Sequenced Input
4a. Product Source Supersession and Acceptance Contract Parity
5. Air Mail Route and Delivery Authority
5a. Air Mail Mission Restart Transaction and Mission Epoch
5b. Committed Observation Frame Authority
6. Terrain Surface/Horizon Continuity and Work Budget
```

Documentation only. Runtime implementation and executable correlation fixtures remain future work.
