# Deploy Audit: Source Fixture Headless Check Gate

Timestamp: 2026-07-10T07-41-42-04-00
Repo: LuminaryLabs-Publish/TheOpenAbove

## Current package commands

```txt
npm run check
npm run build
npm start
npm run dev
npm run headless:status
npm run headless:inspect
npm run headless:renderer
npm run headless:check
npm run headless:build
```

## Current check path

```txt
npm run check
  -> node tests/smoke.mjs
```

## Current headless path

```txt
headless project.inspect
headless renderer.validate
headless project.check
headless project.build
headless runtime.getState
```

These validate renderer/build contracts and static route safety, but not source rows.

## Missing fixture

```txt
scripts/open-above-source-fixture.mjs
```

## Required fixture gate

```txt
npm run check
  -> node scripts/open-above-source-fixture.mjs
  -> node tests/smoke.mjs

npm run headless:check
  -> project.check includes source fixture output
```

## Required fixture assertions

- Canonical Balloon Drift source loads without DOM.
- README free-flight copy is classified explicitly.
- Campaign FLIGHT fields are classified as legacy-compatible.
- Source fingerprint is stable.
- Source snapshot is serializable.
- Source acceptance rows exist.
- Source consumer rows identify runtime, visual, smoke, headless, and GameHost consumers.
- `GameHost` future `.source` shape is stable.
- Missing rows fail non-zero.

## Next safe ledge

```txt
TheOpenAbove Source Readback Ledger Catch-up + Headless Fixture Gate
```
