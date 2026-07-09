export const ELEMENT_OPTIONS = [
  { value: "line", label: "Line" },
  { value: "space", label: "Space" },
  { value: "shape", label: "Shape" },
  { value: "form", label: "Form" },
  { value: "colour", label: "Colour" },
  { value: "texture", label: "Texture" },
  { value: "value", label: "Value" },
  { value: "typography", label: "Typography" },
];

export const PRINCIPLE_OPTIONS = [
  { value: "unityHarmony", label: "Unity/Harmony" },
  { value: "variety", label: "Variety" },
  { value: "balance", label: "Balance" },
  { value: "gradations", label: "Gradations" },
  { value: "emphasis", label: "Emphasis" },
  { value: "rhythm", label: "Rhythm" },
  { value: "movement", label: "Movement" },
  { value: "pattern", label: "Pattern" },
  { value: "proportion", label: "Proportion" },
];

export const PROOF_OPTIONS = [
  { value: "white", label: "White" },
  { value: "black", label: "Black" },
];

export const PROCESS_OPTIONS = [
  { value: "clean", label: "Clean", filenameSlug: "clean" },
  { value: "halftone", label: "Halftone", filenameSlug: "halftone" },
  { value: "diffusionDither", label: "Diffusion Dither", filenameSlug: "diffusion-dither" },
  { value: "coarseBitmap", label: "Coarse Bitmap", filenameSlug: "coarse-bitmap" },
  { value: "phototypeSlice", label: "Phototype Slice", filenameSlug: "phototype-slice" },
  { value: "scanlineScreen", label: "Scanline Screen", filenameSlug: "scanline-screen" },
  { value: "tornMask", label: "Torn Mask", filenameSlug: "torn-mask" },
  { value: "chromaticOffset", label: "Chromatic Offset", filenameSlug: "chromatic-offset" },
  { value: "stepQuantize", label: "Step Quantize", filenameSlug: "step-quantize" },
];

export const TYPE_LAYOUT_OPTIONS = [
  { value: "left", label: "Left" },
  { value: "centre", label: "Centre" },
];

export const EXPORT_FORMAT_OPTIONS = [
  { value: "wide", label: "16:9 Screen", filenameSlug: "16x9", width: 3840, height: 2160, hotkey: "1" },
  { value: "square", label: "1:1 Square", filenameSlug: "1x1", width: 2160, height: 2160, hotkey: "2" },
  { value: "portrait", label: "9:16 Portrait", filenameSlug: "9x16", width: 2160, height: 3840, hotkey: "3" },
  { value: "a0Portrait", label: "A0 Portrait", filenameSlug: "a0-portrait", width: 4967, height: 7022 },
  { value: "a0Landscape", label: "A0 Landscape", filenameSlug: "a0-landscape", width: 7022, height: 4967 },
  { value: "bannerPortrait", label: "6ft Banner Portrait", filenameSlug: "6ft-banner-portrait", width: 5400, height: 10800 },
  { value: "bannerLandscape", label: "6ft Banner Landscape", filenameSlug: "6ft-banner-landscape", width: 10800, height: 5400 },
  { value: "custom", label: "Custom", filenameSlug: "custom", width: 3840, height: 2160 },
];

export const EXPORT_SCALE_OPTIONS = [
  { value: 1, label: "1x" },
  { value: 2, label: "2x" },
  { value: 3, label: "3x" },
  { value: 5, label: "5x" },
];

export const EXPORT_DPI_OPTIONS = [
  { value: 72, label: "72" },
  { value: 150, label: "150" },
  { value: 300, label: "300" },
  { value: "custom", label: "Custom" },
];

export const DEFAULT_MACHINE_STATE = {
  element: "line",
  principle: "balance",
  chaos: 30,
  proof: "white",
  process: "clean",
  processIntensity: 50,
  processScale: 50,
  typeProof: false,
  typeLayout: "left",
  seed: 20270709,
  activated: false,
  format: "wide",
  scale: 1,
  dpi: 150,
  dpiMode: "preset",
  customDpi: 150,
  customWidth: 3840,
  customHeight: 2160,
  baseWidth: 3840,
  baseHeight: 2160,
  exportWidth: 3840,
  exportHeight: 2160,
  width: 3840,
  height: 2160,
  viewMode: "main",
};

export const PRODUCT_NAME = "Graham Newman RCA PhD graphic design gestalt engine";
export const PRODUCT_CONTEXT = "RCA Research Biennale 2027";