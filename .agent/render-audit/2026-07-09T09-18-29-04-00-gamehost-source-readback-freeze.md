# Render Audit — GameHost Source Readback Freeze

**Timestamp:** `2026-07-09T09-18-29-04-00`

## Summary

The current renderer is good enough for the next cut. The blocker is that render/source readback is incomplete: the browser can expose local and Nexus telemetry, but cannot yet expose a fixture-readable source ledger proving the displayed Balloon Drift route is canonical.

## Current render surface

```txt
canvas#game
  -> Three.js WebGLRenderer
  -> ACES tone mapping
  -> directional sun + hemisphere light
  -> terrain mesh with vertex colors
  -> lake discs
  -> procedural tree groups
  -> flattened cloud groups
  -> wind ribbon lines
  -> procedural hot-air-balloon group
  -> third-person/basket camera blend
  -> HUD telemetry string
```

## Current GameHost readback

```txt
window.GameHost.getState()
  -> nexusEngine: engine.openAbove.getState()
  -> local: snapshot()
```

## Missing render/source readback

```txt
window.GameHost.getState().source does not exist.
No readback row confirms package/campaign/runtime route parity.
No readback row confirms hot-air-balloon object kit metadata.
No readback row confirms basket camera controls are the expected route controls.
No readback row confirms legacy FLIGHT config is compatibility-only.
No readback row confirms smoke/build/central ledger consumers are using the same tracker.
```

## Required additive projection

```txt
source: {
  routeId: "the-open-above-balloon-drift",
  routeStatus: "current",
  objectType: "hot-air-balloon",
  productCopyStatus: "accepted" | "mismatch",
  packageStatus: "accepted" | "mismatch",
  campaignStatus: "accepted" | "legacy-compatibility",
  runtimeStatus: "accepted",
  objectKitStatus: "accepted",
  fingerprint: string,
  acceptanceRows: SourceAcceptanceResult[],
  consumerLedger: SourceConsumerLedger
}
```

## Render rule

Do not change terrain detail, cloud rendering, wind ribbon styling, camera values, HUD style, or the hot-air-balloon visual object until additive source readback exists and the source fixture proves it without DOM/WebGL.
