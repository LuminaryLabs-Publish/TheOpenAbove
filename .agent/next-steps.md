# Next Steps: TheOpenAbove World Generation Public Contract Proof

**Last aligned:** `2026-07-13T18-59-14-04-00`  
**Status:** `world-generation-public-contract-proof-authority-audited`

## Plan ledger

**Goal:** replace file-location proof with a canonical public-contract manifest while retaining useful structural checks as non-authoritative diagnostics.

### Gate 1: canonical public contract

- [ ] Define `WorldGenerationPublicContractManifest`.
- [ ] Include public IDs, constants, phases, factory entry point and descriptor schema.
- [ ] Add `WorldGenerationContractRevision` and deterministic fingerprint.
- [ ] Export the manifest from `world-generation-kit.js`.
- [ ] Keep `world-generation-support.js` private to the facade.

### Gate 2: module graph evidence

- [ ] Record the facade-to-support dependency graph.
- [ ] Classify source-file existence checks separately from API proof.
- [ ] Reject missing, duplicate or stale public exports.
- [ ] Allow internal file moves that preserve the manifest and behavior.
- [ ] Detect accidental internal imports by product consumers.

### Gate 3: executable source proof

- [ ] Import all public values from `world-generation-kit.js`.
- [ ] Verify grid size, feature-cell size, phases and kit ID through the facade.
- [ ] Retain deterministic, protection, staged lifecycle, reset and disposal fixtures.
- [ ] Publish per-fixture typed results.
- [ ] Calculate one source proof fingerprint.

### Gate 4: build and deployment parity

- [ ] Build the Vite artifact.
- [ ] Import or probe the built public module boundary.
- [ ] Compare source and build manifests and deterministic fixtures.
- [ ] Probe the GitHub Pages artifact and revision identity.
- [ ] Publish source/build/Pages parity results.

### Gate 5: consumer and visible proof

- [ ] Bind terrain-near, terrain-horizon, vegetation, flora, map and collision-height consumers to the contract revision.
- [ ] Expose the accepted contract revision through telemetry and `GameHost`.
- [ ] Publish a frame envelope containing contract and consumer revisions.
- [ ] Add `FirstContractRevisionFrameAck`.
- [ ] Reject mixed-revision visible frames.

### Gate 6: failure and drift fixtures

- [ ] Move constants between internal modules without changing the facade and prove the suite remains valid.
- [ ] Change a public value without updating the manifest and require rejection.
- [ ] Change behavior while retaining source markers and require rejection.
- [ ] Inject a stale build artifact and require parity failure.
- [ ] Inject Pages revision drift and require parity failure.

## Recommended file cut

```txt
src/world/proof/
  world-generation-public-api-manifest-kit.js
  world-generation-contract-revision-kit.js
  world-generation-module-graph-kit.js
  world-generation-proof-result-kit.js
  world-generation-contract-proof-authority-domain.js

tests/
  world-generation-public-contract.mjs
  world-generation-build-parity.mjs
  world-generation-pages-parity.mjs
  world-generation-contract.browser.mjs
```

## Compatibility constraints

Preserve the public imports from `world-generation-kit.js`, `WORLD_GRID_SIZE = 257`, `WORLD_FEATURE_CELL_SIZE = 2080`, staged fallback behavior, deterministic output, route/town protection, reset retention, mountain composition, current rendering and Air Mail gameplay.

## Do not claim

Do not claim canonical contract ownership, source/build/deployed parity or visible consumer convergence until all gates pass on `main`.
