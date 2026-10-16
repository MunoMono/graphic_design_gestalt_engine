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

export const ALIGNMENT_MODE_OPTIONS = [
  { value: "grid", label: "Grid" },
  { value: "thirds", label: "Rule of Thirds" },
  { value: "golden", label: "Golden Section" },
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

export const GESTALT_CONTROL_SECTIONS = {
  elements: [
    {
      key: "line",
      title: "Line",
      modeOptions: [
        { value: "mixed", label: "Mixed" },
        { value: "actual", label: "Actual" },
        { value: "implied", label: "Implied" },
      ],
      description:
        "The edge of a shape or form or the direction followed by anything in motion. An implied line is a line that does not really exist, but appears to be present. An actual line is a line that is actually present.",
    },
    {
      key: "space",
      title: "Space",
      description:
        "Illusion of depth and space. Ways to create space include overlapping shapes or forms in front of each other, holes, and cavities.",
    },
    {
      key: "shape",
      title: "Shape",
      modeOptions: [
        { value: "mixed", label: "Mixed" },
        { value: "organic", label: "Organic" },
        { value: "geometric", label: "Geometric" },
      ],
      description:
        "Shape encloses a two-dimensional area. Shape can create most of the elements and many of the principles. Types of shapes include organic shapes with curved, continuous edges and geometric shapes with sharp edges and angles.",
    },
    {
      key: "form",
      title: "Form",
      description:
        "Form encloses a volume or three-dimensional area. Light and dark value variations can create form. Space is used to emphasise form.",
    },
    {
      key: "colour",
      title: "Colour",
      description:
        "Colour is light reflected from a surface. It can create emphasis, harmony, emotion, unity, and movement through hue, value, and intensity relationships.",
    },
    {
      key: "texture",
      title: "Texture",
      modeOptions: [
        { value: "mixed", label: "Mixed" },
        { value: "implied", label: "Implied" },
        { value: "actual", label: "Actual" },
      ],
      description:
        "Texture is a quality related closely to our sense of touch. It can create emphasis, movement, pattern, and emotion. Implied texture appears to be present but is an illusion. Actual texture really exists and can be felt.",
    },
    {
      key: "value",
      title: "Value",
      description:
        "Value describes shadows from lightness to darkness. Value variation gives a sense of space and depth to an object, emphasising its three-dimensionality. Strong contrast in value can create emphasis.",
    },
    {
      key: "typography",
      title: "Typography",
      description:
        "Typography controls how users see, read, and understand text. It includes scale, spacing, hierarchy, contrast, alignment, rhythm, and proximity.",
    },
  ],
  principles: [
    {
      key: "unityHarmony",
      title: "Unity/Harmony",
      description:
        "Unity and harmony relate to the sense of oneness, wholeness, or order in a work. Combining similar colours, shapes, lines, textures, and patterns can create harmony.",
    },
    {
      key: "variety",
      title: "Variety",
      description:
        "Variety is achieved through diversity and change. It can be created through different line types, colours, textures, shapes, scales, and contrasts.",
    },
    {
      key: "balance",
      title: "Balance",
      modeOptions: [
        { value: "symmetrical", label: "Symmetrical" },
        { value: "asymmetrical", label: "Asymmetrical" },
        { value: "radial", label: "Radial" },
      ],
      description:
        "Balance refers to the equalisation of elements in a work. Balance can be symmetrical, asymmetrical, or radial from the centre outward.",
    },
    {
      key: "gradations",
      title: "Gradations",
      description:
        "Gradation combines elements through gradual change, such as small to large, dark to light, sparse to dense, or shadow to highlight.",
    },
    {
      key: "emphasis",
      title: "Emphasis",
      description:
        "Emphasis places greater attention on certain areas or objects through sudden or abrupt change, often using size, colour, and contrast.",
    },
    {
      key: "rhythm",
      title: "Rhythm",
      modeOptions: [
        { value: "regular", label: "Regular" },
        { value: "irregular", label: "Irregular" },
      ],
      description:
        "Rhythm creates movement through repeated objects or visual beats. Rhythm can be regular or irregular.",
    },
    {
      key: "movement",
      title: "Movement",
      description:
        "Movement is the arrangement of parts to create a slow-to-fast action of the eye. Pattern, contrast, and line can all create movement.",
    },
    {
      key: "pattern",
      title: "Pattern",
      description: "Pattern is created by repetition of shape, line, colour, texture, or other visual elements.",
    },
    {
      key: "proportion",
      title: "Proportion",
      description: "Proportion refers to the relationship of elements to the whole and to each other, shaping hierarchy through size, colour, contrast, alignment, and proximity.",
    },
  ],
};

export const DEFAULT_GESTALT_CONTROL_VALUES = {
  thickness: 50,
  scale: 50,
  angle: 0,
  mode: "mixed",
  active: false,
};

export const DEFAULT_HIERARCHY_STATE = {
  sizeHierarchy: 50,
  contrastHierarchy: 50,
  alignmentMode: "grid",
  alignmentHierarchy: 50,
  proximityHierarchy: 50,
};

export function createDefaultGestaltControls() {
  return {
    elements: GESTALT_CONTROL_SECTIONS.elements.reduce((accumulator, item) => {
      accumulator[item.key] = {
        ...DEFAULT_GESTALT_CONTROL_VALUES,
        mode: item.modeOptions?.[0]?.value ?? DEFAULT_GESTALT_CONTROL_VALUES.mode,
      };
      return accumulator;
    }, {}),
    principles: GESTALT_CONTROL_SECTIONS.principles.reduce((accumulator, item) => {
      accumulator[item.key] = {
        ...DEFAULT_GESTALT_CONTROL_VALUES,
        mode: item.modeOptions?.[0]?.value ?? DEFAULT_GESTALT_CONTROL_VALUES.mode,
      };
      return accumulator;
    }, {}),
  };
}

export const DEFAULT_GESTALT_CONTROLS = createDefaultGestaltControls();

export function getActiveGestaltItems(gestaltControls, section) {
  return GESTALT_CONTROL_SECTIONS[section].filter((item) => Boolean(gestaltControls?.[section]?.[item.key]?.active));
}

export function getActiveRenderableElementItems(gestaltControls) {
  return getActiveGestaltItems(gestaltControls, "elements").filter((item) => item.key !== "colour");
}

export const DEFAULT_MACHINE_STATE = {
  element: "line",
  principle: "balance",
  chaos: 30,
  proof: "white",
  colourPreset: "mono",
  colourHue: 0,
  colourSaturation: 100,
  colourBrightness: 0,
  process: "clean",
  processIntensity: 50,
  processScale: 50,
  ...DEFAULT_HIERARCHY_STATE,
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
  gestaltControls: DEFAULT_GESTALT_CONTROLS,
};

export const PRODUCT_NAME = "Graham Newman RCA PhD graphic design gestalt engine";
export const PRODUCT_CONTEXT = "RCA Research Biennale 2027";