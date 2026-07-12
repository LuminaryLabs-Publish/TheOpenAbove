const TAU = Math.PI * 2;
const clamp = (value, min, max) => Math.max(min, Math.min(max, Number(value) || 0));
const toHex = (value, fallback = "#6b5132") => Number.isFinite(Number(value))
  ? `#${Math.max(0, Math.min(0xffffff, Number(value))).toString(16).padStart(6, "0")}`
  : fallback;

function createWorldMapCanvas(world, center, radius) {
  if (!world?.sampleMapColor || typeof document === "undefined") return null;
  const size = 96;
  const mapCanvas = document.createElement("canvas");
  mapCanvas.width = size;
  mapCanvas.height = size;
  const mapContext = mapCanvas.getContext("2d");
  const image = mapContext.createImageData(size, size);

  for (let py = 0; py < size; py += 1) {
    for (let px = 0; px < size; px += 1) {
      const nx = ((px + 0.5) / size) * 2 - 1;
      const nz = ((py + 0.5) / size) * 2 - 1;
      const offset = (py * size + px) * 4;
      if (Math.hypot(nx, nz) > 1) {
        image.data[offset + 3] = 0;
        continue;
      }
      const color = world.sampleMapColor(center.x + nx * radius, center.z + nz * radius);
      image.data[offset] = color[0];
      image.data[offset + 1] = color[1];
      image.data[offset + 2] = color[2];
      image.data[offset + 3] = 220;
    }
  }
  mapContext.putImageData(image, 0, 0);
  return mapCanvas;
}

export function createParchmentMapOverlay({
  root,
  canvas,
  worldSurface,
  world = null,
  towns = [],
  routes = [],
  getPlayerState = () => null,
  getParcel = () => null
} = {}) {
  if (!(root instanceof HTMLElement) || !(canvas instanceof HTMLCanvasElement)) {
    throw new TypeError("Parchment map elements are required.");
  }
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Parchment map canvas is unavailable.");

  let open = false;
  let width = 1;
  let height = 1;
  let frame = 0;
  const center = worldSurface?.center ?? { x: 0, z: 0 };
  const radius = Math.max(1, Number(worldSurface?.radius) || 10000);
  const worldMapCanvas = createWorldMapCanvas(world, center, radius);

  function worldToMap(point = {}) {
    const scale = Math.min(width, height) * 0.72 / (radius * 2);
    return {
      x: width * 0.5 + ((Number(point.x) || 0) - (Number(center.x) || 0)) * scale,
      y: height * 0.5 + ((Number(point.z) || 0) - (Number(center.z) || 0)) * scale
    };
  }

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    const ratio = Math.min(devicePixelRatio || 1, 2);
    width = Math.max(1, Math.floor(bounds.width));
    height = Math.max(1, Math.floor(bounds.height));
    canvas.width = Math.max(1, Math.floor(width * ratio));
    canvas.height = Math.max(1, Math.floor(height * ratio));
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function drawWorldBackground(mapRadius) {
    if (!worldMapCanvas) return;
    context.save();
    context.beginPath();
    context.arc(width * 0.5, height * 0.5, mapRadius, 0, TAU);
    context.clip();
    context.globalAlpha = 0.72;
    context.imageSmoothingEnabled = true;
    context.drawImage(
      worldMapCanvas,
      width * 0.5 - mapRadius,
      height * 0.5 - mapRadius,
      mapRadius * 2,
      mapRadius * 2
    );
    context.restore();
  }

  function drawRoute(route) {
    if ((route?.points?.length ?? 0) < 2) return;
    context.beginPath();
    route.points.forEach((point, index) => {
      const mapped = worldToMap(point);
      if (index === 0) context.moveTo(mapped.x, mapped.y);
      else context.lineTo(mapped.x, mapped.y);
    });
    context.save();
    context.setLineDash([11, 8]);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = Math.max(3, Math.min(width, height) * 0.009);
    context.globalAlpha = 0.72;
    context.strokeStyle = toHex(route.color, "#70866a");
    context.stroke();
    context.restore();
  }

  function drawTown(town, destinationTownId) {
    const mapped = worldToMap(town.position);
    const active = town.id === destinationTownId;
    context.save();
    context.translate(mapped.x, mapped.y);
    context.beginPath();
    context.arc(0, 0, active ? 8 : 6, 0, TAU);
    context.fillStyle = active ? "#7c2f22" : toHex(town.color);
    context.fill();
    context.strokeStyle = "#3f2d1c";
    context.stroke();
    context.textAlign = "center";
    context.textBaseline = "top";
    context.fillStyle = "#4b351e";
    context.font = `600 ${clamp(Math.min(width, height) * 0.025, 12, 22)}px Georgia, serif`;
    context.fillText(town.label ?? town.id, 0, 12);
    if (active) {
      context.fillStyle = "#7c2f22";
      context.font = `700 ${clamp(Math.min(width, height) * 0.017, 10, 14)}px Georgia, serif`;
      context.fillText("MAIL DESTINATION", 0, 35);
    }
    context.restore();
  }

  function drawPlayer() {
    const player = getPlayerState();
    if (!player?.position) return;
    const mapped = worldToMap(player.position);
    context.save();
    context.translate(mapped.x, mapped.y);
    context.rotate(-(Number(player.heading) || 0));
    context.beginPath();
    context.moveTo(0, -11);
    context.lineTo(7.5, 8);
    context.lineTo(0, 4.5);
    context.lineTo(-7.5, 8);
    context.closePath();
    context.fillStyle = "#293e52";
    context.fill();
    context.strokeStyle = "#f5e5ba";
    context.lineWidth = 2;
    context.stroke();
    context.restore();
  }

  function draw() {
    context.clearRect(0, 0, width, height);
    context.fillStyle = "rgba(87,59,29,.07)";
    for (let index = 0; index < 90; index += 1) {
      context.beginPath();
      context.arc((index * 73.31) % width, (index * 41.77) % height, 0.8 + index % 3, 0, TAU);
      context.fill();
    }
    const mapRadius = Math.min(width, height) * 0.36;
    drawWorldBackground(mapRadius);
    context.beginPath();
    context.arc(width * 0.5, height * 0.5, mapRadius, 0, TAU);
    context.fillStyle = "rgba(92,139,89,.08)";
    context.fill();
    context.save();
    context.setLineDash([8, 7]);
    context.strokeStyle = "rgba(70,49,27,.62)";
    context.lineWidth = 2;
    context.stroke();
    context.restore();
    routes.forEach(drawRoute);
    const destinationTownId = getParcel()?.destinationTownId ?? null;
    towns.forEach((town) => drawTown(town, destinationTownId));
    drawPlayer();
    context.fillStyle = "#4a321c";
    context.textAlign = "center";
    context.font = `700 ${clamp(Math.min(width, height) * 0.052, 22, 42)}px Georgia, serif`;
    context.fillText("The Open Above", width * 0.5, clamp(height * 0.09, 42, 70));
    context.font = `600 ${clamp(Math.min(width, height) * 0.024, 12, 19)}px Georgia, serif`;
    context.fillText("AIR MAIL ROUTES", width * 0.5, clamp(height * 0.135, 65, 102));
  }

  function animate() {
    if (!open) return;
    draw();
    frame = requestAnimationFrame(animate);
  }

  function setOpen(nextOpen) {
    open = Boolean(nextOpen);
    root.classList.toggle("is-open", open);
    root.setAttribute("aria-hidden", String(!open));
    cancelAnimationFrame(frame);
    if (open) {
      resize();
      frame = requestAnimationFrame(animate);
    }
    return open;
  }

  function onKeyDown(event) {
    if (event.repeat) return;
    if (event.code === "KeyM") {
      event.preventDefault();
      setOpen(!open);
    } else if (event.code === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
    }
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  addEventListener("keydown", onKeyDown);
  resize();

  return Object.freeze({
    isOpen: () => open,
    setOpen,
    snapshot: () => Object.freeze({ open, mappedWorld: Boolean(worldMapCanvas) }),
    dispose() {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      removeEventListener("keydown", onKeyDown);
    }
  });
}
