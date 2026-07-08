# Architecture Audit — Domain Service Breakdown

**Timestamp:** `2026-07-08T03:21:22-04:00`

## Current composition

```txt
TheOpenAbove
├─ static-page-host
│  ├─ index.html
│  ├─ canvas#game
│  ├─ aside#hud
│  └─ pre#error
├─ runtime-host
│  └─ src/main.js
│     ├─ imports Three.js CDN
│     ├─ imports NexusEngine CDN
│     ├─ imports CAMPAIGN / WORLD
│     ├─ creates renderer/camera/scene
│     ├─ builds world objects
│     ├─ integrates balloon state
│     ├─ updates camera and HUD
│     └─ exposes GameHost
├─ nexus-telemetry-domain
│  └─ open-above-balloon-telemetry-kit
├─ balloon-object-domain
│  ├─ hot-air-balloon-object-kit
│  ├─ balloon-envelope-panel-kit
│  ├─ balloon-mouth-kit
│  ├─ balloon-streamer-fit-kit
│  ├─ balloon-fabric-seam-kit
│  ├─ hot-air-balloon-basket-kit
│  ├─ hot-air-balloon-rigging-kit
│  ├─ hot-air-balloon-burner-kit
│  └─ rope-kit
├─ world-render-domain
│  ├─ terrain sampler
│  ├─ lake discs
│  ├─ tree scatter
│  ├─ cloud scatter
│  └─ wind ribbon lines
└─ gameplay-authority-domain
   ├─ current: inline in src/main.js
   └─ target: config + reducers + fixtures
```

## Target composition

```txt
TheOpenAbove
├─ product-source-authority
│  ├─ product-copy-authority-kit
│  ├─ balloon-drift-config-kit
│  ├─ source-fingerprint-kit
│  └─ source-snapshot-kit
├─ balloon-runtime-authority
│  ├─ input-map-kit
│  ├─ drift-physics-kit
│  ├─ wind-field-kit
│  ├─ altitude-safety-kit
│  └─ balloon-state-kit
├─ route-authority
│  ├─ altitude-band-contract-kit
│  ├─ route-object-config-kit
│  ├─ route-object-evaluator-kit
│  ├─ route-event-result-kit
│  ├─ route-event-journal-kit
│  └─ route-state-reducer-kit
├─ mission-authority
│  ├─ meadow-lift-mission-reducer-kit
│  ├─ mission-snapshot-projector-kit
│  └─ region-unlock-progression-kit
├─ render-host
│  ├─ three-render-host-kit
│  ├─ terrain-render-kit
│  ├─ cloud-render-kit
│  ├─ wind-ribbon-render-kit
│  └─ balloon-object-kit
└─ validation
   ├─ route-fixture-harness-kit
   ├─ route-replay-parity-kit
   ├─ product-doc-canonical-smoke-kit
   └─ balloon-behavior-smoke-kit
```

## Main architectural gap

`src/main.js` is currently doing too much.

It owns host boot, world construction, input, drift simulation, camera, HUD, telemetry installation, and debug exposure.

The next split should not be a visual rewrite. It should be a source-authority split:

```txt
product copy + balloon config + route descriptors + fixture proof
```

## Service map

| Domain | Current service owner | Target service owner |
|---|---|---|
| product copy | README/package/docs | product-copy-authority-kit |
| balloon drift constants | inline `src/main.js` | balloon-drift-config-kit |
| altitude state | inline `src/main.js` | altitude-band-resolver-kit |
| route objects | absent | route-object-config-kit |
| route events | absent | route-event-result-kit |
| mission state | HUD/runtime implication | meadow-lift-mission-reducer-kit |
| telemetry | Nexus runtime kit | keep, extend diagnostics |
| render objects | inline renderer loops | descriptor-backed render kits later |
| replay proof | absent | route-fixture-harness-kit |

## Safe implementation order

```txt
1. Add canonical source/config modules.
2. Add DOM-free fixture harness.
3. Add GameHost source/route diagnostics.
4. Update copy to match balloon drift.
5. Run smoke/build.
6. Only then extract render/world/camera domains.
```
