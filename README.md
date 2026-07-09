# Graham Newman RCA PhD graphic design gestalt engine

Live demo, once GitHub Pages is enabled:
https://munomono.github.io/graphic_design_gestalt_engine/

## Overview

This is a browser-based generative graphic design engine for producing reproducible visual studies from the elements and principles of visual language. It runs entirely in the browser and combines a React + Vite + IBM Carbon product shell with a deterministic p5.js canvas runtime.

## Concept

The core composition model is:

Element × Principle × Chaos

Elements:

- Line
- Space
- Shape
- Form
- Colour
- Texture
- Value
- Typography

Principles:

- Unity/Harmony
- Variety
- Balance
- Gradations
- Emphasis
- Rhythm
- Movement
- Pattern
- Proportion

Chaos controls the degree of order, variation, density, disruption, and intensity.

## Process treatments

Available process modes:

- Clean
- Halftone
- Diffusion Dither
- Coarse Bitmap
- Phototype Slice
- Scanline Screen
- Torn Mask
- Chromatic Offset
- Step Quantize

The process system also includes:

- Process Intensity
- Process Scale

Process Intensity controls how strongly the selected treatment affects the composition.

Process Scale controls whether the treatment feels finer or coarser, smaller or larger, tighter or bolder, depending on the selected process mode.

## Export system

The export system supports:

- White / Black proof modes
- Type Proof on/off
- Type Layout left/centre
- deterministic seeds
- batch candidate generation
- export size presets
- export scale multipliers
- PNG export
- production filename generation

Exports are deterministic from the current seed and matrix state. Batch review remains preview-sized for performance, while PNG export renders at the chosen output size.

## Technology stack

- React
- Vite
- IBM Carbon Design System
- p5.js / canvas runtime
- Sass / SCSS

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## GitHub Pages deployment

Pushing to `main` triggers the GitHub Actions workflow and deploys to:

https://munomono.github.io/graphic_design_gestalt_engine/

GitHub Pages must be enabled in the repository settings with GitHub Actions selected as the source.

## Project structure

```text
src/
	components/
	engine/
	styles/
public/
legacy-static/
```

## Research / design context

This engine was developed by Graham Newman as part of RCA PhD work and RCA Research Biennale 2027 identity exploration.

This is not a historical style-copying tool. It does not reproduce Wolfgang Weingart, Emil Ruder, April Greiman, Otl Aicher, Paul Rand, or any specific designer’s work. It uses shared graphic design principles — line, shape, texture, typography, balance, rhythm, emphasis, movement, pattern, proportion — as generative inputs.

## Status

Prototype / research tool.

## Author

Graham Newman  
RCA PhD  
MRes RCA PGCHE FRSA

## License

License: to be confirmed.