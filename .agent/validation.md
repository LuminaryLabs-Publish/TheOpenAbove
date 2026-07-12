# Validation: TheOpenAbove

**Last aligned:** `2026-07-12T13-29-56-04-00`

## Scope

Documentation-only reconciliation of terrain ownership, near/horizon classification, live chunk replacement, aggregate adoption, rollback, retirement and visible-frame provenance at repository revision `c2b96fa4d0dc44f6f3cf52762834324e712ed7d9`.

## Plan ledger

**Goal:** distinguish resolved geometric overlap defects from proof that one complete terrain aggregate is transactionally built, committed and rendered.

- [x] Compare all ten accessible Publish repositories and central ledger state.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove`.
- [x] Inspect the 23-commit range after the prior world audit.
- [x] Inspect terrain contract, near/horizon streamers, surface composition, overlays, water, tests and package scripts.
- [x] Confirm one shared frame and disjoint near/horizon classification.
- [x] Confirm live replacement remains sequential and non-atomic.
- [x] Reconcile 68 active source-backed kits and services.
- [x] Define missing authority and fixtures.
- [x] Change no runtime source, dependency, script or workflow.
- [x] Create no branch or pull request.

## Existing source-backed proof

```txt
createTerrainStreamingFrame returns a frozen shared frame
stable negative and positive grid anchoring is tested
near requirements and bounds are deterministic for tested cameras
horizon cells covered by near terrain are excluded
intersections are explicitly partitioned at near boundaries
retained horizon requirements can change clip signature after movement
horizon streamer reclassifies by LOD, segments and clip signature
near and horizon boundary skirts are constructed
route-protection width and single final blend are tested
draped field/road and shared lake source contracts are tested
npm run check includes terrain-streaming, route-protection and overlay tests
npm run build runs npm run check before Vite
```

## Runtime corrections reconciled

```txt
shared terrain streaming frame added
near/horizon overlap classification removed
horizon expansion and vertical offset removed
retained horizon reclassification added
route preservation narrowed
fields and road draped to terrain
lake descriptors centralized and edges feathered
landmark and water disposal added
```

## Remaining source-backed gaps

```txt
frame revision is not a typed frame identity
frame omits world/config/quality/geometry/material fingerprints
candidate geometry is built in live scene groups
predecessor meshes are removed before complete candidate success
near and horizon updates return no typed receipts
no aggregate parity admission exists
no atomic adoption or rollback exists
no exactly-once retirement receipt exists
near mesh metadata omits frame revision
no commit/result journal exists
no first-visible-frame acknowledgement exists
```

## Missing static and pure fixtures

```txt
fixture:terrain-authority-present
fixture:terrain-frame-input-fingerprint
fixture:terrain-world-revision-present
fixture:terrain-near-horizon-disjoint-ownership
fixture:terrain-candidate-complete-before-adoption
fixture:terrain-aggregate-parity
fixture:terrain-retirement-exactly-once
```

## Missing failure and performance fixtures

```txt
inject terrainHeight failure during candidate build
inject terrainColor failure during candidate build
inject geometry allocation failure
prove predecessor aggregate remains active
prove candidate resources are retired after rollback
measure boundary transition wall time
measure created/reused/retired mesh and vertex counts
exercise low, medium and high quality budgets
```

## Missing browser fixtures

```txt
capture initial TerrainStreamCommitResult
cross positive and negative 520-unit boundaries
cross 1040-unit horizon-center boundaries
cross diagonal X/Z boundaries
inspect low, medium and high altitude frames
verify no duplicate or missing terrain pixels
verify fields, road and lakes remain aligned
capture TerrainVisibleFrameAck for each committed revision
```

## Missing built-output and Pages checks

```txt
source and dist terrain fingerprints match
built imports resolve under project base path
deployed boundary transitions meet budget
Pages screenshots pair with terrain frame acknowledgements
source, dist and Pages use the same ownership/config fingerprint
```

## Commands not run in this pass

```txt
npm install
npm run check
npm run headless:check
npm run build
browser terrain boundary matrix
Pages terrain boundary smoke
```

The preceding terrain-remediation turn ledger reports passing local ownership, clipping, reclassification, route-protection, overlay and syntax checks. This connector-only documentation pass inspected those source fixtures but did not execute them.

## Change-state validation

```txt
runtime JavaScript changed by this documentation pass: no
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

Do not claim terrain-stream authority until executable proof shows detached candidate construction, aggregate admission, atomic commit or rollback, exactly-once predecessor retirement and first-visible-frame provenance across browser and Pages boundary transitions.