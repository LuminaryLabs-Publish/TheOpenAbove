export const BALLOON_TELEMETRY_KIT_ID = "open-above-balloon-telemetry-kit";

export function createBalloonTelemetryEngine(NexusEngine, getSnapshot, { worldFeatures = [], weather = {} } = {}) {
  const BalloonSnapshot = NexusEngine.defineResource("openAbove.balloonSnapshot");
  const BalloonTicked = NexusEngine.defineEvent("openAbove.balloonTicked");
  const VisualSnapshot = NexusEngine.defineResource("openAbove.visualSnapshot");

  const telemetryKit = NexusEngine.defineRuntimeKit({
    id: BALLOON_TELEMETRY_KIT_ID,
    requires: ["n:world:features", "n:weather", "n:weather:layered"],
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

  const startupKits = NexusEngine.createCoreStartupDomain({
    metadata: {
      product: "the-open-above",
      purpose: "Coordinates deterministic world preparation before player input enters the sightseeing scene."
    }
  });

  const engine = NexusEngine.createRealtimeGame({
    kits: [
      ...startupKits,
      NexusEngine.createCoreWorldDomain({ childDomains: false }),
      NexusEngine.createWorldFoundationDomain(),
      NexusEngine.createWorldFeatureDomain(),
      NexusEngine.createLandformFeatureDomain(),
      NexusEngine.createAtmosphereFeatureDomain(),
      NexusEngine.createWeatherDomain({
        conditions: weather.conditions,
        tendencies: weather.tendencies,
        regions: weather.regions
      }),
      NexusEngine.createLayeredWeatherDomain(),
      telemetryKit
    ],
    provides: ["n:runtime.engine"]
  });

  const worldFeaturesApi = engine.n?.worldFeatures;
  if (!worldFeaturesApi || typeof worldFeaturesApi.registerFeature !== "function") {
    throw new TypeError("World Features API is unavailable before Open Above feature registration.");
  }
  for (const feature of worldFeatures) worldFeaturesApi.registerFeature(feature);

  const weatherApi = engine.n?.weather;
  const layeredWeatherApi = engine.n?.layeredWeather;
  if (!weatherApi || typeof weatherApi.advance !== "function") {
    throw new TypeError("Weather API is unavailable before Open Above weather configuration.");
  }
  if (!layeredWeatherApi || typeof layeredWeatherApi.replaceLayers !== "function") {
    throw new TypeError("Layered Weather API is unavailable before Open Above layer configuration.");
  }
  layeredWeatherApi.replaceLayers(weather.layers ?? []);
  layeredWeatherApi.advance(0, weatherApi.getWeatherSnapshot());
  return engine;
}

if (typeof window !== "undefined") {
  window.OpenAboveBalloonTelemetryKit = { id: BALLOON_TELEMETRY_KIT_ID, createBalloonTelemetryEngine };
}
