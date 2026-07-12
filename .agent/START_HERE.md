# START HERE: TheOpenAbove

**Last aligned:** `2026-07-11T21-08-57-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Summary

Recent runtime commits added a pinned bounded-disk surface to terrain streaming, but the surface is not yet a product-wide authority. Near and horizon terrain use disk membership; grass and balloon movement do not. At the world edge, terrain can disappear while grass is still generated at the edge floor and simulation continues beyond the supported visual world.

## Plan ledger

**Goal:** make one versioned world-surface revision authoritative across simulation, terrain, grass, authored route content, diagnostics and visible-frame proof.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Prioritize `TheOpenAbove` because seven runtime/test commits landed after the previous audit.
- [x] Trace world configuration, terrain admission, grass admission/culling, balloon movement and GameHost readback.
- [x] Identify the interaction loop, domains, kits and offered services.
- [x] Add timestamped architecture and system audits.
- [x] Refresh root `.agent` state and kit registry.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Implement and execute boundary classification, consumer parity, recovery and visible-frame fixtures.

## Read this first

```txt
.agent/trackers/2026-07-11T21-08-57-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-11T21-08-57-04-00-world-surface-membership-dsk-map.md
.agent/render-audit/2026-07-11T21-08-57-04-00-terrain-grass-boundary-frame-gap.md
.agent/gameplay-audit/2026-07-11T21-08-57-04-00-balloon-drift-beyond-bounded-world-loop.md
.agent/interaction-audit/2026-07-11T21-08-57-04-00-surface-membership-command-result-map.md
.agent/world-surface-audit/2026-07-11T21-08-57-04-00-consumer-membership-parity-contract.md
.agent/deploy-audit/2026-07-11T21-08-57-04-00-world-boundary-parity-fixture-gate.md
.agent/turn-ledger/2026-07-11T21-08-57-04-00.md
.agent/kit-registry.json
```

## Interaction loop

```txt
startup
  -> load world descriptor and disk-world ProtoKit
  -> create bounded height sampler
  -> create near/horizon terrain with surface-intersection admission
  -> create grass without surface admission
  -> create balloon simulation without horizontal boundary policy
  -> publish GameHost

frame
  -> update unrestricted balloon movement
  -> use bounded height for vertical clearance
  -> move camera with balloon
  -> terrain accepts/rejects chunks against disk bounds
  -> grass accepts chunks by camera radius only
  -> grass culls every chunk using camera distance to global origin
  -> render and publish static surface descriptor
```

## Main findings

```txt
surface descriptor schema/version: absent
surface revision/fingerprint: absent
near terrain surface membership: present
horizon terrain surface membership: present
grass required-set surface membership: absent
grass chunk world bounds: absent
grass culling uses mesh origin: present
balloon horizontal boundary policy: absent
route/town surface validation: absent
consumer parity result: absent
visible-frame surface acknowledgement: absent
```

## Domains in use

```txt
browser shell, Vite and Pages
runtime admission, session and frame ownership
campaign and world descriptor source
bounded-disk surface, height edge field and chunk membership
balloon simulation, input, clearance and snapshots
airstream route, field, force, visual and debug
mail parcel, route, town, volume and progress
balloon object, presentation and camera
near terrain, horizon terrain, vegetation and grass
sky, clouds, weather, water, lighting and HDR composition
HUD, Nexus telemetry, GameHost and headless readback
checks, tests, build and deployment
```

## Kits and services

```txt
active source-backed kits: 58
runtime-implied adapters: 12
inactive legacy kits: 11
```

Services cover boot, input, balloon simulation, airstream sampling and force, mail delivery, procedural balloon construction, camera projection, terrain and grass streaming, atmosphere, HDR rendering, telemetry, HUD, diagnostics, tests, build, headless inspection and Pages deployment.

## Required parent domain

```txt
open-above-world-surface-membership-authority-domain
  -> versioned surface descriptor and revision
  -> point/bounds membership queries
  -> shared terrain/grass/content policies
  -> simulation boundary admission and response
  -> stale-result rejection
  -> consumer parity result
  -> world-surface observation and journal
  -> visible-frame acknowledgement
  -> pure, browser and Pages fixture gates
```

## Ordered implementation queue

```txt
1. immutable runtime admission
2. import purity and frame ownership
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
```

## Next safe ledge

```txt
World Surface Membership Authority
+ Terrain/Grass/Simulation Consumer Parity
+ Boundary Traversal and First-Visible-Frame Fixture Gate
```