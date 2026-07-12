# Validation: TheOpenAbove

**Last aligned:** `2026-07-12T15-31-24-04-00`

## Scope

Documentation-only audit of boot-time vegetation placement, camera-relative world traversal, tree coverage ownership, lifecycle, observability and deployment proof at runtime revision `c2b96fa4d0dc44f6f3cf52762834324e712ed7d9`.

## Plan ledger

**Goal:** distinguish deterministic initial tree construction from proof that vegetation continuously and transactionally covers the admitted streamed world.

- [x] Compare all ten accessible Publish repositories and central ledger state.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove`.
- [x] Inspect world configuration, balloon movement, visual composition, vegetation generation, streamed flora, snapshots and package scripts.
- [x] Confirm vegetation is boot-only and absent from the frame update.
- [x] Confirm horizontal flight has no world-radius admission.
- [x] Confirm no vegetation disposal or coverage result exists.
- [x] Reconcile all 68 active source-backed kits and services.
- [x] Define missing authority and fixture gates.
- [x] Change no runtime source, dependency, script or workflow.
- [x] Create no branch or pull request.

## Existing source-backed proof

```txt
vegetation seed derivation is deterministic for one construction
quality profiles define tree-count budgets
terrain height and moisture participate in candidate placement
trunk and crown transforms are written deterministically from the generator sequence
treePositions are produced for exclusion consumers
terrain, grass and flowers have camera-relative update paths
world surface exposes a 10000-unit-radius disk
normal build runs the existing source checks before Vite
```

## Source-backed gap evidence

```txt
vegetation constructs 18 fixed clusters only at boot
cluster extents derive from terrainSize rather than a camera coverage plan
visual update never invokes vegetation
vegetation return value has no update, state, snapshot or dispose service
visual disposal does not retire vegetation
balloon horizontal position is not bounded by the world radius
GameHost snapshot contains terrain/grass/flowers but no vegetation coverage
npm run check has no vegetation-spatial fixture
```

## Missing pure fixtures

```txt
fixture:vegetation-authority-present
fixture:vegetation-input-fingerprint
fixture:vegetation-chunk-id-determinism
fixture:vegetation-query-order-independence
fixture:vegetation-world-revision-present
fixture:vegetation-world-membership
fixture:vegetation-route-town-lake-exclusion
fixture:vegetation-adjacent-cell-continuity
fixture:vegetation-biome-treeless-classification
fixture:vegetation-grass-exclusion-generation-parity
```

## Missing failure and performance fixtures

```txt
inject world height/moisture/flora sample failure
inject candidate allocation failure
inject instance-buffer construction failure
prove predecessor coverage remains active
prove failed candidate resources retire
prove stale world/camera results are rejected
measure planning and construction wall time
measure created/reused/retired instance counts
exercise low, medium and high quality budgets
```

## Missing browser fixtures

```txt
capture initial vegetation coverage result
cross positive and negative vegetation chunk boundaries
cross diagonal boundaries
travel beyond current boot-cluster extent
approach the admitted world edge
open/close map during traversal
verify trees, terrain, grass and flowers cite compatible generations
verify intentionally treeless cells have explicit biome outcomes
capture VegetationVisibleFrameAck for each adopted revision
```

## Missing built-output and Pages checks

```txt
source and dist vegetation fingerprints match
built imports resolve under project base path
source and dist produce the same chunk fingerprints
deployed long traversal meets coverage and transition budgets
Pages screenshots pair with vegetation frame acknowledgements
source, dist and Pages use the same world/vegetation config fingerprint
```

## Commands not run in this pass

```txt
npm install
npm run check
npm run headless:check
npm run build
browser vegetation traversal matrix
Pages vegetation traversal smoke
```

The connector provided source inspection and repository writes, not a checked-out browser runtime. Existing tests were inspected but not executed.

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
```

## Completion boundary

Do not claim vegetation spatial authority until executable proof shows deterministic camera-relative chunk requirements, explicit world/exclusion admission, detached candidate construction, atomic adoption or last-good preservation, exactly-once disposal, grass/flower exclusion parity and first-visible-frame provenance across source, built output and Pages.