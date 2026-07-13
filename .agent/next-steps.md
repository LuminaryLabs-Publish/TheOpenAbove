# Next Steps: TheOpenAbove Core World Feature/Foundation Adoption

**Last aligned:** `2026-07-13T18-40-52-04-00`

## Plan ledger

**Goal:** integrate the new semantic mountain with the existing staged-world adoption path so every physical and visible consumer commits one versioned Core World foundation artifact.

### Gate 1: parent Core World identity

- [ ] Register the rendered world through `engine.n.coreWorld.registerWorld()`.
- [ ] Define the bounded-disk surface and a compatible partition/cell policy.
- [ ] Represent the staged generator and feature foundation as provider-owned data.
- [ ] Publish portable effect descriptors rather than heavy arrays or GPU objects.
- [ ] Bind world, provider, and runtime generations.

### Gate 2: feature and foundation revisions

- [ ] Add `FeatureRegistryRevision` and `FeatureLifecycleRevision`.
- [ ] Add `FoundationCellRevision` and contribution fingerprint.
- [ ] Recompile after feature registration, lifecycle changes, reset, or replacement.
- [ ] Reject stale compile work after runtime or base-candidate retirement.
- [ ] Expose bounded revision diagnostics.

### Gate 3: immutable resolved artifact

- [ ] Publish `ResolvedWorldFoundationArtifact` for one base candidate and cell.
- [ ] Include feature IDs, contribution IDs, bounds, dependency order, and fingerprint.
- [ ] Include elevation, material, collision, and fidelity channel manifests.
- [ ] Keep the artifact detached until consumer preparation succeeds.
- [ ] Retain the predecessor artifact until visible acknowledgement.

### Gate 4: channel adapters

- [ ] Keep the elevation adapter compatible with current `sampleHeight` signatures.
- [ ] Replace manual map tinting with a material-channel adapter.
- [ ] Add an explicit collision-channel adapter and revision receipt.
- [ ] Add a landform fidelity plan for near mesh, middle field, and far silhouette.
- [ ] Preserve current mountain shape and Air Mail route protection.

### Gate 5: consumer preparation and adoption

- [ ] Register terrain-near, terrain-horizon, vegetation, grass, flowers, map, and collision consumers.
- [ ] Mark mandatory and optional consumers.
- [ ] Prepare resources under explicit work/time budgets.
- [ ] Return typed per-channel and per-consumer preparation results.
- [ ] Commit base-world and foundation revisions together.
- [ ] Publish `WorldFeatureFoundationAdoptionResult`.

### Gate 6: rollback and lifecycle

- [ ] Inject elevation, material, collision, terrain, flora, and map failures.
- [ ] Preserve predecessor sampling and render resources after preparation failure.
- [ ] Dispose incomplete successor resources exactly once.
- [ ] Retire stale artifacts after feature lifecycle changes, reset, or disposal.
- [ ] Publish terminal rollback and retirement receipts.

### Gate 7: visible and physical proof

- [ ] Publish one adopted landform frame envelope.
- [ ] Correlate foundation, terrain, horizon, material, flora, map, and collision revisions.
- [ ] Add near, middle, and far observation checks.
- [ ] Add `FirstVisibleLandformFrameAck`.
- [ ] Expose detached receipts through telemetry and `GameHost`.

### Gate 8: executable proof wiring

- [ ] Replace or supplement the stub with a real pinned-engine integration test.
- [ ] Add the existing staged world-generation test to `npm run check`.
- [ ] Add feature lifecycle and stale-artifact fixtures.
- [ ] Add material-zone and collision parity fixtures.
- [ ] Add route/town nonintersection proof.
- [ ] Add adoption failure/rollback and visible-frame browser fixtures.
- [ ] Add source, dist, and Pages parity checks.

## Implementation order

```txt
1. Core World parent registration and provider identity
2. feature/foundation revisions
3. detached resolved foundation artifact
4. elevation/material/collision/fidelity adapters
5. consumer registry and bounded preparation
6. atomic adoption and rollback
7. visible and collision acknowledgement
8. source/browser/build/Pages gates
```

## Recommended file cut

```txt
src/world/feature-foundation-runtime/
  world-feature-compile-command-kit.js
  world-feature-registry-revision-kit.js
  foundation-cell-artifact-kit.js
  foundation-channel-manifest-kit.js
  world-feature-foundation-adoption-authority-domain.js

src/visual/world-feature-adoption/
  foundation-elevation-adapter-kit.js
  foundation-material-adapter-kit.js
  foundation-collision-adapter-kit.js
  landform-fidelity-plan-kit.js
  world-feature-consumer-registry-kit.js
  world-feature-adoption-plan-kit.js
  world-feature-adoption-result-kit.js
  world-feature-adoption-rollback-kit.js
  first-visible-landform-frame-ack-kit.js

tests/
  world-feature-foundation.mjs
  world-feature-foundation-real-engine.mjs
  world-feature-foundation-adoption.browser.mjs
```

## Compatibility constraints

Preserve the current 500 metre mountain profile, deterministic seed, fallback world, staged generation, sampling signatures, route/town protection, balloon controls, Air Mail behavior, map style, terrain appearance, and existing public host. Do not combine the first authority cut with provider admission, persistence, or map/world dual-surface implementation.

## Current documentation state

Repo-local documentation is aligned through the `2026-07-13T18-40-52-04-00` Core World feature/foundation adoption audit family.
