# Deploy Audit — Render Phase Fixture Check Gate

Timestamp: `2026-07-10T16-20-09-04-00`

## Current command chain

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

## Current gate strength

The existing smoke is valuable for file presence and source-text contracts. It confirms deterministic grass placement markers, grass LOD constants, culling paths, streamed terrain, water fog, neutral post-process settings, and headless command names.

It cannot execute the browser frame loop or prove telemetry/render/HUD/GameHost phase parity.

## Required new gate

```txt
node scripts/open-above-render-phase-fixture.mjs
  -> create DOM-free dynamic-resolution controller
  -> drive deterministic frame-cost samples
  -> create frame and consumer rows
  -> assert post-sample committed scale
  -> assert telemetry/HUD/GameHost frame parity
  -> assert bounded journals
  -> assert active/legacy grass kit truth
```

Then:

```txt
npm run check
  -> render-phase fixture
  -> existing tests/smoke.mjs
```

## Required headless additions

```txt
runtime.fixture
runtime.getProofState
renderer.getQualityDecisionState
```

`project.check` should return the same fixture summary used by direct npm validation.

## Deployment guardrails

```txt
no route changes
no base-path changes
no dependency changes unless required by the fixture
no branch or PR creation
build only after fixture and smoke pass
preserve GitHub Pages output behavior
```

## Current validation

Documentation only. No command or deployment workflow was changed and no tests were run.

## Next safe ledge

`TheOpenAbove Render Phase Authority Ledger + Adaptive Resolution Fixture Gate`