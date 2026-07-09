# Deploy Audit — Check Script Source Fixture Splice

**Timestamp:** `2026-07-09T00-40-20-04-00`

## Current scripts

```txt
npm run start -> vite --host 0.0.0.0
npm run dev   -> vite --host 0.0.0.0
npm run check -> node tests/smoke.mjs
npm run build -> npm run check && vite build
```

## Current smoke coverage

`tests/smoke.mjs` verifies:

```txt
required source files exist
index.html names The Open Above: Balloon Drift
index.html imports src/main.js
bird-dive-domain-kit is absent
src/main.js includes open-above-balloon-telemetry-kit
src/main.js includes first-person basket camera markers
src/main.js includes rope fade / ride bob / ride sway / burner vibration markers
basket/burner/object/rope/rigging/panel kits contain expected markers
vite config uses /TheOpenAbove/ base
```

## Missing fixture coverage

```txt
scripts/open-above-source-fixture.mjs does not exist yet.
Source modules do not exist yet.
The smoke test does not check source/readback ledger rows.
package.json check does not invoke a source fixture yet.
No build-time proof exists for GameHost source diagnostics.
```

## Next deploy-safe check chain

```txt
node scripts/open-above-source-fixture.mjs
node tests/smoke.mjs
vite build
```

## Package script target

```json
{
  "scripts": {
    "check": "node scripts/open-above-source-fixture.mjs && node tests/smoke.mjs",
    "build": "npm run check && vite build"
  }
}
```

## Deploy guardrails

```txt
Do not alter GitHub Pages workflow before source fixture exists.
Do not remove current smoke assertions.
Do not weaken The Open Above: Balloon Drift route markers.
Do not introduce browser-only globals into the source fixture.
```
