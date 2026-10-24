# Renewless brand and theme (locked)

Approved 24 October 2026: **cool graphite + soft mint-lime + Raleway Regular/Medium**. This replaces the earlier light-only, system-font, navy/mint and warm yellow-lime directions. Modern and friendly, with compact typography and restrained use of color.

This file is the visual source of truth. The approved [motion, Liquid Glass and Loop specification](motion-and-mascot.md) defines the navigation-material exception, transitions and limited mascot usage. See [brand assets](brand/README.md) and the [offline real-font preview](theme-preview.html). Mobile implementation is the next phase; current runtime code still uses the earlier styling.

## Color tokens

| Token | Hex | Use |
|---|---|---|
| `background` | `#151719` | Neutral graphite screen ground |
| `card` | `#202326` | Cards, grouped lists, fields, sheets, tab bar |
| `text` | `#E8EAED` | Primary text and amounts |
| `textSecondary` | `#9DA4AB` | Supporting labels, dates, inactive tabs, Upcoming, Estimated, No renewal |
| `accent` | `#B9E58C` | Primary actions, active tab, selected filter, small renewal highlight |
| `onAccent` | `#151719` | Text/icons on accent-filled controls |
| `accentPressed` | `#A6D17B` | Pressed primary action |
| `hairline` | `#34393E` | Subtle separators and non-interactive boundaries |
| `controlBorder` | `#69727A` | Identifiable input/outlined-control boundaries |
| `expired` | `#FF8A8A` | Expired, cancelled-until, destructive actions, errors |
| `disabledFill` | `#30353A` | Disabled controls |
| `disabledText` | `#9DA4AB` | Disabled labels |

The first five tokens are the approved palette; remaining tokens support interaction/status states. `#101214` in the concept image is the presentation backdrop, not the app background.

- Dark theme for v1; light mode and automatic theme switching are not part of this implementation.
- Content uses flat fills. No olive cast, yellow warmth, decorative gradients/glow or texture. Native Liquid Glass on supported iPhone navigation/controls is the intentional exception; see [motion and materials](motion-and-mascot.md).
- Accent is sparse: buttons, selected states and a thin recommendation edge. Do not fill entire cards with it.
- Labels on mint-lime are graphite, never white.
- Status is written as text; color is supplementary. In progress uses `text` to reserve accent for actions. Upcoming and No renewal use `textSecondary`; Expired uses `expired`.

## Typography

**Raleway**, bundled locally on both platforms. Regular **400** for body/supporting text; Medium **500** for headings, names, prices and actions. No synthetic bold, heavy 600/700 defaults or ultra-light text on dark surfaces.

| Role | Size | Line height | Weight |
|---|---:|---:|---:|
| Auth wordmark | 26 | 34 | 500 |
| Screen heading | 22 | 28 | 500 |
| Dashboard number | 22 | 28 | 500 |
| Section heading | 17 | 24 | 500 |
| Subscription name | 15 | 21 | 500 |
| Row price | 16 | 22 | 500 |
| Body | 14 | 20 | 400 |
| Button | 14 | 20 | 500 |
| Supporting text | 13 | 18 | 400 |
| Field label / footnote | 12 | 17 | 400 |
| Tab label | 11 | 16 | 400 |

Sizes are logical units, not physical pixels. Allow system font scaling. Avoid clipped fixed-height text containers, negative letter spacing and oversized uppercase headings. Keep sufficient line height for descenders.

### Numerals

Approved: **old-style proportional figures**. Raleway's `3`, `5`, `7`, `9` extend below the baseline, including in prices. The supplied static files have this by default. Do not force lining/tabular figures. Right-align amounts through layout, not spaces or changes to numeral style. HTML uses `font-variant-numeric: oldstyle-nums proportional-nums`.

Verify `$13.99`, `$84.97`, `0123456789`, currencies and dates on both platforms at normal and larger text sizes. Fallback is acceptable for missing glyphs, not a silent replacement of the approved family. Retain the font license.

## Brand and logo

- Name: **Renewless**. Wordmark: Raleway Medium, normal spacing, `text` color.
- Tagline: “Stop the subscription renewals you don't need.” Supporting text size.
- Mark: rounded open-loop **R**, mint-lime on transparency, drawn as a vector rather than a font glyph.
- [Vector master](../src/assets/renewless-mark.svg): intrinsic **51 × 51**. [Exact-size PNG](../src/assets/renewless-mark-51.png): **51 × 51 RGBA**. A [1020px transparent export](../src/assets/renewless-mark-1020.png) is supplied for larger artwork.
- Use on graphite or a suitably contrasting dark surface. Preserve proportions and internal clear space. No glow, gradients or stretching.
- Auth may pair the mark and wordmark. Avoid oversized brand lockups on product screens.
- Native app icons, icon backgrounds, store artwork and platform size sets will be prepared by the user.

## Spacing and shape

- Screen horizontal padding: 20; card padding: 16.
- Card gaps: 12–16; section gaps: 24.
- Radius: 12 for cards/inputs/sheets, 10 for buttons, fully rounded filters.
- Compact list rows: approximately 64–72 high at default text scale; grow for accessibility.
- Consistent line icons, 20–22 visible size; effective tap targets at least 44.
- Group rows with thin separators; avoid decorative boxes around every row.

## Buttons and forms

- Primary: `accent` fill, `onAccent` label, 48 high, weight 500. Full width for form commits; `accentPressed` when pressed.
- Secondary: `card` or transparent fill, `controlBorder` outline, `text` label.
- Text actions: `accent`, weight 500. Destructive actions: `expired`.
- One main form commit: Log in, Create account, Verify, Save, Create or Confirm.
- Fields: `card` fill, 1px `controlBorder`, 48 minimum height, 16 horizontal padding, body text. Visible labels; placeholders use `textSecondary`.
- Focus: 2px `accent`. Errors: `expired` boundary plus explanatory text. Six OTP cells follow the same rules.
- Text contrast target: at least 4.5:1 on its actual surface. Decorative hairlines must not be the only identifying boundary for an essential control.

## Cards and rows

**Home summary:** compact 2 × 2 grouping for Active, Renewing soon, This month and Expired. Neutral card surface, quiet labels, medium-weight amounts. This month stays separated by currency. Expired opens History.

**Recommendation:** one prominent dark card, narrow accent edge, clear renewal/date hierarchy. Preserve the locked rotation between soonest and most-expensive-upcoming, all three responses, and cancellation disclaimer. The nearest-renewal preview does not replace these behavioral rules.

**Subscription rows:** grouped, compact, names left and prices right. Supporting dates/status below. Estimated beside predicted dates; cancelled-until in `expired`; last paid only for real charges. Neutral monograms or consistent generic icons; no per-service logos in v1.

## Navigation and filters

- Tabs: **Home · List · Alerts · Profile**. History and Payments open from Profile.
- Tab bar: floating dark native Liquid Glass on supported iPhones, solid `card` fallback elsewhere. Outlined icons, active icon/label `accent`, inactive `textSecondary`; native selection treatment is allowed. Respect bottom safe areas. No center action. This supersedes the former flat-only/no-capsule rule.
- Bare mint-lime `+` on Home/List, minimum 44 hit area, no filled circle. Opens Manual / AI / Voice / Connect Gmail.
- Selected filter: `accent` fill, `onAccent` text. Unselected: neutral surface, `textSecondary`. Visible chips may be 32 high with 44 effective touch targets.
- Separate currency totals; no conversion or combined cross-currency totals.

## Loop and motion

Loop, a small open-loop companion with two eyes, is approved for limited empty/success states. It is separate from the R logo and is the sole mascot exception to the no-illustration-set rule. Subscription cards expand into the top Detail hero and reverse back to the originating row. Full placements, timings, native glass and accessibility fallbacks are locked in [motion-and-mascot.md](motion-and-mascot.md).

## Sheets and banners

`card` surfaces, radius 12, comfortable padding, restrained separators. Sheet rows at least 52 high. Neutral banners, clear text, one action where needed. Loading, empty, error and disabled states use the same theme.

## Implementation handoff

1. Register supplied Raleway 400/500 files locally, retaining the license. No app font CDN dependency.
2. Replace old tokens in `src/constants/colors.ts` and `src/constants/statusColors.ts`; apply shared type/spacing to components and navigation.
3. Use light status-bar content; align keyboard, dialogs and native/system surfaces with the dark theme where supported.
4. Integrate the logo on brand/auth surfaces; app icon work remains with the user.
5. Apply the design across screens while retaining [locked behavior](product-screens.md).
6. Verify both platforms, long names, multiple currencies, font loading, numeral descenders, large text and interaction states.

AI concept boards are mood references. This document and the real-font HTML preview define exact colors, type and component treatment.
