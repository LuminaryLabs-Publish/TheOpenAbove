# Runtime Admission Build and Pages Gate

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Timestamp:** `2026-07-10T19-58-34-04-00`

## Existing validation path

```txt
npm run check
  -> node tests/smoke.mjs
  -> required-file and source-text assertions

npm run build
  -> npm run check
  -> vite build

npm run headless:check
  -> Nexus headless environment
  -> project.check
  -> npm run check
```

## Current gap

The checks do not resolve or import the production CDN graph. They do not reject a mutable NexusEngine reference, identify the resolved NexusEngine commit, validate consumed exports, simulate module failure, or compare a browser boot result with a deterministic fixture result.

A Vite build can therefore succeed while the deployed route later resolves incompatible or unavailable remote code.

## Required scripts

```txt
npm run fixture:runtime-admission
npm run check
npm run headless:check
npm run build
```

`check` should execute the runtime-admission fixture before existing smoke assertions.

## Required fixture rows

```txt
manifest schema valid
Three.js exact version accepted
NexusEngine immutable commit accepted
NexusEngine @main rejected under production policy
missing required export rejected
optional export degradation classified
remote resolution failure classified
manifest/source fingerprint deterministic
rejected admission constructs no runtime session
accepted admission returns the expected proof shape
headless project.check returns the same summary shape
```

## Required Pages smoke

```txt
load deployed route
capture boot/source proof
verify accepted immutable coordinates
verify capability status
verify one active session
verify first frame and HUD state
verify error shell on an injected admission failure build
```

## Gate order

```txt
runtime-admission fixture
  -> local smoke
  -> headless check
  -> production build
  -> browser boot smoke
  -> Pages deployment smoke
  -> lifecycle stop/dispose/restart proof
```

## Current status

```txt
runtime source changed: no
package scripts changed: no
workflow changed: no
npm run check: not run
npm run headless:check: not run
npm run build: not run
Pages smoke: not run
runtime-admission fixture: unavailable
```

## Next safe ledge

```txt
TheOpenAbove Immutable Runtime Admission + Boot Capability Fixture Gate
```