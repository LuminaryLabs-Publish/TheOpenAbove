# Gameplay Audit — Balloon Drift Source Ledger Loop

**Timestamp:** `2026-07-09T06-20-00-04-00`

## Current interaction loop

```txt
open app
  -> load canvas / HUD / error panel
  -> createGame()
  -> generate world
  -> build balloon visual object
  -> read keyboard and wheel input
  -> burner / vent intent changes heat and vent values
  -> wind field changes drift vector
  -> buoyancy integration changes vertical velocity
  -> altitude safety clamps against ground and soft ceiling
  -> balloon pose updates
  -> NexusEngine telemetry ticks
  -> camera blends third-person and basket view
  -> HUD writes telemetry
  -> GameHost returns local and Nexus state
```

## Gameplay domains in use

```txt
balloon-drift-route
burner-vent-input
wind-field
buoyancy-integration
altitude-safety
world-drift-progress
basket-camera-mode
hud-telemetry
nexus-telemetry
```

## Gameplay gap

The live loop is coherent, but fixtures cannot yet prove that the product source points at this loop.

There is no gameplay-facing ledger that states:

```txt
current route = Balloon Drift
current vehicle = hot-air-balloon
current controls = burner / vent / zoom
legacy free-flight fields = compatibility only
source mismatch rows = expected until copy/config are fixed
```

## Needed `ActionResult` / fixture equivalents

This repo is not currently a command-result game. The next source proof should still provide deterministic rows:

```txt
SourceAcceptanceResult(product_copy_matches_route)
SourceAcceptanceResult(package_description_matches_route)
SourceAcceptanceResult(campaign_copy_matches_route)
SourceAcceptanceResult(legacy_flight_marked_compatibility_only)
SourceAcceptanceResult(runtime_defaults_reflected_in_config)
SourceAcceptanceResult(gamehost_source_projection_added)
```

## Recommended fixture loop

```txt
load source modules in Node
  -> build SourceConsumerLedger
  -> assert product route = Balloon Drift
  -> assert object type = hot-air-balloon
  -> assert legacy FLIGHT is compatibility-only
  -> assert acceptance rows include known mismatches
  -> assert GameHost projection shape can be produced without DOM
  -> exit non-zero on missing consumer record
```

## Gameplay non-goals

```txt
Do not add missions yet.
Do not add Cloud Basin yet.
Do not retune burner, vent, wind, buoyancy, or altitude.
Do not modify current keyboard controls.
```
