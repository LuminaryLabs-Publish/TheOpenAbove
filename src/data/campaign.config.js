export const CAMPAIGN = Object.freeze({
  id: "the-open-above",
  title: "The Open Above",
  firstRegion: "meadow-lift",
  regions: [
    {
      id: "meadow-lift",
      title: "Meadow Lift",
      description: "Learn to carve through the ancient canopy and ride warm air back to the sky perch.",
      unlocks: ["cloud-basin"],
      objectives: {
        thermalTarget: 3,
        gateTarget: 5,
        returnRadius: 34,
        timeLimitSeconds: 300
      }
    },
    {
      id: "cloud-basin",
      title: "Cloud Basin",
      description: "A locked second region planned for the next milestone.",
      locked: true
    }
  ]
});

const ATMOSPHERE_FEATURES = Object.freeze([
  Object.freeze({
    id: "meadow-ground-fog",
    type: "fog-bank",
    priority: 10,
    definition: Object.freeze({
      center: Object.freeze({ x: 0, z: 0 }),
      radius: 10000,
      altitude: Object.freeze({ minimum: 0, maximum: 150 }),
      attenuation: 0.16,
      humidity: 0.82,
      intensity: 0.16
    })
  }),
  Object.freeze({
    id: "meadow-low-clouds",
    type: "cloud-layer",
    priority: 20,
    definition: Object.freeze({ center: Object.freeze({ x: 0, z: 0 }), radius: 10000, base: 180, top: 520, coverage: 0.14, density: 0.24 })
  }),
  Object.freeze({
    id: "meadow-mid-clouds",
    type: "cloud-layer",
    priority: 30,
    definition: Object.freeze({ center: Object.freeze({ x: 0, z: 0 }), radius: 10000, base: 650, top: 1350, coverage: 0.18, density: 0.32 })
  }),
  Object.freeze({
    id: "meadow-high-clouds",
    type: "cloud-layer",
    priority: 40,
    definition: Object.freeze({ center: Object.freeze({ x: 0, z: 0 }), radius: 10000, base: 1700, top: 2500, coverage: 0.1, density: 0.16 })
  }),
  Object.freeze({
    id: "meadow-cirrus",
    type: "cloud-layer",
    priority: 50,
    definition: Object.freeze({ center: Object.freeze({ x: 0, z: 0 }), radius: 10000, base: 2900, top: 3900, coverage: 0.08, density: 0.07 })
  })
]);

const WEATHER_LAYERS = Object.freeze([
  Object.freeze({
    id: "ground-fog",
    kind: "ground-fog",
    base: 8,
    top: 150,
    priority: 10,
    coverage: 0.07,
    density: 0.1,
    minimumCoverage: 0.025,
    minimumDensity: 0.02,
    weatherCoupling: 0.04,
    windCoupling: 0.002,
    wind: Object.freeze({ x: 0.004, y: 0, z: 0.0015 }),
    evolution: Object.freeze({ frequency: 0.006, phase: 0.4, coverageAmplitude: 0.012, densityAmplitude: 0.012 }),
    profile: Object.freeze({ shape: "fog", noiseScale: 0.0022, detailScale: 0.009, edge: 0.24, stepWeight: 0.14 })
  }),
  Object.freeze({
    id: "low-clouds",
    kind: "low-cloud",
    base: 180,
    top: 520,
    priority: 20,
    coverage: 0.14,
    density: 0.24,
    minimumCoverage: 0.03,
    minimumDensity: 0.025,
    weatherCoupling: 0.08,
    windCoupling: 0.002,
    wind: Object.freeze({ x: 0.007, y: 0, z: 0.0025 }),
    evolution: Object.freeze({ frequency: 0.004, phase: 1.1, coverageAmplitude: 0.018, densityAmplitude: 0.015 }),
    profile: Object.freeze({ shape: "cumulus", noiseScale: 0.0017, detailScale: 0.006, edge: 0.18, stepWeight: 0.22 })
  }),
  Object.freeze({
    id: "mid-clouds",
    kind: "mid-cloud",
    base: 650,
    top: 1350,
    priority: 30,
    coverage: 0.18,
    density: 0.32,
    minimumCoverage: 0.03,
    minimumDensity: 0.03,
    weatherCoupling: 0.1,
    windCoupling: 0.002,
    wind: Object.freeze({ x: 0.0105, y: 0, z: 0.0038 }),
    evolution: Object.freeze({ frequency: 0.003, phase: 2.3, coverageAmplitude: 0.022, densityAmplitude: 0.02 }),
    profile: Object.freeze({ shape: "cumulus", noiseScale: 0.00145, detailScale: 0.0054, edge: 0.16, stepWeight: 0.3 })
  }),
  Object.freeze({
    id: "high-clouds",
    kind: "high-cloud",
    base: 1700,
    top: 2500,
    priority: 40,
    coverage: 0.1,
    density: 0.16,
    minimumCoverage: 0.02,
    minimumDensity: 0.015,
    weatherCoupling: 0.05,
    windCoupling: 0.001,
    wind: Object.freeze({ x: 0.014, y: 0, z: 0.005 }),
    evolution: Object.freeze({ frequency: 0.002, phase: 3.2, coverageAmplitude: 0.012, densityAmplitude: 0.01 }),
    profile: Object.freeze({ shape: "high", noiseScale: 0.001, detailScale: 0.004, edge: 0.14, stepWeight: 0.18 })
  }),
  Object.freeze({
    id: "cirrus",
    kind: "cirrus",
    base: 2900,
    top: 3900,
    priority: 50,
    coverage: 0.08,
    density: 0.07,
    minimumCoverage: 0.015,
    minimumDensity: 0.008,
    weatherCoupling: 0.03,
    windCoupling: 0.001,
    wind: Object.freeze({ x: 0.018, y: 0, z: 0.006 }),
    evolution: Object.freeze({ frequency: 0.0015, phase: 4.7, coverageAmplitude: 0.008, densityAmplitude: 0.006 }),
    profile: Object.freeze({ shape: "cirrus", noiseScale: 0.00065, detailScale: 0.003, edge: 0.1, stepWeight: 0.16 })
  })
]);

export const WORLD = Object.freeze({
  seed: "open-above-meadow-lift",
  surface: Object.freeze({
    id: "open-above-world",
    kind: "bounded-disk",
    center: Object.freeze({ x: 0, z: 0 }),
    radius: 10000,
    edgeBlendWidth: 600,
    edgeFloor: -120
  }),
  features: Object.freeze({
    landforms: Object.freeze([
      Object.freeze({
        id: "northern-wall",
        type: "mountain",
        seed: "open-above-northern-wall",
        priority: 10,
        definition: Object.freeze({
          path: Object.freeze([
            Object.freeze({ x: -5200, z: 4900 }),
            Object.freeze({ x: 0, z: 5500 }),
            Object.freeze({ x: 5000, z: 4700 })
          ]),
          width: 2000,
          height: 500,
          sharpness: 2.8,
          variation: 0,
          cliffThreshold: 0.68,
          materialZones: Object.freeze([
            Object.freeze({ id: "mountain-rock", minimumHeight: 180 }),
            Object.freeze({ id: "mountain-summit", minimumHeight: 390 })
          ])
        }),
        fidelity: Object.freeze({
          near: "feature-mesh",
          middle: "foundation-field",
          far: "silhouette",
          collision: "foundation"
        })
      })
    ]),
    atmosphere: ATMOSPHERE_FEATURES
  }),
  weather: Object.freeze({
    conditions: Object.freeze({
      temperature: 18,
      humidity: 0.62,
      pressure: 101325,
      cloudiness: 0.47,
      visibility: 10000,
      wind: Object.freeze({ x: 2.2, y: 0.1, z: 0.8 }),
      precipitation: Object.freeze({ type: "none", rate: 0 })
    }),
    tendencies: Object.freeze({ cloudinessPerSecond: 0 }),
    layers: WEATHER_LAYERS
  }),
  terrainSize: 2400,
  terrainSegments: 128,
  treeCount: 360,
  gateCount: 5,
  thermalCount: 3,
  perch: { x: 0, y: 145, z: 190 },
  start: { x: 0, y: 210, z: 320, yaw: Math.PI, pitch: -0.04, speed: 72 },
  sky: {
    zenith: 0x61bfff,
    horizon: 0xf2fbff,
    sun: 0xfff0ba
  }
});

export const FLIGHT = Object.freeze({
  minSpeed: 34,
  cruiseSpeed: 72,
  maxSpeed: 154,
  drag: 0.62,
  gravity: 18,
  lift: 0.34,
  pitchRate: 1.55,
  rollRate: 2.2,
  yawFromRoll: 1.3,
  autoLevel: 1.8,
  boostImpulse: 34,
  boostCooldown: 1.05,
  thermalLift: 42,
  terrainClearance: 8
});
