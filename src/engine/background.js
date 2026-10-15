export const BACKGROUND_PRESETS = [
  { label: "White", color: "#f7f5ef" },
  { label: "Black", color: "#050607" },
  { label: "Red", color: "#ef4444" },
  { label: "Orange", color: "#f97316" },
  { label: "Yellow", color: "#facc15" },
  { label: "Green", color: "#22c55e" },
  { label: "Cyan", color: "#06b6d4" },
  { label: "Blue", color: "#0066ff" },
  { label: "Purple", color: "#8b5cf6" },
  { label: "Pink", color: "#ec4899" },
];

export function hexToRgb(hex) {
  return [1, 3, 5].map((offset) => Number.parseInt(hex.slice(offset, offset + 2), 16));
}

export function rgbToHex(red, green, blue) {
  return `#${[red, green, blue].map((value) => Math.round(value).toString(16).padStart(2, "0")).join("")}`;
}

export function hsvToHex(hue, saturation, value) {
  const channel = (offset) => {
    const k = (offset + hue / 60) % 6;
    return 255 * value * (1 - saturation * Math.max(0, Math.min(k, 4 - k, 1)));
  };
  return rgbToHex(channel(5), channel(3), channel(1));
}

export function hexToHsv(hex) {
  const [red, green, blue] = hexToRgb(hex).map((value) => value / 255);
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;
  let hue = 0;
  if (delta) {
    if (max === red) hue = ((green - blue) / delta) % 6;
    else if (max === green) hue = (blue - red) / delta + 2;
    else hue = (red - green) / delta + 4;
    hue = (hue * 60 + 360) % 360;
  }
  return { hue, saturation: max ? delta / max : 0, value: max };
}

export function normalizeBackground(state) {
  const backgroundColor = state.backgroundColor ?? (state.proof === "black" ? "#050607" : "#f7f5ef");
  const backgroundOpacity = Number(state.backgroundOpacity ?? 100);
  if (typeof backgroundColor !== "string" || !/^#[0-9a-f]{6}$/i.test(backgroundColor)) {
    throw new Error("Background colour must be a six-digit hex value, such as #0066ff.");
  }
  if (!Number.isFinite(backgroundOpacity) || backgroundOpacity < 0 || backgroundOpacity > 100) {
    throw new Error("Background opacity must be between 0 and 100.");
  }
  return { backgroundColor: backgroundColor.toLowerCase(), backgroundOpacity };
}

export function getBackgroundProof(color) {
  const [red, green, blue] = hexToRgb(color);
  return red * 0.299 + green * 0.587 + blue * 0.114 > 150 ? "white" : "black";
}

export function getBackgroundLabel(state) {
  const { backgroundColor, backgroundOpacity } = normalizeBackground(state);
  return `${backgroundColor.toUpperCase()} / ${backgroundOpacity}%`;
}

export function getBackgroundFilenameSegment(state) {
  const { backgroundColor, backgroundOpacity } = normalizeBackground(state);
  if (backgroundOpacity === 100 && backgroundColor === "#f7f5ef") return "white";
  if (backgroundOpacity === 100 && backgroundColor === "#050607") return "black";
  return `bg-${backgroundColor.slice(1)}-opacity-${backgroundOpacity}`;
}
