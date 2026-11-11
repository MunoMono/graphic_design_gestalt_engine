# Graphic Design Gestalt Engine

**A browser-based tool for exploring how graphic designs can be made from simple visual ingredients.**

[**Open the engine ↗**](https://munomono.github.io/graphic_design_gestalt_engine/) · [**View the source code**](https://github.com/MunoMono/graphic_design_gestalt_engine)

## What is it?

The Graphic Design Gestalt Engine makes images by mixing visual ingredients—such as lines, shapes, texture, and type—with ways of arranging them, such as balance, rhythm, and pattern. You choose the ingredients and how they behave, then the engine turns those choices into an image. You do not need design or technical experience to try it: change a control, see what happens, and keep exploring.

The tool opens on a blank canvas. It is an experiment rather than a collection of ready-made templates, so you build up an image by switching on the parts and relationships you want to explore.

## How to use it

Start in **Elements** and switch on one or more building blocks, such as Shape, Line, or Texture. Each one can have its own settings; for example, you can choose whether shapes feel more geometric or organic. Open **Principles** to switch on ways for the parts to relate to one another. Balance, Rhythm, Movement, and Pattern are some of the choices. Try one at a time at first, then combine them to see how the image changes.

The **Chaos** slider changes how orderly or unpredictable the result feels. Lower settings tend to look more controlled, while higher settings introduce more variation. The hierarchy controls offer another way to guide the image: they adjust what stands out, how things line up, and which parts feel grouped together.

For colour, switch on **Colour** in Elements. Choose a palette—such as Nakameguro, Graphic Punk, or California New Wave—and adjust its hue, saturation, or brightness if you like. The **Surface** controls in the same section change the background independently. If you want a more printed or distorted look, choose a **Process**, such as Halftone, Coarse Bitmap, Scanline Screen, or Chromatic Offset. Choose Clean to leave that extra treatment off.

The canvas size menu above the image includes screen, square, portrait, poster, and banner sizes, as well as a custom size. The canvas is your live preview: keep changing settings and watch the design respond.

When you see a result you might want to keep, note its **Seed** number at the top of Controls. A seed is a kind of recipe number: with the same settings and seed, you can bring back the same result. Use **New seed** to explore a different version, or enter a seed and choose **Load seed** to revisit one. **Generate batch** alongside the seed controls makes alternatives that keep your selected elements but vary their settings, principles, and process. If Colour is active, it varies the palette too. Select a thumbnail in **Batch review** to bring that version and all its settings onto the main canvas. To recall it later, save its settings as well as its seed using the sandbox.

When you are ready to save an image, use the **Export** panel and choose **Export PNG**. You can adjust the image size and print resolution there; the panel shows the final pixel dimensions and the approximate print size. Very large exports may take longer, so a lower resolution or scale can help if an export does not finish. The suggested filename records key settings, including the seed, which can help you find or recreate the image later.

There is no single correct way to use the engine. A useful approach is to change one or two things at a time, compare the results, and save the versions you want to return to.

## About the project

The engine was developed by **Graham Newman / Muno Mono** through doctoral research at the **Royal College of Art**, and in exploring a generative visual language for the proposed RCA PhD Biennale 2027 identity. It invites people to try out familiar ideas about graphic design and see what happens when those ideas are combined or changed.

This is an independent research and design project, not an official Royal College of Art software product or endorsed institutional identity.

## For developers

The live application runs in a web browser and needs no installation or account. To run a copy on your computer, install Node.js and npm, then open a terminal in the project folder and run:

```bash
npm install
npm run dev
```

To make and preview a production build, run `npm run build` followed by `npm run preview`.

## Licence and reuse

**© 2026 Graham Newman / Muno Mono.** The original materials in this repository, including author-created code, documentation, and design material, are shared under **[Creative Commons Attribution–ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/)**, unless otherwise indicated. See [LICENSE.md](LICENSE.md).

You may copy, use, adapt, and redistribute licensed material, including commercially, provided you give appropriate attribution, link to the licence, indicate changes, and share adaptations under the same or a compatible licence. Third-party software, libraries, fonts, and other dependencies retain their respective licences.

**Suggested attribution:**

> Graham Newman / Muno Mono, *Graphic Design Gestalt Engine* (2026), https://github.com/MunoMono/graphic_design_gestalt_engine, licensed under CC BY-SA 4.0. Changes indicated where applicable.

Images made with the engine are **not automatically placed under CC BY-SA 4.0 just because the engine was used**. Rights in a particular image depend on what it contains and the applicable law.

## Author

**Graham Newman / Muno Mono**  
Doctoral researcher, Royal College of Art  
[GitHub: @MunoMono](https://github.com/MunoMono)

*Make something. Change the rules. See what happens.*
