# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-11T22-58-50-04-00`

## Status

```txt
status: balloon-steering-presentation-coherence-authority-audited
source revision reviewed: fd634acc03cce9c568e1a61a64690a5aa6022eff
runtime source changed by this pass: no
branch: main
root .agent state: refreshed
central ledger sync: pending
central internal change log: pending
```

## Summary

The active Air Mail runtime now has a materially improved balloon model, limited cross-current steering, separate envelope/gondola inertia and a steering-reactive camera. The retained model audit covers profile admission, assembly, loading and resources. This latest audit isolates the next authority gap: simulation, root transform, part presentation, camera, HUD, telemetry and rendering do not share one sequenced input, typed steering result, reset epoch or visible-frame receipt.

## Plan ledger

**Goal:** preserve wind-driven flight and the new balloon motion hierarchy while making every steering response deterministic, resettable, observable and correlated with the rendered frame.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove` because new source commits postdated prior audits.
- [x] Review repository guidance and retained model/world audits.
- [x] Trace keyboard input, airstream force, trim, root transform, part inertia, camera, HUD and snapshot projection.
- [x] Reconcile all source-backed kits and services.
- [x] Define steering input, result, presentation, frame and reset contracts.
- [x] Add timestamped tracker and system audits.
- [x] Refresh root `.agent` routing state and kit registry.
- [ ] Implement runtime changes and execute fixtures.

## Recent source changes reviewed

```txt
shared spline-based envelope profile and unified shell
integrated color-pattern metadata and fitted load tapes
profile-aware mouth, tapered basket and twin burners
persistent rope geometry
limited A/D cross-current steering
envelope and gondola inertia
steering-reactive third-person and basket-view camera
HUD trim projection
```

## Interaction loop

```txt
startup
  -> construct visual world and balloon model
  -> create airstream/mail/simulation/presentation/camera domains
  -> install keyboard, blur and wheel listeners
  -> publish GameHost and start RAF

frame
  -> sample ambient key Set
  -> copy airstream velocity to wind
  -> smooth lateralTrim and derive lateralAcceleration
  -> add cross-current component
  -> derive heading and visualBank
  -> integrate movement and terrain clearance
  -> apply root transform
  -> animate burner and rigging
  -> smooth envelope/gondola response
  -> smooth camera steeringLook and transforms
  -> update world, telemetry and HUD
  -> render
```

## Source-backed findings

```txt
input sequence/command ID: absent
steering policy ID/version: absent
steeringInput/lateralTrim/heading: present
root transform response: present
envelope/gondola inertia: present
camera steeringLook: present
HUD trim projection: present
shared steeringResultId: absent
part presentation revision: absent
camera response revision: absent
steering reset transaction: absent
visible-frame steering receipt: absent
```

`simulation.snapshot()` includes steering input, trim, bank and heading. It omits presentation-domain transforms. Host camera projection includes mode, zoom and first-person blend but omits steering look, target and committed transform acknowledgement.

The newly active `open-above-balloon-envelope-profile-kit` raises the active source-backed count to 59. The integrated pattern metadata remains a separate group and is not passed into the unified shell builder by the root assembly.

## Consequences

```txt
identical physical key presses can vary with RAF sampling
presentation and camera can lag different response revisions
HUD can describe trim before its frame is visible
blur/reset can neutralize input without proving visual convergence
stale predecessor response has no rejection boundary
headless readback cannot prove simulation-to-visible parity
pattern configuration can exist without affecting shell colors
```

## Domains in use

```txt
browser shell, DOM, Vite and Pages
mutable CDN/runtime admission
runtime session, startup, failure and frame ownership
keyboard, blur, wheel and variable RAF time
balloon simulation, airstream force, steering, clearance and snapshots
steering input/result authority: missing
balloon model descriptor, profile composition, assembly/loading/resources
envelope shape sampling, unified shell, pattern, seams and mouth
basket, burner frame, burners, cylinders, rigging and ropes
root transform and part-level presentation inertia
camera follow, zoom, clipping, basket blend and steering look
mail parcel, route, town, volume and progress
airstream route, sampler, field, visual and diagnostics
bounded terrain, near/horizon streaming, vegetation and grass
sky, clouds, weather, water, lighting and HDR
Nexus telemetry, HUD, GameHost and headless readback
checks, pure tests, build and Pages deployment
```

## Kit inventory

```txt
runtime/gameplay source-backed kits: 15
balloon/object/presentation source-backed kits: 15
visual environment source-backed kits: 26
tooling/proof source-backed kits: 3
active source-backed total: 59
runtime-implied adapters: 12
inactive legacy kits: 11
```

## Services offered

```txt
runtime boot, fatal projection and host publication
burner, vent, steering, blur and wheel input
balloon buoyancy, wind integration, trim, terrain clearance, transforms, snapshots and disposal
airstream validation, sampling, force adaptation, visuals and diagnostics
parcel, route, town, delivery-volume, progress, reset and events
profile sampling, unified shell, pattern metadata, mouth, seams and crown
basket, burner frame, twin burners, rigging and persistent rope animation
model build/load metadata and compatibility installation
materials, illumination and envelope/gondola inertia
camera follow, steering look, zoom, clipping and basket-view blend
bounded terrain, grass, sky, clouds, water, HDR and renderer statistics
Nexus resources/events, telemetry, HUD, GameHost and headless readback
source checks, pure tests, Vite build and Pages deployment
```

The complete per-kit list and service map are in the latest tracker and `.agent/kit-registry.json`.

## Required parent domain

```txt
open-above-balloon-steering-presentation-authority-domain
  -> steering-input-sample-kit
  -> steering-input-sequence-kit
  -> steering-policy-descriptor-kit
  -> steering-admission-kit
  -> steering-simulation-result-kit
  -> balloon-root-transform-result-kit
  -> balloon-part-presentation-result-kit
  -> camera-steering-result-kit
  -> steering-hud-projection-kit
  -> steering-observation-frame-kit
  -> steering-frame-commit-kit
  -> stale-steering-result-rejection-kit
  -> steering-reset-transaction-kit
  -> steering-journal-kit
  -> steering-response-fixture-kit
  -> steering-visible-frame-smoke-kit
```

Retained upstream model domain:

```txt
open-above-balloon-model-assembly-authority-domain
  -> canonical model/profile admission
  -> detached load and scene commit
  -> resource inventory and retirement
  -> model/frame provenance
```

## Required invariants

```txt
one input sample is admitted once against one fixed tick
all visible consumers reference one steering result
neutral input converges every response owner to policy bounds
blur, pause, reset and restart retire predecessor input/state
stale and duplicate samples mutate nothing
HUD/GameHost report committed results
visible frames identify the steering result rendered
```

## Ordered safe ledges

```txt
1. immutable runtime admission
2. import purity and frame ownership
2a. balloon model descriptor/assembly/loading authority
3. runtime session lifecycle and ordered disposal
4. fixed-step clock and sequenced input
4a. product source and acceptance parity
5. Air Mail route and delivery authority
5a. mission restart transaction and epoch
5b. committed observation frame authority
6. terrain source and LOD transition authority
6a. bounded terrain build and atomic replacement
7. grass spatial identity and backend truth
7a. world surface membership and consumer parity
8. balloon steering and presentation authority
```

Documentation only. No runtime source, package, rendering or deployment behavior changed.
