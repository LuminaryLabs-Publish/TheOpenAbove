export const BALLOON_TELEMETRY_KIT_ID = "open-above-balloon-telemetry-kit";

export function createBalloonTelemetryEngine(NexusEngine, getSnapshot, { worldFeatures = [] } = {}) {
  const BalloonSnapshot = NexusEngine.defineResource("openAbove.balloonSnapshot");
  const BalloonTicked = NexusEngine.defineEvent("openAbove.balloonTicked");
  const VisualSnapshot = NexusEngine.defineResource("openAbove.visualSnapshot");

  const telemetryKit = NexusEngine.defineRuntimeKit({
    id: BALLOON_TELEMETRY_KIT_ID,
    provides: ["open-above:balloon-telemetry", "open-above:wind-drift-state", "open-above:visual-state"],
    resources: { BalloonSnapshot, VisualSnapshot },
    events: { BalloonTicked },
    systems: [
      {
        phase: "simulate",
        name: "openAboveBalloonTelemetrySystem",
        system(world) {
          const snapshot = getSnapshot();
          world.setResource(BalloonSnapshot, snapshot);
          world.setResource(VisualSnapshot, snapshot.visual ?? null);
          world.emit(BalloonTicked, {
            frame: world.__nexusClock?.frame ?? 0,
            altitude: snapshot.altitude,
            windSpeed: snapshot.windSpeed,
            burner: snapshot.burner,
            exposure: snapshot.visual?.exposure ?? 1
          });
        }
      }
    ],
    install({ engine, world }) {
      engine.openAbove = {
        getState() {
          return world.getResource(BalloonSnapshot);
        },
        getVisualState() {
          return world.getResource(VisualSnapshot);
        }
      };
    },
    metadata: {
      kind: "domain-service-kit",
      domain: "open-above-balloon-drift",
      purpose: "Publishes balloon simulation and cinematic visual-domain state through Nexus Engine Realtime Core."
    }
  });

  const engine = NexusEngine.createRealtimeGame({
    kits: [NexusEngine.createCoreWorldDomain(), telemetryKit],
    provides: ["n:runtime.engine"]
  });
  for (const feature of worldFeatures) engine.n.worldFeatures.registerFeature(feature);
  return engine;
}

window.OpenAboveBalloonTelemetryKit = { id: BALLOON_TELEMETRY_KIT_ID, createBalloonTelemetryEngine };
