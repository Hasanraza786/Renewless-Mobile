# Renewless approved brand assets

Approved direction: 24 October 2026. Canonical specification: [theme.md](../theme.md). Actual font/logo preview: [theme-preview.html](../theme-preview.html).

Image masters and exports live in `src/assets/` at the repository root. Fonts and their license remain in `docs/brand/fonts/` until native font integration. Android launcher resources remain in their required native resource directories.

## Logo

| File | Purpose |
|---|---|
| [renewless-mark.svg](../../src/assets/renewless-mark.svg) | Editable vector master, 51 × 51 intrinsic dimensions, transparent |
| [renewless-mark-51.png](../../src/assets/renewless-mark-51.png) | Exact 51 × 51 RGBA logo requested by the user |
| [renewless-mark-1020.png](../../src/assets/renewless-mark-1020.png) | Transparent high-resolution export for larger artwork |

Rounded open-loop R, drawn as a vector path in `#B9E58C`. The 51px canvas includes clear space. Use on `#151719`; preserve proportions. Do not add a background to the master. This standalone mark is not a native app icon set; the user will prepare app icons.

Wordmark: **Renewless**, Raleway Medium 500, `#E8EAED`. Pair with the mark as needed; do not squeeze the wordmark into a 51px square.

## Fonts

- `fonts/Raleway-Regular.ttf` — 400
- `fonts/Raleway-Medium.ttf` — 500
- `fonts/OFL.txt` — SIL Open Font License, retained with the fonts

Sources: [Google Fonts Raleway](https://fonts.google.com/specimen/Raleway), [upstream license](https://github.com/google/fonts/blob/main/ofl/raleway/OFL.txt). Static files downloaded from Google's font CDN. Bundled for the offline documentation preview and later mobile integration; not yet registered in the app.

Default old-style figures are intentional. Keep descenders visible on 3/5/7/9; do not force lining/tabular numerals.

## Loop companion

Loop is a separate approved mascot concept, not a replacement for this R mark or the app icon. Its placements, one-shot animation states and production-asset requirements are defined in [motion-and-mascot.md](../motion-and-mascot.md). The [interactive study](../motion-preview.html) shows its initial visual direction.

| File | Purpose |
|---|---|
| [loop-mascot.svg](../../src/assets/loop-mascot.svg) | Production vector: reference shape preserved, transparent background, loop and eyes in approved `#B9E58C` |
| [loop-mascot.jpg](../../src/assets/loop-mascot.jpg) | Original visual reference; preserve as supplied. Its baked-in colors/background are not production tokens |

Use the SVG for implementation on the theme’s `#151719` or `#202326` surface. Do not use the reference JPG as a transparent app asset. The SVG retains the reference geometry; only colors and background were normalized to the locked theme.

## Scope

Cool graphite, soft mint-lime and Raleway are the selected direction. Earlier pastel palettes and the warmer lime board are exploration only. Runtime screen changes, native font registration and icon replacement belong to the next phase.
