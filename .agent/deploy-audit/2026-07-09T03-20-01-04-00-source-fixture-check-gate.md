# Deploy Audit — Source Fixture Check Gate

**Timestamp:** `2026-07-09T03-20-01-04-00`

## Current package scripts

```txt
npm run start -> vite --host 0.0.0.0
npm run dev   -> vite --host 0.0.0.0
npm run check -> node tests/smoke.mjs
npm run build -> npm run check && vite build
```

## Current smoke coverage

`tests/smoke.mjs` checks the browser route files, Balloon Drift title, hot-air-balloon object kits, basket detail markers, burner animation markers, rope geometry markers, and Vite base path.

It does not check source authority modules because those modules do not exist yet.

## Required next deploy gate

```txt
scripts/open-above-source-fixture.mjs
  -> import pure source modules
  -> assert source manifest consumers
  -> assert source fingerprint rows
  -> assert source snapshot route/product/object-kit values
  -> assert source acceptance rows
  -> exit non-zero on rejected required rows

tests/smoke.mjs
  -> preserve existing route/object-kit checks
  -> call or assert source fixture integration

package.json
  -> keep npm run check as the single prebuild gate
  -> keep npm run build = npm run check && vite build
```

## Deploy finding

The current deploy path is adequate for a static Vite Pages route, but source authority needs to be wired into `npm run check` before `README`, `package.json`, campaign config, and GameHost source projection are edited together.

## Not performed

```txt
npm install
npm run check
npm run build
Pages smoke
workflow edit
runtime source edit
```
