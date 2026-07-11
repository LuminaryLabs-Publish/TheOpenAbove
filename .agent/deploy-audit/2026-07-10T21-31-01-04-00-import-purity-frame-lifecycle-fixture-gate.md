# Deploy Audit: Import Purity and Frame Lifecycle Fixture Gate

**Timestamp:** `2026-07-10T21-31-01-04-00`

## Existing coverage

`tests/smoke.mjs` verifies required files and source-text patterns for terrain, grass, water, postprocessing and headless commands. It does not execute module evaluation in an instrumented browser-like environment and does not count animation frames or listeners.

## Required command

```txt
npm run fixture:runtime-lifecycle
```

## Required fixture cases

```txt
import hot-air-balloon-object-kit
  -> RAF scheduled: 0
  -> listeners installed: 0

unsupported legacy host
  -> installer result: unsupported
  -> RAF scheduled: 0
  -> scene mutation: 0

accepted active route
  -> primary RAF owners: 1
  -> compatibility RAF owners: 0

stop
  -> pending owned RAF handles: 0
  -> keyboard/blur/wheel listeners: 0
  -> terminal lifecycle row: 1

restart
  -> generation increments once
  -> active RAF owners: 1
  -> stale callbacks admitted: 0
```

## Validation order

```txt
1. fixture:runtime-admission
2. fixture:runtime-lifecycle
3. npm run check
4. npm run headless:check
5. npm run build
6. browser smoke
7. Pages smoke
```

No runtime, workflow or package-script change was made in this audit.