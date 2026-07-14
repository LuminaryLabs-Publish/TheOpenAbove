# Current Audit: TheOpenAbove Route Runtime Resource Retirement

**Last aligned:** `2026-07-14T06-38-49-04-00`  
**Status:** `route-runtime-resource-retirement-authority-audited`  
**Reviewed pre-audit head:** `71a69d1bf4821bb985d4a1eb22658d1d1478ea5c`  
**Runtime revision retained:** `09bb6b95549d9480dfc2caa4517575ab4009ba98`  
**Nexus Engine provider:** `ea973811342fe3ba2a35bb018323d987d3fec4b5`

## Summary

The route creates a full engine, WebGL world, balloon, airstream, mail, simulation, map, camera and presentation stack. It then exposes the mutable stack through `window.GameHost` and starts a recursive gameplay RAF. No route/session generation owns stop, failure rollback, disposal, GPU retirement, public-reference retirement or re-entry.

Component disposal methods exist but are never coordinated by `src/main.js`. A partial asynchronous startup failure can also leave earlier resources active while only the fatal panel is updated.

## Plan ledger

**Goal:** turn route lifecycle into a typed, generation-bound transaction without restructuring the existing gameplay or visual domains.

- [x] Compare the full current Publish inventory with central tracking.
- [x] Exclude TheCavalryOfRome.
- [x] Select only TheOpenAbove by oldest eligible central timestamp.
- [x] Inspect current boot, RAF, input, map, domain and visual disposal paths.
- [x] Preserve the 100-surface kit/service census.
- [x] Define parent authority, results, receipts and fixture gate.
- [x] Change documentation only.
- [ ] Implement and execute the authority.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible non-Cavalry repositories: 10
central ledger entries: 10
root .agent states recorded: 10
new eligible repositories: 0
ledger-missing repositories: 0
root-agent-missing repositories: 0
runtime-ahead repositories: 0
selected: LuminaryLabs-Publish/TheOpenAbove
selection rule: oldest eligible central documentation timestamp
```

## Complete interaction loop

```txt
boot
  -> create routes and telemetry engine
  -> register authored landforms
  -> create visual world and renderer
  -> await balloon model
  -> create airstream and mail domains
  -> create simulation and install global input listeners
  -> create map and install key listener, observer and private RAF
  -> create camera and presentation
  -> publish window.GameHost
  -> clear aria-busy
  -> start recursive gameplay RAF

frame
  -> update simulation, mail, airstream, balloon, camera, world and telemetry
  -> render
  -> request next frame

exit/failure/re-entry
  -> no aggregate stop or rollback
  -> no gameplay RAF cancellation
  -> no participant disposal transaction
  -> no GPU retirement result
  -> no GameHost retirement
  -> no stale predecessor rejection
```

## Domains in use

```txt
browser route, ESM, DOM, canvas, accessibility, error handling and RAF
route/session generation, callback admission and public host publication
Nexus Engine runtime, telemetry and Core World composition
World Foundation, Features, Landforms and authored feature registration
balloon simulation and keyboard input
airstream field, force, visuals and diagnostics
Air Mail parcel, routes, towns, delivery and visuals
world generation, terrain, vegetation, grass, flowers, water and landmarks
sky, sun, atmosphere, clouds, HDR, grading, lens and dynamic resolution
balloon geometry, materials, rigging, burner, rope, camera and presentation
parchment map, map input, ResizeObserver and map RAF
component disposal, aggregate retirement, failure rollback and re-entry proof
source, build, browser and Pages validation
```

## Kit and service census

```txt
local source-backed kits:          71
runtime-implied adapters:          12
pinned Core World surfaces:        17
current documented active total:  100
inactive or retired legacy:        12
planned retirement surfaces:       22
```

The complete kit-by-kit service inventory is in `.agent/trackers/2026-07-14T06-38-49-04-00/project-breakdown.md` and `.agent/kit-registry.json`.

## Source-backed findings

### Existing disposers are orphaned

Simulation, airstream, mail, map and visual domains expose disposal services. The route never invokes them.

### Frame ownership is implicit

The gameplay RAF request ID is discarded, and each callback unconditionally schedules its successor. There is no route generation or stale-callback test.

### Failure rollback is absent

The asynchronous bootstrap catches errors only at the outer boundary. Resources acquired before a failed stage are not retired and no rollback receipt is emitted.

### Public authority never terminates

`window.GameHost` remains a live mutable object with engine, renderer, scene, camera and domain references. It has no status, generation or retirement result.

### Visual retirement is not proven

The visual domain owns a WebGL renderer and post-processing resources, but no aggregate result proves final frame, scene resource counts, renderer/context policy or complete successor isolation.

## Required parent domain

```txt
open-above-route-runtime-resource-retirement-authority-domain
```

## Required transaction

```txt
RouteRuntimeStartCommand
  -> allocate route/session generations
  -> register all owned resources
  -> atomically publish ActiveRouteRuntimeResult
  -> admit frames only for active generations

RouteRuntimeStopCommand
  -> reject new frames and input
  -> cancel owned callbacks
  -> dispose participants in dependency order
  -> retire GPU and public ownership
  -> publish receipts and RouteRuntimeRetirementResult
  -> acknowledge no predecessor callback can commit

RouteRuntimeFailureCommand
  -> cite failed stage
  -> roll back all resources acquired by the candidate generation
  -> publish one immutable terminal failure result
```

## Validation boundary

Documentation only. No runtime, test, package, dependency, workflow or deployment file changed. Browser stop, re-entry, failure injection, WebGL retirement, source/build parity and Pages lifecycle fixtures were not executed.