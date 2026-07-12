# Deploy Audit: Terrain Boundary Browser Fixture Gate

**Timestamp:** `2026-07-12T13-29-56-04-00`

## Summary

Pure Node fixtures now prove near/horizon classification and source contracts. Deployment readiness still requires a browser and Pages gate that correlates boundary-crossing screenshots with machine-readable terrain commit identity.

## Existing proof

```txt
terrain ownership and exact clipping fixture
negative and positive grid anchoring fixture
retained horizon clip-signature reclassification fixture
narrow route-protection fixture
draped field and road source fixture
shared lake descriptor and edge-fade source fixture
JavaScript syntax checks
npm run check includes the new tests
npm run build runs npm run check before Vite
```

## Missing gate

```txt
1. build source revision
2. serve built output under production base path
3. capture initial terrain aggregate state
4. fly across positive and negative 520-unit boundaries
5. cross 1,040-unit horizon-center boundaries
6. capture low, medium and high altitude frames
7. inspect near/horizon ownership and commit fingerprints
8. inject or simulate one candidate build failure
9. prove predecessor terrain remains visible
10. compare source, dist and deployed fingerprints
11. store screenshots with TerrainVisibleFrameAck records
```

## Required assertions

```txt
no near/horizon interior overlap
no missing terrain interior at seams
no doubled fields, roads or lakes
near and horizon cite one TerrainStreamFrameId
transition result is Committed or Reused
failed transition returns RolledBack and preserves last-good fingerprint
no stale mesh survives after successful commit
first matching visible frame is acknowledged
Pages output matches source and dist terrain identities
```

## Required environments

```txt
Chromium WebGL2
Chromium WebGL fallback where available
DPR 1 and high-DPR
low, medium and high quality profiles
source dev server
built local server
GitHub Pages URL
```

## Completion boundary

Do not claim deployed terrain-overlap remediation complete from pure classification tests alone. Completion requires visible browser evidence at ownership boundaries paired with machine-readable aggregate commit provenance.