# Validation: TheOpenAbove

**Last aligned:** `2026-07-12T19-31-06-04-00`

## Scope

Documentation-only audit of vegetation-derived grass and flower exclusions at runtime revision `c2b96fa4d0dc44f6f3cf52762834324e712ed7d9`.

## Plan ledger

**Goal:** distinguish local obstacle checks from executable proof that vegetation, grass and flowers share one current exclusion generation.

- [x] Compare all ten accessible Publish repositories and central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove` by the oldest eligible central timestamp.
- [x] Inspect visual construction order and vegetation output.
- [x] Confirm grass builds a private tree cell map and captures cluster records.
- [x] Confirm flowers build a separate private tree cell map.
- [x] Confirm grass and flower exclusion radii differ.
- [x] Confirm chunk metadata has no vegetation or exclusion revision.
- [x] Confirm no invalidation, paired adoption, rollback or visible acknowledgement exists.
- [x] Preserve all 68 active source-backed kits and offered services.
- [x] Add tracker, turn ledger and complete audit family.
- [x] Change no runtime source, dependency, script or workflow.
- [x] Create no branch or pull request.

## Selection verification

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
recorded root-.agent-missing eligible repositories: 0

TheOpenAbove       2026-07-12T17-41-25-04-00 selected
IntoTheMeadow      2026-07-12T17-58-43-04-00
PhantomCommand     2026-07-12T18-11-53-04-00
PrehistoricRush    2026-07-12T18-18-59-04-00
HorrorCorridor     2026-07-12T18-38-51-04-00
ZombieOrchard      2026-07-12T18-48-07-04-00
MyCozyIsland       2026-07-12T19-00-22-04-00
TheUnmappedHouse   2026-07-12T19-11-01-04-00
AetherVale         2026-07-12T19-21-29-04-00
TheCavalryOfRome   excluded
```

## Source-backed checks

```txt
visual creation order world -> terrain -> vegetation -> grass -> flowers: confirmed
vegetation returns clusters and treePositions: confirmed
vegetation generation/revision/fingerprint: absent
vegetation dispose service: absent
grass private 36-unit tree cell map: confirmed
grass cluster-proximity capture: confirmed
grass obstacle clearance: tree.radius
flower private 36-unit tree cell map: confirmed
flower obstacle clearance: tree.radius + 1.2
shared FloraExclusionArtifact: absent
flora chunk exclusion revision: absent
vegetation replacement invalidation: absent
paired grass/flower candidate result: absent
atomic paired adoption/rollback: absent
FloraExclusionVisibleFrameAck: absent
```

## Source inspected

```txt
src/visual/visual-domain.js
src/visual/landscape/vegetation-cluster-kit.js
src/visual/grass-field/grass-field-domain.js
src/visual/grass-field/grass-chunk-placement-kit.js
src/visual/grass-field/grass-exclusion-mask-kit.js
src/visual/flower-field/flower-field-domain.js
src/visual/flower-field/flower-chunk-placement-kit.js
package.json
.agent root routing and machine registry
central Publish ledger entries
```

## Missing pure fixtures

```txt
flora-exclusion-artifact-determinism
grass-flower-shared-artifact-revision
new-tree-no-overlap
removed-tree-clearing-repopulation
configured-clearance-policy-parity
stale-exclusion-result-zero-mutation
paired-candidate-failure-last-good-retention
paired-adoption-no-mixed-generation
predecessor-retirement-exactly-once
```

## Missing browser and deployment fixtures

```txt
camera traversal across vegetation replacement
quality change with retained flora chunks
world reset with flora windows loaded
partial grass or flower generation failure
visible vegetation/flora revision correlation
source/build/Pages fingerprint parity
```

## Commands not run

```txt
npm install
npm run check
npm run headless:check
npm run build
browser flora-exclusion matrix
Pages flora-exclusion smoke
```

The connector provided source inspection and repository writes, not a checked-out runtime.

## Change-state validation

```txt
runtime JavaScript changed: no
HTML changed: no
package scripts changed: no
dependencies changed: no
gameplay changed: no
render behavior changed: no
deployment workflow changed: no
branch created: no
pull request created: no
.agent documentation changed: yes
central ledger/change log: pending until repo-local update is committed
```

## Completion boundary

No vegetation-streaming, shared-exclusion, no-overlap, paired-adoption, rollback, stale-result rejection, visible-frame correlation or production-readiness claim is made.