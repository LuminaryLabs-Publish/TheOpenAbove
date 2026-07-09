# Deploy Audit — Check / Build Fixture Wire Map

**Timestamp:** `2026-07-08T22-19-38-04-00`

## Current scripts

```txt
npm start -> vite --host 0.0.0.0
npm dev -> vite --host 0.0.0.0
npm run check -> node tests/smoke.mjs
npm run build -> npm run check && vite build
```

## Current smoke coverage

`tests/smoke.mjs` checks that core route files exist, `index.html` references Balloon Drift and `src/main.js`, main runtime contains balloon telemetry / first-person / basket markers, and hot-air-balloon kit files expose expected object markers.

## Missing fixture coverage

```txt
source fixture command
product/config/runtime parity rows
GameHost source readback row
existing local snapshot preservation row
existing nexus snapshot preservation row
README/package/campaign copy parity rows
source manifest consumer list row
altitude band / route object / wind lane rows
```

## Required script target

```txt
node scripts/open-above-source-fixture.mjs
```

## Required check chain

```txt
npm run check
  -> node scripts/open-above-source-fixture.mjs
  -> node tests/smoke.mjs
```

## Required build chain

```txt
npm run build
  -> npm run check
  -> vite build
```

## Deployment rule

Do not claim deploy or browser validation from documentation-only passes.

Only claim runtime confidence after local `npm run check`, local `npm run build`, and a browser route check have run and passed.
