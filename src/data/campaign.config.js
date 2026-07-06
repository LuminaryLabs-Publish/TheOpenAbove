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

export const WORLD = Object.freeze({
  seed: "open-above-meadow-lift",
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
