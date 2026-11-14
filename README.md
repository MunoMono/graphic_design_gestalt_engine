# Graphic Design Gestalt Engine

**A browser-based tool for exploring how the visual language of graphic design can be made from its principles and elements. Make something, change the rules, see what happens.**

[**Open the engine ↗**](https://munomono.github.io/graphic_design_gestalt_engine/) · [**View the source code**](https://github.com/MunoMono/graphic_design_gestalt_engine)

## What is it?

The engine computationally explores and critically questions the elements and principles of graphic design gestalt. By systematically generating visual compositions, the tool allows anyone to investigate, challenge and reinterpret established conventions of visual language. You do not need any design or technical experience to try it: change a control, see what happens, and keep exploring.

The engine uses rules to generate graphic compositions. By letting you switch design elements and principles on and off, and change how they work together, it helps you explore how those choices shape an image—and question whether familiar design rules always produce the results we expect. Here, **Elements** means the building blocks of an image, such as shape, line, texture and colour. **Principles** means ways those elements can be organised, such as balance, rhythm, movement and pattern.

## How to use it

The tool opens on a blank canvas. It is an experiment rather than a collection of ready-made templates, so you build up an image by switching on the parts and relationships you want to explore.

Start in **Elements** and switch on one or more building blocks, such as Shape, Line or Texture. Each one can have its own settings; for example, you can choose whether shapes feel more geometric or organic. Open **Principles** to switch on ways for the parts to relate to one another. Balance, Rhythm, Movement, and Pattern are some of the choices. Try one at a time at first, then combine them to see how the image changes.

The **Chaos** slider changes how orderly or unpredictable the result feels. Lower settings tend to look more controlled, while higher settings introduce more variation. The hierarchy controls offer another way to guide the image: they adjust what stands out, how things line up, and which parts feel grouped together.

For colour, switch on **Colour** in Elements. Choose a palette—such as Nakameguro, Graphic Punk, or California New Wave—and adjust its hue, saturation, or brightness if you like. The **Surface** controls in the same section change the background independently. If you want a more printed or distorted look, choose a **Process**, such as Halftone, Coarse Bitmap, Scanline Screen, or Chromatic Offset. Choose Clean to leave that extra treatment off.

The canvas size menu above the image includes screen, square, portrait, poster, and banner sizes, as well as a custom size. The canvas is your live preview: keep changing settings and watch the design respond.

When you see a result you might want to keep, note its **Seed** number. A seed is a kind of recipe number: with the same settings and seed, you can bring back the same result. Use **New seed** to explore a different version, or enter a seed and choose **Load seed** to revisit one. **Generate batch** makes several alternatives using your current choices. Select a thumbnail in **Batch review** to bring that version onto the main canvas.

When you are ready to save an image, use the **Export** panel and choose **Export PNG**. You can adjust the image size and print resolution there; the panel shows the final pixel dimensions and the approximate print size. Very large exports may take longer, so a lower resolution or scale can help if an export does not finish. The suggested filename records key settings, including the seed, which can help you find or recreate the image later.

There is no single correct way to use the engine. A useful approach is to change one or two things at a time, compare the results, and save the versions you want to return to.

## About the project

The engine was developed by **Graham Newman (Muno Mono)** through doctoral research at the **Royal College of Art**, and in exploring a generative visual language for the RCA Research Biennale 2027 identity. It invites people to try out familiar ideas about graphic design and see what happens when those ideas are combined or changed. This is an independent research and design project, not an official Royal College of Art software product or endorsed institutional identity.

## For developers

The engine runs in a web browser. You don’t need to install anything or create an account to use it. To run a copy on your computer, install Node.js and npm. Then open a terminal in the project folder and run:

```bash
npm install
npm run dev
```

To make and preview a production build:

```bash
npm run build
npm run preview
```

## Licence and reuse

**© 2026 Graham Newman / Muno Mono.**

Unless otherwise indicated, the original materials in this repository—including author-created code, documentation and design material—are shared under the [Creative Commons Attribution–ShareAlike 4.0 International licence (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/). See [LICENSE.md](LICENSE.md).

You may copy, use, adapt and redistribute the licensed material, including for commercial purposes, provided you give appropriate attribution, link to the licence, indicate any changes, and share adaptations under the same or a compatible licence. Third-party software, libraries, fonts and other dependencies remain under their own licences.

### Suggested attribution

> Graham Newman / Muno Mono, *Graphic Design Gestalt Engine* (2026), [source code](https://github.com/MunoMono/graphic_design_gestalt_engine), licensed under CC BY-SA 4.0. Changes indicated where applicable.

Images made with the engine are not automatically covered by CC BY-SA 4.0. The rights in each image depend on what it contains and the applicable law.

**Graham Newman, November 2026**
