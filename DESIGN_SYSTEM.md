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
- `Type Proof`
- `Type Layout`
- `Seed`
- `Format`

The pilot opens on a blank proof ground. Artwork appears only after the operator actively engages the machine by changing `Element`, `Principle`, or `Chaos`, or by generating a batch.

## Elements

The available visual materials are:

- `Line`
- `Space`
- `Shape`
- `Form`
- `Colour`
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

## Proof Modes

The designer-facing proof modes are now intentionally minimal:

- `White`
- `Black`

These are review grounds, not separate identity palettes. The composition should remain legible on both.

## Type Proof

Type Proof is still a review overlay only.

- `Off` means artwork-only review
- `Left` and `Centre` are layout probes for placeholder event typography

If Type Proof is visible during export, treat the output as a proof asset, not a final clean artwork render.

## Reproducibility

The seed remains the canonical recall mechanism.

- use positive integer seeds only
- keep `randomSeed(...)` and `noiseSeed(...)` aligned to the same seed
- changing `Element`, `Principle`, `Chaos`, `Proof`, or `Type Proof` should redraw the same seed, not replace it

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
- filenames must include `type-proof` when active
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