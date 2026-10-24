# Renewless motion, materials and Loop (locked)

Approved 24 October 2026. Complements [theme.md](theme.md) and [product-screens.md](product-screens.md). The rounded R logo, Raleway, graphite palette and feature scope stay unchanged. This document supersedes the former flat-only tab-bar rule and adds one limited mascot exception to the no-illustration-set rule.

## Interactive reference

Open [motion-preview.html](motion-preview.html): tap a subscription, go Back, open `+`, and tap Loop on Alerts. This is a browser motion study with sample data. Its glass is an approximation, not native Liquid Glass. Controls do not save real data. The abbreviated screens do not replace the full product specification. Preview-only controls/copy such as “tap to say hello” are not required production UI.

Approved: the card-to-detail movement, restrained floating glass navigation, Add-sheet motion, and Loop concept. Native rendering, interruption handling and platform integration must be validated during implementation. No mobile runtime integration has been completed by this documentation work.

## Subscription card → Detail

1. On tap, the selected card moves from its exact on-screen position and expands into the top Detail hero, below the safe-area/back controls. Keep the name, monogram and amount visually continuous.
2. Animate position, bounds and corner radius together over **350ms**; acceptable tuning range **300–350ms**. Use a smooth deceleration, without overshoot or bounce. Do not stretch glyphs to create the expansion.
3. Reveal remaining Detail fields with a short **180ms** fade and at most 8 logical units of upward movement as the hero settles.
4. Back reverses the hero into the original row. Preserve the originating tab, search/filter state and list scroll position.
5. Share by stable subscription ID. Support Home, List and History entry points where a source card exists.
6. For push/deep links, missing or off-screen source rows, changed filters, deleted subscriptions or an unavailable measured target, use standard native navigation/fade. Do not fly the card toward a guessed location or force-scroll the list.
7. Already-loaded summary data supplies the hero immediately. Load remaining fields independently; loading/error states must not block Back. Never leave a blank duplicate card or overlay behind.
8. Guard repeated taps; cancel or reverse cleanly during interactive back gestures. Restore visibility, focus and touch handling if interrupted.

With Reduce Motion, skip travel, scaling and expansion; use a brief opacity transition or immediate state change. Keep all information and navigation available.

## iPhone materials

Use **real native Liquid Glass on supported iOS/runtime configurations**, rather than presenting a blur imitation as the native material. Confirm SDK, OS availability and React Native integration in a small platform prototype before broad adoption.

| Surface | Approved treatment |
|---|---|
| Bottom navigation | Floating dark native glass surface with four tabs; mint selected label/icon and system selection treatment |
| Back/header controls | Native glass treatment where supported and appropriate; keep controls readable |
| Header `+` | Retain the bare mint-lime action and 44 minimum hit area; no custom glowing circle |
| Add sheet | Native sheet presentation; dark readable menu surface, system material only where appropriate |
| Dashboard, subscription rows, Detail fields, forms | Solid graphite/card surfaces from the theme |
| Primary Save/Create buttons | Solid mint-lime with graphite labels |

The four tab labels and destinations remain Home / List / Alerts / Profile. Account for the floating bar and bottom safe area so it never covers the final list row or form action. No center Add tab. System glass highlights/reflections are permitted; decorative gradients/glow in app content remain excluded.

Older iOS and Android use matching solid graphite surfaces with appropriate platform transitions. Do not require glass support for any feature. Honor Reduce Transparency, Increase Contrast and platform appearance preferences; use an opaque readable fallback where necessary. No stacked custom glass layers on every card.

References: [Apple materials guidance](https://developer.apple.com/design/human-interface-guidelines/materials), [Liquid Glass overview](https://developer.apple.com/documentation/TechnologyOverviews/liquid-glass).

## Motion inventory

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
| Recommendation rotation | 180–240ms crossfade only when existing product rules trigger rotation |
| Keyboard/focus | Native coordinated movement; focused field and primary action remain accessible |
| Loop reaction | One brief blink, small nod or tiny wave; approximately 250–600ms |

No splash delay, rolling money counters, perpetual pulsing, confetti, screen-wide bouncing, automatic carousel, or repeated list entrance animation. Haptics respect platform support and system preferences, and are never the only confirmation. No repeated haptic on every row or tab.

## Loop mascot

**Loop** is the approved companion concept: a soft, slightly asymmetric open renewal loop with two small eyes. Mint-lime `#B9E58C`, graphite negative space, simple readable features. Friendly and quiet; not a generic robot and not a copy of another brand's character. Maintain the opening that communicates a renewal loop. Production vector: [loop-mascot.svg](../src/assets/loop-mascot.svg), with a transparent background and approved mint-lime for loop and eyes. The original JPG is a shape reference, not a production color source.

- Loop is separate from the approved rounded R logo; it does not replace the logo, wordmark or app icon.
- Use a small flat vector-style rendering. No glossy 3D, gradients, neon glow, large illustration scenes or additional mascot cast.
- Maintain legibility on graphite; keep eyes and body clear at small display sizes.
- Browser reference is the approved concept/motion guide. Prepare a scalable production asset and animation states during implementation; the CSS study is not a final native animation asset.

### Placements and states

| Placement | Expression / response |
|---|---|
| Empty subscriptions | Friendly neutral face; support Add manually / Connect Gmail actions |
| Empty Alerts | Calm neutral face; “No alerts yet” remains primary information |
| First subscription saved | Single small nod/blink; success remains visible as text |
| No upcoming renewals | Relaxed expression, only in the appropriate empty-state area |
| Future AI chat | Small assistant avatar within the existing AI phase, not a new always-on bot |

Use only where there is space and purpose. No mascot on every subscription row, persistent floating overlay, obstruction of controls or celebratory response to billing/errors. At rest, Loop is still. Optional deliberate tap produces one blink/nod; no autonomous looping motion. A small wave is permitted for a greeting, not repeated continuously.

Decorative instances are hidden from accessibility traversal. If tappable, expose an accessible label and sufficient hit area; never rely on the mascot to communicate an essential status. Under Reduce Motion, keep it static and retain text feedback.

## Implementation acceptance

- Prototype native glass and shared transitions on supported iOS, fallback iOS and Android before broad rollout. Select dependencies only after checking compatibility with this React Native/navigation setup; no animation library is locked by this document.
- Validate card identity, precise return position, search/filter preservation, rapid taps, interrupted back gestures, rotation/layout change, deletion, deep links and failed requests.
- Keep frame pacing smooth on representative physical devices; prefer native/UI-thread animation and remove expensive layered effects if needed.
- Check large text, screen-reader focus, Reduce Motion, Reduce Transparency, Increase Contrast, safe areas and keyboard overlap.
- Confirm approved Raleway figures remain readable and unclipped through transitions. Keep solid content surfaces and the existing brand tokens.
- Final production assets and runtime behavior must match these locks; browser preview approval alone is not proof of native performance or accessibility.
