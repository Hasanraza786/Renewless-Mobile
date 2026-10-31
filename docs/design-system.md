# Renewless design system

V1 release policy, approved 31 October 2026: all planned user features are free. No paywall, paid feature gate, subscription-count monetization cap, Upgrade/Pro/Restore/Manage plan surface or billing-driven sync pause ships in v1. Authentication, Gmail consent, ownership, privacy and operational safety still apply. Own-app monetization is Phase 2 only; its retained drafts/assets are owned by [Billing](billing.md). Free availability is separate from native/API implementation readiness.

Single source for visual tokens, typography, controls, materials, motion, mascot and asset provenance. Screen-specific arrangements/locks are in [Product screens](product-screens.md); shared-component changes must respect those locks. Archived HTML studies are removed; use the current Final prototype and this specification.

<a id="theme"></a>

## Theme and shared controls

Approved palette/type 24 October 2026; consolidated with finalized screen decisions through 30 October. Visual source of truth alongside the specific screen contracts. [Motion/materials](design-system.md#motion-and-loop) owns transitions/native glass, [brand assets](design-system.md#brand-assets) owns files. The current Final HTML prototype is the screen reference; earlier typography/motion HTML studies have been removed.

### Colors

| Token / semantic | Hex | Use |
| --- | --- | --- |
| Background | `#151719` | Screen graphite |
| Card | `#202326` | Cards, fields, grouped rows, solid navigation |
| Text | `#E8EAED` | Primary text/amounts |
| Secondary | `#9DA4AB` | Labels, confidence metadata, cancelled/ended-trial text |
| Accent / Active | `#B9E58C` | Primary actions, active tab, Active status |
| On accent | `#151719` | Labels/icons on mint |
| Pressed accent | `#A6D17B` | Primary pressed state |
| Hairline | `#34393E` | Subtle separators |
| Control border | `#69727A` | Essential outlined-control boundary |
| Renewing soon | `#E8BE78` | Renewal 1–7 days away |
| Due today | `#F29B8F` | Renewal today |
| Trial / Needs date | `#9EBCE0` | Trial states/missing-date metadata |
| Expired / destructive / error | `#FF8A8A` | Confirmed expired access, destructive/error states |
| Disabled fill | `#30353A` | Disabled control background |
| Dropdown/filter dialog | `#25282C` | Graphite interactive overlays |
| Info tooltip | `#252B29` | Shared informational disclosure |

Dark theme only. Flat content, restrained tinted summaries, no decorative glow/warm gradients. Native glass is a navigation exception. Status is always written; never color alone. Cancelled/Trial ended are gray, not red. Primary names and money stay soft white.

One mutually exclusive status group per record: confirmed Expired/Cancelled, ended non-renewing trial, current trial, Needs date, Due today, Renewing soon, Active. Trial wording can be On trial / Trial ending soon / Trial ends today within the blue group. Passing an estimated date does not mean Expired/Paid. See [status semantics](api-mobile-contract.md#status-mapping-shared-by-all-surfaces).

### Typography

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

#### Numerals

Approved: **old-style proportional figures**. Raleway's `3`, `5`, `7`, `9` extend below the baseline, including in prices. The supplied static files have this by default. Do not force lining/tabular figures. Right-align amounts through layout, not spaces or changes to numeral style. HTML uses `font-variant-numeric: oldstyle-nums proportional-nums`.

Verify `$13.99`, `$84.97`, `0123456789`, currencies and dates on both platforms at normal and larger text sizes. Fallback is acceptable for missing glyphs, not a silent replacement of the approved family. Retain the font license.

### Brand

Renewless wordmark in Raleway Medium, tagline “Stop the subscription renewals you don't need.” Rounded open-loop R from [logo.svg](../src/assets/icons/logo.svg), 512×512 export with a 51-unit viewBox and graphite background. [512×512 PNG icon](../src/assets/images/logo.png) uses the approved dark background. Preserve proportions. Loop is a separate companion, never the app mark. [Brand inventory](design-system.md#brand-assets) lists actual files and font locations.

### Spacing and controls

Screen horizontal padding around 20; related-card gaps 12; card padding 12–16; internal groups 8; larger section boundaries 16. Approved auth/onboarding hierarchy takes precedence over generic spacing. Avoid accumulated large margins. Default compact list rows around 64–72, growing for larger text and required trial/date labels. Radius/control shape follows the Final screen reference; standalone icon buttons use 12px rounded corners.

Standalone icons: 20–22px glyph in at least 44×44 effective target, subtle graphite surface/border. All header Back controls use the exact [shared Back component](#header-back-button). Back/Close primary text, Add mint, Delete muted red-tinted surface. Tab icons have their own surface. Decorative platform logos are not buttons. Info icons sit adjacent to their label without a visible large icon background; preserve invisible accessible target.

Forms have explicit labels, graphite fill and identifiable border. Approved compact auth inputs are roughly 42px visible height; preserve effective target/accessibility rather than shrinking hit areas. Primary commits around 44–48px. Final form components may grow for native keyboard/Larger Text; never clip content to meet a fixed height. Amount/Currency are paired; other Add/Edit fields single. Errors below the relevant field, focus mint, error border/text red. OTP one logical input group. Text contrast target 4.5:1.

### Shared dropdown and status dialog

Single-select controls use the shared themed combobox: white 18px chevron inset 14px, 42px text-end padding; graphite listbox, mint selected text/check. Menu left edge/width exactly match trigger, 6px gap, constrain within phone viewport/flip above. Keyboard and screen-reader semantics must match [product-screens.md#subscription-entry](product-screens.md#subscription-entry). No native blue web option popup in the Final prototype.

List **Status filters** is a centered graphite multi-select dialog, neutral border, dim/2px blur background, rounded-square checkbox and semantic colored text/count. Selected count on trigger only; no external chips or Sort by. Empty selection means all; Clear all inside dialog. [product-screens.md#listing](product-screens.md#listing) owns interaction/count semantics.

Info disclosures use `info-tooltip.js`, green-graphite surface, mint border/pointer, dim/2px blur backdrop, Close/outside/Escape dismissal and focus restoration. These are information dialogs, distinct from selects and status filters. [product-screens.md#onboarding](product-screens.md#onboarding) owns detailed component behavior.

Checkbox/radio visuals: compact 20px rounded square, dark unchecked fill and clear border, mint checked fill with centered graphite check. Never native white unchecked boxes or stretched ovals. Preserve radio semantics for one reminder choice even with the shared square visual.

### Navigation, cards and states

Five tabs: **Home / List / Calendar / Alerts / Profile**. Supported native glass where available; solid card fallback, active mint and inactive gray, no center Add. Keep bottom safe areas and final content/actions clear. Header + on Home/List/Calendar opens the three-option Add sheet.

Home: compact next-event card, two stats, This month, Top spending by platform, forecast, upcoming. No category chart, four-stat layout or rotating action card. Subscription rows use respective logos and stable record IDs. Detail badges use semantic text over subtle tinted fill. Pinned commits/actions, no clipped keyboard focus. See [Home](product-screens.md#home), [Listing](product-screens.md#listing), [Calendar](product-screens.md#calendar) and [entry/Detail](product-screens.md#subscription-entry).

Use the same palette for pending/error/disabled/empty states. Home skeleton is subtle charcoal shimmer, static with Reduced Motion. Loop placement and Ready celebration are limited to [design-system.md#motion-and-loop](design-system.md#motion-and-loop). Preserve readable text feedback without animation.

### Native handoff

Current native code is an initial implementation and must be audited against these targets, not assumed completely migrated. Reuse bundled fonts/assets, apply shared tokens/type/components, match light status-bar content, verify dark system controls, source/date/money semantics, keyboard, safe areas, platform fallbacks, font descenders, long names and Larger Text. Final screenshot approval does not prove native accessibility or runtime material support.

<a id="motion-and-loop"></a>

## Motion, materials and Loop

Approved 24 October 2026. Complements [design-system.md#theme](design-system.md#theme) and [product-screens.md](product-screens.md). The rounded R logo, Raleway, graphite palette and feature scope stay unchanged. This document supersedes the former flat-only tab-bar rule and adds one limited mascot exception to the no-illustration-set rule.

### Interactive reference

The Final prototype under `prototypes/renewless-studio/dist/` is the current browser reference. Older standalone motion-study HTML has been removed. Browser glass is an approximation, not native Liquid Glass, and scripted controls do not save real data. The written timing/fallback rules below remain the implementation target; study-only copy is not production UI.

Approved: the card-to-detail movement, restrained floating glass navigation, Add-sheet motion, and Loop concept. Native rendering, interruption handling and platform integration must be validated during implementation. No mobile runtime integration has been completed by this documentation work.

### Subscription card → Detail

1. On tap, the selected card moves from its exact on-screen position and expands into the top Detail hero, below the safe-area/back controls. Keep the name, platform logo and amount visually continuous.
2. Animate position, bounds and corner radius together over **350ms**; acceptable tuning range **300–350ms**. Use a smooth deceleration, without overshoot or bounce. Do not stretch glyphs to create the expansion.
3. Reveal remaining Detail fields with a short **180ms** fade and at most 8 logical units of upward movement as the hero settles.
4. Back reverses the hero into the original row. Preserve the originating tab, search/filter state and list scroll position.
5. Share by stable subscription ID. Support Home, List and History entry points where a source card exists.
6. For push/deep links, missing or off-screen source rows, changed filters, deleted subscriptions or an unavailable measured target, use standard native navigation/fade. Do not fly the card toward a guessed location or force-scroll the list.
7. Already-loaded summary data supplies the hero immediately. Load remaining fields independently; loading/error states must not block Back. Never leave a blank duplicate card or overlay behind.
8. Guard repeated taps; cancel or reverse cleanly during interactive back gestures. Restore visibility, focus and touch handling if interrupted.

With Reduce Motion, skip travel, scaling and expansion; use a brief opacity transition or immediate state change. Keep all information and navigation available.

### iPhone materials

Use **real native Liquid Glass on supported iOS/runtime configurations**, rather than presenting a blur imitation as the native material. Confirm SDK, OS availability and React Native integration in a small platform prototype before broad adoption.

| Surface | Approved treatment |
|---|---|
| Bottom navigation | Floating dark native glass surface with five tabs; mint selected label/icon and system selection treatment |
| Back/header controls | Native glass treatment where supported and appropriate; keep controls readable |
| Header `+` | Mint glyph on subtle graphite rounded-square background, 44 minimum hit area; no glow |
| Add sheet | Native sheet presentation; dark readable menu surface, system material only where appropriate |
| Dashboard, subscription rows, Detail fields, forms | Solid graphite/card surfaces from the theme |
| Primary Save/Create buttons | Solid mint-lime with graphite labels |

The five tab labels/destinations are Home / List / Calendar / Alerts / Profile. Account for the floating bar and bottom safe area so it never covers the final list row or form action. No center Add tab. System glass highlights/reflections are permitted; decorative gradients/glow in app content remain excluded.

Older iOS and Android use matching solid graphite surfaces with appropriate platform transitions. Do not require glass support for any feature. Honor Reduce Transparency, Increase Contrast and platform appearance preferences; use an opaque readable fallback where necessary. No stacked custom glass layers on every card.

References: [Apple materials guidance](https://developer.apple.com/design/human-interface-guidelines/materials), [Liquid Glass overview](https://developer.apple.com/documentation/TechnologyOverviews/liquid-glass).

### Motion inventory

These durations are custom-animation targets. Native navigation/sheets use platform timing and interactive gestures rather than forced matching durations.

| Trigger | Behavior |
|---|---|
| Standard screen navigation | Native push/pop and back gesture |
| Tab selection | Native selection response; optional content crossfade around 170ms, no sideways page slide |
| Add sheet open/close | Native upward presentation and downward dismissal; browser reference approximately 320ms / 220ms |
| Primary/secondary button press | Subtle compression, minimum scale 0.98, 120–180ms response; avoid doubling native feedback |
| Successful save | Brief success tick and optional light success haptic after confirmed success, then update destination |
| Filter change | 180–240ms fade/reposition, preserve item identity; no stagger on every row |
| Confirmed delete | 180–240ms row collapse after confirmation; if optimistic, restore correctly on failure |
| Loading complete | Static placeholders to content crossfade, 180–220ms |
| Error | Short border/message appearance; no shaking form or repeated vibration |
| Keyboard/focus | Native coordinated movement; focused field and primary action remain accessible |
| Loop reaction | One brief blink, small nod or tiny wave; approximately 250–600ms |

No artificial network delay for splash/loading, rolling money counters, perpetual pulsing, screen-wide bouncing, automatic carousel or repeated list entrance. Approved branded splash and Ready one-shot celebration are the narrow decorative exceptions; see product-screens.md#onboarding. Haptics respect platform support and system preferences, and are never the only confirmation. No repeated haptic on every row or tab.

### Loop mascot

**Loop** is the approved companion concept: a soft, slightly asymmetric open renewal loop with two small eyes. Mint-lime `#B9E58C`, graphite negative space, simple readable features. Friendly and quiet; not a generic robot and not a copy of another brand's character. Maintain the opening that communicates a renewal loop. Production vector: [loop-mascot.svg](../src/assets/icons/loop-mascot.svg), with a transparent background and approved mint-lime for loop and eyes. The current RGB PNG export is in src/assets/images/loop-mascot.png; sad/happy vectors are expressions of the same Loop.

- Loop is separate from the approved rounded R logo; it does not replace the logo, wordmark or app icon.
- Use a small flat vector-style rendering. No glossy 3D, gradients, neon glow, large illustration scenes or additional mascot cast.
- Maintain legibility on graphite; keep eyes and body clear at small display sizes.
- Browser reference is the approved concept/motion guide. Use the bundled expression vectors; the CSS study and Lottie adaptation still need native playback validation.

#### Placements and states

| Placement | Expression / response |
|---|---|
| Empty List / filtered results | Small sad face in circular view; one compact + Add manually action, no Gmail button |
| Empty Home | Friendly still Loop with the approved Home entry actions |
| Empty Alerts | Calm neutral face; “No alerts yet” remains primary information |
| First subscription saved | Single small nod/blink; success remains visible as text |
| No upcoming renewals | Relaxed expression, only in the appropriate empty-state area |
| Future AI chat | Small assistant avatar within the existing AI phase, not a new always-on bot |

Use only where there is space and purpose. No mascot on every subscription row, persistent floating overlay, obstruction of controls or celebratory response to billing/errors. At rest, Loop is still. Optional deliberate tap produces one blink/nod. Approved scanning/loading feedback and one-shot Ready entry are explicit exceptions; no perpetual decorative loops. A small wave is permitted for a greeting, not repeated continuously.

Decorative instances are hidden from accessibility traversal. If tappable, expose an accessible label and sufficient hit area; never rely on the mascot to communicate an essential status. Under Reduce Motion, keep it static and retain text feedback.

### Implementation acceptance

- Prototype native glass and shared transitions on supported iOS, fallback iOS and Android before broad rollout. Select dependencies only after checking compatibility with this React Native/navigation setup; no animation library is locked by this document.
- Validate card identity, precise return position, search/filter preservation, rapid taps, interrupted back gestures, rotation/layout change, deletion, deep links and failed requests.
- Keep frame pacing smooth on representative physical devices; prefer native/UI-thread animation and remove expensive layered effects if needed.
- Check large text, screen-reader focus, Reduce Motion, Reduce Transparency, Increase Contrast, safe areas and keyboard overlap.
- Confirm approved Raleway figures remain readable and unclipped through transitions. Keep solid content surfaces and the existing brand tokens.
- Final production assets and runtime behavior must match these locks; browser preview approval alone is not proof of native performance or accessibility.

### Approved onboarding motion — 29 October 2026

The final neutral/sad/happy Loop placements, 112px success halo, SVG check badge and one-shot outer-corner celebration are consolidated in [product-screens.md#onboarding](product-screens.md#onboarding). Use that section for current timing and asset references; previous 24-piece and linear-rise experiments are superseded. The HTML uses CSS; JSON is a vector adaptation requiring native playback validation. Reduced Motion disables decorative motion. Do not loop the GIF in the production UI.

<a id="brand-assets"></a>

## Brand assets and fonts

Palette/type approved 24 October; assets updated through October 2026. The [theme section](design-system.md#theme) is canonical. Asset paths below reflect the current repository; obsolete exports and standalone studies are not implementation sources.

### Logo / app icon

| File | Actual format / use |
| --- | --- |
| [logo.svg](../src/assets/icons/logo.svg) | 512×512 SVG, `viewBox="0 0 51 51"`; mint open-loop R on `#151719` background |
| [logo.png](../src/assets/images/logo.png) | 512×512 RGB PNG with dark background |

The master geometry uses a 51-unit coordinate space; the current exports are **512px**, not transparent 51px PNGs. Preserve geometry/proportions. Wordmark is Renewless, Raleway Medium, soft white. Native launcher/AppIcon resources exist under Android/iOS directories; presence alone does not verify store packaging or every device render. Do not link the removed `src/assets/renewless-mark*` files.

### Fonts

Canonical mobile font assets: [Regular](../src/assets/fonts/Raleway-Regular.ttf), [Medium](../src/assets/fonts/Raleway-Medium.ttf), [license](../src/assets/fonts/OFL.txt). Other weights are present but do not change the approved 400/500 role palette. `react-native.config.js` references `src/assets/fonts`; native registration/rendering must be validated on device.

Documentation preview copies remain in `docs/brand/fonts/`, including OFL.txt; the self-contained studio has local copies. Old-style proportional numerals are intentional. Keep descenders visible; no forced lining/tabular figures. Typography sizes/weights are in [design-system.md#theme](design-system.md#theme).

### Loop companion

Loop is separate from the R logo/app icon. Expressions are variants of one character, not additional mascots.

| File | Use |
| --- | --- |
| [loop-mascot.svg](../src/assets/icons/loop-mascot.svg) | Neutral vector |
| [loop-mascot.png](../src/assets/images/loop-mascot.png) | 512×512 RGB PNG reference/export |
| [loop-sad.svg](../src/assets/icons/loop-sad.svg) | No results, interrupted scan, List empty |
| [loop-happy.svg](../src/assets/icons/loop-happy.svg) | Ready completion |
| [loop-scanning.svg](../src/assets/icons/loop-scanning.svg) | Available scanning artwork; finalized Discovering keeps its approved neutral rendering |

Use vectors for scalable transparent rendering. [Motion/Loop rules](design-system.md#motion-and-loop) and [onboarding placements](product-screens.md#onboarding) own sizes/animation. [Celebration assets](design-system.md#celebration-assets) describe the four-second one-shot JSON and looping reference GIF; native runtime validation remains pending.

### Platform assets

[Platform mark inventory](design-system.md#platform-assets), [catalog identity/link contract](product-specification.md#platform-catalog). Service marks are identifiers, not Renewless branding. Unknown/ambiguous platforms use a neutral fallback; never generate a misleading brand mark. Manual service suggestions remain text-only.

<a id="celebration-assets"></a>

## Celebration animation assets

`src/assets/animations/ready-celebration.json` is a transparent Lottie composition: 390 × 844, 60 fps, 4 seconds, 60 confetti particles and two animated vector poppers. Play once (`loop=false`) on Ready entry, with an absolute overlay outside content padding and no pointer events. Skip when Reduce Motion is enabled. No external assets, fonts, expressions or emoji required.

This is a portable vector adaptation of the CSS prototype, not an exact export of its platform emoji. The prototype still runs CSS. JSON parsing and layer/timing checks pass; native Lottie playback and device aspect-ratio behavior still require integration validation. Preserve corner origins when adapting to other aspect ratios instead of adding safe-area inset to the overlay.

`src/assets/animations/ready-celebration.gif` is a 390×844, 4-second looping preview rendered from the JSON vector geometry and keyframes, with the brand charcoal background (GIF does not support smooth alpha). It is an animation-only preview, not a recording of the full screen or native Lottie renderer. Use the Lottie asset for one-shot in-app playback.

<a id="platform-assets"></a>

## Platform mark provenance

SVG service marks sourced from Simple Icons CDN (https://cdn.simpleicons.org), downloaded 2026-10-26. Icons: Netflix, Spotify, iCloud, Gmail, Figma, Notion, Duolingo. Simple Icons artwork is distributed under CC0; brand trademarks remain their respective owners'. These are service identifiers, not Renewless branding.

Canonical platform assets live in `src/assets/platforms/`. The self-contained HTML preview mirrors them in prototypes/renewless-studio/dist/assets/platforms. Google/Apple authentication marks remain in the existing social button helper. Unknown services retain the initial fallback.

Gmail updated to the multicolor 2020 Google mark from Wikimedia Commons: https://commons.wikimedia.org/wiki/File:Gmail_icon_(2020).svg (2026-10-26). This replaces the monochrome Simple Icons Gmail asset.

## Alerts and account reminder controls — approved 30 October 2026

Alerts gear uses the existing 44px graphite icon surface. Sent rows use logo/name, event copy, timestamp and chevron; semantic blue for trial wording. Date-group labels are quiet gray. Alerts rows use 72px minimum height, 10px vertical / 12px horizontal padding, 34px logo surface and 14px corner radius; 3px internal text gap and 13px group spacing. Expand for accessible text sizing. Empty Alerts uses one small calm Loop with compact Manage reminders.

Account settings use grouped graphite rows, mint On switches, disabled subordinate controls under master Off, shared single-select dropdowns and a pinned mint save button. Switches expose proper switch semantics, visible focus and a label; Off preserves the saved subordinate values. Custom/time errors sit immediately below their input. Bulk confirmation reuses graphite `#25282C`, dim/2px blur background, mint rounded-square checkbox, focus trapping and explicit count/actions. These styles are scoped to Alerts/settings and do not restyle locked screens. The full Alerts family is finalized/locked in Product screens; changes require scoped unlock.

## Design Studio approval badges

Studio navigation only: small 14px outlined lock after finalized screen names; partial locks use amber lock + Base text with tooltip/accessibility label. Pending screens have no badge. Keep labels readable, retain click/search/navigation behavior, and synchronize the badge map with the Product screens lock register. This metadata does not alter the phone UI or imply implementation completion.

## Reusable mascot view

`dist/mascot.js` exposes `mascotView({expression, size, artworkScale, halo, label, className})` for permitted preview placements. Expressions reuse the bundled neutral/sad/happy/scanning vectors. Defaults: 108px circular view and 1.05× full SVG canvas; artwork contains intrinsic whitespace. Flex center the SVG with `flex:none`, explicit dimensions and no inherited max-width; oversized canvas must not create a grid track that shifts it down/right. Circle and artwork size are independent. No change to the vector geometry or logo.

Static/decorative by default (`aria-hidden`); provide a meaningful label only when the illustration needs an accessible name. Keep essential status in visible text. Expression falls back to neutral; sizes are bounded and labels escaped. Alerts empty uses neutral, 108px halo and 113px SVG canvas, centered. Existing locked onboarding/List renderings stay unchanged; finalized Alerts framing is also locked; any migration that changes their appearance requires scoped unlock. Reuse this component for future mascot placements rather than new one-off halo/image CSS. Native implementation should mirror the same component contract and approved assets.

## Profile components — approved scope, 30 October 2026

Finalized Profile uses a compact 44px initials avatar, wrapping identity text and a graphite Edit icon. V1 has no plan card, Upgrade, Pro badge, cap meter or Manage/Restore controls; connected inboxes follow the account header. Connected Gmail has its actual sync-state text/dot, never color alone. Menu rows use 27×29px muted icon surfaces, minimum 48px row height, 12px labels, quiet 9px support text and chevrons; grow for accessibility. No large personal-details/payment-summary cards. Scroll padding keeps final actions above tabs.

Logout/disconnect confirmations use graphite/blur, explicit affected scope, Cancel and restrained destructive action; dialog focus is trapped and returned on cancel/Escape/outside. Edit profile reuses shared labelled controls/dropdown, field-local errors and dark date input. Styles are scoped to Profile; existing locked Alerts/Reminder settings and other screens are unchanged.

Profile variants and Edit profile are locked as approved 30 October 2026. Linked Connected inbox details/imported subscriptions are separately approved and locked 31 October 2026; Change password is separately approved/locked 30 October 2026. Shared-component changes affecting the locked Profile layouts require scoped unlock.

## Connected inbox review refinements

Center logo/email, use semantic text+tinted status (amber paused, mint synced, blue syncing, coral reconnect/failure). Imported count is a full-width 44px-minimum clickable row with chevron; it opens a separate compact logo list. Read-only uses the existing inline info trigger, graphite-green popup and blur/inert treatment; connected-screen-only positioning prevents clipped disclosure. Loading has an accessible status and disabled main action, with static fallback under Reduced Motion. Profile’s locked card styles and all existing locked tooltip placements remain unchanged.

## Change password — approved 30 October 2026

Scoped `.change-password-review` / `.cp-*` styles: 44px compact password inputs, explicit labels, separate 44px eye controls, quiet guidance and field-local errors. Small shield/intro, normal field gaps, graphite surfaces and white visibility glyphs. Bottom mint Update password stays pinned with safe-area clearance; scroll content reserves footer space. Pending feedback disables duplicate submits without trapping Back. Social-only state explains provider-managed credentials. This finalized/locked screen does not restyle locked Auth/Profile controls. Further design changes require explicit scoped unlock.

### History row and empty state

Final History uses `subscriptionCard` shared with List. History supplies lifecycle-date content and last-price metadata; compact 34px logo, gray Cancelled/red Expired text plus explicit status words. The entire row is the details tap target. No color-only semantics. Shared `mascotView` uses a 108px halo for neutral empty/sad no-match states with centered artwork. History status filtering reuses the List graphite dialog and checkbox-row treatment, dim/blur backdrop, live multi-selection and Done/close/focus containment. Only All, Cancelled and Expired appear; no single-select/date/category controls. History upper spacing is compact; this scope was reapproved and locked 30 October 2026. See [History](product-screens.md#history).

### Payments components — approved 31 October 2026

[Payments](product-screens.md#payments) composes the shared subscription-row shell with payment-specific metadata. Shared Year/Month single selects, flat rows with a 34px platform logo, full payment date/source, amount/currency and mint Confirmed text; keep historical prices distinct from confirmed payment amounts. Compact solid graphite (#25282c) summary separates currencies and labels the selected period. A full-width graph below the amount displays six monthly columns per currency with clear labels, whole-column tap areas, 44px paging arrows and a live month/amount reading. Mint marks the inspected column; chart taps do not filter the list or change period totals. Previous/next pages Jan–Jun/Jul–Dec within selected year; zero baselines remain visible. Month dropdown exclusively filters the list. Avoid repeated month-group headings. Reuse `mascotView` with a 108px halo (neutral empty, sad search no-match) and a compact contextual action. Payment-details dialog uses graphite, dim/blur, focus containment and explicit source explanation. Styling is scoped to Payments; approved List/History/Profile do not change. Period/chart/row layout remains approved; Gmail source/copy and Detail receipt-context navigation were reapproved and relocked 31 October 2026.

### Connected inbox — approved 31 October 2026

[Connected inbox and imported subscriptions](product-screens.md#connected-inbox) are locked: centered Gmail identity, semantic connection-state text/tint, compact facts, shared read-only info tooltip, imported-record list/mascot and disconnect confirmation. Reconnect takes priority; eligible sync actions retain pending/error states. No Explore Pro promo or separate Pro inspection screen. All v1 scans/sync and extra inboxes are free; connection/job state alone determines available controls.

### Detail receipt-first design — approved 31 October 2026

Locked Detail refinement: event/date/timing inside identity card, compact billing rows, independent tracking explanation, compact receipt-history navigation, creator/scanned email and actual inbox sync context, verified provider external link, notes and related-platform link. No large Payment confirmation panel or user mark-paid/upload sheet. Reuse established logo/status/reminder components; styles stay under `.detail-review`. Provider destinations verified against [Netflix Help](https://help.netflix.com/en/node/407) and [Spotify Support](https://support.spotify.com/by-en/article/your-plan-details/) on 31 October 2026.

### Cancelled Detail resume sheet — approved 31 October 2026

One full-width pinned Track again action replaces the two-action footer for Cancelled Detail. Graphite bottom sheet: amount/currency/cycle, next renewal date, shared Reminder select and a single Resume tracking button. Hide the entire Reminder field when no advance timing fits; reveal it for a future date, keeping Off as a choice. Small provider-reactivation disclaimer, field-local errors, safe area and keyboard handling; existing centered logos/statuses remain unchanged. Native/backend loading and disabled submit mirror a real mutation; browser preview only updates local state.


<a id="authenticated-gmail-composition"></a>
### Authenticated Gmail composition — Final and locked, 31 October 2026

Reuse the existing rounded-square selection control (one mint tick, dark unchecked background), catalog logos, `mascotView`, white date indicators and `selectField`. Keep onboarding and locked Connected inbox styling unchanged. `dist/gmail-review.js` owns authenticated scan/review/recovery composition and draft sheets; `.gmail-*` CSS is scoped under `.phone`. Header uses compact Back/title/Gmail identity and an inbox switcher; no onboarding steps. Selected summary separates count from per-currency new-plan monthly equivalents. New/updates use compact divided rows; duplicate disclosure is informational. Commit is pinned above safe area, results scroll clear of it. These approved views display one Final frame with fictional/runtime limitations outside the phone and a lock badge beside each named state in the studio library.

Scanning uses the shared scanning Loop in an unchanged 132px halo with `artworkScale: .78` (103px SVG canvas, down from 139px); the outer 144px orbit remains unchanged. The completed happy expression retains its original `artworkScale: 1.05` (139px SVG canvas) inside the same halo. Keep a slow orbit and small stage spinner; checklist success has a single tick. Recovery uses neutral/sad Loop in a 140px halo. Reduced Motion disables rotation. Sheet graphite is `#262A2D`, with neutral border, 7px blurred/dimmed backdrop, compact close button, bounded inner scroll and safe-area padding. Trap/restore focus, inert underlying phone, Escape/outside dismissal; nested selects keep their established positioning and keyboard semantics. No new mascot artwork or locked placement is changed. Exact approved arrangements/actions and lock scope: [Product screens](product-screens.md#authenticated-gmail). Native reduced-motion, larger-text and keyboard sizing remain integration checks.


<a id="widget-composition"></a>
### Home Screen widget composition — Final and locked, 31 October 2026

`dist/widget-preview.js` and `.wk-*` styles own an isolated Home Screen study: small square and medium wide solid graphite tiles with roughly 25px corners, mint Renewless mark, shared platform logo, white text and semantic mint/coral/blue event accents. Use a soft charcoal/sage CSS wallpaper, restrained decorative app-icon/dock shapes and a cream calendar reference to show Home Screen scale; these are preview context rather than new app screens. Only the Widgets frame receives this wallpaper/content treatment. Locked app surfaces and the common mascot implementation remain unchanged.

Reuse `mascotView` for the happy Loop knocking avatar, settled medium mascot and quiet state. Door, hand and knock marks are local code-native SVG/CSS shapes. Short one-shot sequence: three hand taps/body lean/knock marks, slight door opening, fade into facts; total under 2 seconds. No audio, looping GIF, continuous rotation or forced recommendation change. Studio Replay restarts the study. Refresh/animation triggers finalized 31 October 2026 target a new relevant presentation approximately every 3–4 hours plus important event changes; use the same short knock only when iOS actually renders a supported changed state. No exact-time, every-unlock or every-Home-Screen-entry promise; missed updates do not accumulate replay bursts. Keep the quiet state calm and static. The browser replay is a manual motion inspection, not a scheduler. Reduced Motion removes the illustration sequence and exposes final facts immediately. Native adaptation uses supported data-update transitions and keeps facts readable even when motion is suppressed; this browser sequence does not guarantee identical OS rendering or animation on Home Screen entry. [Apple guidance](https://developer.apple.com/documentation/widgetkit/animating-data-updates-in-widgets-and-live-activities) owns platform limits.

Small and medium layouts share event content; full-tile tap targets and accessible labels include service, event timing, currency/amount without decorative scene noise. Actual device-family sizes, text scaling, VoiceOver, tinted/Always-On appearances, snapshot privacy and native timeline behavior require implementation checks. External preview controls/disclosure stay outside the simulated Home Screen. Visual/motion design and the refresh/animation trigger policy are finalized and locked in [Product screens](product-screens.md#widgets), approved 31 October 2026. Native integration remains deferred.


<a id="ai-text-composition"></a>
### Loop text/voice chat — LOCKED, approved 31 October 2026

`dist/ai-text-chat.js` and scoped `.ai-*` styles render AI chat/AI chat · trial/Voice through shared `aiChatHeader`/`aiChatComposer` functions. Back uses a 21px stroked SVG chevron centered in the existing 44px control. Compact fixed header/composer surround a separately scrolling conversation. User messages: right aligned `#BDDBA0` background with `#1A281D` text; Loop: left aligned `#252C2E`, existing primary text and subtle border. Speaker labels and distinct alignment supplement color; rounded bubbles have a smaller speaker-side bottom corner and wrap long text. No debug/upload/model explanation beneath the phone composer; inspection controls and runtime disclosure stay outside the phone.

Composer uses graphite surface, neutral/mint focus border and a growing one-to-four-line textarea. Empty input shows attachment + microphone icon controls; meaningful text shows one mint Send control. Draft typing remains available while Send is disabled for pending/failed work. Safe area/keyboard clearance, touch targets and text scaling must be validated natively. Three small mint thinking dots bounce with staggered offsets; Reduced Motion stops their movement. The production indicator follows a real request, not the browser’s scripted timer.

One compact draft card reuses platform logos and semantic trial/date/money meanings: identity/readiness on the left, amount/cycle aligned right, a two-column grid for event/category/start/trial tracking and a single bottom Add action. All relevant values are visible without a disclosure. Hide empty optional fields; populated notes use a full-width wrapping row. Keep required missing-value prompts visible. Readiness, pending, Added and Retry use text as well as visual treatment. A floating New message ↓ control appears only while new responses arrive off the current reading position. All styles are isolated from approved layouts; Voice now uses this same shell/draft layout rather than a separate basic summary. Common mascot and approved app components remain unchanged. [Product screens](product-screens.md#ai-text-chat) owns approved text/voice scope and interaction details; attachment interactions are separately approved 31 October 2026, and native/API readiness is separate from design approval.

Voice player/hold-recording composition: `dist/chat-voice.js` exposes one audio-bubble component for sent messages. Mint user bubble, circular 44px play/pause, actual-amplitude waveform with progress tint, accessible transparent seek overlay/focus ring, elapsed/total time and no visible transcript. The recording composer uses a graphite hold panel with status dot, elapsed time, animated waveform, held-mic visual and slide-left/release guidance. Hold records, release sends, slide-left cancels; no Ready/Discard/Send confirmation or recording Pause/Stop controls. Preserve unsent typed text on cancellation. Media events drive state; no decorative fake playback timer. Recording UI is previewable through press-and-hold: coral dot/timer, animated mint waveform, active mic and Slide left to cancel / Release to send guidance. Cancellation uses coral feedback and sends nothing. Reduced Motion removes dot/bar animation. Actual capture/native permissions remain deferred; the timer and matching-duration fictional audio are a simulation, explicitly disclosed outside the phone.

Voice fixture provenance: `dist/assets/voice-subscription-preview.wav` was generated locally with macOS speech synthesis at 175 words/minute from the fictional Duolingo subscription sentence. Mono PCM, 22,050 Hz, 16-bit, approximately 7.786 seconds; 40 amplitude buckets derived from its PCM samples are embedded in `chat-voice.js`. It is a public prototype example, not private user audio or an AI transcription. The static fixture is retained as a repository asset; real-user media follows the separate temporary-local/server-deletion contract.

Recording preview uses shared `aiRecordingComposer` within the bottom-docked chat shell. Capture the pointer on the stable phone/container while replacing its original mic button. CSS disables touch callouts/selection on the hold target. A meaningful release (at least 300ms) submits once; a leftward 72px threshold or gesture interruption cancels. Keyboard Space/Enter hold/release and Escape cancellation supplement pointer input. These are approved prototype gesture thresholds; native accessibility/device behavior still requires validation. Timer continues for the hold; source speech is repeated if necessary to create a matching-duration fictional clip instead of an eight-second auto-send. Production media limits, consent and lifecycle handling remain integration work.

<a id="subscription-card"></a>
### Shared tracked-subscription card — approved 31 October 2026

`subscriptionCard(record, options)` in `dist/app.js` is the single full card renderer for List populated states, Platform subscriptions, Inbox subscriptions, History, Home upcoming subscriptions, This month and Calendar next/day rows. It composes the existing `subscriptionRowShell`; scoped `.subscription-card` styling owns the 34px logo, 14px name, semantic status/date text, right-aligned amount/cycle, consistent compact padding, wrapping and full-row tap target. Optional plan/context lines distinguish related records. Wrappers own grouping, rounding and separators. Calendar overview uses a compact row spacing variant to preserve its no-scroll layout. Do not reimplement these cards per screen.

Pass status, timing, amount caption and stable-ID action attributes as data. History keeps cancellation/expiry/access dates and Last price; scheduled event rows retain projected/trial labels and No charge scheduled when expectedCharge is false. These variants never imply a confirmed payment. Imported inbox scope and platform/record IDs remain unchanged. Payments, sent Alerts, selectable scan candidates, AI draft cards, platform-spend aggregates and widget/hero compositions retain their own content types; a shared outer row shell does not turn receipts or unsaved candidates into tracked subscriptions. Native implementation should expose one subscription-card component with these explicit variants, not duplicate screen markup. This card-only replacement was explicitly authorized and relocked by the user; other locked layout/navigation remains frozen.

<a id="header-back-button"></a>
### Shared header Back button — approved 31 October 2026

`backButton({to, attributes, label, className})` in `dist/app.js` owns every header Back control. `btn()`/`heading()`, onboarding/recovery and custom Profile, Reminder settings, Gmail, Payments, Platform and AI headers all delegate to it. Use a 44×44px graphite #24292C surface, 12px corner radius, subtle white border and primary-text chevron. SVG frame is 21×21px, viewBox 0 0 24 24, path `m15 6-6 6 6 6`, 1.7px rounded stroke; both artwork and frame are centered. No text arrow glyph or per-screen icon copy. Shared scoped CSS overrides legacy header-specific dimensions; hover/pressed and focus states remain visible.

Keep the original destination or action attribute and contextual accessible label. It is a native type=button; decorative SVG is aria-hidden and non-focusable. Only this control's appearance/reuse was unlocked and relocked; header titles, layout, existing back behavior, close controls and month/chart paging are outside the change. Pending screens may reuse the finalized component without receiving whole-screen approval. Mobile should expose the same shared Back control while retaining each route's existing navigation behavior.

<a id="ai-image-composition"></a>
### AI Image/PDF attachment composition — Final and locked, 31 October 2026

Reuse the locked chat header/composer/bubbles/dots/draft card and shared Back control. Paperclip opens a full-width graphite bottom sheet: 2 compact 74px rows for Image (photo icon) and PDF document (file icon), quiet format-purpose text, 44px close, backdrop blur/dim, focus containment and cancel/return. No video action. Picker/preview are attachment-only states; ordinary empty/text/voice geometry is preserved.

Selected file: compact graphite row with image thumbnail or PDF tile, wrapping/truncated filename, verified page count only and 44px Remove. Optional caption follows; Send appears for a file even with no caption. Sent image uses compact crop plus full-preview affordance; PDF uses a mint document bubble with icon/name/metadata and View document. Reading image/Reading PDF shares existing dots/Reduced Motion. No oversized second summary or auto-add.

Preview uses a bounded graphite-green modal, existing close/dim/Escape/focus conventions. Trusted PDF fixtures display actual rendered pages with Previous/Next/count and Open PDF. Personal PDFs may open in the browser viewer without a fabricated page count; native reader/zoom/cloud-provider/download/HEIC conversion remain integration requirements. Errors use clear text and Retry/Remove/Choose another file. Protected status asks for an unlocked copy without a password form.

One active compact draft retains all candidates and each correction/Added state. Statement draft displays Observed charge/date and Bank statement/page provenance separately; planned price/cycle/renewal require review. Known catalog IDs supply normal brand logos. Possible existing matches use a quiet context panel and a sheet of the shared `subscriptionCard` rows; View existing or explicitly Separate plan, no silent overwrite. Exact provider identity offers existing-plan review only. Unresolved platform asks for service name or explicit pending-name confirmation; no invented logo/link.

`dist/chat-attachment.js` owns these components, local media lifecycle and deterministic fixtures. Original SVG receipt examples remain. Real fictional PDFs: `output/pdf/renewless-demo-receipt.pdf` (1 page), `output/pdf/renewless-demo-bank-statement.pdf` (2 pages), copied into dist/assets as `attachment-receipt.pdf` / `attachment-statement.pdf`. Rendered `attachment-receipt-page-1.png` and `attachment-statement-page-1.png`/`-2.png` come from these PDFs, generated with ReportLab and visually verified via Poppler. No real customer/bank data; demo marking is part of the fictional source documents. Protected-PDF outcome uses a normal statement fixture to simulate an error, not an encrypted-file/parser test. Exact approved scope: [Product screens](product-screens.md#ai-attachments); native/API/retention: [document contract](api-mobile-contract.md#ai-image-contract).

### Add/Edit trial form extension — final and locked, 31 October 2026

Reuse the existing single-select and approved manual input/footer styles. Trial days has No trial, 3/7/14/30 days and Custom. Conditional Custom and required Start date show errors below their own input; valid corrections clear errors. A compact 12px date summary sits 10px below the Start date field and uses graphite/neutral when incomplete and subtle mint border/text when calculated; no separate large card. Auto-renew switch reuses the existing 44px label target; explanatory copy reflects On versus Off and separates tracking from provider settings/payment. Notes follow in the same form, pinned save remains. Both Add/Edit use trialFields/trialFormSummary/syncTrialForm in dist/trial.js; shared styles target this extension only. [Screen contract](product-screens.md#tracked-trials).

<a id="native-components"></a>
## Native component handoff — approved prototype mapping, 31 October 2026

Build one RN component system against the final HTML reference. Existing Header, Container, InputField, SubscriptionCard, InfoTooltip, OnboardingHeader/Title/Button and icon components are migration starting points; inspect parity before reuse. Do not duplicate a screen/component for a sample empty/trial/error state. The [mobile blueprint](api-mobile-contract.md#mobile-implementation) owns adapters, state, storage and installation checks; this section owns presentation/component responsibilities.

| Shared component / target | Contract and consumers |
| --- | --- |
| Existing `Container` with header/footer/scroll slots; shared pinned-footer composition | Safe-area aware background, light status-bar content, scroll vs fixed composition, measured bottom content clearance for tabs/actions/keyboard. Scroll content must never hide the final field behind an overlay footer. |
| `Header` / `BackButton` | Approved 44px graphite Back target and shared glyph, title alignment and optional existing right action. One navigation callback; same behavior for native swipe/Back. No new + on restricted screens. |
| `AppTabs` | Home/List/Calendar/Alerts/Profile order, active mint/inactive gray, solid theme fallback and approved navigation material only where supported. Screens include measured tab inset; no center Add/FAB. |
| Existing `InputField` extended with password/date/search/multiline variants; shared OTP composition | Existing approved sizes/gaps, correct autofill/keyboard, visible field label, invalid/disabled/pending state, field error association and focus. Date-only native picker shows a light calendar glyph; no browser date input. OTP is one logical six-digit field with signup/reset purpose. |
| `SelectField`, `StatusFilterDialog`, `InfoTooltip` | One single-select state/placement/highlight/checkmark system; multi-select status is a separate shared dialog with All and semantic counts. Info uses adjacent icon and graphite-green bounded view with blurred/dim background. Do not use untinted platform select popups that change approved design. |
| `SubscriptionFields` | Single implementation for Add/Edit with text-only max-four service suggestions, Amount/Currency pair, cycle/category, Trial days/custom/start/end/tracking, visible Notes, pinned save. Summary sits 10 logical px below Start date. Editing populates same model without resetting source/notes/exact end. |
| `SubscriptionCard`, `PlatformLogo`, `StatusBadge` | Same canonical row variants across List/Home/Calendar/day/month/platform/inbox/History; stable ID callbacks. History uses Last price/lifecycle; events use renewal/trial/count semantics. Platform assets come from trusted catalog resolution, no guessed remote logo/link. |
| `MetricCard`, `SpendBars`, `MonthBars`, `ProgressGauge` | Reuse money/date formatters and SVG primitives. Selected-month bar touch regions cover the whole column, with visible/accessible month+amount. Keep monthly equivalent, scheduled charge and confirmed-receipt totals distinct. |
| `LoadingSkeleton`, `EmptyState`, `MascotView`, `RequestError` | Appropriate real pending/empty/error state, approved Loop variant/scale/framing, actionable compact buttons, static Reduced Motion fallback. Never show empty until successful empty response. |
| `AppSheet`, `AppDialog`, `OverlayHost` | Single active blocking layer, semantic heading, close/outside/Back dismissal, dim/blur, focus trap/return and keyboard handling. Shared host anchors AddSheet to the screen edges; Status filters remain centered. |
| `ChatMessage`, `ChatComposer`, `TypingIndicator`, `AiDraftCard` | Shared text/voice/file rendering, growing/pinned composer, blank attachment+mic versus text Send, real processing dots, compact full-field review, correction/retry/Added state. Voice capture and file lifecycle stay in adapters, not layout components. |
| `AttachmentChooser`, `FilePreview`, `VoiceMessage` | Exactly Image/PDF, no video; contained image/multi-page PDF preview, remove/replace/retry, protected/corrupt/error feedback. Hold/release/send or slide-left cancel uses real recorder state and accessible equivalent interaction tested without introducing a new visual flow. |
| `OnboardingHeader/Title/Footer`, `ReadyCelebration` | Shared five-step header and approved fixed/scroll policy, centered Loop, one-shot lower-corner poppers/celebration. Ready uses saved result/account name, never Alex/USD fixtures. |

Use canonical RN logical tokens and font families/weights; preserve bundled Raleway licenses and logo/mascot SVG sources. Set font scaling/accessibility deliberately and test long names, wrapped emails, multiple currencies, locale date strings and numeric amounts. Native picker/calendar symbols, keyboard return actions and system permission views are platform-specific; app containers/labels remain consistent.

Calendar overview remains no-scroll at the approved reference size; size grid/summary/card from available measured height, including six-week months. Preserve the selected day and full day tap targets. If safe areas/Larger Text/small devices cannot meet the approved fixed layout accessibly, record the conflict and request a scoped review rather than clipping content or silently changing the design. Similar checks apply to no-scroll Save/Ready. Lists/chat use virtualized scrolling; bounded forms/dialogs use keyboard-aware scroll where required. Avoid a global scale transform or fixed screenshot-height phone frame in native screens.

Assets/motion are reused rather than regenerated. Lottie-format celebration JSON/GIF and Loop variants exist, but JSON rendering, haptics, native blur/material fallback and widget motion require actual native proof. Respect OS Reduced Motion/transparency, pause/cancel decoration on unmount/background and never delay a real request to prolong an animation.


<a id="native-implementation-rules"></a>
## Native token and reuse rules — confirmed 31 October 2026

These rules govern native implementation of the locked design, not new visual approval. The existing theme owns values; screenshots specify appearance, not permission to scatter literals through code.

- **Sizes:** screen/component styles and JSX use `SIZES` for nonzero padding/margin/gap, width/height, radii/borders, icon/touch sizes and type/line spacing. Prefer the existing `padding` (20), `padding2` (12), `padding3` (8), control/button and typography tokens where they represent the intended value. Add generic tokens for missing approved dimensions; do not force an unrelated 44-unit control height through a padding multiplier. Exact approved values, including the 10-unit trial-summary gap, become shared theme tokens. No per-screen magic arithmetic or rounding to a nearby value that changes the design.
- **Responsive layout:** flex, measured available space and safe-area/keyboard insets determine containers. Centralize calculated geometry in a shared helper; do not use initial `Dimensions.get` height as a permanent device/keyboard height. Zero, flex/aspect ratios, percentages, animation time/progress and vector coordinates are not pixel-size violations. Border widths and letter spacing are visual dimensions and need tokens too.
- **Colors:** all UI color/background/border/shadow/icon values reference the theme. Add new values there first with generic semantic names such as `surface_raised`, `border_soft`, `text_secondary`; no `welcome_*`, `found_card` or other screen/panel-specific names. Existing `receipt`, `found_card`, `total_card` and ambiguous aliases such as `text_white` require a value-preserving naming/usage audit during migration. Preserve public exports until imports are migrated; `COLORS` and the `colors` alias must not become competing palettes. Opacity variants also belong in the theme. `transparent` is already a theme token. Provider logos retain licensed brand colors; app-themed SVG tints are shared inputs rather than per-screen literals.
- **Reuse first:** extend `CustomButton` with typed visual variants, leading/trailing icon and pending state instead of independent onboarding/social/button implementations. Extend `InputField` for the approved password visibility, date/search/multiline and error/focus APIs; compose a single-select trigger from it with the shared select overlay. Extend `Header` with the approved icon Back and optional actions, and let `OnboardingHeader` compose its primitives. Extend `Container` with explicit header/body/footer slots, keyboard handling and scroll policy rather than adding a second generic screen wrapper. `CustomText`, `RowView`, `Icons`, `SubscriptionFields`, `SubscriptionCard`, `InfoTooltip` and `StateView` remain starting points. Add a new primitive only when the responsibility is distinct (for example recorder lifecycle or shared overlay host); do not recreate existing controls for one screen.
- **Compatibility:** typed variants must keep existing defaults until all consumers migrate. One shared change is verified across all affected views; reusing a component never permits silent changes to locked layout, copy or behavior. Presentational components render supplied data; backend jobs, authorization and media lifecycles stay outside them.

### One onboarding host and animated panels

Implement one native `Onboarding` host, using the existing Container/Header/Title/Button primitives. Header/step rail remains mounted above the body and does not slide or scroll with panels. Keep the footer in a stable safe-area-aware region; each step supplies its approved actions. Respect step-specific no-scroll/scroll rules already defined by Product screens. Only outgoing/incoming body content animates, with short directional translate/opacity transitions; derive offsets from measured content width. No new animation package is required solely for this transition; React Native Animated is sufficient. Reduced Motion replaces translation with an immediate or restrained opacity transition. Keep progress, focus and screen-reader announcements aligned with the newly active panel; inactive outgoing panels cannot accept taps or accessibility focus.

Use a typed step/state configuration, not nine copies of a full screen or one unstructured component containing all logic. Panel components may live in separate files; they are not separate native routes. Back follows the approved logical predecessor. No swipe-to-advance past consent, unfinished scan, zero-selection review or uncommitted import. Going to auth and returning restores the owned step/selections; job state survives animation/unmount and process recovery follows the backend ownership contract. Existing public inspection hashes and authenticated Gmail screens are unchanged.

Current code does **not** yet satisfy this rule: OnboardingHeader is recreated in each route; its dimensions are raw literals; OnboardingButton duplicates CustomButton; InfoTooltip is an in-layout popover without the approved modal/blur host. See the [source gap audit](api-mobile-contract.md#native-parity-audit).


### Native frontend delivery discipline

For the section-by-section mock frontend phase, preserve the existing component APIs where compatible and adopt the NOMW-derived presentation/hook/style split with Renewless TypeScript. Synthetic entities and scenarios belong to the shared config/service boundary, never visual components. Reusable components receive typed view data/callbacks and own no fixture imports or server credentials. Theme-only dimensions/colors and one persistent-header onboarding host remain mandatory. [Naming and mock contracts](api-mobile-contract.md#frontend-mock-phase) and [section order](product-specification.md#frontend-delivery-plan) own implementation details; visual locks remain unchanged.
