# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-12T11-15-16-04-00`

## Plan ledger

**Goal:** move runtime, world generation, simulation, presentation and navigation behind explicit identities, typed results and executable proof gates.

### Checklist

#### Gate 1: immutable runtime admission
- [ ] Pin NexusEngine instead of importing `@main`.
- [ ] Validate module capabilities before construction.
- [ ] Return typed boot results and a module-graph fingerprint.

#### Gate 2: session, frame and failure ownership
- [ ] Own all RAF callbacks, listeners and resources through one runtime session.
- [ ] Add fixed-step clock, sequenced input and frame-stage failure containment.
- [ ] Revoke capabilities after failure, stop or replacement.

#### Gate 3: terrain and world-surface authority
- [ ] Preserve the existing disk-surface, terrain LOD and replacement plans.
- [ ] Promote `world.contains(x,z)` into a typed shared membership result.
- [ ] Coordinate height, climate, flora, terrain and map boundary behavior.
- [ ] Require terrain consumer receipts and first-frame proof.

#### Gate 4: procedural world generation authority
- [ ] Add `open-above-procedural-world-generation-authority-domain`.
- [ ] Canonicalize and fingerprint seed, surface config, algorithm version, routes and towns.
- [ ] Allocate WorldBuildId and generation revision.
- [ ] Express grid construction, erosion, flow and climate as named build stages.
- [ ] Add startup budget, progress, cancellation and typed terminal results.
- [ ] Commit an immutable `WorldGridArtifact` and artifact fingerprint.
- [ ] Replace raw functions with revisioned `WorldSampleQuery` / `WorldSampleResult`.
- [ ] Keep feature-cell caching bounded, non-authoritative and owned by the world build.
- [ ] Specify outside-world behavior for every sample type, not only flora.
- [ ] Add independent-build and startup-budget fixtures.

#### Gate 5: world consumer coherence
- [ ] Give terrain, vegetation, landmarks, grass, flowers and map stable consumer IDs.
- [ ] Attach world build revision and fingerprint to every chunk or cached projection.
- [ ] Collect typed consumer adoption receipts and a parity result.
- [ ] Reject stale chunks and map pixels after world replacement.
- [ ] Acknowledge the first visible frame for each committed world revision.

#### Gate 6: grass and flower contract
- [ ] Name the composition policy between world grass density and legacy biome density.
- [ ] Add chunk plan/result IDs and outside-world rejection counts.
- [ ] Validate center, edge and outside chunks.
- [ ] Add cold-build versus map-prewarmed chunk parity.

#### Gate 7: parchment map authority
- [ ] Retain pause/input/focus/lifecycle work.
- [ ] Fix bearing and declare coordinate conventions.
- [ ] Add content-fit, route emphasis and off-map policy.
- [ ] Make map background cite the active world revision.

#### Gate 8: accessibility and deployment
- [ ] Restore event-driven semantic mission status.
- [ ] Add fatal alert/focus transaction.
- [ ] Require source, built output and Pages world-frame parity.

## Already resolved during this audit window

```txt
[x] remove feature-cache size from authoritative descriptor
[x] expose disk containment query
[x] return zero-density outside-world flora profile
```

## Procedural-world kit order

```txt
open-above-procedural-world-generation-authority-domain
open-above-world-build-id-kit
open-above-world-generation-revision-kit
open-above-world-seed-policy-kit
open-above-world-config-fingerprint-kit
open-above-world-anchor-fingerprint-kit
open-above-world-build-plan-kit
open-above-world-build-stage-kit
open-above-world-build-result-kit
open-above-world-build-budget-kit
open-above-world-build-cancellation-kit
open-above-world-grid-artifact-kit
open-above-world-grid-fingerprint-kit
open-above-world-sample-query-kit
open-above-world-sample-result-kit
open-above-world-membership-policy-kit
open-above-world-out-of-bounds-result-kit
open-above-world-feature-cell-cache-policy-kit
open-above-world-pure-read-adapter-kit
open-above-world-consumer-id-kit
open-above-world-consumer-receipt-kit
open-above-world-consumer-parity-result-kit
open-above-world-visible-frame-ack-kit
open-above-world-generation-journal-kit
open-above-world-independent-build-fixture-kit
open-above-world-startup-budget-fixture-kit
open-above-world-replacement-fixture-kit
open-above-world-consumer-parity-fixture-kit
open-above-world-browser-pages-fixture-kit
```

## Validation order

```txt
fixture:world-input-fingerprint
fixture:world-independent-build-fingerprint
fixture:world-sample-result-provenance
fixture:world-membership-matrix
fixture:world-consumer-parity
fixture:world-stale-consumer-rejection
fixture:world-startup-budget
fixture:world-build-cancellation
fixture:world-visible-frame-ack
npm run check
npm run headless:check
npm run build
browser edge and map/scene pixel probes
built-output fingerprint parity
Pages world-generation smoke
```