import { hexToHsv, hexToRgb, hsvToHex } from "./background.js";

export const COLOUR_PRESET_OPTIONS = [
  {
    value: "mono",
    label: "Mono",
    filenameSlug: "mono",
    inks: [],
    accent: null,
  },
  {
    value: "californiaNewWave",
    label: "California New Wave",
    filenameSlug: "california-new-wave",
    inks: ["#111111", "#ff2d8a", "#ffd400", "#ff6a13", "#e8202a", "#1aa3e8", "#f3efe6"],
    accent: "#ff2d8a",
    sequence: [1, 2, 3, 5, 1, 4, 0],
    alphaScale: 2.2,
    finish: { type: "gradient", angle: 35, colours: ["#ff2d8a", "#e8202a", "#ff6a13", "#ffd400", "#1aa3e8"], alpha: 0.72 },
  },
  {
    value: "graphicPunk",
    label: "Graphic Punk",
    filenameSlug: "graphic-punk",
    inks: ["#111111", "#3d3d3d", "#7a7a7a", "#b8b6b0", "#f2f0ea", "#ff4a1c", "#f2c230"],
    accent: "#ff4a1c",
    sequence: [0, 0, 1, 0, 2, 0, 1, 3],
    alphaScale: 2,
    finish: { type: "band", colours: ["#111111", "#ff4a1c", "#f2c230"], alpha: 0.78 },
  },
  {
    value: "corporateFunk",
    label: "Corporate Funk",
    filenameSlug: "corporate-funk",
    inks: ["#111111", "#e4202a", "#ffc20e", "#0a9b48", "#1f5fbf", "#f47a20", "#f5f2ea"],
    accent: "#e4202a",
    sequence: [1, 2, 3, 4, 5, 0],
    alphaScale: 3,
    finish: { type: "bars", colours: ["#e4202a", "#f47a20", "#ffc20e", "#0a9b48", "#1f5fbf", "#111111"], alpha: 0.6 },
  },
  {
    value: "acidHouse",
    label: "Acid House",
    filenameSlug: "acid-house",
    inks: ["#141414", "#f5e400", "#4b2a7b", "#36d14a", "#d8cbb0", "#a7a9ac"],
    accent: "#f5e400",
    sequence: [1, 0, 1, 0, 3, 2],
    alphaScale: 2.6,
    finish: { type: "stripes", angle: -45, colours: ["#f5e400", "#141414"], alpha: 0.62 },
  },
  {
    value: "nakameguro",
    label: "Nakameguro",
    filenameSlug: "nakameguro",
    inks: ["#111111", "#f4a6bd", "#e8442e", "#1e2d5a", "#e0a526", "#1f8a84", "#6b3f8a", "#f6f1e8"],
    accent: "#e8442e",
    sequence: [1, 3, 1, 2, 6, 1, 5, 4],
    alphaScale: 1.5,
    finish: { type: "gradient", angle: 90, colours: ["#1e2d5a", "#6b3f8a", "#f4a6bd", "#f4a6bd", "#e8442e"], alpha: 0.6 },
  },
  {
    value: "totalTotal",
    label: "Total Total",
    filenameSlug: "total-total",
    inks: ["#111111", "#e3262f", "#a6b52a", "#f08a1c", "#1c4fa8", "#c2368a", "#efe8d6"],
    accent: "#e3262f",
    sequence: [1, 4, 2, 3, 5, 0],
    alphaScale: 2.6,
    finish: { type: "grid", colours: ["#e3262f", "#1c4fa8", "#a6b52a", "#f08a1c", "#c2368a", "#111111"], alpha: 0.7 },
  },
];

export const COLOUR_PRESETS = Object.fromEntries(COLOUR_PRESET_OPTIONS.map((option) => [option.value, option]));

export const DEFAULT_COLOUR_STATE = {
  colourPreset: "mono",
  colourHue: 0,
  colourSaturation: 100,
  colourBrightness: 0,
};

function clampInt(value, min, max, fallback) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.min(max, Math.max(min, Math.round(numeric)));
}

export function normalizeColourState(state = {}) {
  return {
    colourPreset: COLOUR_PRESETS[state.colourPreset] ? state.colourPreset : DEFAULT_COLOUR_STATE.colourPreset,
    colourHue: clampInt(state.colourHue, -180, 180, DEFAULT_COLOUR_STATE.colourHue),
    colourSaturation: clampInt(state.colourSaturation, 0, 200, DEFAULT_COLOUR_STATE.colourSaturation),
    colourBrightness: clampInt(state.colourBrightness, -100, 100, DEFAULT_COLOUR_STATE.colourBrightness),
  };
}

export function isDefaultColourState(state) {
  const colour = normalizeColourState(state);
  return Object.entries(DEFAULT_COLOUR_STATE).every(([key, value]) => colour[key] === value);
}

export function adjustColour(hex, { colourHue, colourSaturation, colourBrightness }) {
  const { hue: h, saturation: s, value: v } = hexToHsv(hex);
  const hue = (((h + colourHue) % 360) + 360) % 360;
  const saturation = Math.min(1, Math.max(0, s * (colourSaturation / 100)));
  const value = colourBrightness >= 0 ? v + (1 - v) * (colourBrightness / 100) : v * (1 + colourBrightness / 100);
  return hsvToHex(hue, saturation, Math.min(1, Math.max(0, value)));
}

function luminance(hex) {
  const [r, g, b] = hexToRgb(hex);
  return (r * 0.299 + g * 0.587 + b * 0.114) / 255;
}

// Builds the ink palette for a preset, dropping inks that would vanish into the background.
export function buildColourPalette(state, basePalette) {
  const colour = normalizeColourState(state);
  const preset = COLOUR_PRESETS[colour.colourPreset];
  if (preset.inks.length === 0) {
    const inks = [...basePalette.lines, basePalette.accent].map((ink) => adjustColour(ink, colour));
    return { background: basePalette.background, lines: inks.slice(0, basePalette.lines.length), accent: inks.at(-1), chroma: null, alphaScale: 1, finish: null };
  }

  const groundLuminance = luminance(state.backgroundColor ?? basePalette.background);
  const contrast = (hex) => Math.abs(luminance(hex) - groundLuminance);
  const inks = preset.inks.map((ink) => adjustColour(ink, colour));
  const byContrast = [...inks].sort((a, b) => contrast(b) - contrast(a));
  // Near-ground inks (e.g. black on a black background) flip to the most contrasting ink.
  const readable = (hex) => (contrast(hex) >= 0.16 ? hex : byContrast[0]);
  const lines = preset.sequence.map((index) => readable(inks[index]));
  const accent = readable(adjustColour(preset.accent, colour));
  const chroma = [...new Set(lines)].sort((a, b) => hexToHsv(b).saturation - hexToHsv(a).saturation);

  return {
    background: basePalette.background,
    lines,
    accent,
    chroma: chroma.slice(0, 3),
    alphaScale: preset.alphaScale,
    finish: {
      ...preset.finish,
      colours: preset.finish.colours.map((hex) => {
        const adjusted = adjustColour(hex, colour);
        return contrast(adjusted) >= 0.08 ? adjusted : byContrast[0];
      }),
    },
  };
}
