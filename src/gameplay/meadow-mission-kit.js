// Deterministic mission authority. Callers verify spatial contacts before dispatching events.
export const MEADOW_MISSION_KIT_ID = "open-above-meadow-mission-kit";

const validId = value => typeof value === "string" && value.trim().length > 0;
const finite = value => typeof value === "number" && Number.isFinite(value);

export function createMeadowMission({ region, thermals, gates, perch } = {}) {
  const objectives = region?.objectives;
  if (!validId(region?.id) || !objectives ||
      !Array.isArray(thermals) || !Array.isArray(gates) ||
      thermals.length !== objectives.thermalTarget ||
      gates.length !== objectives.gateTarget ||
      !finite(objectives.timeLimitSeconds) || objectives.timeLimitSeconds <= 0 ||
      !finite(objectives.returnRadius) || objectives.returnRadius <= 0 ||
      !validId(perch?.id)) {
    throw new TypeError("Invalid Meadow Lift mission source.");
  }
  const ids = [...thermals, ...gates].map(entry => entry?.id);
  if (ids.some(id => !validId(id)) || new Set([...ids, perch.id]).size !== ids.length + 1) {
    throw new TypeError("Mission objective IDs must be unique and nonempty.");
  }
  const thermalIds = new Set(thermals.map(entry => entry.id));
  const gateIds = gates.map(entry => entry.id);
  let generation = 0;
  let phase = "ready";
  let elapsed = 0;
  let completedThermals = new Set();
  let completedGates = new Set();
  let lastResult = null;
  let unlocks = [];

  function snapshot() {
    return Object.freeze({
      regionId: region.id, generation, phase, elapsed,
      remainingSeconds: Math.max(0, objectives.timeLimitSeconds - elapsed),
      thermals: Object.freeze({ target: thermalIds.size, completedIds: [...completedThermals] }),
      gates: Object.freeze({ target: gateIds.length, completedIds: [...completedGates],
        nextGateId: gateIds[completedGates.size] ?? null }),
      returnReady: phase === "returning" || phase === "completed",
      perchId: perch.id, returnRadius: objectives.returnRadius,
      unlocks: [...unlocks], lastResult
    });
  }
  function result(accepted, reason) {
    return Object.freeze({ accepted, reason, state: snapshot() });
  }
  function maybeReturn() {
    if (completedThermals.size === thermalIds.size && completedGates.size === gateIds.length) {
      phase = "returning";
    }
  }
  function dispatch(command = {}) {
    switch (command.type) {
      case "start":
        if (phase !== "ready") return result(false, "invalid-phase");
        phase = "active"; return result(true, "started");
      case "tick":
        if (phase !== "active" && phase !== "returning") return result(false, "invalid-phase");
        if (!finite(command.dt) || command.dt < 0) return result(false, "invalid-time");
        elapsed = Math.min(objectives.timeLimitSeconds, elapsed + command.dt);
        if (elapsed >= objectives.timeLimitSeconds) {
          phase = "failed";
          lastResult = Object.freeze({ status: "failed", reason: "time-expired", generation });
        }
        return result(true, phase === "failed" ? "time-expired" : "advanced");
      case "thermal":
        if (phase !== "active") return result(false, "invalid-phase");
        if (!thermalIds.has(command.id)) return result(false, "unknown-objective");
        if (completedThermals.has(command.id)) return result(false, "duplicate");
        completedThermals.add(command.id); maybeReturn(); return result(true, "thermal-collected");
      case "gate":
        if (phase !== "active") return result(false, "invalid-phase");
        if (!gateIds.includes(command.id)) return result(false, "unknown-objective");
        if (completedGates.has(command.id)) return result(false, "duplicate");
        if (gateIds[completedGates.size] !== command.id) return result(false, "wrong-order");
        completedGates.add(command.id); maybeReturn(); return result(true, "gate-cleared");
      case "perch":
        if (command.id !== perch.id) return result(false, "unknown-objective");
        if (phase !== "returning") return result(false, "return-not-ready");
        phase = "completed";
        unlocks = [...new Set(region.unlocks ?? [])];
        lastResult = Object.freeze({ status: "completed", generation, elapsed });
        return result(true, "completed");
      case "restart":
        if (phase === "ready") return result(false, "already-ready");
        generation += 1; phase = "ready"; elapsed = 0;
        completedThermals = new Set(); completedGates = new Set();
        lastResult = null; unlocks = [];
        return result(true, "restarted");
      default:
        return result(false, "unknown-command");
    }
  }
  return Object.freeze({ id: MEADOW_MISSION_KIT_ID, dispatch, snapshot });
}
