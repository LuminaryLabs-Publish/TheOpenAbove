# Known Gaps: TheOpenAbove Gaussian Cloud LOD Membership Transition

**Last aligned:** `2026-07-17T02-32-08-04-00`  
**Status:** `gaussian-cloud-lod-membership-transition-authority-audited`

## Summary

The deterministic field, LOD tiers, weather visibility and nearest-first capacity policy are implemented. Cross-frame membership admission and transition proof are not.

## Intent

Keep cloud continuity claims provisional until one authority publishes stable membership, the committed buffer generation and a matching frame acknowledgement.

## What needs to happen

### Identity gaps

```txt
CloudFieldRevision: absent
CloudFieldDigest: absent
CloudRebatchGeneration: absent
CameraPoseRevision binding: absent
WeatherRevision binding: absent
predecessor membership revision: absent
```

### Capacity gaps

```txt
fixed quality capacity: present
nearest-first overflow selection: present
per-bank quota result: absent
bounded eviction per frame: absent
capacity settlement receipt: absent
```

### LOD and transition gaps

```txt
five distance tiers: present
single threshold per tier: present
enter/leave hysteresis: absent
predecessor retention: absent
entering/leaving classification: absent
crossfade: absent
teleport reset result: absent
stale rebatch rejection: absent
```

### Render gaps

```txt
direct instance-buffer replacement: present
far-to-near ordering: present
immutable buffer generation: absent
membership digest: absent
CloudProjectionResult: absent
FirstGaussianCloudFrameAck: absent
```

### Lifecycle gaps

```txt
map-open transition-clock policy: absent
page suspension/resume settlement: absent
WebGL recovery membership reset: absent
route/disposal pending-work retirement: absent
```

### Proof gaps

```txt
still-camera membership fixture: absent
LOD boundary oscillation fixture: absent
capacity-pressure transition fixture: absent
low/medium/high browser fixture: absent
context recovery fixture: absent
source/build/Pages digest parity: absent
```

## Current risk boundary

The source proves that every rebatch recomputes and replaces retained membership without predecessor state or transition metadata. It does not prove the severity of visible popping on every device, and no specific player report was reproduced.

## Retained product gaps

Camera zoom ownership, rendered-photo artifacts, validation severity, weather simulation-clock ownership, page lifecycle, WebGL recovery, audio, control coverage, fixed-step pacing, HDR/depth coherence, provider/build identity, route retirement, terrain/flora proof and persistence remain unresolved.

## Do not claim

Do not claim stable Gaussian membership, pop-free tier transitions, bounded overflow replacement, exact cloud-frame convergence, artifact parity, Pages parity or production readiness until implementation and fixtures exist.