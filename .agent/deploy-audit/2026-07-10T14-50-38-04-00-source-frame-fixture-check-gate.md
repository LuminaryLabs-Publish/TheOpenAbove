# Deploy Audit: Source/Frame Fixture Check Gate

**Timestamp:** `2026-07-10T14-50-38-04-00`

## Current gate

```txt
npm run check
  -> node tests/smoke.mjs

npm run build
  -> npm run check
  -> vite build

headless project.check
  -> npm run check

headless project.build
  -> npm run build
```

This is a useful gate because build already depends on check. The missing piece is source/input/frame fixture coverage inside `npm run check`.

## Required future gate

```txt
npm run check
  -> node scripts/open-above-source-frame-fixture.mjs
  -> node tests/smoke.mjs

npm run build
  -> npm run check
  -> vite build
```

## Fixture failure conditions

```txt
missing canonical source row
unstable source fingerprint
unclassified legacy field
invalid or duplicate row ID
non-JSON-safe readback
input result vocabulary mismatch
frame without consumed input range
simulation/camera/render/HUD rows referencing different frames
telemetry publication without frame attribution
unbounded journal configuration
GameHost compatibility field removed
headless output omits fixture result
```

## Deployment guardrails

```txt
Do not change the Pages route.
Do not change Vite base behavior.
Do not pin a different NexusEngine ref during this docs pass.
Do not alter Three.js version during the proof implementation.
Do not make browser/WebGL availability a requirement for the DOM-free fixture.
Keep existing renderer smoke assertions.
Fail before Vite build when proof rows are invalid.
```

## Validation status

The fixture does not exist, so it was not run. Existing npm, headless, build, browser, and deployment checks were also not run during this documentation-only pass.

## Next safe ledge

```txt
Implement one reusable DOM-free source/input/frame fixture and make both npm check and the headless editor consume its result.
```