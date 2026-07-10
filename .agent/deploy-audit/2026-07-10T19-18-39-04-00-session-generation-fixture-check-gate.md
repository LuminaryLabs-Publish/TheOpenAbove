# Deploy Audit: Session Generation Fixture Check Gate

**Timestamp:** `2026-07-10T19-18-39-04-00`

## Existing gate

```txt
npm run check
  -> node tests/smoke.mjs
npm run build
  -> npm run check
  -> vite build
```

The smoke test verifies required files and source-text contracts for visual, terrain, grass, water, postprocess, and headless command surfaces. It does not instantiate a lifecycle host.

## Missing fixture

Add a DOM-light fixture with injected frame, event, and resource hosts. It must run without WebGL and prove:

```txt
one active session per canvas
monotonic sessionId and generation
one recursive frame chain
stale callback rejection
listener count returns to zero
stop freezes state
idempotent dispose
reverse-order partial-start rollback
terminal resource classification
terminal GameHost snapshot
restart isolation
bounded JSON-safe journals
```

## Required package integration

```txt
"lifecycle:fixture": "node scripts/open-above-session-generation-fixture.mjs"
"check": "npm run lifecycle:fixture && node tests/smoke.mjs"
```

Headless `project.check` should return the same fixture summary and fail non-zero on any invariant violation.

## Validation order

```txt
node scripts/open-above-session-generation-fixture.mjs
npm run check
npm run headless:check
npm run build
browser smoke
GameHost stop/dispose/restart readback
Pages deployment verification
```

No runtime or workflow changes were made in this documentation pass.
