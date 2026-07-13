# START HERE: TheOpenAbove

**Last aligned:** `2026-07-13T02-18-03-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Runtime revision reviewed:** `c2b96fa4d0dc44f6f3cf52762834324e712ed7d9`  
**Status:** `air-mail-delivery-completion-lifecycle-authority-audited`

## Summary

TheOpenAbove is an Air Mail hot-air-balloon experience with deterministic world generation, airstream routing, parcel delivery, camera-relative terrain and flora, HDR rendering, a parchment map, Nexus telemetry and browser/headless proof surfaces.

The current priority is delivery completion. The mail domain can set one parcel to `delivered` and return one event, but no aggregate owns the successor mission revision, stable completion confirmation, destination-marker retirement, next parcel, route/campaign completion, reset admission or first visible completion frame.

## Plan ledger

**Goal:** preserve the complete source-backed breakdown while defining one authoritative transition from delivery evidence to mission progression and visible completion proof.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have ledger and root `.agent` coverage.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove`, the oldest eligible central entry.
- [x] Trace route, parcel, delivery, host, map, town-marker, telemetry and test paths.
- [x] Preserve all 68 source-backed kits, 12 implied adapters and offered services.
- [x] Add the `2026-07-13T02-18-03-04-00` tracker and audit family.
- [x] Refresh all required root `.agent` documents and registry.
- [x] Change no runtime source, dependency, script or workflow.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime completion authority and executable fixtures remain future work.

## Read this pass first

```txt
.agent/trackers/2026-07-13T02-18-03-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T02-18-03-04-00.md
.agent/architecture-audit/2026-07-13T02-18-03-04-00-mail-delivery-completion-lifecycle-dsk-map.md
.agent/render-audit/2026-07-13T02-18-03-04-00-delivery-confirmation-visible-marker-gap.md
.agent/gameplay-audit/2026-07-13T02-18-03-04-00-single-parcel-terminal-progression-loop.md
.agent/interaction-audit/2026-07-13T02-18-03-04-00-delivery-event-result-continuation-map.md
.agent/mail-progression-audit/2026-07-13T02-18-03-04-00-parcel-route-campaign-completion-contract.md
.agent/deploy-audit/2026-07-13T02-18-03-04-00-delivery-completion-fixture-gate.md
```

## Interaction loop

```txt
boot -> one active Brookhaven parcel and three visible towns
flight -> simulation, airstream and mail update
enter destination -> parcel delivered and one event returned
first completion frame -> delivery message copied into flight state
next frame -> flight update overwrites message
post-completion -> destination markers remain active and no successor mission exists
```

## Domain and kit census

```txt
runtime/gameplay kits: 15
balloon/object/presentation kits: 15
visual/world/environment kits: 33
UI kits: 1
tooling/proof kits: 4
active source-backed total: 68
runtime-implied adapters: 12
inactive/retired legacy: 12
planned completion-lifecycle authority including parent: 21
```

The complete kit-by-kit service map is in `.agent/current-audit.md`, the latest tracker and `.agent/kit-registry.json`.

## Required parent domain

```txt
open-above-mail-delivery-completion-lifecycle-authority-domain
```

## Next safe ledge

Define a versioned mail-campaign manifest and immutable mission aggregate first. Then add delivery command/result identity, expected-predecessor admission, continuation policy, stable message/map/town projections, reset/replay commands and first-visible-completion-frame acknowledgement.

## Retained priorities

Flight-session persistence, immutable runtime admission, lifecycle/frame ownership, fixed-step input, telemetry immutability, bounded-world flight membership, terrain/vegetation adoption, flora exclusions, HDR coherence, map semantics and deployment parity remain active dependencies.