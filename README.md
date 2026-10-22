# Graphic Design Gestalt Engine

**An experimental instrument for making, testing and questioning graphic design's visual grammar.**

[**Launch the engine ↗**](https://munomono.github.io/graphic_design_gestalt_engine/) · [**Source code**](https://github.com/MunoMono/graphic_design_gestalt_engine)

[![Creative Commons Attribution–ShareAlike 4.0 International](https://licensebuttons.net/l/by-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-sa/4.0/)

## What is it?

What happens when the elements and principles of graphic design become variables rather than rules?

The **Graphic Design Gestalt Engine** is a browser-based generative instrument that turns the conventional vocabulary of visual language into a system for experimentation. Line, shape, space, form, texture, value and typography are combined with organising principles such as balance, rhythm, movement, pattern and proportion. A controlled measure of *chaos* introduces variation, tension and disruption.

The governing proposition is simple:

> **Element × Principle × Chaos**

The results are not templates or imitations of established designers' styles. They are distinct graphic propositions generated from a shared set of conditions. The engine is intended both as a practical image-making tool and as a way to critically examine the assumptions built into graphic design's familiar rules.

## Explore the engine

**[Open the live application](https://munomono.github.io/graphic_design_gestalt_engine/)** — no installation or account required.

1. **Activate elements.** Choose one or more visual building blocks and adjust their behaviour.
2. **Activate principles.** Introduce one or more organising relationships, from balance and harmony to variety, rhythm and movement.
3. **Change the conditions.** Adjust chaos, hierarchy, colour and background to test how the composition changes.
4. **Apply a process.** Choose from treatments including halftone, diffusion dither, bitmap, scanline and chromatic offset.
5. **Generate a batch.** Compare candidates, select a promising variation and refine it.
6. **Export.** Download a PNG at your chosen format, scale and resolution.

A composition is associated with a **seed**. Keep the same seed and settings to reproduce a result; change either to explore a new direction. This makes the process open to comparison, curation and iteration rather than relying on unrepeatable random output.

## What can it produce?

The engine supports screen, print and exhibition-scale work: 16:9, square and portrait formats; A0 portrait and landscape; six-foot banner presets; and custom dimensions. Export controls include scaling and DPI settings. Output filenames record the composition's parameters to help preserve its provenance.

The visual treatments and colour controls make it possible to create a family of related but non-identical images — useful for identity systems, communication design, teaching and speculative visual research.

## Research context

The engine was developed by **Graham Newman (Muno Mono)** through doctoral research at the **Royal College of Art** and in exploring a generative visual language for the proposed **RCA PhD Biennale 2027** identity.

Its starting point is a question, not a style: what becomes visible when the principles normally taught as the foundations of graphic design are made explicit, recombined and disrupted computationally? Rather than treating these principles as universal prescriptions for good design, the engine offers a means of testing their possibilities and limitations through making.

This is an independent research and design project, not an official Royal College of Art software product or endorsed institutional identity.

## Run locally

The engine is built with **React, Vite, p5.js, IBM Carbon and Sass**. To run it locally, install Node.js and npm, then:

```bash
git clone https://github.com/MunoMono/graphic_design_gestalt_engine.git
cd graphic_design_gestalt_engine
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

The application runs in the browser. Its core generative canvas is deterministic for a given configuration and seed.

## Licence and reuse

**© 2026 Graham Newman / Muno Mono.** The original materials in this repository, including author-created code, documentation and design material, are shared under **[Creative Commons Attribution–ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/)**, unless otherwise indicated. See [LICENSE.md](LICENSE.md).

You may copy, use, adapt and redistribute licensed material, including commercially, provided you give appropriate attribution, link to the licence, indicate changes and share adaptations under the same or a compatible licence. Third-party software, libraries, fonts and other dependencies retain their respective licences.

**Suggested attribution:**

> Graham Newman / Muno Mono, *Graphic Design Gestalt Engine* (2026), https://github.com/MunoMono/graphic_design_gestalt_engine, licensed under CC BY-SA 4.0. Changes indicated where applicable.

Artwork that you generate using the engine is **not automatically placed under CC BY-SA 4.0 merely because the engine was used**. Rights in a particular output depend on what that output contains and the applicable law.

## Author

**Graham Newman / Muno Mono**  
Doctoral researcher, Royal College of Art  
[GitHub: @MunoMono](https://github.com/MunoMono)

*Make something. Change the rules. See what happens.*
