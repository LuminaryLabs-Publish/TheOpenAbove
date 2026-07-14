# Next Steps: TheOpenAbove Grass Seed Module Environment and Publication Authority

**Last aligned:** `2026-07-13T21-58-55-04-00`  
**Status:** `grass-seed-module-environment-publication-authority-audited`

## Plan ledger

**Goal:** make deterministic seed imports pure and portable, then provide optional legacy browser publication through a typed, host-owned and reversible adapter.

### Gate 1: pure seed module

- [ ] Remove the `window.OpenAboveGrassWorldSeedKit` assignment from `grass-world-seed-kit.js`.
- [ ] Keep the existing named ESM exports unchanged.
- [ ] Define a stable `GrassSeedPublicApiManifest` and algorithm revision.
- [ ] Confirm import registers no callbacks, listeners, timers or globals.

### Gate 2: compatibility adapter

- [ ] Add `grass-world-seed-compatibility-adapter.js`.
- [ ] Require an explicit publication command from the browser host.
- [ ] Freeze the published facade.
- [ ] Include API revision, publication ID and host generation.
- [ ] Return typed installation and retirement results.

### Gate 3: target and collision policy

- [ ] Inspect the target namespace before mutation.
- [ ] Treat same-owner same-revision installation as idempotent.
- [ ] Reject foreign or incompatible globals without overwriting them.
- [ ] Reject stale host generations.
- [ ] Define explicit hot-reload replacement policy.

### Gate 4: owned retirement

- [ ] Remove only the publication created by the active adapter.
- [ ] Preserve foreign or successor values.
- [ ] Return `already-retired`, `not-owner` and `stale-publication` results.
- [ ] Integrate retirement with browser host disposal.

### Gate 5: environment proof

- [ ] Import in Node without `window`.
- [ ] Import in Node with a synthetic `window` and prove zero mutation.
- [ ] Import in a worker-like environment.
- [ ] Import in a browser and prove zero implicit publication.
- [ ] Exercise explicit install, idempotence, collision and disposal.

### Gate 6: source/build/Pages parity

- [ ] Probe the source ESM API manifest.
- [ ] Build with Vite and probe the built API manifest.
- [ ] Probe the Pages artifact revision.
- [ ] Execute compatibility installation against built and deployed outputs.
- [ ] Publish one `ModuleEnvironmentProofResult`.

### Gate 7: consumer and visible proof

- [ ] Bind world generation to the grass-seed algorithm revision.
- [ ] Bind grass and flower consumers to the same revision.
- [ ] Expose revisions through diagnostics and GameHost.
- [ ] Add `FirstSeedRevisionFrameAck`.
- [ ] Reject mixed-revision world/flora frames.

## Recommended file cut

```txt
src/visual/grass-field/
  grass-world-seed-kit.js
  grass-world-seed-compatibility-adapter.js
  grass-seed-public-api-manifest-kit.js

src/runtime/compatibility/
  compatibility-publication-authority-domain.js
  compatibility-publication-result-kit.js
  compatibility-retirement-kit.js

tests/
  grass-seed-import-purity.mjs
  grass-seed-compatibility.browser.mjs
  grass-seed-worker-import.mjs
  grass-seed-build-parity.mjs
  grass-seed-pages-parity.mjs
```

## Compatibility constraints

Preserve deterministic normalization and hashing output, existing ESM import paths, current world generation, grass and flower layouts, route/town protection, staged generation, map rendering, flight behavior and Air Mail gameplay.

## Do not claim

Do not claim import purity, collision-safe installation, owned retirement, worker compatibility, source/build/Pages parity or visible seed revision convergence until all gates pass on `main`.