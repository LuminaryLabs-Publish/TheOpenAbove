# Deploy Audit: Lifecycle Restart Fixture Check Gate

**Timestamp:** `2026-07-10T17-51-35-04-00`

## Current validation route

```txt
npm run check
  -> node tests/smoke.mjs

npm run build
  -> npm run check
  -> vite build

headless project.check
  -> npm run check
```

Current checks are static. They do not create, stop, dispose, or restart a runtime session.

## Required fixture

Add a DOM-light or injected-host fixture that owns synthetic equivalents for:

```txt
requestAnimationFrame
cancelAnimationFrame
addEventListener
removeEventListener
canvas ownership
renderer/resource registration
GameHost projection
```

The fixture should exercise the real lifecycle authority without requiring WebGL output.

## Required scenarios

```txt
1. create/start one session
2. verify one active frame request chain
3. verify expected listener ownership
4. stop and prove no further state mutation
5. dispose and prove all listeners/resources reach terminal results
6. dispose again and prove idempotency
7. restart and prove a new sessionId
8. prove old callbacks/listeners cannot mutate the new session
9. inject startup failure after partial construction
10. prove reverse-order rollback and fatal snapshot
11. compare fixture proof shape with browser GameHost lifecycle proof
```

## Required scripts

Recommended:

```txt
scripts/open-above-lifecycle-fixture.mjs
npm run lifecycle:fixture
```

Then change validation routing to:

```txt
npm run check
  -> node scripts/open-above-lifecycle-fixture.mjs
  -> node tests/smoke.mjs
```

Headless `project.check` should continue routing through `npm run check`, so the same lifecycle gate is authoritative for local, headless, build, and deployment validation.

## Failure conditions

Exit non-zero when:

```txt
more than one frame chain is active
listener count differs from expected ownership
old session state mutates after stop/dispose
any registered resource lacks terminal teardown status
restart reuses the old sessionId
second dispose is not idempotent
partial startup failure leaves listeners, frames, or resources active
browser and fixture proof shapes diverge
```

## Validation order

```txt
1. node scripts/open-above-lifecycle-fixture.mjs
2. npm run check
3. npm run headless:inspect
4. npm run headless:check
5. npm run build
6. browser smoke
7. browser stop/dispose/restart readback
8. Pages deployment verification
```

## Current state

The lifecycle fixture and scripts do not exist yet. No runtime command was executed during this documentation-only pass.
