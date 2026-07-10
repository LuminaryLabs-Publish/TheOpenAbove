# Route Source Audit: Product and Runtime Source Correlation Contract

**Timestamp:** `2026-07-10T14-50-38-04-00`

## Current source surfaces

```txt
README.md                     product/workspace description
package.json                  Balloon Drift package description and commands
index.html                    live browser shell and import map
src/data/campaign.config.js   campaign, world, and legacy FLIGHT constants
src/main.js                   actual live Balloon Drift composition
src/runtime/*                 simulation and Nexus telemetry consumers
src/visual/*                  camera, presentation, environment, and renderer consumers
tests/smoke.mjs               static route/renderer contract consumer
tools/headless-editor-environment.mjs
                              static source and build consumer
window.GameHost               browser readback consumer
```

## Source authority issue

`src/main.js` is the practical route authority, but it imports a campaign object that still describes thermal targets, gates, return radius, perch, starting speed, and bird-style flight constants. These fields are not necessarily harmful, but their status is implicit.

A consumer cannot currently distinguish:

```txt
required current source
current but optional source
legacy-compatible source
ignored source
deferred source
missing source
```

## Required source manifest

```js
{
  productId: "the-open-above",
  routeId: "balloon-drift",
  routeVersion,
  sources: [
    { sourceId, path, role, status, reason, fingerprint }
  ],
  consumers: [
    { consumerId, sourceIds, required }
  ]
}
```

## Required compatibility classification

The source fixture should classify at least:

```txt
CAMPAIGN.id/title/regions
WORLD.seed/terrainSize/terrainSegments/treeCount/sky
WORLD.gateCount/thermalCount/perch/start
FLIGHT.*
package description
index route module
NexusEngine CDN import
Three.js version
simulation kit ID
camera rig kit ID
visual domain ID
headless environment ID
```

## Correlation requirement

The source fingerprint used for a frame must be copied into:

```txt
input result batch
simulation snapshot
camera snapshot
visual snapshot
telemetry row
render row
HUD row
GameHost source/frame readback
```

This does not mean every consumer recalculates the fingerprint. The parent proof domain should calculate it once and provide a stable immutable reference.

## Main finding

The product route is understandable, but source authority is not machine-verifiable. The next pass should establish source status and then carry its fingerprint through the runtime frame proof chain.

## Next safe ledge

```txt
TheOpenAbove Source Input Frame Correlation Ledger + GameHost Headless Fixture Gate
```