export const BIRD_FLIGHT_INPUT_KIT_ID = "open-above-bird-flight-input-kit";

const clamp = (value, min = -1, max = 1) => Math.max(min, Math.min(max, Number(value) || 0));
const lerp = (a, b, t) => a + (b - a) * Math.max(0, Math.min(1, t));

const state = {
  pitchInput: 0,
  rollInput: 0,
  invertPitch: false,
  sensitivity: 1.35,
  source: "idle",
  activePointers: 0
};

const keys = new Set();
let pointerActive = false;
let pointerStartX = 0;
let pointerStartY = 0;
let releaseTimer = null;

function publish() {
  window.OpenAboveBirdFlightInput = {
    id: BIRD_FLIGHT_INPUT_KIT_ID,
    ...state,
    getState: readInputState
  };
}

function setInput(nextPitch, nextRoll, source) {
  const pitchSign = state.invertPitch ? -1 : 1;
  state.pitchInput = clamp(nextPitch * pitchSign * state.sensitivity);
  state.rollInput = clamp(nextRoll * state.sensitivity);
  state.source = source;
  publish();
}

function updateKeyboardInput() {
  const roll = (keys.has("KeyD") || keys.has("ArrowRight") ? 1 : 0) - (keys.has("KeyA") || keys.has("ArrowLeft") ? 1 : 0);
  const pitch = (keys.has("KeyW") || keys.has("ArrowUp") ? 1 : 0) - (keys.has("KeyS") || keys.has("ArrowDown") ? 1 : 0);
  setInput(pitch, roll, "keyboard");
}

function beginPointer(clientX, clientY) {
  pointerActive = true;
  pointerStartX = clientX;
  pointerStartY = clientY;
  state.activePointers = 1;
  if (releaseTimer) clearInterval(releaseTimer);
  publish();
}

function movePointer(clientX, clientY, dragLimit = 120) {
  if (!pointerActive) return;
  const dx = clientX - pointerStartX;
  const dy = clientY - pointerStartY;
  const roll = clamp(dx / dragLimit);
  const pitch = clamp(-dy / dragLimit);
  setInput(pitch, roll, "pointer");
}

function endPointer() {
  pointerActive = false;
  state.activePointers = 0;
  if (releaseTimer) clearInterval(releaseTimer);
  releaseTimer = setInterval(() => {
    state.pitchInput = lerp(state.pitchInput, 0, 0.25);
    state.rollInput = lerp(state.rollInput, 0, 0.25);
    if (Math.abs(state.pitchInput) < 0.03 && Math.abs(state.rollInput) < 0.03) {
      state.pitchInput = 0;
      state.rollInput = 0;
      state.source = "idle";
      clearInterval(releaseTimer);
      releaseTimer = null;
    }
    publish();
  }, 16);
}

export function readInputState() {
  return { ...state };
}

export function setInvertPitch(value) {
  state.invertPitch = Boolean(value);
  updateKeyboardInput();
}

export function setInputSensitivity(value) {
  state.sensitivity = Math.max(0.25, Math.min(3, Number(value) || 1));
  updateKeyboardInput();
}

window.addEventListener("keydown", (event) => {
  keys.add(event.code);
  updateKeyboardInput();
}, { capture: true });

window.addEventListener("keyup", (event) => {
  keys.delete(event.code);
  updateKeyboardInput();
}, { capture: true });

window.addEventListener("blur", () => {
  keys.clear();
  setInput(0, 0, "idle");
}, { capture: true });

window.addEventListener("mousedown", (event) => beginPointer(event.clientX, event.clientY), { capture: true });
window.addEventListener("mousemove", (event) => movePointer(event.clientX, event.clientY, 120), { capture: true });
window.addEventListener("mouseup", endPointer, { capture: true });

window.addEventListener("touchstart", (event) => {
  const touch = event.touches?.[0];
  if (touch) beginPointer(touch.clientX, touch.clientY);
}, { capture: true, passive: true });

window.addEventListener("touchmove", (event) => {
  const touch = event.touches?.[0];
  if (touch) movePointer(touch.clientX, touch.clientY, 85);
}, { capture: true, passive: true });

window.addEventListener("touchend", endPointer, { capture: true, passive: true });

window.OpenAboveBirdFlightInputKit = {
  id: BIRD_FLIGHT_INPUT_KIT_ID,
  readInputState,
  setInvertPitch,
  setInputSensitivity
};
publish();
