# Validation: TheOpenAbove

**Last aligned:** `2026-07-11T21-08-57-04-00`

## Scope

Documentation-only audit of the new bounded-disk world surface, terrain height blending, near/horizon chunk membership, grass required-set and culling behavior, balloon movement, readback and source-pattern tests.

## Plan ledger

**Goal:** separate source-backed world-boundary findings from executable proof and define the minimum fixture gate for simulation, terrain, grass and visible-frame parity.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove` because seven runtime/test commits landed after its previous audit.
- [x] Read `AGENTS.md`, current root `.agent` state and retained terrain/grass audits.
- [x] Compare the previous documentation head with the current runtime head.
- [x] Read world config, terrain surface, terrain streamers, grass domain, culling, simulation, visual host and smoke checks.
- [x] Confirm terrain uses bounded height and bounds membership.
- [x] Confirm grass required-set construction has no world-surface membership.
- [x] Confirm grass culling uses the default mesh origin.
- [x] Confirm balloon simulation has no horizontal boundary policy.
- [x] Confirm readback exposes the descriptor but not live membership or parity.
- [x] Define pure, browser, lifecycle and Pages fixtures.
- [x] Change no runtime source, dependency, script or workflow.
- [x] Create no branch or pull request.

## Source-backed behavior

```txt
WORLD.surface
  -> bounded-disk, center 0/0, radius 10000, edge blend 600, edge floor -120

createTerrainSurface
  -> createDiskWorldSurface
  -> boundedTerrainHeight via edgeMask
  -> pass worldSurface to near and horizon streamers

terrain streamers
  -> worldSurface.intersectsBounds(chunkBounds)
  -> reject nonintersecting chunks

grass field
  -> build 7x7 camera-centered required set
  -> no worldSurface query
  -> absolute-world instance matrices
  -> mesh.position remains origin
  -> cull from camera distance to mesh.position

balloon simulation
  -> update unrestricted horizontal position
  -> bounded height used only for vertical clearance and altitude

GameHost
  -> publishes static worldSurface descriptor
  -> no current membership or consumer parity result
```

## Source-backed conclusions

```txt
bounded terrain is not yet a bounded product world
terrain and grass can admit different spatial sets
unsupported grass can be generated at edgeFloor outside rendered terrain
all grass chunks share one origin-based manual culling distance
balloon can leave the supported visual world without a typed response
source revision and consumer acknowledgements are absent
```

These conclusions follow from checked-in control flow. They were not measured in a browser during this pass.

## Existing proof surface

`npm run check` executes `tests/smoke.mjs`. Current checks assert source text for:

```txt
bounded-disk configuration
pinned disk-world ProtoKit import
boundedTerrainHeight and edgeMask calls
near/horizon intersectsBounds calls
grass domain and shader UV varying
stable cloud jitter and lower detail
```

They do not execute:

```txt
surface point/bounds classification
camera or balloon boundary traversal
terrain/grass membership parity
grass chunk world-bounds culling
out-of-bounds response and recovery
route/town surface validation
stale surface-revision rejection
visible-frame surface acknowledgement
Pages boundary traversal
```

## Required pure fixtures

```txt
fixture:surface-point-classification
fixture:surface-bounds-classification
fixture:surface-edge-mask-continuity
fixture:surface-policy-versioning
fixture:surface-revision-stale-result
fixture:route-content-surface-validation
```

## Required browser fixtures

```txt
fixture:terrain-grass-membership-parity
fixture:no-unsupported-visible-grass
fixture:grass-origin-independent-culling
fixture:balloon-boundary-response
fixture:boundary-reentry
fixture:surface-visible-frame-parity
fixture:pages-boundary-traversal
```

## Required observations

```txt
runtimeSessionId
surfaceId
surfaceRevision
surfaceFingerprint
queryId
consumerId
subjectId
membershipClassification
signedDistanceToBoundary
edgeMask
terrainCommittedChunkIds
grassCommittedChunkIds
grassVisibleChunkIds
unsupportedGrassChunkIds
boundaryResponseResult
consumerParityResult
renderFrameId
visibleFrameId
```

## Commands not run

```txt
npm install
npm run check
npm run headless:check
npm run build
browser smoke
Pages smoke
```

The connector environment provided repository source and write access, not a checked-out browser runtime. No command execution is claimed.

## Change-state validation

```txt
runtime JavaScript changed: no
package scripts changed: no
dependencies changed: no
route behavior changed: no
gameplay behavior changed: no
render behavior changed: no
deployment workflow changed: no
branch created: no
pull request created: no
.agent documentation changed: yes
```

## Completion boundary

Do not claim bounded-world correctness until pure membership fixtures, browser boundary traversal, terrain/grass consumer parity, deterministic balloon response and a visible-frame acknowledgement all reference the same committed surface revision.