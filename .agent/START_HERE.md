# START HERE: TheOpenAbove

**Last aligned:** `2026-07-13T05-19-21-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Runtime revision reviewed:** `030b16d41f95e47a4a07022fdfcd16bde2381a05`  
**Status:** `runtime-module-provider-admission-authority-audited`

## Summary

TheOpenAbove is an Air Mail hot-air-balloon experience with deterministic world generation, airstream routing, parcel delivery, camera-relative terrain and flora, HDR rendering, a parchment map, Nexus telemetry and browser/headless proof surfaces.

The current priority is runtime-provider admission. Three.js is loaded from an exact CDN package version, but NexusEngine is loaded from the mutable `main` branch. Static provider imports resolve before the module evaluates, so provider failures can prevent `boot()` and `showFatal()` from existing. The Pages workflow also validates a separate NexusEngine `main` checkout rather than one immutable provider revision shared with the deployed browser.

## Plan ledger

**Goal:** admit one immutable, compatible provider set before gameplay, telemetry, rendering or public readback starts, and make rejection visible without depending on the failed providers.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have ledger and root `.agent` coverage.
- [x] Confirm all repo-local documentation heads match central tracking.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove`, the oldest eligible central entry.
- [x] Trace HTML, static imports, boot, providers, headless checks, Vite build, Pages and visible failure.
- [x] Preserve all 68 source-backed kits, 12 implied adapters and offered services.
- [x] Add the `2026-07-13T05-19-21-04-00` tracker and audit family.
- [x] Refresh all required root `.agent` documents and registry.
- [x] Change no runtime source, dependency, script or workflow.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime provider admission and executable fixtures remain future work.

## Read this pass first

```txt
.agent/trackers/2026-07-13T05-19-21-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T05-19-21-04-00.md
.agent/architecture-audit/2026-07-13T05-19-21-04-00-runtime-module-provider-admission-dsk-map.md
.agent/render-audit/2026-07-13T05-19-21-04-00-provider-failure-visible-surface-gap.md
.agent/gameplay-audit/2026-07-13T05-19-21-04-00-provider-drift-runtime-bootstrap-loop.md
.agent/interaction-audit/2026-07-13T05-19-21-04-00-provider-resolve-admit-boot-map.md
.agent/provider-admission-audit/2026-07-13T05-19-21-04-00-module-source-integrity-parity-contract.md
.agent/deploy-audit/2026-07-13T05-19-21-04-00-runtime-provider-parity-fixture-gate.md
```

## Interaction loop

```txt
HTML and import map
  -> load src/main.js
  -> resolve Three.js 0.165.0
  -> resolve NexusEngine @main
  -> evaluate module graph
  -> define boot and showFatal
  -> compose gameplay/render owners
  -> tick, render and expose GameHost

provider failure before evaluation
  -> boot and showFatal do not exist
  -> error panel remains hidden
  -> no typed result or visible failure acknowledgement
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
planned provider-admission authority including parent: 16
```

The complete kit-by-kit service map is in `.agent/current-audit.md`, the latest tracker and `.agent/kit-registry.json`.

## Required parent domain

```txt
open-above-runtime-module-provider-admission-authority-domain
```

## Next safe ledge

Add a versioned runtime-provider manifest with exact Three.js and NexusEngine identities. Build a provider-independent bootstrap shell, validate fingerprints and required exports, commit one provider-set generation, expose typed receipts, and prove browser/headless/build/Pages parity.

## Retained priorities

Delivery completion, flight-session persistence, lifecycle/frame ownership, fixed-step input, telemetry immutability, bounded-world flight membership, terrain/vegetation adoption, flora exclusions, HDR coherence and map semantics remain active dependencies.