# Known Gaps: TheOpenAbove Sightseeing Photo Frame Artifact

**Last aligned:** `2026-07-16T14-59-39-04-00`  
**Status:** `sightseeing-photo-frame-artifact-authority-audited`

## Summary

The current sightseeing domain recognizes views and records metadata, but it does not capture the rendered image that the player framed. The journal therefore tracks completion without owning an actual photograph.

## Intent

Keep the semantic capture record visibly provisional until it is bound to immutable frame evidence and explicit artifact lifecycle ownership.

## What needs to happen

### Identity gaps

```txt
capture request ID: absent
accepted frame ID: absent
camera transform/projection revision: absent
world and weather generation identity: absent
renderer/render-scale revision: absent
capture policy revision: absent
```

### Render and artifact gaps

```txt
renderer canvas/target pixel capture: absent
post-update frame admission stage: absent
encoded image bytes: absent
content digest: absent
MIME/dimensions/byte-length record: absent
artifact URL/storage identity: absent
artifact retirement result: absent
```

### Score and gameplay gaps

```txt
score bound to accepted frame: absent
score evidence descriptor: partial only
artifact required for Snap Point completion: absent
stale request rejection: absent
map-open capture policy: implicit
route/session retirement policy: absent
```

### Journal gaps

```txt
actual captured image projection: absent
reference/captured image distinction: absent
photo loading/failure state: absent
journal artifact lifecycle: absent
FirstPhotoArtifactAck: absent
FirstJournalPhotoFrameAck: absent
```

### Proof gaps

```txt
recognized capture pixel fixture: absent
unrecognized capture artifact fixture: absent
resize/render-scale generation fixture: absent
map-open and disposal fixture: absent
source/build/Pages photo parity fixture: absent
```

## Current risk boundary

The current score can be correct for its geometric heuristic while still lacking evidence of what was rendered. This is an artifact and convergence gap, not proof that the current recognition formula is wrong.

## Retained product gaps

Validation severity, weather simulation-clock ownership, page lifecycle, WebGL recovery, audio, control coverage, fixed-step pacing, HDR/depth coherence, cloud composite proof, provider/build identity, route retirement, terrain/flora proof and persistence remain unresolved.

## Do not claim

Do not claim rendered-photo ownership, immutable artifact identity, score/frame convergence, journal image parity, deployed parity or production readiness until implementation and fixtures exist.