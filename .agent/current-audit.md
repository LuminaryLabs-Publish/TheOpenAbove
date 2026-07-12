# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-12T00-39-05-04-00`

## Status

```txt
status: balloon-profile-snapshot-fingerprint-load-generation-authority-audited
source revision reviewed: 6b2753b63263c9238952d387214bc7ff91afe83e
runtime source changed by this pass: no
branch: main
root .agent state: refreshed
central ledger sync: pending
central internal change log: pending
```

## Summary

The active Air Mail runtime has a continuous balloon shell, integrated palette metadata, a tapered basket, twin burners, persistent rigging, steering, part inertia and a reactive camera. The current audit isolates the model-input boundary. The root balloon profile and several nested defaults are mutable shared objects. The root profile is exposed on `window`, and `loadHotAirBalloonModel()` yields before construction without cloning or fingerprinting the input. The installed model therefore has no immutable source descriptor or proof tying it to the profile later reported by diagnostics.

The previous statement that pattern metadata was not handed to the shell is corrected. `buildEnvelopeAssembly()` builds pattern metadata first and passes `streamers.userData.pattern` into `buildEnvelopePanels()`.

## Plan ledger

**Goal:** make one immutable profile snapshot the sole authority for asynchronous balloon construction, model commit, observation and the first visible frame.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove` as the oldest eligible documented repository.
- [x] Review root guidance, recent audit state and source revision.
- [x] Trace root defaults, nested aliases, public globals, async load, model build, scene commit, snapshot and tests.
- [x] Reconcile the pattern-to-shell handoff against current source.
- [x] Reuse the complete 59-kit source-backed inventory and service map.
- [x] Define profile schema, canonicalization, identity, fingerprint, load-generation and frame-proof contracts.
- [x] Add timestamped tracker and system audits.
- [x] Refresh root `.agent` routing state and kit registry.
- [ ] Implement runtime changes and execute fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing repositories: 0
root-.agent-missing repositories: 0

TheOpenAbove       2026-07-11T22-58-50-04-00 selected
IntoTheMeadow      2026-07-11T23-10-51-04-00
HorrorCorridor     2026-07-11T23-18-16-04-00
PhantomCommand     2026-07-11T23-28-29-04-00
ZombieOrchard      2026-07-11T23-48-14-04-00
TheUnmappedHouse   2026-07-12T00-01-25-04-00
AetherVale         2026-07-12T00-10-23-04-00
MyCozyIsland       2026-07-12T00-20-01-04-00
PrehistoricRush    2026-07-12T00-30-49-04-00
TheCavalryOfRome   excluded
```

## Interaction loop

```txt
module evaluation
  -> create module-level default profile objects
  -> expose kit APIs and root profile through window

startup
  -> create visual domain
  -> call loadHotAirBalloonModel(undefined, { yieldToFrame: true })
  -> await one RAF
  -> build from the then-current live default profile
  -> create pattern metadata
  -> pass pattern metadata into continuous shell construction
  -> construct mouth, seams, basket, rigging and burner
  -> mark modelReady/loadedDuringLevelSetup/persistentGpuResources
  -> add balloon to scene

runtime
  -> simulate and present balloon
  -> render
  -> expose only model readiness booleans, not profile identity or fingerprint
```

## Source-backed findings

### Root and nested defaults are not one immutable descriptor

`defaultHotAirBalloonProfile` is a mutable object containing direct references to imported default subprofiles. The envelope shape profile is frozen, but the panel, streamer/pattern and root model defaults are not deeply frozen. Palette arrays remain mutable.

### Public global aliases the root default

`window.OpenAboveHotAirBalloonObjectKit.profile` points to `defaultHotAirBalloonProfile`. A public caller can mutate scale, offsets or nested subprofiles before a later build or restart.

### Async loading reads after yielding

`loadHotAirBalloonModel()` awaits a frame and then calls `buildHotAirBalloon(profile)` with the same object reference. No admission-time clone, schema check, freeze, fingerprint or load generation exists. Mutation during the yield changes the model that is built.

### Pattern metadata handoff is present

The current root assembly calls `buildFittedStreamers(profile.streamers)` and passes `streamers.userData.pattern` to `buildEnvelopePanels(profile.panels, ...)`. The prior gap entry was stale and has been removed.

### Model state lacks profile provenance

The model and `GameHost` expose readiness booleans but no profile ID, schema version, canonical revision, fingerprint, load command ID, load generation, build receipt or first-visible-frame acknowledgement.

### Existing tests are static

The smoke suite checks source patterns and profile math. It does not test alias isolation, mutation during the async yield, stale load rejection, fingerprint stability, custom-profile parity or rendered-frame provenance.

## Consequences

```txt
public or internal mutation can alter later model builds
initial setup can consume a profile different from the one intended at call time
same nominal default can produce different geometry across attempts
restart/reload cannot prove which profile revision won
stale async load results have no rejection boundary
GameHost cannot identify the profile rendered
static checks can pass while mutation races remain
```

## Domains in use

```txt
browser shell, DOM, Vite and Pages
runtime admission, session, failure and frame ownership
keyboard, blur, wheel and variable RAF time
balloon simulation, airstream, steering, clearance and snapshots
balloon profile composition, model assembly, async loading and resources
envelope shape sampling, unified shell, palette/accent pattern, seams and mouth
basket, burner, rigging, rope, materials and part inertia
camera follow, zoom, clipping, basket view and steering look
mail route, town, volume and progress
bounded terrain, grass, atmosphere, water and HDR
telemetry, HUD, GameHost and headless readback
checks, pure tests, build and Pages deployment
```

## Kit inventory

```txt
runtime/gameplay source-backed kits: 15
balloon/object/presentation source-backed kits: 15
visual environment source-backed kits: 26
tooling/proof source-backed kits: 3
active source-backed total: 59
runtime-implied adapters: 12
inactive legacy kits: 11
```

The exact kit list and per-kit services are recorded in the timestamped tracker and `.agent/kit-registry.json`.

## Services offered

```txt
runtime boot, fatal projection and host publication
keyboard burner/vent/steering input and wheel camera input
wind-driven balloon simulation, clearance, transforms and snapshots
airstream route/field/force/visual/debug composition
mail parcel/route/town/volume/progress/reset services
profile sampling and procedural shell/pattern/mouth/seam construction
basket, burner, rigging and persistent rope construction/animation
model build, one-frame-yield loading and compatibility installation
envelope/gondola materials and inertia
camera follow, steering look, zoom, clipping and basket-view blend
terrain, grass, sky, cloud, water, HDR and dynamic-resolution rendering
Nexus telemetry, HUD, GameHost and headless readback
source checks, pure fixtures, Vite build and Pages deployment
```

## Required parent domain

```txt
open-above-balloon-profile-admission-authority-domain
  -> open-above-balloon-profile-schema-kit
  -> open-above-balloon-profile-canonicalization-kit
  -> open-above-balloon-profile-deep-clone-kit
  -> open-above-balloon-profile-validation-kit
  -> open-above-balloon-profile-deep-freeze-kit
  -> open-above-balloon-profile-id-kit
  -> open-above-balloon-profile-version-kit
  -> open-above-balloon-profile-revision-kit
  -> open-above-balloon-profile-fingerprint-kit
  -> open-above-balloon-load-command-kit
  -> open-above-balloon-load-generation-kit
  -> open-above-balloon-build-plan-kit
  -> open-above-stale-profile-load-rejection-kit
  -> open-above-balloon-model-profile-commit-kit
  -> open-above-balloon-model-profile-receipt-kit
  -> open-above-balloon-profile-observation-kit
  -> open-above-balloon-profile-frame-ack-kit
  -> open-above-profile-alias-isolation-fixture-kit
  -> open-above-profile-mutation-race-fixture-kit
  -> open-above-profile-fingerprint-frame-fixture-kit
```

## Required transaction

```txt
BalloonLoadCommand
  -> capture session, mission epoch and requested profile source
  -> deep-clone and canonicalize the complete nested profile
  -> validate schema, numeric bounds, arrays and attachment inputs
  -> assign profile ID/version/revision and deterministic fingerprint
  -> deep-freeze the admitted snapshot
  -> allocate load command ID and load generation
  -> yield/build only from the admitted snapshot
  -> collect model parts and resource inventory
  -> reject cancelled or stale generations
  -> atomically install model plus profile receipt
  -> render and acknowledge the first frame carrying that receipt
```

## Required invariants

```txt
post-admission mutation cannot affect a build
public diagnostics never expose mutable canonical defaults
one load generation can commit at most once
stale or cancelled generations mutate no scene state
model receipt fingerprint equals admitted profile fingerprint
GameHost and visible frame identify the same model/profile revision
pattern metadata used by the shell is included in the fingerprint
```

## Ordered safe ledges

```txt
1. immutable runtime admission
2. import purity and frame ownership
2a. balloon profile snapshot/admission/fingerprint authority
2b. balloon model assembly/loading/resource authority
3. runtime session lifecycle and ordered disposal
4. fixed-step clock and sequenced input
4a. product source and acceptance parity
5. Air Mail route and delivery authority
5a. mission restart transaction and epoch
5b. committed observation frame authority
6. terrain source and LOD transition authority
6a. bounded terrain build and atomic replacement
7. grass spatial identity and backend truth
7a. world surface membership and consumer parity
8. balloon steering and presentation authority
```

Documentation only. No runtime source, package, rendering or deployment behavior changed.