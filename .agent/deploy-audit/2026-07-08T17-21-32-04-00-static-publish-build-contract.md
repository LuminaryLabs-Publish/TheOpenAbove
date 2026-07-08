# Deploy Audit — Static Publish Build Contract

**Timestamp:** `2026-07-08T17-21-32-04-00`

## Current package surface

```txt
npm start -> vite --host 0.0.0.0
npm run dev -> vite --host 0.0.0.0
npm run check -> node tests/smoke.mjs
npm run build -> npm run check && vite build
```

## Current route surface

```txt
index.html
  -> src/main.js
  -> external Three.js CDN
  -> external NexusEngine main CDN
  -> local source modules
```

## Deploy risk

The current deploy/build path depends on smoke coverage. The source-authority implementation must expand `tests/smoke.mjs` or add a source fixture script without breaking the existing Vite build path.

## Build contract for next implementation

```txt
keep npm run check existing behavior
add source fixture as a deterministic Node script
wire source fixture into npm run check only after it has zero DOM/WebGL dependency
keep npm run build as npm run check && vite build
keep index.html route stable
avoid adding runtime dependencies unless required
```

## Required source fixture command

```txt
node scripts/open-above-source-fixture.mjs
```

## Recommended script shape

```json
{
  "scripts": {
    "check": "node tests/smoke.mjs && node scripts/open-above-source-fixture.mjs",
    "build": "npm run check && vite build"
  }
}
```

## Deployment acceptance rows

```txt
npm_check_runs_source_fixture
npm_build_runs_source_fixture_before_vite_build
source_fixture_has_no_dom_requirement
source_fixture_has_no_webgl_requirement
existing_index_route_preserved
external_cdn_imports_unchanged
```

## Main finding

The next source fixture should be build-gated only after it is deterministic and DOM-free. The deploy path should not be changed to a heavier build system during this pass.
