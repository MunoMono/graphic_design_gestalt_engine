# Pilot Guide

This pilot is a browser-based Graphic Design Gestalt Machine for generating reproducible backdrop candidates. You work in the browser, and you only need VS Code to open the project and launch `index.html` with Live Server.

## Launch

1. Open the project in VS Code.
2. Right-click `index.html`.
3. Choose **Open with Live Server**.

The canvas may scale to fit your screen, but exports still render at the active production size.

## What the Controls Mean

- `Element` is the material the composition is built from: line, space, shape, form, colour, texture, value, or typography.
- `Principle` is the organising behaviour: balance, rhythm, emphasis, pattern, and so on.
- `Chaos` controls how ordered or disrupted the result feels.
- `Proof` switches the backdrop between `White` and `Black` review grounds.
- `Process` applies a post-generation treatment such as halftone, dither, bitmap, or scanline distortion.

The pilot opens in `Blank View` by default. That means the proof background is visible, but artwork does not appear until you actively change `Element`, `Principle`, or `Chaos`, or generate a batch.

## Working with Seeds

Each composition is driven by a numeric seed. If you keep the same seed and the same settings, you can recall the same result later.

To recall a seed:

1. Paste or type the number into the seed field.
2. Click `Load Seed`.

To get a fresh seed, press `R`. To export the current result, press `S` or click `Export PNG`.

## Batch Review

Use `Generate Batch` or press `B` to create a 12-image contact sheet for the current `Element`, `Principle`, `Chaos`, proof mode, and format.

1. Generate the batch.
2. Click any thumbnail to load that seed into the main canvas.
3. Press `Escape` to leave Batch Review without changing the current seed.

This is the fastest way to shortlist directions while keeping the visual rules fixed.

## Formats

Use the keyboard to switch output format:

- `1` for 3840 x 2160
- `2` for 2160 x 2160
- `3` for 2160 x 3840

Keep the format with the seed in your notes, because the same seed should be reviewed in the intended format.

## Exports and Naming

PNG export names now include:

- `gestalt`
- the active `Element`
- the active `Principle`
- the `Chaos` value
- the proof mode
- the literal word `seed`
- the seed number
- the canvas size

Example structure:

`rca-biennale-gestalt-line-balance-chaos-30-white-seed-20270709-3840x2160.png`

## Recommended Workflow

1. Start with an `Element`.
2. Choose a `Principle`.
3. Adjust `Chaos` until the composition feels right.
4. Use `Generate Batch` to review a spread of seeds.
5. Load a strong candidate back into the main canvas.
6. Check `White` and `Black` proof backgrounds if needed.
7. Refine `Process`, `Colour`, and active element sliders until the hierarchy feels right.
8. Export the chosen PNG.
9. Log the result in `APPROVED_SEEDS.md`.

## Advanced Note

There is still an internal sandbox panel in the project for experimental code testing, but it is no longer part of the main designer workflow. Approved outputs should come from the visible Gestalt Machine controls unless a developer is intentionally testing a new rendering rule.