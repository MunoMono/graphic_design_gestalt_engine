# Design System

## Purpose

This pilot is now a controlled Graphic Design Gestalt Machine. It is not organised around fixed studies. It generates backdrop candidates by combining a visual `Element`, an organising `Principle`, a `Chaos` level, a deterministic `Seed`, and a review background.

The goal is not open-ended novelty. The goal is reproducible variation inside a disciplined graphic language.

## Machine Model

The active machine state is:

- `Element`
- `Principle`
- `Chaos`
- `Proof`
- `Process`
- `Seed`
- `Format`

The pilot opens on a blank proof ground. Artwork appears only after the operator actively engages the machine by changing `Element`, `Principle`, or `Chaos`, or by generating a batch.

## Elements

The available visual materials are:

- `Line`
- `Space`
- `Shape`
- `Form`
- `Texture`
- `Value`
- `Typography`

Each element should feel like a family of graphic matter rather than a locked composition template.

## Principles

The available organising behaviours are:

- `Unity/Harmony`
- `Variety`
- `Balance`
- `Gradations`
- `Emphasis`
- `Rhythm`
- `Movement`
- `Pattern`
- `Proportion`

Principles should change how the element is composed, not merely decorate it.

## Chaos

`Chaos` runs from `0` to `100`.

- low values should feel ordered, spare, and controlled
- middle values should feel active but still legible
- high values should feel disrupted, dense, or unstable without becoming unusable

Chaos should intensify structure, disruption, density, rotation, or spread while staying deterministic for the same seed and settings.

## Background

The background picker supports the full RGB colour range with a saturation/brightness plane, hue and opacity sliders, HEX/RGB fields, and preset swatches.

- `backgroundColor`: six-digit hex colour
- `backgroundOpacity`: 0 to 100 percent
- legacy `proof: "white"` / `"black"` configs remain supported when no background colour is supplied

Artwork uses light or dark ink according to background brightness. Background opacity does not fade the artwork. Transparent PNGs preserve alpha; the preview checkerboard is never exported. Original white and black backgrounds remain available as swatches.

## Reproducibility

The seed remains the canonical recall mechanism.

- use positive integer seeds only
- keep `randomSeed(...)` and `noiseSeed(...)` aligned to the same seed
- changing `Element`, `Principle`, `Chaos`, `Proof`, `Process`, or `Colour` should redraw the same seed, not replace it

## Formats

The pilot still supports:

- `16:9` at `3840 x 2160`
- `1:1` at `2160 x 2160`
- `9:16` at `2160 x 3840`

Preview scaling in the browser must not affect export resolution.

## Export Rules

Exports must retain enough state to be reviewable and reproducible.

- filenames must include `gestalt`
- filenames must include the active `Element`
- filenames must include the active `Principle`
- filenames must include the `Chaos` value
- filenames must include the proof mode
- filenames must include the literal word `seed`
- filenames must include the seed value
- filenames must include the canvas size
- filenames may include `sandbox` only when experimental sandbox changes are active

Approved outputs should be logged in [APPROVED_SEEDS.md](APPROVED_SEEDS.md).

## Batch Review

Batch review remains a curation tool, not a final output mode.

- batch candidates should share the active Element, Principle, Chaos, proof mode, and format
- only the seed should vary across the contact sheet
- clicking a candidate should load that seed into the main canvas

## Editing Rules

Safe edits usually change values and local drawing logic inside the gestalt renderer.

Riskier edits change:

- seed logic
- export naming structure
- format sizing
- proof behaviour
- batch generation rules
- control wiring

When tuning visuals, prefer local edits inside the gestalt rendering functions rather than reintroducing separate study systems.

## Colour Presets

The Colour select replaces the old Colour element. `Mono` keeps the original monochrome inks; six mood-board presets recolour every element, process ink, and chromatic offset: California New Wave, Graphic Punk, Corporate Funk, Acid House, Nakameguro, and Total Total. Hue shift (-180 to 180), saturation (0 to 200%), and brightness (-100 to 100) sliders riff on the active preset. Inks too close to the background are dropped automatically. The background stays independent. Sandbox JSON stores `colourPreset`, `colourHue`, `colourSaturation`, and `colourBrightness`; non-default colour settings appear in export filenames.
